import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Loader2, ChevronDown, AlertCircle, ChevronLeft, ChevronRight, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { BookDisplay } from '../components/BookDisplay';
import { books } from '../data/books';

interface Verse {
  verse: number;
  text: string;
}

type Translation = 'kjv' | 'web' | 'esv' | 'nasb' | 'nlt';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const BOOKS_OT = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
  'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi',
];

const BOOKS_NT = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
  '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
  'James', '1 Peter', '2 Peter', '1 John', '2 John',
  '3 John', 'Jude', 'Revelation',
];

const ALL_BOOKS = [...BOOKS_OT, ...BOOKS_NT];

const CHAPTER_COUNTS: Record<string, number> = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
  Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31,
  Ecclesiastes: 12, 'Song of Solomon': 8, Isaiah: 66, Jeremiah: 52,
  Lamentations: 5, Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9,
  Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3, Habakkuk: 3, Zephaniah: 3,
  Haggai: 2, Zechariah: 14, Malachi: 4,
  Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28, Romans: 16,
  '1 Corinthians': 16, '2 Corinthians': 13, Galatians: 6, Ephesians: 6,
  Philippians: 4, Colossians: 4, '1 Thessalonians': 5, '2 Thessalonians': 3,
  '1 Timothy': 6, '2 Timothy': 4, Titus: 3, Philemon: 1, Hebrews: 13,
  James: 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1,
  '3 John': 1, Jude: 1, Revelation: 22,
};

const TRANSLATION_INFO: Record<Translation, { label: string; full: string; description: string; licensed?: boolean }> = {
  kjv: {
    label: 'KJV',
    full: 'King James Version',
    description: 'Classic 1611 — Public Domain',
  },
  web: {
    label: 'WEB',
    full: 'World English Bible',
    description: 'Modern English — Public Domain',
  },
  esv: {
    label: 'ESV',
    full: 'English Standard Version',
    description: 'Modern literal — 2016',
    licensed: true,
  },
  nasb: {
    label: 'NASB',
    full: 'New American Standard Bible',
    description: 'Precise & scholarly — 1995',
    licensed: true,
  },
  nlt: {
    label: 'NLT',
    full: 'New Living Translation',
    description: 'Readable & clear — 2015',
    licensed: true,
  },
};

const READING_BACKGROUNDS = [
  { name: 'Paper White', bg: '#fafafa', border: '#e5e5e5', text: '#1a1a1a' },
  { name: 'Warm Ivory', bg: '#f5f1e8', border: '#e0d9c8', text: '#2a2620' },
  { name: 'Soft Beige', bg: '#ebe5d6', border: '#d0c8b5', text: '#2e2a22' },
  { name: 'Muted Grey', bg: '#dcdcd5', border: '#c0c0b8', text: '#2a2a26' },
  { name: 'Deep Stone', bg: '#c8c4b8', border: '#a8a498', text: '#26241f' },
];

function getAdjacentChapter(book: string, chapter: number, direction: 'prev' | 'next'): { book: string; chapter: number } | null {
  const bookIndex = ALL_BOOKS.indexOf(book);
  if (bookIndex === -1) return null;

  if (direction === 'next') {
    const maxChapter = CHAPTER_COUNTS[book] || 1;
    if (chapter < maxChapter) {
      return { book, chapter: chapter + 1 };
    }
    if (bookIndex < ALL_BOOKS.length - 1) {
      const nextBook = ALL_BOOKS[bookIndex + 1];
      return { book: nextBook, chapter: 1 };
    }
    return null;
  } else {
    if (chapter > 1) {
      return { book, chapter: chapter - 1 };
    }
    if (bookIndex > 0) {
      const prevBook = ALL_BOOKS[bookIndex - 1];
      const prevMaxChapter = CHAPTER_COUNTS[prevBook] || 1;
      return { book: prevBook, chapter: prevMaxChapter };
    }
    return null;
  }
}

