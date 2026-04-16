# The Disciple Co. — Mobile App Blueprint

## Overview

**App Name:** The Disciple Co.
**Platform:** React Native (iOS + Android)
**Backend:** Supabase (existing, shared with web)
**Tagline:** "Not religion for the sake of religion. Not arguments for the sake of winning. Just a path toward truth."

---

## Tech Stack (Mobile)

| Layer | Technology |
|---|---|
| Framework | React Native (Expo SDK 52+) |
| Language | TypeScript |
| Navigation | React Navigation v6 (Stack + Bottom Tabs) |
| Styling | NativeWind (Tailwind for React Native) or StyleSheet |
| State | React Context + useState/useEffect |
| Backend | Supabase (@supabase/supabase-js) |
| Audio | Expo AV (`expo-av`) |
| Storage | AsyncStorage (`@react-native-async-storage/async-storage`) |
| Icons | `@expo/vector-icons` (MaterialIcons / Feather) |
| Fonts | Expo Google Fonts (Inter) |
| Video | `expo-video` or `react-native-webview` (for embedded sermons) |

---

## Environment Variables

Copy from the web project `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=<from .env VITE_SUPABASE_URL>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<from .env VITE_SUPABASE_ANON_KEY>
```

---

## Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

---

## Database Tables (Existing Supabase)

### `music_tracks`
```sql
id           uuid PRIMARY KEY
title        text NOT NULL
artist       text
file_path    text
file_url     text           -- direct playable URL
duration     integer        -- seconds
play_count   integer DEFAULT 0
category     text           -- 'Heavy Metal' | 'House' | 'Calm' | 'Worship'
uploaded_at  timestamptz DEFAULT now()
```

### `hallowed_tracks`
```sql
id           uuid PRIMARY KEY
title        text NOT NULL
artist       text
file_url     text
duration     integer
uploaded_at  timestamptz DEFAULT now()
```

### `books`
```sql
id               uuid PRIMARY KEY
title            text NOT NULL
author           text
description      text
cover_image_url  text
total_pages      integer
category         text
order_index      integer
```

---

## App Architecture

```
app/
  _layout.tsx              ← Root layout, providers
  (tabs)/
    _layout.tsx            ← Bottom tab navigator
    index.tsx              ← Home / Welcome screen
    bible.tsx              ← Bible browser (66 books)
    music.tsx              ← Music Jukebox
    more.tsx               ← All other sections

screens/
  BibleVersions.tsx
  BibleLookup.tsx
  Courses.tsx
  CourseModule.tsx
  Topics.tsx
  TopicDetail.tsx
  Stories.tsx
  StoryDetail.tsx
  Timeline.tsx
  Religions.tsx
  Resurrection.tsx
  Easter.tsx
  ChristianHolidays.tsx
  Books.tsx
  BookReader.tsx
  Preaching.tsx
  Podcasts.tsx
  ChurchMentors.tsx
  FAQs.tsx
  Guidance.tsx
  Hallowed.tsx
  BibleAuthors.tsx

components/
  BookCard.tsx
  BookDisplay.tsx          ← Bible book detail (expanded info)
  MusicPlayer.tsx          ← Full music player UI
  MiniMusicPlayer.tsx      ← Persistent bottom mini-player
  TopicCard.tsx
  StoryCard.tsx
  TimelineItem.tsx
  DenominationTree.tsx
  BibleVersePopup.tsx
  CourseCard.tsx
  Modal.tsx

context/
  DarkModeContext.tsx      ← Dark mode + theme (AsyncStorage)
  MusicPlayerContext.tsx   ← Global music state
  OnboardingContext.tsx

data/
  books.ts                 ← All 66 Bible books (copy from web)
  topics.ts                ← Theological topics (copy from web)
  stories.ts               ← Bible stories (copy from web)
  timeline.ts              ← Historical timeline (copy from web)
  courseData.ts            ← Foundation course modules (copy from web)
  gospelEvents.ts          ← Gospel / resurrection events (copy from web)

lib/
  supabase.ts

types/
  book.ts
  topic.ts
  story.ts
  timeline.ts
```

---

## Bottom Tab Navigator

```
Tab 1: Home       → icon: home
Tab 2: Bible      → icon: book-open
Tab 3: Music      → icon: music
Tab 4: More       → icon: grid (opens a list of all other sections)
```

