-- Migration to add unique constraint and prevent duplicate plant saves
-- Run this SQL in your Supabase SQL editor

-- Step 1: Remove existing duplicates (keep only the most recent entry for each duplicate)
DELETE FROM plant_results a
USING plant_results b
WHERE a.id < b.id
  AND a.user_id = b.user_id
  AND a.scientific_name = b.scientific_name
  AND a.uploaded_image = b.uploaded_image;

-- Step 2: Add a unique constraint to prevent future duplicates
-- This ensures that the combination of (user_id, scientific_name, uploaded_image) is unique
CREATE UNIQUE INDEX IF NOT EXISTS unique_plant_per_user_image 
ON plant_results (user_id, scientific_name, uploaded_image);

-- Alternative: If you want to allow the same plant but different images, use this instead:
-- CREATE UNIQUE INDEX IF NOT EXISTS unique_plant_per_user_image 
-- ON plant_results (user_id, scientific_name, md5(uploaded_image));

-- Step 3: Add created_at timestamp with default if it doesn't exist
ALTER TABLE plant_results 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing rows to have created_at = timestamp
UPDATE plant_results 
SET created_at = timestamp 
WHERE created_at IS NULL;
