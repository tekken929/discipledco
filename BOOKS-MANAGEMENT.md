# Book Library Management Guide

The Book Library lets you publish books with page-turning animations. Books and their pages are stored in Supabase — no code changes needed for day-to-day management.

---

## How It Works

- Books are stored in the **`books`** table in the database
- Each page of content is stored in the **`book_pages`** table
- The library page at `/books` automatically shows all published books
- Readers use the page-turning interface at `/books/[id]`

---

## Adding a New Book

### Step 1 — Create the book record

Run this SQL in the Supabase dashboard (SQL Editor):

```sql
INSERT INTO books (title, author, description, category, order_index, total_pages, cover_image_url)
VALUES (
  'Your Book Title',
  'Author Name',
  'A short description of what this book is about.',
  'Study Guide',
  1,
  10,
  'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800'
)
RETURNING id;
```

Copy the `id` value that comes back — you'll need it in Step 2.

**Category options:** `Old Testament`, `New Testament`, `Study Guide`, `Devotional`

**order_index:** Lower numbers appear first on the library page. Use `1` for the first book, `2` for second, etc.

### Step 2 — Add the pages

Replace `YOUR_BOOK_ID_HERE` with the ID from Step 1:

```sql
INSERT INTO book_pages (book_id, page_number, content) VALUES
('YOUR_BOOK_ID_HERE', 1, 'First page content goes here.

Use blank lines to separate paragraphs. Keep each page to around 200–300 words for the best reading experience.'),

('YOUR_BOOK_ID_HERE', 2, 'Second page content goes here...'),

('YOUR_BOOK_ID_HERE', 3, 'Third page content goes here...');
```

### Step 3 — Update the total_pages count

After adding all pages, update the book record so the reader shows the correct page count:

```sql
UPDATE books
SET total_pages = 10    -- replace with your actual page count
WHERE id = 'YOUR_BOOK_ID_HERE';
```

---

## Editing an Existing Book

### Find a book's ID

```sql
SELECT id, title, author FROM books ORDER BY order_index;
```

### Update book details

```sql
UPDATE books
SET title = 'New Title',
    author = 'New Author',
    description = 'Updated description'
WHERE id = 'YOUR_BOOK_ID_HERE';
```

### Update a specific page

```sql
UPDATE book_pages
SET content = 'New content for this page...'
WHERE book_id = 'YOUR_BOOK_ID_HERE' AND page_number = 3;
```

### Change the display order

```sql
UPDATE books SET order_index = 2 WHERE id = 'YOUR_BOOK_ID_HERE';
```

---

## Deleting a Book

Deleting a book also removes all its pages automatically:

```sql
DELETE FROM books WHERE id = 'YOUR_BOOK_ID_HERE';
```

### Delete a single page

```sql
DELETE FROM book_pages
WHERE book_id = 'YOUR_BOOK_ID_HERE' AND page_number = 5;
```

After deleting a page, renumber the remaining pages if needed so there are no gaps.

---

## Cover Images

Three options for cover images:

1. **Free stock photo URL** (easiest) — copy a URL from Pexels:
   - Open Bible: `https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800`
   - Book on table: `https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=800`

2. **Upload to Supabase Storage** — go to Storage in your Supabase dashboard, upload the image, and copy the public URL

3. **Leave blank** — the library shows a default book icon if no cover is set

---

## Writing Tips

- **Page length** — aim for 200–300 words per page so readers don't need to scroll
- **Line breaks** — blank lines between paragraphs display correctly in the reader
- **Page numbers** — always start at 1 and count up with no gaps
- **Formatting** — the reader displays plain text; keep formatting simple
- **Chapters** — start a new book for each major section, or use clear headings within pages

---

## Database Column Reference

### books table

| Column | Description |
|---|---|
| id | Auto-generated unique ID (UUID) |
| title | Book title |
| author | Author name |
| description | Short description shown on the library card |
| cover_image_url | Image URL for the library card (optional) |
| total_pages | Total number of pages |
| category | Used for filtering on the library page |
| order_index | Display order (lower = appears first) |
| created_at | Auto-set timestamp |

### book_pages table

| Column | Description |
|---|---|
| id | Auto-generated unique ID (UUID) |
| book_id | ID of the parent book |
| page_number | Page number (starts at 1) |
| content | The text content of the page |
| created_at | Auto-set timestamp |
