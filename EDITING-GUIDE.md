# Website Editing Guide — Discipled Co.

A plain-English guide to editing content across the site. No coding experience needed for most tasks.

---

## Quick Reference

| What you want to change | File to open |
|---|---|
| Biblical topics & verses | `src/data/topics.ts` |
| Books of the Bible (overview info) | `src/data/books.ts` |
| Bible translations page | `src/pages/BibleVersions.tsx` |
| Historical timeline | `src/data/timeline.ts` |
| Religions page | `src/pages/Religions.tsx` |
| Bible stories | `src/data/stories.ts` |
| FAQs | `src/pages/FAQs.tsx` |
| Site header & logo | `src/App.tsx` |
| Footer & social media links | `src/components/Footer.tsx` |
| Home page | `src/pages/Home.tsx` |
| Music jukebox | `src/pages/Music.tsx` |
| Book library | Supabase database (see Books guide) |

---

## 1. Biblical Topics

**File:** `src/data/topics.ts`

This file holds all the topical Scripture sections (Marriage, Sin, Hope, etc.).

### Add a new topic

Copy this block and fill in the blanks:

```typescript
{
  id: 'hope',                          // URL slug — lowercase, no spaces
  title: 'Hope in Christ',             // Displayed title
  description: 'Short description',
  icon: '🌟',                          // Any emoji
  references: [
    {
      book: 'Romans',
      chapter: 15,
      verse: '13',
      text: 'May the God of hope fill you with all joy and peace...'
    },
    // Add at least 9 more references
  ]
}
```

Add it inside the main array in `topics.ts`, then save.

---

## 2. Books of the Bible

**File:** `src/data/books.ts`

Each of the 66 books has an entry like this:

```typescript
{
  id: 'genesis',
  name: 'Genesis',
  order: 1,
  testament: 'Old Testament',
  chapters: 50,
  author: 'Moses',
  dateWritten: 'c. 1446–1406 BC',
  audience: 'The nation of Israel',
  keyThemes: ['Creation', 'Fall', 'Promise'],
  purpose: 'Why this book was written...',
  keyVerses: [
    { reference: 'Genesis 1:1', text: 'In the beginning God created...' }
  ],
  outline: [
    { section: 'Creation', chapters: '1-2', summary: 'God creates the world.' }
  ]
}
```

Find the book you want, edit the field, and save. Books are listed in biblical order.

---

## 3. Bible Versions Page

**File:** `src/pages/BibleVersions.tsx`

Find the `versions` array (around line 33). Each version looks like:

```typescript
{
  id: 'kjv',
  name: 'King James Version',
  abbreviation: 'KJV',
  year: '1611',
  translatedBy: 'Translator name(s)',
  description: 'Overview of this translation...',
  philosophy: 'Word-for-word / Thought-for-thought / Paraphrase',
  examples: [
    {
      original: 'ἀγάπη (agapē)',
      originalLanguage: 'Greek',
      meaning: 'Unconditional divine love',
      translation: '"Love" (1 Cor 13:4) — "Love is patient, love is kind..."'
    }
  ]
}
```

To add a new version, copy an existing block, change all the fields, and add it to the array.

---

## 4. Historical Timeline

**File:** `src/data/timeline.ts`

Each event looks like:

```typescript
{
  id: 'event-27',
  year: '1738 AD',
  title: 'Methodist Revival',
  category: 'protestant',           // creation | jewish | catholic | protestant | modern
  description: '1–2 sentence summary',
  details: [
    'Wesley experiences conversion at Aldersgate',
    'Open-air preaching reaches common people',
    'Methodical approach to faith coins the name "Methodist"'
  ]
}
```

Add events in chronological order. Categories control the colour and filter on the Religions page.

**Available categories:**
- `creation` — Creation to Abraham
- `jewish` — Abraham to Jesus
- `catholic` — Early church through the Great Schism
- `protestant` — Reformation and beyond
- `modern` — 20th century to present

