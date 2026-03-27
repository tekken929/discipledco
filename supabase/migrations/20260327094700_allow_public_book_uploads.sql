/*
  # Allow Public Book Uploads
  
  ## Overview
  Updates RLS policies to allow public users to upload books and pages.
  This aligns with the music tracks pattern where uploads are controlled
  by the frontend rather than authentication.
  
  ## Changes
  
  ### Books Table
  - Keep SELECT public (anyone can read)
  - Change INSERT to public with validation
  - Change UPDATE to public with validation
  - Change DELETE to public
  
  ### Book Pages Table
  - Keep SELECT public (anyone can read)
  - Change INSERT to public with validation
  - Change UPDATE to public with validation
  - Change DELETE to public
  
  ## Security
  - Add data validation to ensure required fields are present
  - Prevent insertion of empty or invalid data
  - Frontend can still implement password protection if needed
  
  ## Notes
  - Similar pattern to music_tracks table
  - Maintains data integrity through validation
*/

-- Drop existing authenticated-only policies on books
DROP POLICY IF EXISTS "Authenticated users can insert books" ON books;
DROP POLICY IF EXISTS "Authenticated users can update books" ON books;
DROP POLICY IF EXISTS "Authenticated users can delete books" ON books;

-- Create new public policies with validation for books
CREATE POLICY "Public can insert valid books"
  ON books
  FOR INSERT
  TO public
  WITH CHECK (
    title IS NOT NULL AND
    title != '' AND
    total_pages >= 0
  );

CREATE POLICY "Public can update books"
  ON books
  FOR UPDATE
  TO public
  USING (id IS NOT NULL)
  WITH CHECK (
    title IS NOT NULL AND
    title != '' AND
    total_pages >= 0
  );

CREATE POLICY "Public can delete books"
  ON books
  FOR DELETE
  TO public
  USING (id IS NOT NULL);

-- Drop existing authenticated-only policies on book_pages
DROP POLICY IF EXISTS "Authenticated users can insert pages" ON book_pages;
DROP POLICY IF EXISTS "Authenticated users can update pages" ON book_pages;
DROP POLICY IF EXISTS "Authenticated users can delete pages" ON book_pages;

-- Create new public policies with validation for book_pages
CREATE POLICY "Public can insert valid pages"
  ON book_pages
  FOR INSERT
  TO public
  WITH CHECK (
    book_id IS NOT NULL AND
    page_number > 0 AND
    content IS NOT NULL
  );

CREATE POLICY "Public can update pages"
  ON book_pages
  FOR UPDATE
  TO public
  USING (id IS NOT NULL)
  WITH CHECK (
    book_id IS NOT NULL AND
    page_number > 0 AND
    content IS NOT NULL
  );

CREATE POLICY "Public can delete pages"
  ON book_pages
  FOR DELETE
  TO public
  USING (id IS NOT NULL);