export function BibleLookup() {
  const [searchParams] = useSearchParams();
  const paramBook = searchParams.get('book') || 'John';
  const paramChapter = parseInt(searchParams.get('chapter') || '3', 10) || 3;
  const paramVerse = searchParams.get('verse') ? parseInt(searchParams.get('verse')!, 10) || 1 : 1;
  const paramTranslation = (searchParams.get('translation') as Translation | null) || 'nlt';

  const [selectedBook, setSelectedBook] = useState(paramBook);
  const [selectedChapter, setSelectedChapter] = useState(paramChapter);
  const [translation, setTranslation] = useState<Translation>(
    ['kjv', 'web', 'esv', 'nasb', 'nlt'].includes(paramTranslation) ? paramTranslation : 'nlt'
  );
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadedBook, setLoadedBook] = useState('John');
  const [loadedChapter, setLoadedChapter] = useState(3);
  const [loadedTranslation, setLoadedTranslation] = useState<Translation>('nlt');
  const [selectedVerse, setSelectedVerse] = useState<number | null>(paramVerse);
  const [bgIndex, setBgIndex] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [translationOpen, setTranslationOpen] = useState(false);
  const translationRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const overviewBook = books.find(b => b.name === loadedBook);

  const chapterCount = CHAPTER_COUNTS[selectedBook] || 1;
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  async function fetchVerses(book: string, chapter: number, trans: Translation) {
    setLoading(true);
    setError(null);
    setLoaded(false);
    setVerses([]);
    try {
      const url = `${SUPABASE_URL}/functions/v1/fetch-verses?book=${encodeURIComponent(book)}&chapter=${chapter}&translation=${trans}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setVerses(data.verses || []);
      setLoadedBook(book);
      setLoadedChapter(chapter);
      setLoadedTranslation(trans);
      setLoaded(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not load this chapter.';
      setError(msg.includes('API key') || msg.includes('not configured')
        ? msg
        : 'Could not load this chapter. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVerses(paramBook, paramChapter, translation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loaded && selectedVerse !== null && scrollContainerRef.current) {
      const el = document.getElementById(`verse-${selectedVerse}`);
      if (el && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: el.offsetTop - scrollContainerRef.current.offsetTop - 8,
          behavior: 'smooth',
        });
      }
    }
  }, [loaded, verses, selectedVerse]);

  function handleBookChange(book: string) {
    setSelectedBook(book);
    setSelectedChapter(1);
    setSelectedVerse(1);
    fetchVerses(book, 1, translation);
  }

  function handleChapterChange(chapter: number) {
    setSelectedChapter(chapter);
    setSelectedVerse(1);
    fetchVerses(selectedBook, chapter, translation);
  }

  function handleVerseSelect(verse: number) {
    setSelectedVerse(verse);
    if (translationRef.current) {
      translationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (scrollContainerRef.current) {
      const el = document.getElementById(`verse-${verse}`);
      if (el) {
        scrollContainerRef.current.scrollTo({
          top: el.offsetTop - scrollContainerRef.current.offsetTop - 8,
          behavior: 'smooth',
        });
      }
    }
  }

  function handleTranslationChange(t: Translation) {
    setTranslation(t);
    if (loaded) {
      fetchVerses(loadedBook, loadedChapter, t);
    }
  }

  function handleNavigate(direction: 'prev' | 'next') {
    const target = getAdjacentChapter(loadedBook, loadedChapter, direction);
    if (!target) return;
    setSelectedBook(target.book);
    setSelectedChapter(target.chapter);
    setSelectedVerse(1);
    fetchVerses(target.book, target.chapter, translation);
    if (translationRef.current) {
      translationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const info = TRANSLATION_INFO[loadedTranslation];
  const bg = READING_BACKGROUNDS[bgIndex];
  const prevChapter = getAdjacentChapter(loadedBook, loadedChapter, 'prev');
  const nextChapter = getAdjacentChapter(loadedBook, loadedChapter, 'next');

  return (
    <>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="mb-1.5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Bible Lookup</h1>
                <p className="text-gray-500 dark:text-gray-400 text-xs">KJV, WEB, ESV, NASB &amp; NLT</p>
              </div>
            </div>

            {/* Background color selectors */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:inline">Reading</span>
              <div className="flex items-center gap-1.5">
                {READING_BACKGROUNDS.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setBgIndex(i)}
                    title={option.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      bgIndex === i
                        ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-gray-900 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: option.bg, borderColor: option.border }}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl text-sm">
            Select a translation, book, and chapter to read.
          </p>
        </div>

        {/* Translation selector — collapsible */}
        <div
          ref={translationRef}
          className="border rounded-xl mb-1.5 scroll-mt-20 transition-colors overflow-hidden"
          style={{ backgroundColor: bg.bg, borderColor: bg.border }}
        >
          <button
            onClick={() => setTranslationOpen(o => !o)}
            className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-black/5 transition-colors"
          >
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: bg.text, opacity: 0.6 }}>Translation</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold" style={{ color: bg.text, opacity: 0.8 }}>
                {TRANSLATION_INFO[translation].label} — {TRANSLATION_INFO[translation].full}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${translationOpen ? 'rotate-180' : ''}`}
                style={{ color: bg.text, opacity: 0.5 }}
              />
            </div>
          </button>
          {translationOpen && (
            <div className="px-3 pb-2">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(['kjv', 'web', 'esv', 'nasb', 'nlt'] as Translation[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTranslationChange(t)}
                    className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-lg border font-semibold text-xs transition-all ${
                      translation === t
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-bold">{TRANSLATION_INFO[t].label}</span>
                    <span className="text-[9px] font-medium opacity-70 text-center leading-tight">{TRANSLATION_INFO[t].full}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Select Passage — full width */}
        <div
          className="border rounded-xl p-2 mb-1.5 transition-colors"
          style={{ backgroundColor: bg.bg, borderColor: bg.border }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: bg.text, opacity: 0.6 }}>Select Passage</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-black">Old Testament</p>
              <div className="relative">
                <select
                  value={BOOKS_OT.includes(selectedBook) ? selectedBook : ''}
                  onChange={(e) => e.target.value && handleBookChange(e.target.value)}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  style={{ backgroundColor: bg.bg, borderColor: bg.border, color: bg.text }}
                >
                  {!BOOKS_OT.includes(selectedBook) && <option value="">-- Select --</option>}
                  {BOOKS_OT.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: bg.text, opacity: 0.4 }} />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-black">New Testament</p>
              <div className="relative">
                <select
                  value={BOOKS_NT.includes(selectedBook) ? selectedBook : ''}
                  onChange={(e) => e.target.value && handleBookChange(e.target.value)}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  style={{ backgroundColor: bg.bg, borderColor: bg.border, color: bg.text }}
                >
                  {!BOOKS_NT.includes(selectedBook) && <option value="">-- Select --</option>}
                  {BOOKS_NT.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: bg.text, opacity: 0.4 }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1 text-black">Chapter</label>
              <div className="relative">
                <select
                  value={selectedChapter}
                  onChange={(e) => handleChapterChange(Number(e.target.value))}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  style={{ backgroundColor: bg.bg, borderColor: bg.border, color: bg.text }}
                >
                  {chapters.map((c) => (
                    <option key={c} value={c}>Chapter {c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: bg.text, opacity: 0.4 }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1 text-black">Verse</label>
              <div className="relative">
                <select
                  value={selectedVerse ?? ''}
                  onChange={(e) => handleVerseSelect(Number(e.target.value))}
                  disabled={!loaded || verses.length === 0}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                  style={{ backgroundColor: bg.bg, borderColor: bg.border, color: bg.text }}
                >
                  <option value="" disabled>Select verse</option>
                  {verses.map((v) => (
                    <option key={v.verse} value={v.verse}>Verse {v.verse}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: bg.text, opacity: 0.4 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main reading pane — full width */}
        <div
          className="border rounded-xl min-h-[400px] transition-colors"
          style={{ backgroundColor: bg.bg, borderColor: bg.border }}
        >
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading chapter...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-8">
              <div className="flex items-start gap-3 text-red-500">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Could not load this chapter</p>
                  <p className="text-sm mt-1 text-red-400">{error}</p>
                  {TRANSLATION_INFO[translation]?.licensed && (
                    <p className="text-xs mt-3 text-gray-500 dark:text-gray-400">
                      ESV, NASB &amp; NLT require a free API key from{' '}
                      <span className="font-semibold">scripture.api.bible</span>. Add it as{' '}
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">BIBLE_API_KEY</code>{' '}
                      in your Supabase edge function secrets.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!loading && !error && loaded && verses.length > 0 && (
            <>
              <div className="px-3 pt-2 pb-1.5 border-b" style={{ borderColor: bg.border }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: bg.text }}>
                      {loadedBook} {loadedChapter}
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: bg.text, opacity: 0.5 }}>
                      {info.full} &mdash; {verses.length} verses
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setOverviewOpen(true)}
                      className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 hover:border-amber-300 transition-colors mt-0.5"
                    >
                      <Map className="w-3.5 h-3.5" />
                      {loadedBook} Overview
                    </button>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 mt-0.5">
                      {info.label}
                    </span>
                  </div>
                </div>
              </div>
              <div ref={scrollContainerRef} className="px-3 py-1.5 space-y-1 max-h-[calc(65vh+150px)] overflow-y-auto">
                {verses.map(({ verse, text }) => (
                  <div
                    key={verse}
                    id={`verse-${verse}`}
                    className={`flex gap-3 group rounded-lg px-2 py-1 -mx-2 transition-colors ${
                      selectedVerse === verse ? 'bg-emerald-100/60' : 'hover:bg-black/5'
                    }`}
                  >
                    <span className="text-xs font-bold text-emerald-600 w-7 flex-shrink-0 pt-0.5 text-right tabular-nums select-none">
                      {verse}
                    </span>
                    <p className="leading-relaxed flex-1 text-base" style={{ color: bg.text }}>
                      {text}
                    </p>
                  </div>
                ))}

                {/* Next / Previous chapter navigation */}
                <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t" style={{ borderColor: bg.border }}>
                  <button
                    onClick={() => handleNavigate('prev')}
                    disabled={!prevChapter}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ borderColor: bg.border, color: bg.text }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-wide opacity-60">Previous</p>
                      <p className="text-sm font-bold">{prevChapter ? `${prevChapter.book} ${prevChapter.chapter}` : '—'}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavigate('next')}
                    disabled={!nextChapter}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ borderColor: bg.border, color: bg.text }}
                  >
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wide opacity-60">Next</p>
                      <p className="text-sm font-bold">{nextChapter ? `${nextChapter.book} ${nextChapter.chapter}` : '—'}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {!loading && !error && !loaded && (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Select a book and chapter to begin</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={overviewOpen}
        onClose={() => setOverviewOpen(false)}
        title={`${loadedBook} — Bible Overview`}
      >
        {overviewBook ? (
          <BookDisplay book={overviewBook} />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No overview available for {loadedBook}.</p>
        )}
      </Modal>
    </>
  );
}
