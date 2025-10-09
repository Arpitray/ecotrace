# Gallery Image Storage Migration - Setup Guide

## Problem Fixed
- **Issue**: ERR_FILE_NOT_FOUND errors - images not loading in gallery
- **Root Cause**: Base64 data URLs were too large and corrupted when stored in database
- **Solution**: Migrated to Supabase Storage for proper file uploads

## Changes Made

### 1. Created Image Storage Utility (`lib/imageStorage.js`)
- `uploadPlantImage(file, userId)` - Uploads images to Supabase Storage
- `deletePlantImage(imagePath)` - Removes images from Storage
- `dataURLtoFile(dataUrl, filename)` - Converts base64 to File objects

### 2. Updated Results Page (`app/results/page.js`)
- Added automatic image upload before database save
- Converts data URLs to actual files
- Uploads to Storage and stores the public URL instead
- Falls back to data URL if upload fails

### 3. Updated Plant Storage (`lib/plantStorage.js`)
- Enhanced `deletePlantResult()` to also delete images from Storage
- Extracts image path from URL and removes from bucket
- Handles both legacy (data URL) and new (Storage URL) formats

### 4. Gallery Already Compatible (`app/Gallery/page.jsx`)
- No changes needed - already uses `uploaded_image` field directly
- Will automatically display both data URLs and Storage URLs

## Database Migrations to Run

### Step 1: Run the Deduplication Migration
In your Supabase SQL Editor, run:
```sql
-- File: supabase/migrations/001_prevent_duplicates.sql

-- Delete duplicate plant results (keeping the most recent)
DELETE FROM plant_results a
USING plant_results b
WHERE a.user_id = b.user_id
  AND a.scientific_name = b.scientific_name
  AND a.uploaded_image = b.uploaded_image
  AND a.id < b.id;

-- Create unique index to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS unique_plant_per_user_image 
ON plant_results (user_id, scientific_name, uploaded_image);

-- Add created_at column if it doesn't exist
ALTER TABLE plant_results 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

### Step 2: Create Storage Bucket
In your Supabase SQL Editor, run:
```sql
-- File: supabase/migrations/002_create_storage_bucket.sql

-- Create the plant-images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('plant-images', 'plant-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies to allow authenticated users to upload/delete their own images
CREATE POLICY "Users can upload their own plant images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view all plant images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'plant-images');

CREATE POLICY "Users can delete their own plant images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own plant images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Testing Steps

1. **Run the migrations** in your Supabase dashboard (both SQL files above)

2. **Test new uploads**:
   - Upload a new plant photo
   - Check that it appears in the gallery
   - Verify the image loads properly (no ERR_FILE_NOT_FOUND)
   - Check Supabase Storage → plant-images bucket to see the uploaded file

3. **Test deletion**:
   - Delete a plant from the gallery
   - Verify it's removed from both database and Storage bucket

4. **Test duplicates**:
   - Upload the same plant twice
   - Should only appear once in gallery
   - Check browser console for "Plant already saved in this session" or "Duplicate found" messages

## Migration Strategy for Existing Data (Optional)

If you have existing plants with base64 images in your database, they will continue to work but won't benefit from the Storage optimization. To migrate them:

1. **Manual approach**: Delete old entries and re-upload the plants
2. **Automated approach**: Create a migration script that:
   - Fetches all plants with data URL images
   - Converts each to a file
   - Uploads to Storage
   - Updates the database record with the new URL

For now, the app handles both formats seamlessly, so this migration can be done gradually.

## How It Works Now

### Upload Flow:
1. User uploads plant photo → gets identification result
2. Results page receives data URL from camera/upload
3. **NEW**: Converts data URL to File object
4. **NEW**: Uploads file to Supabase Storage bucket
5. **NEW**: Gets public URL from Storage
6. Saves plant result to database with Storage URL (not data URL)
7. Session marker prevents duplicate saves on refresh

### Gallery Flow:
1. Fetches plant_results from database
2. Each record has `uploaded_image` field with Storage URL
3. Browser loads images directly from Supabase CDN
4. Fast, reliable, no file size limits

### Delete Flow:
1. User clicks delete button
2. **NEW**: Fetches plant record to get image path
3. Deletes from database
4. **NEW**: Extracts path from Storage URL
5. **NEW**: Deletes image file from Storage bucket

## Benefits

✅ **Fixed ERR_FILE_NOT_FOUND** - Images now load reliably  
✅ **Better performance** - No more huge base64 strings in database  
✅ **Scalability** - Can handle high-resolution images  
✅ **CDN delivery** - Images served from Supabase CDN  
✅ **Proper storage** - Files organized by user ID  
✅ **Clean deletion** - Images removed when plants are deleted  
✅ **Backward compatible** - Old data URLs still work during migration  

## Troubleshooting

### Images still not loading?
- Check Supabase Storage bucket exists and is public
- Verify storage policies are created (users can read/write)
- Check browser console for upload errors
- Verify user is authenticated when uploading

### Duplicates still appearing?
- Run the deduplication migration (001_prevent_duplicates.sql)
- Check unique constraint was created successfully
- Clear browser sessionStorage and test again

### Upload failing?
- Check Supabase project storage quota
- Verify user has authentication token
- Check browser console for detailed error messages
- Ensure image file size is reasonable (< 5MB recommended)
