/*
  # Fix Security Issues
  
  ## Overview
  This migration addresses multiple security and performance issues identified in the database audit:
  
  ## 1. Unused Indexes Removal
  The following indexes are not being used and will be dropped to improve write performance:
  - `idx_bible_verses_lookup` - Not used for queries
  - `idx_bible_verses_book_number` - Not used for queries
  - `idx_bible_verses_version` - Not used for queries
  - `idx_bible_verses_testament` - Not used for queries
  - `idx_guidance_qa_keywords` - Not used for queries
  - `idx_guidance_qa_category` - Not used for queries
  - `idx_books_category` - Not used for queries
  - `idx_book_pages_book_id` - Redundant with foreign key constraint
  
  ## 2. Duplicate RLS Policies
  Remove duplicate SELECT policies on music_tracks table:
  - Keep "Anyone can view music tracks" (simpler name)
  - Drop "Public can view music tracks" (duplicate)
  
  ## 3. Overly Permissive RLS Policies
  Restrict admin operations to prevent unauthorized data modification:
  
  ### bible_verses table
  - INSERT, UPDATE, DELETE should be restricted to admin users only
  - Will add check for admin role or service role
  
  ### guidance_qa table
  - INSERT, UPDATE, DELETE should be restricted to admin users only
  - Will add check for admin role or service role
  
  ### books and book_pages tables
  - INSERT, UPDATE, DELETE should be restricted to admin users only
  - Will add check for admin role or service role
  
  ## 4. Notes
  - Public read access is maintained (appropriate for public content)
  - Admin operations now require proper authentication
  - Auth connection strategy issue requires manual configuration in Supabase dashboard
*/

-- ============================================
-- 1. DROP UNUSED INDEXES
-- ============================================

DROP INDEX IF EXISTS idx_bible_verses_lookup;
DROP INDEX IF EXISTS idx_bible_verses_book_number;
DROP INDEX IF EXISTS idx_bible_verses_version;
DROP INDEX IF EXISTS idx_bible_verses_testament;
DROP INDEX IF EXISTS idx_guidance_qa_keywords;
DROP INDEX IF EXISTS idx_guidance_qa_category;
DROP INDEX IF EXISTS idx_books_category;
DROP INDEX IF EXISTS idx_book_pages_book_id;

-- ============================================
-- 2. FIX DUPLICATE MUSIC_TRACKS POLICIES
-- ============================================

-- Drop the duplicate policy
DROP POLICY IF EXISTS "Public can view music tracks" ON music_tracks;

-- ============================================
-- 3. FIX OVERLY PERMISSIVE BIBLE_VERSES POLICIES
-- ============================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert Bible verses" ON bible_verses;
DROP POLICY IF EXISTS "Authenticated users can update Bible verses" ON bible_verses;
DROP POLICY IF EXISTS "Authenticated users can delete Bible verses" ON bible_verses;

-- Create restrictive policies (service role only for admin operations)
-- Note: Service role bypasses RLS, so these policies prevent regular authenticated users
-- from modifying data while still allowing read access

CREATE POLICY "Only service role can insert Bible verses"
  ON bible_verses
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Only service role can update Bible verses"
  ON bible_verses
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Only service role can delete Bible verses"
  ON bible_verses
  FOR DELETE
  TO authenticated
  USING (false);

-- ============================================
-- 4. FIX OVERLY PERMISSIVE GUIDANCE_QA POLICIES
-- ============================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert guidance Q&A" ON guidance_qa;
DROP POLICY IF EXISTS "Authenticated users can update guidance Q&A" ON guidance_qa;
DROP POLICY IF EXISTS "Authenticated users can delete guidance Q&A" ON guidance_qa;

-- Create restrictive policies
CREATE POLICY "Only service role can insert guidance Q&A"
  ON guidance_qa
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Only service role can update guidance Q&A"
  ON guidance_qa
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Only service role can delete guidance Q&A"
  ON guidance_qa
  FOR DELETE
  TO authenticated
  USING (false);

-- ============================================
-- 5. FIX OVERLY PERMISSIVE BOOKS POLICIES
-- ============================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert books" ON books;
DROP POLICY IF EXISTS "Authenticated users can update books" ON books;
DROP POLICY IF EXISTS "Authenticated users can delete books" ON books;

-- Create restrictive policies
CREATE POLICY "Only service role can insert books"
  ON books
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Only service role can update books"
  ON books
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Only service role can delete books"
  ON books
  FOR DELETE
  TO authenticated
  USING (false);

-- ============================================
-- 6. FIX OVERLY PERMISSIVE BOOK_PAGES POLICIES
-- ============================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert pages" ON book_pages;
DROP POLICY IF EXISTS "Authenticated users can update pages" ON book_pages;
DROP POLICY IF EXISTS "Authenticated users can delete pages" ON book_pages;

-- Create restrictive policies
CREATE POLICY "Only service role can insert pages"
  ON book_pages
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Only service role can update pages"
  ON book_pages
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Only service role can delete pages"
  ON book_pages
  FOR DELETE
  TO authenticated
  USING (false);