---

## Screen Inventory

### Tab: Home (Welcome)
**Route:** `/`
**Source:** `src/pages/Welcome.tsx`

Sections to build:
1. Hero — App name, tagline, cross image (`/public/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png`)
2. Featured quick-access cards (6 cards, see list below)
3. Core Beliefs section (Sola Scriptura, Trinity, Jesus is the way, Revealed Truth)
4. Historical Timeline preview (last 3 events from `timeline.ts`)
5. Bible Roadmap CTA button → opens modal

Featured cards:
```typescript
[
  { route: 'Religions', title: 'What is Religion', color: 'red' },
  { route: 'BibleVersions', title: 'Which Bible Version Should I Use?', color: 'amber' },
  { route: 'BibleLookup', title: 'Lookup Any Verse', color: 'teal' },
  { route: 'Preaching', title: 'Wisdom', color: 'green' },
  { route: 'Music', title: 'Music Jukebox', color: 'slate' },
  { route: 'ChristianHolidays', title: 'Holiday Origins', color: 'orange' },
]
```

---

### Tab: Bible
**Source:** `src/pages/Home.tsx` + `src/components/BookDisplay.tsx`

- Horizontal book-type filter tabs: `All | Law | History | Poetry | Prophecy | Gospels | Letters | Apocalyptic`
- Scrollable list of all 66 Bible books (from `data/books.ts`)
- Tap book → `BookDetail` screen showing:
  - Book image (Pexels URL from book data)
  - Testament badge (Old / New)
  - Author, date written, chapters count
  - Overview paragraphs
  - Expandable "Structure" sections with key verses
  - "Read Key Verses" button

Bible sub-screens (accessible from More or Bible screen):
- **Tour the Bible** — 66-book list (main Bible tab)
- **Bible Roadmap** — Reading order guide (bottom sheet or modal)
- **Foundation Course** → `Courses` screen
- **Lookup Any Verse** → `BibleLookup` screen
- **Bible Versions** → `BibleVersions` screen

---

### Tab: Music
**Source:** `src/pages/Music.tsx`

```typescript
// Fetch from Supabase
const { data: tracks } = await supabase
  .from('music_tracks')
  .select('*')
  .order('uploaded_at', { ascending: false });
```

UI elements:
- Category filter pills: `All | Heavy Metal | House | Calm | Worship`
- Track list with: title, artist, duration, play count
- Active track highlighted
- Full-screen player overlay (on tap):
  - Album art placeholder
  - Title + artist
  - Seek bar (Slider)
  - Play/Pause, Previous, Next buttons
  - Volume slider
  - Play count display

Audio implementation using `expo-av`:
```typescript
import { Audio } from 'expo-av';

const sound = new Audio.Sound();
await sound.loadAsync({ uri: track.file_url });
await sound.playAsync();
```

Persist current track across screens via `MusicPlayerContext`.

---

### Tab: More
A scrollable list of all remaining sections grouped by category:

```
BIBLE
  - Foundation Course
  - Lookup Any Verse
  - Bible Versions
  - Bible Authors & Evidence

RELIGION
  - What is Religion
  - Everyday Topics
  - Popular Stories
  - Podcasts
  - Wisdom (Preaching)

INFORMATION
  - Historical Timeline
  - Holiday Origins
  - Easter
  - The Resurrection
  - Books Library
  - Church Mentors
  - FAQs
  - Spiritual Guidance

MUSIC
  - Hallowed Band
```

---

### Screen: BibleLookup
**Source:** `src/pages/BibleLookup.tsx`

- Dropdown (Picker): select book (from `data/books.ts` - 66 books)
- Dropdown (Picker): select chapter (1 to book.chapters)
- Fetch button → calls Supabase Edge Function `fetch-verses`
- Display verses in a scrollable list

Edge function call:
```typescript
const response = await fetch(
  `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/fetch-verses`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book: selectedBook, chapter: selectedChapter }),
  }
);
```

Quick access passages (chips): Genesis 1, John 3:16, Romans 8, Psalms 23

---

### Screen: Topics
**Source:** `src/pages/Topics.tsx`
**Data:** `src/data/topics.ts`

- Grid of topic cards (title, description, icon)
- Tap → `TopicDetail` screen
  - Full title + description
  - Expanded content
  - Scripture references with verse text + context

---

