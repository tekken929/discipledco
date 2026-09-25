CREATE POLICY "temp_niv_insert" ON translations_bible
  FOR INSERT TO anon, authenticated WITH CHECK (true);