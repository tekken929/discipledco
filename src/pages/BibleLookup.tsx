import { useState, useEffect } from 'react';
import { BookOpen, Search, Loader2, ChevronDown, AlertCircle } from 'lucide-react';
import { ReturnToHome } from '../components/ReturnToHome';

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

export function BibleLookup() {
  const [selectedBook, setSelectedBook] = useState('John');
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [translation, setTranslation] = useState<Translation>('kjv');
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadedBook, setLoadedBook] = useState('John');
  const [loadedChapter, setLoadedChapter] = useState(3);
  const [loadedTranslation, setLoadedTranslation] = useState<Translation>('kjv');

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
    fetchVerses('John', 3, translation);
  }, []);

  function handleSearch() {
    fetchVerses(selectedBook, selectedChapter, translation);
  }

  function handleBookChange(book: string) {
    setSelectedBook(book);
    setSelectedChapter(1);
  }

  function handleTranslationChange(t: Translation) {
    setTranslation(t);
    if (loaded) {
      fetchVerses(loadedBook, loadedChapter, t);
    }
  }

  const info = TRANSLATION_INFO[loadedTranslation];

  return (
    <>
      <ReturnToHome />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-xl">
              <BookOpen className="w-7 h-7 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Bible Lookup</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">KJV, WEB, ESV, NASB &amp; NLT</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4 max-w-2xl">
            Select a translation, book, and chapter to read.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* Translation selector */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Translation</h2>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {(['kjv', 'web'] as Translation[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTranslationChange(t)}
                    className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 font-semibold text-sm transition-all ${
                      translation === t
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <span className="text-base font-bold">{TRANSLATION_INFO[t].label}</span>
                    <span className="text-[10px] font-medium opacity-70 text-center leading-tight">{TRANSLATION_INFO[t].full}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['esv', 'nasb', 'nlt'] as Translation[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTranslationChange(t)}
                    className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl border-2 font-semibold text-sm transition-all ${
                      translation === t
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <span className="text-base font-bold">{TRANSLATION_INFO[t].label}</span>
                    <span className="text-[10px] font-medium opacity-70 text-center leading-tight">{TRANSLATION_INFO[t].full}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Book + Chapter selector */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Select Passage</h2>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-1">Old Testament</p>
                  <div className="relative">
                    <select
                      value={BOOKS_OT.includes(selectedBook) ? selectedBook : ''}
                      onChange={(e) => e.target.value && handleBookChange(e.target.value)}
                      className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {!BOOKS_OT.includes(selectedBook) && <option value="">-- Select --</option>}
                      {BOOKS_OT.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">New Testament</p>
                  <div className="relative">
                    <select
                      value={BOOKS_NT.includes(selectedBook) ? selectedBook : ''}
                      onChange={(e) => e.target.value && handleBookChange(e.target.value)}
                      className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {!BOOKS_NT.includes(selectedBook) && <option value="">-- Select --</option>}
                      {BOOKS_NT.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Chapter</label>
                  <div className="relative">
                    <select
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(Number(e.target.value))}
                      className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {chapters.map((c) => (
                        <option key={c} value={c}>Chapter {c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Read Chapter
                </button>
              </div>
            </div>
          </div>

          {/* Main reading pane */}
          <div className="lg:col-span-2">
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl min-h-[500px]">
              {loading && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Loading chapter...</p>
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
                  <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {loadedBook} {loadedChapter}
                        </h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {info.full} &mdash; {verses.length} verses
                        </p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mt-1">
                        {info.label}
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
                    {verses.map(({ verse, text }) => (
                      <div key={verse} className="flex gap-4 group">
                        <span className="text-xs font-bold text-teal-500 dark:text-teal-400 w-8 flex-shrink-0 pt-0.5 text-right tabular-nums select-none">
                          {verse}
                        </span>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed flex-1 text-[15px]">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {!loading && !error && !loaded && (
                <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                  <div className="text-center">
                    <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Select a book and chapter to begin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