### Screen: Stories
**Source:** `src/pages/Stories.tsx`
**Data:** `src/data/stories.ts`

- List of Bible stories (title, icon, short summary)
- Tap → `StoryDetail` screen
  - Full summary
  - Scripture references list
  - Each verse: book, chapter, verse, text

---

### Screen: Timeline
**Source:** `src/pages/Timeline.tsx`
**Data:** `src/data/timeline.ts`

Color-coded events by category:
```typescript
const categoryColors = {
  creation:  '#f59e0b',  // amber
  jewish:    '#3b82f6',  // blue
  catholic:  '#ef4444',  // red
  protestant:'#22c55e',  // green
  modern:    '#14b8a6',  // teal
};
```

- Category filter pills
- Vertical scrollable list of events
- Each event: year badge, title, description
- Tap → expands with bullet points + Bible references

---

### Screen: Courses
**Source:** `src/pages/Courses.tsx`
**Data:** `src/data/courseData.ts`

- Overview header: "Foundation Course — 8 Modules"
- Progress indicator (stored in AsyncStorage)
- List of 8 module cards
- Tap → `CourseModule` screen
  - Module title, learning objectives
  - Section-by-section content
  - Scripture references throughout

---

### Screen: Religions
**Source:** `src/pages/Religions.tsx`

- Hero explaining Christianity's origins
- The Great Schism (1054) — East/West split
- The Protestant Reformation (1517)
- Denomination tree visualization:
  - Roman Catholic
  - Eastern Orthodox
  - Protestant branches: Lutheran, Reformed, Anglican, Baptist, Methodist, Pentecostal

---

### Screen: Resurrection
**Source:** `src/pages/Resurrection.tsx`
**CSS:** Custom cinematic dark styling

- Evidence-focused layout, dark background
- P52 manuscript image (`/public/images/p52.jpg`)
- Sections: Manuscript Evidence, Historical Documentation, Eyewitness Accounts
- Timeline of resurrection appearances
- Uses `data/gospelEvents.ts` for gospel event data

---

### Screen: Easter
**Source:** `src/pages/Easter.tsx`

- Easter season timeline:
  - Lent (40 days)
  - Ash Wednesday
  - Holy Week
  - Palm Sunday
  - Maundy Thursday
  - Good Friday
  - Easter Sunday
- Each section: expandable with scripture + significance

---

### Screen: ChristianHolidays
**Source:** `src/pages/ChristianHolidays.tsx`

- Cards for each major holiday: Christmas, Easter, Epiphany, Pentecost, Advent, etc.
- Each: name, date/period, meaning, biblical basis

---

### Screen: BibleVersions
**Source:** `src/pages/BibleVersions.tsx`

- Translation philosophy categories:
  - Word-for-word (formal equivalence): ESV, NASB, KJV
  - Thought-for-thought (dynamic equivalence): NIV, NLT, CSB
  - Paraphrase: The Message, Amplified
- Comparison table
- Recommendation guide ("Start with NIV or ESV")

---

### Screen: BibleAuthors
**Source:** `src/pages/BibleAuthors.tsx`

- Timeline of Bible authors
- Old Testament authors (Moses, David, Isaiah, etc.)
- New Testament authors (Matthew, Mark, Luke, John, Paul, etc.)
- Evidence for authenticity of each author's account
- Dates, historical context

---

### Screen: Preaching (Wisdom)
**Source:** `src/pages/Preaching.tsx`

Embedded sermon cards with:
- Preacher name + image
- Description
- YouTube link → opens in WebView or external browser

Preachers featured:
- Wes Huff
- Philip Anthony Mitchell
- T.D. Jakes

Social links (Instagram, Facebook, TikTok) for The Disciple Co.

---

### Screen: Podcasts
**Source:** `src/pages/Podcasts.tsx`

Curated podcast recommendations:
- The Bible Project
- Ask Pastor John (Desiring God)
- The Gospel Coalition
- The Disciple Co. (Coming Soon)

Each card: name, description, platform badge, external link

---

### Screen: Books
**Source:** `src/pages/Books.tsx`

```typescript
// Fetch from Supabase
const { data: books } = await supabase
  .from('books')
  .select('*')
  .order('order_index', { ascending: true });
```

- Category filter: All | Scripture | Theology | History | Devotional
- Book cards: cover image, title, author, description
- Tap → `BookReader` screen (full paginated book content)

