/*
  # Add Storage Update Policy

  1. Changes
    - Add UPDATE policy for storage.objects on music bucket
    - This allows the anon role to fully manage files in the music bucket
    
  2. Security
    - Allow public UPDATE on storage.objects for music bucket
*/

-- Create UPDATE policy for music bucket
CREATE POLICY "Anyone can update music files"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'music')
  WITH CHECK (bucket_id = 'music');
