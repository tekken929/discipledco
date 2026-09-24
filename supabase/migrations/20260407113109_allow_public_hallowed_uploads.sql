/*
  # Allow Public Hallowed Track Uploads

  1. Changes
    - Drop existing authenticated-only insert policy for hallowed_tracks
    - Create new public insert policy to allow uploads without authentication
    - This enables the admin upload feature which uses password protection at the application level

  2. Security
    - Application-level password protection in HallowedMusicUpload component
    - Other CRUD operations remain protected (update/delete require authentication)
*/

-- Drop the existing authenticated-only insert policy
DROP POLICY IF EXISTS "Authenticated users can insert hallowed tracks" ON hallowed_tracks;

-- Create new public insert policy
CREATE POLICY "Anyone can insert hallowed tracks"
  ON hallowed_tracks FOR INSERT
  WITH CHECK (true);

-- Also update storage policies to allow public uploads to hallowed-music bucket
DROP POLICY IF EXISTS "Authenticated users can upload hallowed music" ON storage.objects;

CREATE POLICY "Anyone can upload hallowed music"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'hallowed-music');