---

## 5. Bible Stories

**File:** `src/data/stories.ts`

Add or edit stories using this format:

```typescript
{
  id: 'david-goliath',
  title: 'David and Goliath',
  testament: 'Old Testament',
  book: '1 Samuel',
  chapter: 17,
  summary: 'A young shepherd defeats a giant warrior through faith in God.',
  keyVerses: [
    {
      reference: '1 Samuel 17:45',
      text: 'You come to me with sword and spear...'
    }
  ],
  lessons: [
    'Faith overcomes impossible odds',
    'God uses the humble',
    'Courage comes from trusting God'
  ]
}
```

---

## 6. FAQs

**File:** `src/pages/FAQs.tsx`

Find the `faqs` array and add entries:

```typescript
{
  question: 'How do I pray effectively?',
  answer: 'Start with thanksgiving, confess your sins, bring your requests, and pray for others. Speak honestly to God and listen through Scripture.'
}
```

---

## 7. Site Header & Logo

**File:** `src/App.tsx`

- **Logo image** — find the `<img src="...">` tag near the top of the `return` block and replace the URL
- **Site name** — find `Discipled Co.` inside an `<h1>` tag and change the text
- **Subtitle** — find `Biblical Guidance & Study` inside a `<p>` tag and change the text

---

## 8. Footer & Social Links

**File:** `src/components/Footer.tsx`

**Social media links** — find these around lines 52–80:
```typescript
href="https://facebook.com"     // Your Facebook page
href="https://instagram.com"    // Your Instagram
href="https://tiktok.com"       // Your TikTok
```

**Footer nav links** — find the `footerLinks` array:
```typescript
{
  to: '/your-page',
  icon: BookOpen,
  title: 'Link Title',
  description: 'Short description'
}
```

**Copyright line** — search for `© 2026 Discipled Co.` and edit it.

---

## 9. Home Page

**File:** `src/pages/Home.tsx`

Key sections and where to find them:

| Section | What to look for in the file |
|---|---|
| Main headline | `<h2>` with "Most people open the Bible..." |
| Intro paragraph | `<p>` below that `<h2>` |
| Three action cards | `<button>` or `<Link>` blocks with `<h3>` titles |
| Bible Overview heading | `<h1>Bible Overview</h1>` |
| OT & NT description paragraphs | Two `<p>` tags below that heading |
| "Go Deeper" section | `{/* Go Deeper bridge */}` comment |

Edit text directly inside the JSX tags.

---

## 10. Music Jukebox

**File:** `src/pages/Music.tsx`

Music is managed through the Admin Portal at the top right of the Music page.

- Upload MP3s via the portal (password required — see `ADMIN-PASSWORDS.md`)
- Title is taken from the filename automatically
- Delete songs using the trash icon in the playlist

All files are stored in Supabase Storage. No code changes needed for day-to-day music management.

---

## 11. Adding a Brand New Page

### Step 1 — Create the page file

Create `src/pages/YourPage.tsx`:

```typescript
export function YourPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Page Title
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <p className="text-gray-700 dark:text-gray-300">Content here...</p>
      </div>
    </main>
  );
}
```

### Step 2 — Register the route

In `src/App.tsx`, add at the top:
```typescript
import { YourPage } from './pages/YourPage';
```

Then inside the `<Routes>` block:
```typescript
<Route path="/your-page" element={<YourPage />} />
```

### Step 3 — Add a footer link (optional)

In `src/components/Footer.tsx`, add to `footerLinks`:
```typescript
{
  to: '/your-page',
  icon: BookOpen,
  title: 'Your Page',
  description: 'Short description'
}
```

---

## Tips

- Save any file and the browser will reload automatically (if dev server is running)
- All styling uses **Tailwind CSS** classes
- Icons come from the **lucide-react** library
- The site supports dark mode — changes show in both modes
- For admin passwords and access details, see `ADMIN-PASSWORDS.md`
