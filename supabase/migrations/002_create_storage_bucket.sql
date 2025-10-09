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