---

### Screen: Hallowed
**Source:** `src/pages/Hallowed.tsx`

Immersive dark/atmospheric screen for the Hallowed Band:
- Dark gradient background
- Cross logo SVG
- Band name + description
- Music player (fetch from `hallowed_tracks` Supabase table)
- Concert dates section
- Links to social media

```typescript
const { data: tracks } = await supabase
  .from('hallowed_tracks')
  .select('*')
  .order('uploaded_at', { ascending: false });
```

---

### Screen: ChurchMentors
**Source:** `src/pages/ChurchMentors.tsx`

- Mentor profile cards
- Name, denomination, expertise, contact info
- Links to ministries

---

### Screen: FAQs
**Source:** `src/pages/FAQs.tsx`

- Accordion list of Q&A pairs
- Common questions about faith, Bible, salvation
- Expandable answers with scripture references

---

### Screen: Guidance
**Source:** `src/pages/Guidance.tsx`

- Topic-based spiritual guidance
- Q&A format fetched from Supabase `guidance_qa` table
- Categories: Prayer, Sin, Forgiveness, Relationships, etc.

---

## Context Providers

### DarkModeContext
```typescript
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  colorTheme: 'subtle' | 'happy' | 'blackwhite';
  setColorTheme: (theme: ColorTheme) => void;
}

// Persist in AsyncStorage:
// 'darkMode' → boolean
// 'colorTheme' → 'subtle' | 'happy' | 'blackwhite'
```

### MusicPlayerContext
```typescript
interface MusicPlayerContextType {
  currentTrack: MusicTrack | null;
  playlist: MusicTrack[];
  isPlaying: boolean;
  volume: number;
  position: number;     // seconds
  duration: number;     // seconds
  playTrack: (track: MusicTrack, list: MusicTrack[]) => void;
  togglePlay: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (vol: number) => void;
  skipNext: () => void;
  skipPrev: () => void;
}
```

---

## Onboarding Flow

**Source:** `src/components/OnboardingQuestions.tsx`

Shown on first launch (check AsyncStorage key `onboardingCompleted`).

Questions to ask:
1. "Are you new to Christianity or the Bible?"
   - New to it / Know a little / Fairly familiar / I'm a believer
2. "What brings you here today?"
   - Learning the Bible / Exploring faith / Deepening my walk / Music & culture
3. "Which describes you?"
   - No church background / Grew up in church / Actively attending / Looking for a church

On complete → set `onboardingCompleted: true` in AsyncStorage → navigate to main app.

---

## Persistent Mini Music Player

Show at the bottom of all screens (above the tab bar) when a track is active.

```typescript
// MiniMusicPlayer.tsx
// Displays: track title, artist, play/pause button, progress bar
// Tap → expands to full-screen player
// Uses MusicPlayerContext
```

---

## Color Themes

Map web themes to React Native styles:

### Subtle (default)
```typescript
const subtle = {
  background: '#f8fafc',         // slate-50
  backgroundDark: '#030712',     // gray-950
  card: '#ffffff',
  cardDark: '#1e293b',           // slate-800
  primary: '#2563eb',            // blue-600
  accent: '#1d4ed8',             // blue-700
  text: '#111827',
  textDark: '#f9fafb',
};
```

### Happy
```typescript
const happy = {
  background: '#fffbeb',         // amber-50
  backgroundDark: '#030712',
  card: '#ffffff',
  cardDark: '#1f2937',           // gray-800
  primary: '#f59e0b',            // amber-500
  accent: '#ea580c',             // orange-600
  text: '#111827',
  textDark: '#f9fafb',
};
```

### Black & White
```typescript
const blackwhite = {
  background: '#f9fafb',         // gray-50
  backgroundDark: '#111827',     // gray-900
  card: '#ffffff',
  cardDark: '#1f2937',
  primary: '#374151',            // gray-700
  accent: '#111827',             // gray-900
  text: '#111827',
  textDark: '#f9fafb',
};
```

---

## Data Files to Copy Verbatim

These TypeScript data files from the web project are pure data — copy them directly into the mobile app:

