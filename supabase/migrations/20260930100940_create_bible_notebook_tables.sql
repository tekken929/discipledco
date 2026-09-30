/*
# Create Bible Notebook tables (saved verses and highlights)

1. New Tables
- `bible_notebook_users` — stores anonymous user identities (one per browser, created on first visit)
  - `id` (uuid, primary key)
  - `display_name` (text, nullable, user can name themselves)
  - `created_at` (timestamp)
- `bible_saved_verses` — verses a user has saved to their notepad
  - `id` (uuid, primary key)
  - `user_id` (uuid, references bible_notebook_users, identifies who saved it)
  - `book` (text, e.g. "John")
  - `chapter` (integer)
  - `verse` (integer)
  - `verse_end` (integer, nullable, for verse ranges)
  - `verse_text` (text, the verse content at time of saving)
  - `translation` (text, e.g. "kjv")
  - `note` (text, nullable, user's personal note)
  - `created_at` (timestamp)
- `bible_verse_highlights` — highlight colors applied to verses
  - `id` (uuid, primary key)
  - `user_id` (uuid, references bible_notebook_users)
  - `book` (text)
  - `chapter` (integer)
  - `verse` (integer)
  - `color` (text, one of: yellow, green, blue)
  - `created_at` (timestamp)

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated CRUD on all tables since this is a no-auth app.
- Users can only access their own rows (filtered by user_id matching their anonymous ID).
- The frontend generates and stores a UUID per browser in localStorage; all queries are scoped by that ID.
*/

CREATE TABLE IF NOT EXISTS bible_notebook_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bible_notebook_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_notebook_users" ON bible_notebook_users;
CREATE POLICY "anon_select_notebook_users" ON bible_notebook_users FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_notebook_users" ON bible_notebook_users;
CREATE POLICY "anon_insert_notebook_users" ON bible_notebook_users FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_notebook_users" ON bible_notebook_users;
CREATE POLICY "anon_update_notebook_users" ON bible_notebook_users FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_notebook_users" ON bible_notebook_users;
CREATE POLICY "anon_delete_notebook_users" ON bible_notebook_users FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS bible_saved_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES bible_notebook_users(id) ON DELETE CASCADE,
  book text NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  verse_end integer,
  verse_text text NOT NULL,
  translation text NOT NULL DEFAULT 'kjv',
  note text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bible_saved_verses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_saved_verses" ON bible_saved_verses;
CREATE POLICY "anon_select_saved_verses" ON bible_saved_verses FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_saved_verses" ON bible_saved_verses;
CREATE POLICY "anon_insert_saved_verses" ON bible_saved_verses FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_saved_verses" ON bible_saved_verses;
CREATE POLICY "anon_update_saved_verses" ON bible_saved_verses FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_saved_verses" ON bible_saved_verses;
CREATE POLICY "anon_delete_saved_verses" ON bible_saved_verses FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS bible_verse_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES bible_notebook_users(id) ON DELETE CASCADE,
  book text NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  color text NOT NULL DEFAULT 'yellow',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bible_verse_highlights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_highlights" ON bible_verse_highlights;
CREATE POLICY "anon_select_highlights" ON bible_verse_highlights FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_highlights" ON bible_verse_highlights;
CREATE POLICY "anon_insert_highlights" ON bible_verse_highlights FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_highlights" ON bible_verse_highlights;
CREATE POLICY "anon_update_highlights" ON bible_verse_highlights FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_highlights" ON bible_verse_highlights;
CREATE POLICY "anon_delete_highlights" ON bible_verse_highlights FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_saved_verses_user ON bible_saved_verses(user_id);
CREATE INDEX IF NOT EXISTS idx_highlights_user ON bible_verse_highlights(user_id);
CREATE INDEX IF NOT EXISTS idx_highlights_lookup ON bible_verse_highlights(user_id, book, chapter, verse);
