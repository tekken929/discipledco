# Bible Book Images Guide

Each of the 66 Bible books can show a custom image on its detail page. The image appears between the book stats and the Overview section.

---

## How to Add or Change an Image

### Option A — Use a local image file (recommended)

1. Place your image in the folder: `public/images/bible-books/`
2. Name the file using the book's ID (see the full list below), e.g. `genesis.jpg` or `matthew.png`
3. Open `src/data/books.ts`, find the book entry, and add or update the `imageUrl` field:

```typescript
{
  id: 'genesis',
  name: 'Genesis',
  // ... other fields ...
  imageUrl: '/images/bible-books/genesis.jpg',
}
```

### Option B — Use an external image URL

```typescript
{
  id: 'exodus',
  name: 'Exodus',
  // ... other fields ...
  imageUrl: 'https://images.pexels.com/photos/123456/photo.jpeg',
}
```

### To remove an image

Delete the `imageUrl` line from the book entry. The page will simply show no image.

---

## Image Specs

| Setting | Recommendation |
|---|---|
| Format | JPG or PNG |
| Dimensions | 800 x 600 px (landscape) |
| File size | Under 500 KB |
| Good subjects | Ancient manuscripts, papyrus, biblical sites, Hebrew/Greek text |

The image displays at up to 448 px wide, centered, with rounded corners. It scales automatically.

---

## All 66 Book IDs

Use these exact IDs when naming your image files.

### Old Testament (39 books)

| ID | Book |
|---|---|
| genesis | Genesis |
| exodus | Exodus |
| leviticus | Leviticus |
| numbers | Numbers |
| deuteronomy | Deuteronomy |
| joshua | Joshua |
| judges | Judges |
| ruth | Ruth |
| 1samuel | 1 Samuel |
| 2samuel | 2 Samuel |
| 1kings | 1 Kings |
| 2kings | 2 Kings |
| 1chronicles | 1 Chronicles |
| 2chronicles | 2 Chronicles |
| ezra | Ezra |
| nehemiah | Nehemiah |
| esther | Esther |
| job | Job |
| psalms | Psalms |
| proverbs | Proverbs |
| ecclesiastes | Ecclesiastes |
| songofsolomon | Song of Solomon |
| isaiah | Isaiah |
| jeremiah | Jeremiah |
| lamentations | Lamentations |
| ezekiel | Ezekiel |
| daniel | Daniel |
| hosea | Hosea |
| joel | Joel |
| amos | Amos |
| obadiah | Obadiah |
| jonah | Jonah |
| micah | Micah |
| nahum | Nahum |
| habakkuk | Habakkuk |
| zephaniah | Zephaniah |
| haggai | Haggai |
| zechariah | Zechariah |
| malachi | Malachi |

### New Testament (27 books)

| ID | Book |
|---|---|
| matthew | Matthew |
| mark | Mark |
| luke | Luke |
| john | John |
| acts | Acts |
| romans | Romans |
| 1corinthians | 1 Corinthians |
| 2corinthians | 2 Corinthians |
| galatians | Galatians |
| ephesians | Ephesians |
| philippians | Philippians |
| colossians | Colossians |
| 1thessalonians | 1 Thessalonians |
| 2thessalonians | 2 Thessalonians |
| 1timothy | 1 Timothy |
| 2timothy | 2 Timothy |
| titus | Titus |
| philemon | Philemon |
| hebrews | Hebrews |
| james | James |
| 1peter | 1 Peter |
| 2peter | 2 Peter |
| 1john | 1 John |
| 2john | 2 John |
| 3john | 3 John |
| jude | Jude |
| revelation | Revelation |

---

## Books That Already Have Images

These books currently have placeholder images set:

- Genesis, Exodus, Psalms, Proverbs — ancient manuscript photos
- Matthew, John, Romans — New Testament manuscript photos

---

## Good Free Image Sources

- **Pexels** — pexels.com (search "ancient manuscript", "papyrus", "Hebrew scroll")
- **Unsplash** — unsplash.com
- **Pixabay** — pixabay.com

Avoid images with watermarks or unclear copyright status.

---

## Troubleshooting

**Image not showing?**
1. Double-check the file path — it must start with `/images/bible-books/`
2. Make sure the file actually exists in `public/images/bible-books/`
3. Clear your browser cache and refresh

**Image looks stretched?**
- Use a landscape image (wider than tall). 4:3 or 16:9 ratios work best.

**Build fails after adding image?**
- Check that `imageUrl` is marked as optional (`imageUrl?: string`) in the type definition at `src/types/book.ts`
