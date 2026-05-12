/*
  # Create KJV Bible Table

  1. New Tables
    - `kjv_bible`
      - `id` (bigint, primary key, auto-increment)
      - `book_order` (integer) - canonical ordering of the book (1-66)
      - `book` (text) - full book name e.g. "Genesis"
      - `testament` (text) - "Old Testament" or "New Testament"
      - `chapter` (integer) - chapter number
      - `verse` (integer) - verse number
      - `text` (text) - the verse text in KJV

  2. Indexes
    - Index on (book, chapter, verse) for fast lookups
    - Index on book_order for ordered reading

  3. Security
    - Enable RLS
    - Public read-only access (KJV is public domain scripture)
    - No write access for non-service roles
*/

CREATE TABLE IF NOT EXISTS kjv_bible (
  id bigserial PRIMARY KEY,
  book_order integer NOT NULL,
  book text NOT NULL,
  testament text NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  text text NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kjv_book_chapter_verse ON kjv_bible (book, chapter, verse);
CREATE INDEX IF NOT EXISTS idx_kjv_book_order ON kjv_bible (book_order);
CREATE INDEX IF NOT EXISTS idx_kjv_testament ON kjv_bible (testament);

ALTER TABLE kjv_bible ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read KJV verses"
  ON kjv_bible
  FOR SELECT
  TO anon, authenticated
  USING (true);
