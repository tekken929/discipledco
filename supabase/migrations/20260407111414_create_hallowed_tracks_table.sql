/*
  # Create Hallowed Music Tracks Table

  1. New Tables
    - `hallowed_tracks`
      - `id` (uuid, primary key) - Unique identifier for each track
      - `title` (text, required) - Song title
      - `artist` (text, default "Hallowed") - Artist name (defaults to Hallowed)
      - `album` (text, optional) - Album name
      - `duration` (integer, optional) - Track duration in seconds
      - `audio_url` (text, required) - URL to the audio file in storage
      - `order_index` (integer, default 0) - Display order for tracks
      - `created_at` (timestamptz) - Timestamp when track was added
      - `updated_at` (timestamptz) - Timestamp when track was last updated

  2. Storage
    - Create `hallowed-music` bucket for audio files
    - Enable public access for playback

  3. Security
    - Enable RLS on `hallowed_tracks` table
    - Add policy for public read access (anyone can view tracks)
    - Add policy for authenticated insert (only authenticated users can upload)
    - Add policy for authenticated update (only authenticated users can edit)
    - Add policy for authenticated delete (only authenticated users can delete)
    - Storage policies allow public read and authenticated write
*/

-- Create hallowed_tracks table
CREATE TABLE IF NOT EXISTS hallowed_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text DEFAULT 'Hallowed',
  album text,
  duration integer,
  audio_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hallowed_tracks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view hallowed tracks"
  ON hallowed_tracks FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert hallowed tracks"
  ON hallowed_tracks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update hallowed tracks"
  ON hallowed_tracks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete hallowed tracks"
  ON hallowed_tracks FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for hallowed music
INSERT INTO storage.buckets (id, name, public)
VALUES ('hallowed-music', 'hallowed-music', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for hallowed-music bucket
CREATE POLICY "Public can view hallowed music files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hallowed-music');

CREATE POLICY "Authenticated users can upload hallowed music"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'hallowed-music');

CREATE POLICY "Authenticated users can update hallowed music files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'hallowed-music')
  WITH CHECK (bucket_id = 'hallowed-music');

CREATE POLICY "Authenticated users can delete hallowed music files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'hallowed-music');