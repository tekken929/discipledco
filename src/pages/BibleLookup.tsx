import { useState, useEffect } from 'react';
import { BookOpen, Search, Loader2, ChevronDown, AlertCircle } from 'lucide-react';
import { ReturnToHome } from '../components/ReturnToHome';

interface Verse {
  verse: number;
  text: string;
}

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

const SAMPLE_PASSAGES = [
  { book: 'Genesis', chapter: 1, label: 'Genesis 1 — In the Beginning' },
  { book: 'Psalms', chapter: 23, label: 'Psalm 23 — The Lord is My Shepherd' },
  { book: 'Isaiah', chapter: 53, label: 'Isaiah 53 — The Suffering Servant' },
  { book: 'John', chapter: 1, label: 'John 1 — The Word Made Flesh' },
  { book: 'John', chapter: 3, label: 'John 3 — Born Again' },
  { book: 'Romans', chapter: 8, label: 'Romans 8 — Life in the Spirit' },
  { book: 'Matthew', chapter: 5, label: 'Matthew 5 — Sermon on the Mount' },
  { book: '1 Corinthians', chapter: 13, label: '1 Corinthians 13 — Love Chapter' },
];

export function BibleLookup() {
  const [selectedBook, setSelectedBook] = useState('John');
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const chapterCount = CHAPTER_COUNTS[selectedBook] || 1;
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  async function fetchVerses(book: string, chapter: number) {
    setLoading(true);
    setError(null);
    setLoaded(false);
    setVerses([]);
    try {
      const url = `${SUPABASE_URL}/functions/v1/fetch-verses?book=${encodeURIComponent(book)}&chapter=${chapter}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setVerses(data.verses || []);
      setLoaded(true);
    } catch {
      setError('Could not load this chapter. Please try another.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVerses('John', 3);
  }, []);

  function handleSearch() {
    fetchVerses(selectedBook, selectedChapter);
  }

  function handleSample(book: string, chapter: number) {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    fetchVerses(book, chapter);
  }

  function handleBookChange(book: string) {
    setSelectedBook(book);
    setSelectedChapter(1);
  }

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
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">World English Bible (WEB) — Public Domain</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4 max-w-2xl">
            Read any chapter from the World English Bible. Select a book and chapter below, or jump to one of the sample passages.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Select Passage</h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Testament</label>
                  <div className="space-y-2">
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

            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Featured Passages</h2>
              <div className="space-y-1.5">
                {SAMPLE_PASSAGES.map((s) => (
                  <button
                    key={`${s.book}-${s.chapter}`}
                    onClick={() => handleSample(s.book, s.chapter)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      selectedBook === s.book && selectedChapter === s.chapter && loaded
                        ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

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
                <div className="flex items-center gap-3 p-8 text-red-500">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {!loading && !error && loaded && verses.length > 0 && (
                <>
                  <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBook} {selectedChapter}
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">World English Bible (WEB) &mdash; {verses.length} verses</p>
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
