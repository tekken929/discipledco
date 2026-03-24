# Website Editing Guide - Discipled Co.

This guide will help you easily edit content across the Discipled Co. website. Each section explains which files to modify for different types of content.

---

## Table of Contents

1. [Editing Biblical Topics](#editing-biblical-topics)
2. [Editing Books of the Bible](#editing-books-of-the-bible)
3. [Editing Bible Versions Page](#editing-bible-versions-page)
4. [Editing Timeline](#editing-timeline)
5. [Editing Religions Page](#editing-religions-page)
6. [Editing Stories Page](#editing-stories-page)
7. [Editing FAQs Page](#editing-faqs-page)
8. [Editing Header & Logo](#editing-header--logo)
9. [Editing Footer & Social Links](#editing-footer--social-links)
10. [Adding New Pages](#adding-new-pages)

---

## 1. Editing Biblical Topics

### Location: `src/data/topics.ts`

This file contains all the biblical topics (Marriage, Lust, Sin, etc.) with their Scripture references.

### How to Edit:

#### Adding a New Topic:

```typescript
{
  id: 'your-topic-id',           // URL-friendly name (e.g., 'grace', 'hope')
  title: 'Your Topic Title',     // Display name (e.g., 'Grace & Mercy')
  description: 'Brief description of this topic',
  icon: '🎯',                    // Any emoji icon
  references: [
    // Add at least 10 biblical references (see format below)
  ]
}
```

#### Adding Biblical References:

```typescript
{
  book: 'Book Name',             // e.g., 'John', 'Romans', 'Psalm'
  chapter: 3,                    // Chapter number
  verse: '16',                   // Verse(s) - can be '16' or '16-18'
  text: 'Full verse text here'   // The actual Scripture text
}
```

#### Example - Adding a "Hope" Topic:

```typescript
{
  id: 'hope',
  title: 'Hope in Christ',
  description: 'Finding hope and encouragement in God\'s promises',
  icon: '🌟',
  references: [
    {
      book: 'Romans',
      chapter: 15,
      verse: '13',
      text: 'May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope.'
    },
    {
      book: 'Jeremiah',
      chapter: 29,
      verse: '11',
      text: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.'
    }
    // Add at least 8 more references...
  ]
}
```

---

## 2. Editing Books of the Bible

### Location: `src/data/books.ts`

This file contains the structured overview of all 66 books of the Bible.

### How to Edit:

Each book has this structure:

```typescript
{
  id: 'unique-id',
  name: 'Book Name',
  order: 1,                      // Book number (1-66)
  testament: 'Old Testament',    // or 'New Testament'
  chapters: 50,                  // Total chapters
  author: 'Author Name',
  dateWritten: 'Approx. date',
  audience: 'Original audience',
  keyThemes: ['Theme 1', 'Theme 2', 'Theme 3'],
  purpose: 'Why this book was written',
  keyVerses: [
    {
      reference: 'Book 1:1',
      text: 'Verse text'
    }
  ],
  outline: [
    {
      section: 'Section Title',
      chapters: '1-11',
      summary: 'What happens in this section'
    }
  ]
}
```

#### To Update Book Information:

1. Find the book in the array (they're in biblical order)
2. Edit any field you need to update
3. Save the file

---

## 3. Editing Bible Versions Page

### Location: `src/pages/BibleVersions.tsx`

This page explains different Bible translations with interactive examples showing how Hebrew and Greek words were translated into English.

### How to Edit:

Find the `versions` array (around line 33). Each version has:

```typescript
{
  id: 'kjv',                        // Unique identifier
  name: 'King James Version',       // Full name
  abbreviation: 'KJV',              // Short version
  year: '1611',                     // Year published
  translatedBy: 'Who translated it',
  description: 'Brief overview...',
  philosophy: 'Translation approach...',
  colorClass: 'Tailwind gradient colors',
  borderClass: 'Tailwind border colors',
  textClass: 'Tailwind text colors',
  badgeClass: 'Tailwind badge colors',
  image: 'https://...',             // Ancient Bible/cross image
  examples: [
    // Translation examples (see below)
  ]
}
```

#### To Add a New Bible Version:

1. Choose unique colors for your version (avoid repeating existing colors)
2. Find an appropriate ancient Bible or cross image from Pexels
3. Add translation examples showing original Greek/Hebrew

```typescript
{
  id: 'msg',
  name: 'The Message',
  abbreviation: 'MSG',
  year: '2002',
  translatedBy: 'Eugene Peterson',
  description: 'A contemporary paraphrase...',
  philosophy: 'Paraphrase (meaning in modern language)',
  colorClass: 'from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30',
  borderClass: 'border-violet-200 dark:border-violet-700',
  textClass: 'text-violet-900 dark:text-violet-100',
  badgeClass: 'bg-violet-600 text-white',
  image: 'https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=1200',
  examples: [
    {
      original: 'ἀγάπη (agapē)',
      originalLanguage: 'Greek',
      meaning: 'Unconditional love...',
      translation: 'How MSG translates it with verse reference'
    }
    // Add 2-3 more examples
  ]
}
```

#### Adding Translation Examples:

Each version should have 3 examples showing:
- **original**: The Greek or Hebrew word (with transliteration)
- **originalLanguage**: Either "Greek" or "Hebrew"
- **meaning**: What the original word means
- **translation**: How this version translates it (include verse reference)

```typescript
{
  original: 'λόγος (logos)',
  originalLanguage: 'Greek',
  meaning: 'Word, reason, divine expression - God\'s complete revelation',
  translation: '"Word" (John 1:1) - "In the beginning was the Word"'
}
```

---

## 4. Editing Timeline

### Location: `src/data/timeline.ts`

This file contains the complete historical timeline showing the development from Creation through Judaism, Catholicism, Protestantism, to modern times. This timeline appears on the **Religions Page**.

### How to Edit:

The timeline has detailed editing instructions at the top of the file. Each event has:

```typescript
{
  id: 'event-1',                    // Unique ID
  year: '1054 AD',                  // Year or approximate date
  title: 'The Great Schism',        // Event name
  category: 'catholic',             // Category (see below)
  description: 'Brief description (1-2 sentences)',
  details: [
    'Bullet point 1',
    'Bullet point 2',
    'Add 3-5 details'
  ],
  relatedLinks: [                   // Optional
    { title: 'Learn More', url: 'https://example.com' }
  ]
}
```

#### Categories:
- **creation**: Creation to Abraham
- **jewish**: Jewish faith development (Abraham to Jesus)
- **catholic**: Early church and Catholic formation (Jesus to Great Schism)
- **protestant**: Protestant Reformation onwards
- **modern**: 20th century to present

#### To Add a New Timeline Event:

1. Copy an existing event as a template
2. Change the `id` to a unique value (e.g., 'event-27')
3. Update all fields with your event information
4. Choose the correct category
5. Add it to the `timelineEvents` array in chronological order

```typescript
{
  id: 'event-27',
  year: '1738 AD',
  title: 'Methodist Revival',
  category: 'protestant',
  description: 'John Wesley begins the Methodist movement emphasizing personal holiness.',
  details: [
    'Wesley experiences conversion at Aldersgate',
    'Emphasis on personal holiness and social reform',
    'Open-air preaching reaches common people',
    'Methodical approach to faith leads to name "Methodist"'
  ]
}
```

## 5. Editing Religions Page

### Location: `src/pages/Religions.tsx`

This page explains how different Christian denominations developed and displays the timeline.

### How to Edit:

1. **Main Content**: Edit the introduction text directly in the JSX
2. **Timeline**: The timeline is pulled from `src/data/timeline.ts` (see section 4 above)
3. **Key Differences Section**: Edit the Judaism, Catholicism, and Protestantism comparison sections

The timeline automatically displays all events from `timeline.ts` with interactive styling based on category.

---

## 6. Editing Stories Page

### Location: `src/data/stories.ts`

This file contains Bible stories organized by testament. Each story includes the narrative and key verses.

### How to Edit:

Find the `stories` array and add/edit stories:

```typescript
{
  id: 'unique-id',
  title: 'Story Title',
  testament: 'Old Testament',       // or 'New Testament'
  book: 'Book Name',
  chapter: 1,
  summary: 'Brief summary of the story',
  keyVerses: [
    {
      reference: 'Genesis 1:1',
      text: 'Full verse text here'
    }
  ],
  lessons: [
    'Lesson 1',
    'Lesson 2',
    'Lesson 3'
  ]
}
```

## 7. Editing FAQs Page

### Location: `src/pages/FAQs.tsx`

### How to Edit:

Find the `faqs` array and add/edit questions:

```typescript
{
  question: 'Your question here?',
  answer: 'Your detailed answer here. Can be multiple sentences.'
}
```

#### Example - Adding a New FAQ:

```typescript
{
  question: 'How do I pray effectively?',
  answer: 'Effective prayer involves speaking to God honestly, listening for His guidance through Scripture, and praying according to His will. Start with thanksgiving, confess your sins, bring your requests, and pray for others.'
}
```

---

## 8. Editing Header & Logo

### Location: `src/App.tsx`

### To Change the Logo:

Find this line (around line 32):

```typescript
src="https://images.pexels.com/photos/6120234/pexels-photo-6120234.jpeg?..."
```

Replace the URL with your new logo image URL.

### To Change the Site Title:

Find this line (around line 38):

```typescript
<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Discipled Co.</h1>
```

Replace "Discipled Co." with your new title.

### To Change the Subtitle:

Find this line (around line 39):

```typescript
<p className="text-gray-600 dark:text-gray-300 text-xs">Biblical Guidance & Study</p>
```

Replace the text with your new subtitle.

---

## 9. Editing Footer & Social Links

### Location: `src/components/Footer.tsx`

### To Change Social Media Links:

Find these sections (around lines 52-80):

```typescript
href="https://facebook.com"        // Change to your Facebook page
href="https://instagram.com"       // Change to your Instagram
href="https://tiktok.com"         // Change to your TikTok
```

### To Edit Footer Links:

Find the `footerLinks` array (around line 6) and edit the links:

```typescript
{
  to: '/your-page',
  icon: IconName,
  title: 'Link Title',
  description: 'Link description'
}
```

### To Change Copyright Text:

Find this line (around line 82):

```typescript
© 2026 Discipled Co. | Clear, structured overviews...
```

---

## 10. Adding New Pages

### Step 1: Create a New Page File

Create a new file in `src/pages/` (e.g., `src/pages/YourPage.tsx`):

```typescript
export function YourPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Your Page Title
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <p className="text-gray-700 dark:text-gray-300">
          Your content here...
        </p>
      </div>
    </main>
  );
}
```

### Step 2: Add Route in App.tsx

In `src/App.tsx`, add:

1. Import at the top:
```typescript
import { YourPage } from './pages/YourPage';
```

2. Add route in the `<Routes>` section:
```typescript
<Route path="/your-page" element={<YourPage />} />
```

### Step 3: Add Link in Footer (Optional)

In `src/components/Footer.tsx`, add to `footerLinks` array:

```typescript
{
  to: '/your-page',
  icon: BookOpen,  // Choose any icon from lucide-react
  title: 'Your Page',
  description: 'Description of your page'
}
```

---

## 11. Managing the Music Jukebox

### Location: `src/pages/Music.tsx`

The Music page is a fully functional jukebox for uploading and playing MP3 files. All music files are stored in Supabase Storage and track information is stored in the database.

### How to Upload Music:

1. Navigate to the Music page at `/music`
2. Click the "Upload Songs" button in the top-right corner
3. Select one or more MP3 files from your computer
4. The files will upload automatically and appear in the playlist

### Features:

- **Upload**: Add multiple MP3 files at once
- **Playlist**: See all uploaded songs with title, artist, duration, and play count
- **Player Controls**: Play, pause, skip forward/backward, adjust volume
- **Progress Bar**: See and control playback position
- **Delete**: Remove songs you no longer want (trash icon on each track)
- **Auto-play Next**: Automatically plays the next song when current one ends

### Editing Song Information:

Song information is stored in the Supabase database. To manually edit:

1. The title is automatically extracted from the filename (without extension)
2. Artist defaults to "Unknown Artist"
3. Duration is automatically detected from the audio file
4. Play count increases each time a song is played

### Technical Details:

- **Database Table**: `music_tracks` stores all song metadata
- **Storage Bucket**: `music` bucket stores the actual MP3 files
- **Supported Formats**: MP3, WAV, OGG, and other browser-supported audio formats
- **Public Access**: All uploaded music is publicly accessible (no authentication required)

### To Restrict Upload Access:

If you want to limit who can upload music, edit the database policies in Supabase:

1. Go to your Supabase dashboard
2. Navigate to Authentication & Policies
3. Edit the "Anyone can upload music tracks" policy to require authentication

---

## 12. Managing the Book Library

### Overview

The Book Library system allows you to create beautiful, interactive books with realistic page-turning animations. Books are stored in the Supabase database with their pages.

### Quick Start - Adding a New Book

1. **Insert the book record:**
```sql
INSERT INTO books (title, author, description, category, order_index, total_pages, cover_image_url)
VALUES (
  'Your Book Title',
  'Author Name',
  'A brief description of what this book is about.',
  'Study Guide',
  1,
  10,
  'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800'
)
RETURNING id;
```

2. **Copy the returned book ID and add pages:**
```sql
INSERT INTO book_pages (book_id, page_number, content) VALUES
('YOUR_BOOK_ID_HERE', 1, 'First page content here...'),
('YOUR_BOOK_ID_HERE', 2, 'Second page content here...'),
('YOUR_BOOK_ID_HERE', 3, 'Third page content here...');
```

### Editing Existing Books

**Update book details:**
```sql
UPDATE books
SET title = 'New Title',
    author = 'New Author',
    description = 'New description'
WHERE id = 'YOUR_BOOK_ID';
```

**Update a specific page:**
```sql
UPDATE book_pages
SET content = 'Updated content here...'
WHERE book_id = 'YOUR_BOOK_ID' AND page_number = 1;
```

**Delete a book (and all its pages):**
```sql
DELETE FROM books WHERE id = 'YOUR_BOOK_ID';
```

### Tips for Great Book Content

- **Page Length**: Keep content to 200-300 words per page for best readability
- **No Scrolling**: Content automatically fits the page without scrolling
- **Line Breaks**: Use natural line breaks - they'll display correctly
- **Page Numbers**: Start from 1 and increment sequentially
- **Categories**: Use categories like "Study Guide", "Devotional", "Old Testament", "New Testament"

### Interactive Features

The book reader includes:
- **Page Turning**: Smooth animations when clicking next/previous
- **Drag to Turn**: Grab the bottom-right corner of the right page and drag left to turn pages
- **Dark Mode**: Full dark mode support
- **Category Filtering**: Filter books by category on the library page

### Finding Book IDs

```sql
SELECT id, title, author FROM books ORDER BY order_index;
```

### Database Tables

**books table:**
- `id` - Unique identifier (UUID)
- `title` - Book title
- `author` - Author name
- `description` - Brief description
- `cover_image_url` - Cover image URL (optional)
- `total_pages` - Total number of pages
- `category` - Category for filtering
- `order_index` - Display order (lower numbers first)
- `created_at` - Creation timestamp

**book_pages table:**
- `id` - Unique identifier (UUID)
- `book_id` - References the parent book
- `page_number` - Page number (1, 2, 3, etc.)
- `content` - The actual page content
- `created_at` - Creation timestamp

---

## Quick Reference: File Locations

| What to Edit | File Location |
|-------------|---------------|
| Biblical Topics & Verses | `src/data/topics.ts` |
| Books of the Bible | `src/data/books.ts` |
| Bible Versions & Translations | `src/pages/BibleVersions.tsx` |
| Historical Timeline Events | `src/data/timeline.ts` |
| Religions Page Content | `src/pages/Religions.tsx` |
| Bible Stories | `src/data/stories.ts` |
| FAQs | `src/pages/FAQs.tsx` |
| Header & Logo | `src/App.tsx` |
| Footer & Social Links | `src/components/Footer.tsx` |
| Home Page | `src/pages/Home.tsx` |
| Topics Page | `src/pages/Topics.tsx` |
| Music Jukebox | `src/pages/Music.tsx` |

---

## Need Help?

- All text content uses **Tailwind CSS** for styling
- Color scheme: Blue theme with dark mode support
- Icons: Using **lucide-react** library
- Always test your changes by running: `npm run dev`
- Build for production: `npm run build`

---

**Remember**: After making any changes, save the file and the website will automatically refresh if you're running the development server!
