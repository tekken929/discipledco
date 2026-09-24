/*
  # Create Music Tracks Table

  1. New Tables
    - `music_tracks`
      - `id` (uuid, primary key) - Unique identifier for each track
      - `title` (text) - Song title
      - `artist` (text) - Artist name
      - `file_path` (text) - Path to the MP3 file in storage
      - `file_url` (text) - Public URL to access the file
      - `duration` (integer) - Duration in seconds (optional)
      - `uploaded_at` (timestamptz) - When the track was uploaded
      - `play_count` (integer) - Number of times played
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `music_tracks` table
    - Add policy for anyone to read tracks (public access)
    - Add policy for anyone to insert, update, and delete tracks

  3. Storage
    - Create a storage bucket for music files with public access
*/

-- Create music_tracks table
CREATE TABLE IF NOT EXISTS music_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text DEFAULT 'Unknown Artist',
  file_path text NOT NULL,
  file_url text NOT NULL,
  duration integer DEFAULT 0,
  uploaded_at timestamptz DEFAULT now(),
  play_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read tracks (public music player)
CREATE POLICY "Anyone can view music tracks"
  ON music_tracks
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert tracks
CREATE POLICY "Anyone can upload music tracks"
  ON music_tracks
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update play count
CREATE POLICY "Anyone can update music tracks"
  ON music_tracks
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete tracks
CREATE POLICY "Anyone can delete music tracks"
  ON music_tracks
  FOR DELETE
  TO public
  USING (true);

-- Create storage bucket for music files
INSERT INTO storage.buckets (id, name, public)
VALUES ('music', 'music', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for music bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public can view music files'
  ) THEN
    CREATE POLICY "Public can view music files"
      ON storage.objects
      FOR SELECT
      TO public
      USING (bucket_id = 'music');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can upload music files'
  ) THEN
    CREATE POLICY "Anyone can upload music files"
      ON storage.objects
      FOR INSERT
      TO public
      WITH CHECK (bucket_id = 'music');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can delete music files'
  ) THEN
    CREATE POLICY "Anyone can delete music files"
      ON storage.objects
      FOR DELETE
      TO public
      USING (bucket_id = 'music');
  END IF;
END $$;