| File | Contents |
|---|---|
| `src/data/books.ts` | All 66 Bible books with summaries, structure, authors |
| `src/data/topics.ts` | Theological topics with scripture references |
| `src/data/stories.ts` | 10 Bible stories with full text |
| `src/data/timeline.ts` | Historical timeline events |
| `src/data/courseData.ts` | 8 Foundation Course modules |
| `src/data/gospelEvents.ts` | Gospel events for Resurrection screen |

---

## Static Assets

| Asset | Web Path | Used On |
|---|---|---|
| Cross image | `/public/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png` | Home/Welcome hero |
| P52 manuscript | `/public/images/p52.jpg` | Resurrection screen |
| Logo SVG | `/public/images/logo.svg` | Splash screen / branding |
| Logo light | `/public/images/logo-light.svg` | Dark mode branding |
| Matthew book cover | `/public/images/bible-books/matthew.jpg` | Bible book display |

Bundle static images with the app. For book images, use Pexels URLs as defined in `data/books.ts`.

---

## Supabase Edge Functions

### `fetch-verses`
Endpoint: `POST /functions/v1/fetch-verses`

Request body:
```json
{ "book": "John", "chapter": 3 }
```

Response:
```json
{
  "verses": [
    { "verse": 1, "text": "There was a man of the Pharisees..." },
    { "verse": 16, "text": "For God so loved the world..." }
  ]
}
```

---

## App Store Metadata

**Category:** Education / Books & Reference
**Target Age:** 12+
**Description:**
> The Disciple Co. is a faith education app designed to help anyone understand the Bible, Christianity, and what it means to follow Jesus. Explore all 66 books of the Bible, take the Foundation Course, look up any verse, discover the history of the church, and listen to original worship music — all in one place.

**Keywords:** Bible, Christianity, faith, discipleship, Jesus, church, worship, theology, scripture, Christian

**Screenshots needed:** (6 total)
1. Welcome/Home screen
2. Bible browser (book list)
3. Bible book detail (Genesis expanded)
4. Music Jukebox player
5. Topics screen
6. Historical Timeline

---

## Key Differences from Web Version

| Feature | Web | Mobile |
|---|---|---|
| Navigation | React Router + full nav menu | Bottom tabs + Stack screens |
| Music player | Floating HTML5 audio | `expo-av` with background audio |
| Hallowed page | Full-screen custom CSS | Full-screen dark screen with native audio |
| Print feature | `window.print()` | `expo-print` + share sheet |
| Onboarding | Full-screen overlay component | Dedicated onboarding stack before main app |
| Sermon videos | Embedded YouTube iframe | `react-native-webview` or `expo-video` |
| Bubbles | CSS animation overlay | Animated API particles (optional) |
| Theme | CSS custom properties | React Context + StyleSheet |
| Local storage | `localStorage` | `AsyncStorage` |

---

## Admin Features (Optional for App)

The web admin portal (`/admin`) allows uploading books and music via password. For the mobile app:

- **Music upload:** Omit from initial app release (admin-only, web handles this)
- **Book upload:** Omit from initial app release
- Admin password for Hallowed music upload: `hallowed2026`
- Admin portal password: `jukebox2024`

---

## Build Commands (Expo)

```bash
# Install dependencies
npx create-expo-app@latest disciple-co --template blank-typescript

# Core dependencies
npx expo install expo-av @react-native-async-storage/async-storage
npx expo install expo-font @expo-google-fonts/inter
npx expo install react-native-safe-area-context react-native-screens
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npx expo install @supabase/supabase-js

# Optional
npx expo install expo-print expo-sharing
npx expo install react-native-webview

# Run
npx expo start
```

---

## Notes for Developer

1. **Reuse all data files** from `src/data/` — they are complete and production-ready.
2. **Supabase is already live** — the database, storage buckets, and edge functions are deployed.
3. **No auth needed** for users — all content is public-read via RLS policies.
4. **Music streaming** plays directly from Supabase Storage URLs stored in `file_url` column.
5. **Bible verse lookup** uses the existing `fetch-verses` edge function.
6. The **Resurrection** and **Easter** screens use special dark/atmospheric styling — treat them as immersive experiences, not standard list screens.
7. The **Hallowed** screen should feel like a band/artist profile with music player integrated.
8. **Background audio** on mobile requires `expo-av` audio mode configuration:
   ```typescript
   await Audio.setAudioModeAsync({
     staysActiveInBackground: true,
     playsInSilentModeIOS: true,
   });
   ```
