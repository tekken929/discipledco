/*
  # Fix Music Tracks RLS Policies

  1. Changes
    - Drop existing restrictive RLS policies on music_tracks
    - Add public policies for SELECT, INSERT, UPDATE, DELETE
    - Allow anyone to manage music tracks for jukebox functionality
    
  2. Security
    - Public access enabled for music jukebox feature
    - All operations allowed without authentication
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view music tracks" ON music_tracks;
DROP POLICY IF EXISTS "Anyone can insert music tracks" ON music_tracks;
DROP POLICY IF EXISTS "Anyone can update music tracks" ON music_tracks;
DROP POLICY IF EXISTS "Anyone can delete music tracks" ON music_tracks;

-- Create public policies for all operations
CREATE POLICY "Anyone can view music tracks"
  ON music_tracks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert music tracks"
  ON music_tracks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update music tracks"
  ON music_tracks
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete music tracks"
  ON music_tracks
  FOR DELETE
  TO public
  USING (true);
