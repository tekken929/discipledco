/*
  # Add category column to music_tracks table

  1. Changes
    - Add `category` column to `music_tracks` table
      - Type: text
      - Default: 'Worship'
      - Allows categorizing music by genre (Heavy Metal, House, Calm, Worship, etc.)

  2. Notes
    - Existing records will automatically get 'Worship' as default category
    - This enables filtering tracks by music category
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'music_tracks' AND column_name = 'category'
  ) THEN
    ALTER TABLE music_tracks ADD COLUMN category text DEFAULT 'Worship';
  END IF;
END $$;
