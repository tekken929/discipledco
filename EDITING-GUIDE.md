# Website Editing Guide - Discipled Co.

This guide will help you easily edit content across the Discipled Co. website. Each section explains which files to modify for different types of content.

---

## Table of Contents

1. [Editing Biblical Topics](#editing-biblical-topics)
2. [Editing Books of the Bible](#editing-books-of-the-bible)
3. [Editing Bible Versions Page](#editing-bible-versions-page)
4. [Editing Religions Page](#editing-religions-page)
5. [Editing FAQs Page](#editing-faqs-page)
6. [Editing Header & Logo](#editing-header--logo)
7. [Editing Footer & Social Links](#editing-footer--social-links)
8. [Adding New Pages](#adding-new-pages)

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

This page explains different Bible translations.

### How to Edit:

Look for the `versions` array around line 6. Each version has:

```typescript
{
  name: 'Version Name',
  abbreviation: 'ESV',
  description: 'Full description of this translation',
  strengths: ['Strength 1', 'Strength 2'],
  bestFor: 'Who this version is best for'
}
```

#### To Add a New Version:

Add a new object to the `versions` array:

```typescript
{
  name: 'New International Version',
  abbreviation: 'NIV',
  description: 'A modern, readable translation...',
  strengths: [
    'Easy to read',
    'Widely used',
    'Good for new believers'
  ],
  bestFor: 'New Christians and casual reading'
}
```

---

## 4. Editing Religions Page

### Location: `src/pages/Religions.tsx`

This page explains how different Christian denominations developed.

### How to Edit:

1. **Main Content**: Edit the text and paragraphs directly in the JSX (look for the `<div>` sections)
2. **Timeline Items**: Find the `timelineItems` array to add/edit historical events
3. **Denominations**: Find the `denominations` array to add/edit denomination information

#### Example - Adding a Timeline Event:

```typescript
{
  year: '1517',
  event: 'Event Name',
  description: 'What happened and why it matters'
}
```

---

## 5. Editing FAQs Page

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

## 6. Editing Header & Logo

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

## 7. Editing Footer & Social Links

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

## 8. Adding New Pages

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

## Quick Reference: File Locations

| What to Edit | File Location |
|-------------|---------------|
| Biblical Topics & Verses | `src/data/topics.ts` |
| Books of the Bible | `src/data/books.ts` |
| Bible Versions | `src/pages/BibleVersions.tsx` |
| Religions History | `src/pages/Religions.tsx` |
| FAQs | `src/pages/FAQs.tsx` |
| Header & Logo | `src/App.tsx` |
| Footer & Social Links | `src/components/Footer.tsx` |
| Home Page | `src/pages/Home.tsx` |
| Topics Page | `src/pages/Topics.tsx` |

---

## Need Help?

- All text content uses **Tailwind CSS** for styling
- Color scheme: Blue theme with dark mode support
- Icons: Using **lucide-react** library
- Always test your changes by running: `npm run dev`
- Build for production: `npm run build`

---

**Remember**: After making any changes, save the file and the website will automatically refresh if you're running the development server!
