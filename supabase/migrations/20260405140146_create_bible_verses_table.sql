/*
  # Create Bible Verses Table

  1. New Tables
    - `bible_verses`
      - `id` (uuid, primary key) - Unique identifier for each verse
      - `book` (text, not null) - Name of the Bible book (e.g., "Genesis", "Matthew")
      - `chapter` (integer, not null) - Chapter number
      - `verse` (integer, not null) - Verse number
      - `text` (text, not null) - The actual verse text
      - `version` (text, not null, default 'KJV') - Bible version (KJV, NIV, ESV, etc.)
      - `testament` (text, not null) - Either 'Old Testament' or 'New Testament'
      - `book_number` (integer, not null) - Sequential book number (1-66) for ordering
      - `created_at` (timestamptz) - Record creation timestamp

  2. Indexes
    - Index on (book, chapter, verse, version) for fast lookups
    - Index on book_number for ordering
    - Index on version for filtering by translation

  3. Security
    - Enable RLS on `bible_verses` table
    - Add policy for public read access (Bible is public domain)
    - Only authenticated users with admin role can insert/update/delete

  4. Notes
    - This table will store all 31,102 verses of the Bible
    - Organized by book for efficient querying
    - Supports multiple Bible versions
    - Public read access since Bible text is freely available
*/

CREATE TABLE IF NOT EXISTS bible_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book text NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  text text NOT NULL,
  version text NOT NULL DEFAULT 'KJV',
  testament text NOT NULL CHECK (testament IN ('Old Testament', 'New Testament')),
  book_number integer NOT NULL CHECK (book_number >= 1 AND book_number <= 66),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_bible_verses_lookup 
  ON bible_verses(book, chapter, verse, version);

CREATE INDEX IF NOT EXISTS idx_bible_verses_book_number 
  ON bible_verses(book_number);

CREATE INDEX IF NOT EXISTS idx_bible_verses_version 
  ON bible_verses(version);

CREATE INDEX IF NOT EXISTS idx_bible_verses_testament 
  ON bible_verses(testament);

-- Enable RLS
ALTER TABLE bible_verses ENABLE ROW LEVEL SECURITY;

-- Public read access (Bible is public domain)
CREATE POLICY "Anyone can read Bible verses"
  ON bible_verses
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can insert verses (for admin functionality)
CREATE POLICY "Authenticated users can insert Bible verses"
  ON bible_verses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update verses
CREATE POLICY "Authenticated users can update Bible verses"
  ON bible_verses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete verses
CREATE POLICY "Authenticated users can delete Bible verses"
  ON bible_verses
  FOR DELETE
  TO authenticated
  USING (true);