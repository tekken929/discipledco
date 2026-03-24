/*
  # Create Books and Pages Tables

  ## Overview
  Creates a complete book management system with books and their pages.

  ## New Tables
  
  ### `books`
  Stores book metadata and information
  - `id` (uuid, primary key) - Unique identifier for each book
  - `title` (text) - Book title
  - `author` (text) - Book author
  - `description` (text) - Brief description of the book
  - `cover_image_url` (text) - URL to the book cover image
  - `total_pages` (integer) - Total number of pages in the book
  - `category` (text) - Book category (e.g., "Old Testament", "New Testament", "Study Guide")
  - `order_index` (integer) - Order for displaying books
  - `created_at` (timestamptz) - When the book was created

  ### `book_pages`
  Stores individual pages of each book
  - `id` (uuid, primary key) - Unique identifier for each page
  - `book_id` (uuid, foreign key) - References the parent book
  - `page_number` (integer) - Page number within the book
  - `content` (text) - The actual content/text of the page
  - `created_at` (timestamptz) - When the page was created

  ## Security
  - Enable RLS on both tables
  - Allow public read access (anyone can view books)
  - Restrict write operations to authenticated users only

  ## Notes
  - Pages are numbered starting from 1
  - Content supports rich text formatting
  - Books can be categorized for easy organization
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text DEFAULT '',
  description text DEFAULT '',
  cover_image_url text DEFAULT '',
  total_pages integer DEFAULT 0,
  category text DEFAULT 'General',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create book_pages table
CREATE TABLE IF NOT EXISTS book_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  page_number integer NOT NULL,
  content text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(book_id, page_number)
);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_pages ENABLE ROW LEVEL SECURITY;

-- Books policies - public read, authenticated write
CREATE POLICY "Anyone can view books"
  ON books FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert books"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update books"
  ON books FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete books"
  ON books FOR DELETE
  TO authenticated
  USING (true);

-- Book pages policies - public read, authenticated write
CREATE POLICY "Anyone can view book pages"
  ON book_pages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert pages"
  ON book_pages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pages"
  ON book_pages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pages"
  ON book_pages FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_order ON books(order_index);
CREATE INDEX IF NOT EXISTS idx_book_pages_book_id ON book_pages(book_id);
CREATE INDEX IF NOT EXISTS idx_book_pages_page_number ON book_pages(book_id, page_number);