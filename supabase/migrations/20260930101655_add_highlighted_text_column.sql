/*
# Add highlighted_text column to bible_verse_highlights

1. Modified Tables
- `bible_verse_highlights` — add `highlighted_text` (text, nullable)
  - When null, the entire verse is highlighted (existing behavior).
  - When set, only the specified portion of the verse text is highlighted.
2. Security
- No changes to RLS policies.
*/

ALTER TABLE bible_verse_highlights
  ADD COLUMN IF NOT EXISTS highlighted_text text;
