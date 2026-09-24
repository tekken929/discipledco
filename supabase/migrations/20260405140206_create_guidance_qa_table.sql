/*
  # Create Guidance Q&A Table

  1. New Tables
    - `guidance_qa`
      - `id` (uuid, primary key) - Unique identifier for each Q&A entry
      - `question` (text, not null) - The question or topic (e.g., "How do I find peace?")
      - `keywords` (text[], not null) - Array of keywords for searching (e.g., ["peace", "anxiety", "worry"])
      - `answer` (text, not null) - The apologetics-based answer
      - `scripture_references` (jsonb, not null) - Array of scripture objects with book, chapter, verse, version, and text
      - `category` (text) - Category of question (e.g., "Faith", "Prayer", "Salvation", "Life Challenges")
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Indexes
    - GIN index on keywords array for fast text search
    - Index on category for filtering

  3. Security
    - Enable RLS on `guidance_qa` table
    - Add policy for public read access (guidance is freely available)
    - Only authenticated users can insert/update/delete (for admin functionality)

  4. Notes
    - Each answer includes at least 2 scripture references
    - Keywords enable fuzzy searching
    - Scripture references stored as JSONB for flexibility
    - All answers based on Christian apologetics principles
*/

CREATE TABLE IF NOT EXISTS guidance_qa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  keywords text[] NOT NULL DEFAULT '{}',
  answer text NOT NULL,
  scripture_references jsonb NOT NULL DEFAULT '[]',
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create GIN index for keyword search
CREATE INDEX IF NOT EXISTS idx_guidance_qa_keywords 
  ON guidance_qa USING gin(keywords);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_guidance_qa_category 
  ON guidance_qa(category);

-- Enable RLS
ALTER TABLE guidance_qa ENABLE ROW LEVEL SECURITY;

-- Public read access (guidance is freely available)
CREATE POLICY "Anyone can read guidance Q&A"
  ON guidance_qa
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can insert Q&A entries
CREATE POLICY "Authenticated users can insert guidance Q&A"
  ON guidance_qa
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update Q&A entries
CREATE POLICY "Authenticated users can update guidance Q&A"
  ON guidance_qa
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete Q&A entries
CREATE POLICY "Authenticated users can delete guidance Q&A"
  ON guidance_qa
  FOR DELETE
  TO authenticated
  USING (true);