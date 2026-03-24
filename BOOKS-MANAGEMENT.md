# Book Management Guide

This guide explains how to add and manage books in your library.

## Database Structure

### Books Table
- **id**: Auto-generated unique identifier
- **title**: Book title
- **author**: Book author name
- **description**: Brief description of the book
- **cover_image_url**: URL to cover image (optional)
- **total_pages**: Total number of pages
- **category**: Category (e.g., "Old Testament", "New Testament", "Study Guide")
- **order_index**: Order for displaying books (lower numbers appear first)

### Book Pages Table
- **id**: Auto-generated unique identifier
- **book_id**: Reference to the parent book
- **page_number**: Page number (starts at 1)
- **content**: The actual text content of the page

## Adding a New Book

### Step 1: Insert the Book Record

Use the Supabase SQL editor or the execute_sql tool:

```sql
INSERT INTO books (title, author, description, category, order_index, total_pages)
VALUES (
  'The Gospel of John',
  'Apostle John',
  'An in-depth exploration of the Gospel of John, focusing on the divinity of Christ and eternal life.',
  'New Testament',
  1,
  50
);
```

### Step 2: Get the Book ID

After inserting, retrieve the book ID:

```sql
SELECT id FROM books WHERE title = 'The Gospel of John';
```

### Step 3: Add Pages

Insert pages one by one or in bulk. Replace `YOUR_BOOK_ID` with the actual book ID:

```sql
-- Single page
INSERT INTO book_pages (book_id, page_number, content)
VALUES (
  'YOUR_BOOK_ID',
  1,
  'In the beginning was the Word, and the Word was with God, and the Word was God.

He was with God in the beginning. Through him all things were made; without him nothing was made that has been made. In him was life, and that life was the light of all mankind.

The light shines in the darkness, and the darkness has not overcome it.'
);

-- Multiple pages at once
INSERT INTO book_pages (book_id, page_number, content) VALUES
('YOUR_BOOK_ID', 2, 'Page 2 content here...'),
('YOUR_BOOK_ID', 3, 'Page 3 content here...'),
('YOUR_BOOK_ID', 4, 'Page 4 content here...');
```

## Example: Complete Book Addition

```sql
-- Step 1: Insert the book
INSERT INTO books (title, author, description, category, order_index, total_pages)
VALUES (
  'Discovering Grace',
  'Dr. Sarah Thompson',
  'A 30-day devotional journey exploring the depths of God''s grace in everyday life.',
  'Devotional',
  2,
  60
)
RETURNING id;

-- Step 2: Add pages (use the returned ID)
INSERT INTO book_pages (book_id, page_number, content) VALUES
('RETURNED_BOOK_ID_HERE', 1, 'Day 1: Understanding Grace

Grace is not simply God''s kindness or mercy - it is His unmerited favor poured out on those who deserve the opposite. As we begin this journey together, take a moment to reflect on the areas of your life where you''ve experienced God''s grace.

Prayer: Lord, open my eyes to see Your grace in new ways...'),

('RETURNED_BOOK_ID_HERE', 2, 'Day 1: Understanding Grace (continued)

When we truly grasp the concept of grace, it transforms how we view ourselves, others, and our relationship with God. Grace means that our standing before God is not based on our performance but on Christ''s finished work on the cross.

Reflection Questions:
1. Where have you seen God''s grace at work in your life this week?
2. How can understanding grace change the way you approach God in prayer?'),

('RETURNED_BOOK_ID_HERE', 3, 'Day 2: Grace in Action

Today we explore how grace isn''t just a theological concept - it''s meant to be lived out in our daily interactions with others. Jesus modeled this perfectly during His time on earth.

Scripture: "For the law was given through Moses; grace and truth came through Jesus Christ." - John 1:17');
```

## Managing Content

### Update a Book

```sql
UPDATE books
SET title = 'New Title',
    author = 'New Author',
    description = 'New description'
WHERE id = 'BOOK_ID';
```

### Update a Page

```sql
UPDATE book_pages
SET content = 'Updated content here...'
WHERE book_id = 'BOOK_ID' AND page_number = 1;
```

### Delete a Book (and all its pages)

```sql
DELETE FROM books WHERE id = 'BOOK_ID';
-- Pages are automatically deleted due to CASCADE
```

### Delete a Single Page

```sql
DELETE FROM book_pages
WHERE book_id = 'BOOK_ID' AND page_number = 5;
```

## Tips for Content Formatting

1. **Line breaks**: Use actual line breaks in your content for paragraph separation
2. **Keep pages readable**: Aim for 200-400 words per page for comfortable reading
3. **Consistent formatting**: Use similar content structure across pages
4. **Page numbering**: Always start from 1 and increment sequentially
5. **Total pages**: Update the `total_pages` field in the books table to match actual page count

## Viewing Your Books

Once added, books will automatically appear on the `/books` page and can be read by clicking on them.

## Cover Images

For cover images, you can:
1. Use URLs from free stock photo sites (like Pexels)
2. Upload images to Supabase Storage and use the public URL
3. Leave blank for a default book icon

Example cover image URLs:
- https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg (Bible)
- https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg (Open book)
