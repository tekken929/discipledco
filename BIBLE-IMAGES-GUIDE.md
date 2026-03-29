# Bible Book Images Guide

## Overview

Each of the 66 Bible books can display a custom image on its detail page. The image appears between the book statistics and the Overview section, providing visual context for the book.

## How It Works

Images are defined in the `src/data/books.ts` file using the `imageUrl` property for each book. Currently, several books have placeholder images from stock photo sites showing ancient manuscripts and papyrus.

## Adding or Replacing Images

### Method 1: Using Local Images (Recommended)

1. **Add your image file** to the `public/images/bible-books/` folder
2. **Name the file** using the book ID (e.g., `genesis.jpg`, `exodus.png`, `matthew.jpg`)
3. **Update the book entry** in `src/data/books.ts`:

```typescript
{
  id: 'genesis',
  name: 'Genesis',
  // ... other properties ...
  imageUrl: '/images/bible-books/genesis.jpg',
  structure: [...]
}
```

### Method 2: Using External URLs

You can also use URLs from external sources:

```typescript
{
  id: 'exodus',
  name: 'Exodus',
  // ... other properties ...
  imageUrl: 'https://example.com/path/to/exodus-image.jpg',
  structure: [...]
}
```

## Image Specifications

**Recommended:**
- **Format**: JPG or PNG
- **Dimensions**: 800x600 pixels (4:3 ratio) or similar landscape orientation
- **File Size**: Keep under 500KB for optimal loading
- **Content**: Ancient manuscripts, papyrus scrolls, Hebrew/Greek text, thematic imagery

**The image will:**
- Display at a maximum width of 28rem (448px)
- Automatically scale to fit while maintaining aspect ratio
- Have rounded corners and a subtle border
- Be centered on the page

## Currently Available Books with Images

The following books already have placeholder images:

1. **Genesis** - Ancient manuscript
2. **Exodus** - Biblical text
3. **Psalms** - Hebrew scroll
4. **Proverbs** - Ancient wisdom text
5. **Matthew** - Gospel manuscript
6. **John** - New Testament text
7. **Romans** - Epistle manuscript

## Book IDs Reference

For your convenience, here are all 66 book IDs (use these when naming image files):

### Old Testament (39 books)
- genesis, exodus, leviticus, numbers, deuteronomy
- joshua, judges, ruth, 1samuel, 2samuel
- 1kings, 2kings, 1chronicles, 2chronicles
- ezra, nehemiah, esther
- job, psalms, proverbs, ecclesiastes, songofsolomon
- isaiah, jeremiah, lamentations, ezekiel, daniel
- hosea, joel, amos, obadiah, jonah, micah
- nahum, habakkuk, zephaniah, haggai, zechariah, malachi

### New Testament (27 books)
- matthew, mark, luke, john
- acts
- romans, 1corinthians, 2corinthians, galatians, ephesians
- philippians, colossians, 1thessalonians, 2thessalonians
- 1timothy, 2timothy, titus, philemon
- hebrews, james, 1peter, 2peter
- 1john, 2john, 3john, jude
- revelation

## Tips for Finding Images

**Good sources for Bible-related imagery:**
- Ancient manuscript photos (papyrus, parchment)
- Hebrew or Greek text close-ups
- Historical biblical sites
- Thematic imagery (burning bush for Exodus, shepherd for Psalms, etc.)
- Stock photo sites: Pexels, Unsplash, Pixabay

**Avoid:**
- Modern artistic interpretations (unless specifically desired)
- Copyrighted artwork without permission
- Low-resolution or pixelated images
- Images with watermarks

## Example: Adding Image to a New Book

```typescript
{
  id: 'revelation',
  name: 'Revelation',
  order: 66,
  chapters: 22,
  type: 'Apocalyptic',
  overview: ['...'],
  written: 'c. 90-95 AD',
  timePeriod: '90-95 AD',
  author: 'John',
  testament: 'New Testament' as const,
  authorDescription: "...",
  bibleVersion: 'NIV',
  imageUrl: '/images/bible-books/revelation.jpg', // Add this line
  structure: [...]
}
```

## Troubleshooting

**Image not showing:**
1. Check the file path is correct
2. Verify the image file exists in `public/images/bible-books/`
3. Clear browser cache and refresh
4. Check browser console for errors

**Image looks stretched or distorted:**
- Use a proper aspect ratio (4:3 or 16:9 recommended)
- Ensure minimum dimensions are at least 800px wide

**Build fails after adding image:**
- If using TypeScript, ensure the `imageUrl` property is marked as optional in the type definition
- Check for syntax errors in `books.ts`
