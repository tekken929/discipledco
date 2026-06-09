CREATE TABLE IF NOT EXISTS translations_bible (
  id bigserial PRIMARY KEY,
  translation text NOT NULL,
  book_order integer NOT NULL,
  book text NOT NULL,
  testament text NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  text text NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_trans_bible_lookup ON translations_bible (translation, book, chapter, verse);
CREATE INDEX IF NOT EXISTS idx_trans_bible_order ON translations_bible (translation, book_order);

ALTER TABLE translations_bible ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read translations"
  ON translations_bible
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert translations"
  ON translations_bible
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can delete translations"
  ON translations_bible
  FOR DELETE
  TO service_role
  USING (true);
