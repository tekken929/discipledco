/*
  # Fix Music Storage Policies

  1. Changes
    - Drop and recreate storage policies for the music bucket
    - Ensure public access for upload, view, and delete operations
    
  2. Security
    - Allow public INSERT on storage.objects for music bucket
    - Allow public SELECT on storage.objects for music bucket  
    - Allow public DELETE on storage.objects for music bucket
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view music files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload music files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete music files" ON storage.objects;

-- Create storage policies for music bucket
CREATE POLICY "Public can view music files"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'music');

CREATE POLICY "Anyone can upload music files"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'music');

CREATE POLICY "Anyone can delete music files"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'music');
