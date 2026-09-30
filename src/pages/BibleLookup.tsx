import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Loader2, ChevronDown, AlertCircle, ChevronLeft, ChevronRight, Map, NotebookPen, Columns2, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { BookDisplay } from '../components/BookDisplay';
import { books } from '../data/books';
import { fetchBibleChapter, type BibleVerse, type Translation, TRANSLATION_LABELS } from '../lib/bibleApi';
import { useBibleNotebook, HIGHLIGHT_COLORS, type HighlightColor } from '../hooks/useBibleNotebook';
import { NotepadPanel } from '../components/NotepadPanel';
import { VerseActionPopup } from '../components/VerseActionPopup';

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

const TRANSLATION_INFO = TRANSLATION_LABELS;

interface BibleTheme {
  name: string;
  label: string;
  swatch: string;
  bg: string;
  border: string;
  text: string;
  accent: string;
  accentLight: string;
  accentText: string;
  accentBorder: string;
  accentBorderHover: string;
  parallel: string;
  parallelLight: string;
  parallelText: string;
  parallelBorder: string;
  verseNum: string;
  selectBg: string;
  selectBorder: string;
}

const THEMES: BibleTheme[] = [
  {
    name: 'forest',
    label: 'Forest',
    swatch: '#059669',
    bg: '#f4f7f4',
    border: '#d4e0d4',
    text: '#1a2e1a',
    accent: '#059669',
    accentLight: '#d1fae5',
    accentText: '#047857',
    accentBorder: '#a7f3d0',
    accentBorderHover: '#6ee7b7',
    parallel: '#0284c7',
    parallelLight: '#e0f2fe',
    parallelText: '#0369a1',
    parallelBorder: '#bae6fd',
    verseNum: '#059669',
    selectBg: '#f0fdf4',
    selectBorder: '#bbf7d0',
  },
  {
    name: 'ocean',
    label: 'Ocean',
    swatch: '#0284c7',
    bg: '#eef4f9',
    border: '#cfdde9',
    text: '#1a2733',
    accent: '#0284c7',
    accentLight: '#e0f2fe',
    accentText: '#0369a1',
    accentBorder: '#bae6fd',
    accentBorderHover: '#7dd3fc',
    parallel: '#7c3aed',
    parallelLight: '#ede9fe',
    parallelText: '#6d28d9',
    parallelBorder: '#ddd6fe',
    verseNum: '#0284c7',
    selectBg: '#f0f9ff',
    selectBorder: '#bae6fd',
  },
  {
    name: 'sunset',
    label: 'Sunset',
    swatch: '#d97706',
    bg: '#faf6f0',
    border: '#e5d8c8',
    text: '#2a2218',
    accent: '#d97706',
    accentLight: '#fef3c7',
    accentText: '#b45309',
    accentBorder: '#fde68a',
    accentBorderHover: '#fcd34d',
    parallel: '#dc2626',
    parallelLight: '#fee2e2',
    parallelText: '#b91c1c',
    parallelBorder: '#fecaca',
    verseNum: '#d97706',
    selectBg: '#fffbeb',
    selectBorder: '#fde68a',
  },
  {
    name: 'slate',
    label: 'Slate',
    swatch: '#475569',
    bg: '#f0f0f2',
    border: '#d0d0d4',
    text: '#2a2a2e',
    accent: '#475569',
    accentLight: '#e2e8f0',
    accentText: '#334155',
    accentBorder: '#cbd5e1',
    accentBorderHover: '#94a3b8',
    parallel: '#64748b',
    parallelLight: '#f1f5f9',
    parallelText: '#475569',
    parallelBorder: '#cbd5e1',
    verseNum: '#475569',
    selectBg: '#f8fafc',
    selectBorder: '#cbd5e1',
  },
  {
    name: 'rose',
    label: 'Rose',
    swatch: '#e11d48',
    bg: '#f8f0f3',
    border: '#e8d0d8',
    text: '#2a1a20',
    accent: '#e11d48',
    accentLight: '#ffe4e6',
    accentText: '#be123c',
    accentBorder: '#fecdd3',
    accentBorderHover: '#fda4af',
    parallel: '#9333ea',
    parallelLight: '#f3e8ff',
    parallelText: '#7e22ce',
    parallelBorder: '#e9d5ff',
    verseNum: '#e11d48',
    selectBg: '#fff1f2',
    selectBorder: '#fecdd3',
  },
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

interface VersePopupState {
  verse: number;
  text: string;
  rect: DOMRect;
  selectedText: string | null;
}

export function BibleLookup() {
  const notebook = useBibleNotebook();
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [versePopup, setVersePopup] = useState<VersePopupState | null>(null);
  const [searchParams] = useSearchParams();
  const paramBook = searchParams.get('book') || 'John';
  const paramChapter = parseInt(searchParams.get('chapter') || '3', 10) || 3;
  const paramVerse = searchParams.get('verse') ? parseInt(searchParams.get('verse')!, 10) || 1 : 1;
  const paramTranslation = (searchParams.get('translation') as Translation | null) || 'kjv';

  const [selectedBook, setSelectedBook] = useState(paramBook);
  const [selectedChapter, setSelectedChapter] = useState(paramChapter);
  const [translation, setTranslation] = useState<Translation>(
    ['kjv', 'niv', 'esv', 'nasb', 'nlt'].includes(paramTranslation) ? paramTranslation : 'kjv'
  );
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadedBook, setLoadedBook] = useState('John');
  const [loadedChapter, setLoadedChapter] = useState(3);
  const [loadedTranslation, setLoadedTranslation] = useState<Translation>('kjv');
  const [selectedVerse, setSelectedVerse] = useState<number | null>(paramVerse);
  const [themeIndex, setThemeIndex] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [translationOpen, setTranslationOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [parallelMode, setParallelMode] = useState(false);
  const [parallelTranslation, setParallelTranslation] = useState<Translation>('niv');
  const [parallelVerses, setParallelVerses] = useState<BibleVerse[]>([]);
  const [parallelLoading, setParallelLoading] = useState(false);
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
      const data = await fetchBibleChapter(book, chapter, trans);
      if (data.length === 0) {
        throw new Error('No verses found for this chapter.');
      }
      setVerses(data);
      setLoadedBook(book);
      setLoadedChapter(chapter);
      setLoadedTranslation(trans);
      setLoaded(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not load this chapter.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function fetchParallelVerses(book: string, chapter: number, trans: Translation) {
    setParallelLoading(true);
    setParallelVerses([]);
    try {
      const data = await fetchBibleChapter(book, chapter, trans);
      setParallelVerses(data);
    } catch {
      setParallelVerses([]);
    } finally {
      setParallelLoading(false);
    }
  }

  useEffect(() => {
    fetchVerses(paramBook, paramChapter, translation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (parallelMode && loaded) {
      fetchParallelVerses(loadedBook, loadedChapter, parallelTranslation);
    } else {
      setParallelVerses([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parallelMode, parallelTranslation, loadedBook, loadedChapter]);

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

  function handleParallelTranslationChange(t: Translation) {
    setParallelTranslation(t);
  }

  function toggleParallel() {
    setParallelMode((prev) => !prev);
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
  const theme = THEMES[themeIndex];
  const prevChapter = getAdjacentChapter(loadedBook, loadedChapter, 'prev');
  const nextChapter = getAdjacentChapter(loadedBook, loadedChapter, 'next');

  const openVersePopup = useCallback((verse: number, rect: DOMRect, selectedText: string | null) => {
    const v = verses.find((vv) => vv.verse === verse);
    if (v) setVersePopup({ verse, text: v.text, rect, selectedText });
  }, [verses]);

  const currentHighlight = versePopup
    ? notebook.getHighlight(loadedBook, loadedChapter, versePopup.verse)
    : undefined;
  const currentHighlightColor = currentHighlight
    ? (currentHighlight.color as HighlightColor)
    : null;

  const parallelBtnStyle = (active: boolean): React.CSSProperties => ({
    backgroundColor: active ? theme.accent : theme.bg,
    color: active ? '#ffffff' : theme.text,
    borderColor: active ? theme.accent : theme.border,
  });

  return (
    <>
      <main className={`${parallelMode ? 'max-w-7xl' : 'max-w-5xl'} mx-auto px-4 sm:px-6 lg:px-8 py-1 transition-all`}>
        <div className="mb-1.5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: theme.accentLight }}>
                <BookOpen className="w-5 h-5" style={{ color: theme.accent }} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Bible Lookup</h1>
                <p className="text-gray-500 dark:text-gray-400 text-xs">KJV, NIV, ESV, NASB &amp; NLT</p>
              </div>
            </div>

            {/* Theme picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:inline">Theme</span>
              <div className="relative">
                <button
                  onClick={() => setThemePickerOpen(o => !o)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all hover:scale-105"
                  style={{ borderColor: theme.border, backgroundColor: theme.bg, color: theme.text }}
                >
                  <Palette className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                  {theme.label}
                </button>
                {themePickerOpen && (
                  <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 p-2 min-w-[180px]">
                    {THEMES.map((t, i) => (
                      <button
                        key={t.name}
                        onClick={() => { setThemeIndex(i); setThemePickerOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          themeIndex === i ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border-2 flex-shrink-0" style={{ backgroundColor: t.swatch, borderColor: t.border }} />
                        <span className="text-gray-700 dark:text-gray-200">{t.label}</span>
                        {themeIndex === i && (
                          <span className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: t.accent }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl text-sm">
            Select a translation, book, and chapter to read.
          </p>
        </div>

        {/* Translation selector — collapsible, with inline parallel toggle */}
        <div
          ref={translationRef}
          className="border rounded-xl mb-1.5 scroll-mt-20 transition-colors overflow-hidden"
          style={{ backgroundColor: theme.bg, borderColor: theme.border }}
        >
          <div className="w-full flex items-center justify-between px-3 py-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setTranslationOpen(o => !o)}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.text, opacity: 0.6 }}>Translation</h2>
                <span className="text-xs font-bold" style={{ color: theme.text, opacity: 0.8 }}>
                  {TRANSLATION_INFO[translation].label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${translationOpen ? 'rotate-180' : ''}`}
                  style={{ color: theme.text, opacity: 0.5 }}
                />
              </button>
              {/* Parallel toggle — always visible, inline beside translation */}
              <button
                onClick={toggleParallel}
                className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border transition-all"
                style={parallelBtnStyle(parallelMode)}
              >
                <Columns2 className="w-3.5 h-3.5" />
                Parallel {parallelMode ? 'On' : 'Off'}
              </button>
            </div>
            <span className="text-xs font-medium hidden sm:block" style={{ color: theme.text, opacity: 0.5 }}>
              {TRANSLATION_INFO[translation].full}
            </span>
          </div>
          {translationOpen && (
            <div className="px-3 pb-2">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(['kjv', 'niv', 'esv', 'nasb', 'nlt'] as Translation[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTranslationChange(t)}
                    className="flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-lg border font-semibold text-xs transition-all"
                    style={
                      translation === t
                        ? { borderColor: theme.accent, backgroundColor: theme.accentLight, color: theme.accentText }
                        : { borderColor: theme.border, color: theme.text, opacity: 0.7 }
                    }
                  >
                    <span className="text-sm font-bold">{TRANSLATION_INFO[t].label}</span>
                    <span className="text-[9px] font-medium opacity-70 text-center leading-tight">{TRANSLATION_INFO[t].full}</span>
                  </button>
                ))}
              </div>

              {parallelMode && (
                <>
                  <div className="mt-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.parallelText }}>Parallel Translation</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {(['kjv', 'niv', 'esv', 'nasb', 'nlt'] as Translation[])
                      .filter((t) => t !== translation)
                      .map((t) => (
                        <button
                          key={t}
                          onClick={() => handleParallelTranslationChange(t)}
                          className="flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-lg border font-semibold text-xs transition-all"
                          style={
                            parallelTranslation === t
                              ? { borderColor: theme.parallel, backgroundColor: theme.parallelLight, color: theme.parallelText }
                              : { borderColor: theme.border, color: theme.text, opacity: 0.7 }
                          }
                        >
                          <span className="text-sm font-bold">{TRANSLATION_INFO[t].label}</span>
                          <span className="text-[9px] font-medium opacity-70 text-center leading-tight">{TRANSLATION_INFO[t].full}</span>
                        </button>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Select Passage — full width */}
        <div
          className="border rounded-xl p-2 mb-1.5 transition-colors"
          style={{ backgroundColor: theme.bg, borderColor: theme.border }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: theme.text, opacity: 0.6 }}>Select Passage</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: theme.text, opacity: 0.7 }}>Old Testament</p>
              <div className="relative">
                <select
                  value={BOOKS_OT.includes(selectedBook) ? selectedBook : ''}
                  onChange={(e) => e.target.value && handleBookChange(e.target.value)}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2"
                  style={{ backgroundColor: theme.selectBg, borderColor: theme.selectBorder, color: theme.text }}
                >
                  {!BOOKS_OT.includes(selectedBook) && <option value="">-- Select --</option>}
                  {BOOKS_OT.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: theme.text, opacity: 0.4 }} />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: theme.text, opacity: 0.7 }}>New Testament</p>
              <div className="relative">
                <select
                  value={BOOKS_NT.includes(selectedBook) ? selectedBook : ''}
                  onChange={(e) => e.target.value && handleBookChange(e.target.value)}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2"
                  style={{ backgroundColor: theme.selectBg, borderColor: theme.selectBorder, color: theme.text }}
                >
                  {!BOOKS_NT.includes(selectedBook) && <option value="">-- Select --</option>}
                  {BOOKS_NT.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: theme.text, opacity: 0.4 }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1" style={{ color: theme.text, opacity: 0.7 }}>Chapter</label>
              <div className="relative">
                <select
                  value={selectedChapter}
                  onChange={(e) => handleChapterChange(Number(e.target.value))}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2"
                  style={{ backgroundColor: theme.selectBg, borderColor: theme.selectBorder, color: theme.text }}
                >
                  {chapters.map((c) => (
                    <option key={c} value={c}>Chapter {c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: theme.text, opacity: 0.4 }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1" style={{ color: theme.text, opacity: 0.7 }}>Verse</label>
              <div className="relative">
                <select
                  value={selectedVerse ?? ''}
                  onChange={(e) => handleVerseSelect(Number(e.target.value))}
                  disabled={!loaded || verses.length === 0}
                  className="w-full border rounded-lg px-2 py-1.5 text-sm appearance-none pr-7 focus:outline-none focus:ring-2 disabled:opacity-50"
                  style={{ backgroundColor: theme.selectBg, borderColor: theme.selectBorder, color: theme.text }}
                >
                  <option value="" disabled>Select verse</option>
                  {verses.map((v) => (
                    <option key={v.verse} value={v.verse}>Verse {v.verse}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: theme.text, opacity: 0.4 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main reading pane — full width */}
        <div
          className="border rounded-xl min-h-[400px] transition-colors"
          style={{ backgroundColor: theme.bg, borderColor: theme.border }}
        >
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: theme.accent }} />
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
                </div>
              </div>
            </div>
          )}

          {!loading && !error && loaded && verses.length > 0 && (
            <>
              <div className="px-3 pt-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: theme.text }}>
                      {loadedBook} {loadedChapter}
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: theme.text, opacity: 0.5 }}>
                      {info.full} &mdash; {verses.length} verses
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                    {/* Parallel toggle — synced clone, beside notebook */}
                    <button
                      onClick={toggleParallel}
                      className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border transition-all mt-0.5"
                      style={parallelBtnStyle(parallelMode)}
                    >
                      <Columns2 className="w-3.5 h-3.5" />
                      {parallelMode ? 'Parallel On' : 'Parallel'}
                    </button>
                    <button
                      onClick={() => setNotepadOpen(true)}
                      className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border transition-colors mt-0.5"
                      style={{ backgroundColor: theme.accentLight, color: theme.accentText, borderColor: theme.accentBorder }}
                    >
                      <NotebookPen className="w-3.5 h-3.5" />
                      Notebook
                      {notebook.savedVerses.length > 0 && (
                        <span className="ml-0.5 text-[10px] rounded-full px-1.5 py-0.5 leading-none text-white" style={{ backgroundColor: theme.accent }}>
                          {notebook.savedVerses.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setOverviewOpen(true)}
                      className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border transition-colors mt-0.5"
                      style={{ backgroundColor: theme.accentLight, color: theme.accentText, borderColor: theme.accentBorder }}
                    >
                      <Map className="w-3.5 h-3.5" />
                      {loadedBook} Overview
                    </button>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border mt-0.5" style={{ backgroundColor: theme.accentLight, color: theme.accentText, borderColor: theme.accentBorder }}>
                      {info.label}
                    </span>
                  </div>
                </div>
              </div>
              {parallelMode && parallelLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" style={{ color: theme.parallel }} />
                  <span className="ml-2 text-sm text-gray-400">Loading parallel translation...</span>
                </div>
              )}

              {parallelMode && !parallelLoading && parallelVerses.length > 0 ? (
                <div ref={scrollContainerRef} className="px-3 py-1.5 max-h-[calc(65vh+150px)] overflow-y-auto">
                  {/* Column headers — bigger, bolder, standing out */}
                  <div className="flex gap-3 mb-3 pb-2 border-b sticky top-0" style={{ borderColor: theme.border, backgroundColor: theme.bg }}>
                    <span className="w-7 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-lg border" style={{ backgroundColor: theme.accentLight, color: theme.accentText, borderColor: theme.accentBorder }}>
                        {TRANSLATION_INFO[loadedTranslation].label}
                        <span className="text-[10px] font-medium opacity-60 hidden sm:inline">{TRANSLATION_INFO[loadedTranslation].full}</span>
                      </span>
                    </div>
                    <span className="w-px flex-shrink-0 self-stretch" style={{ backgroundColor: theme.border }} />
                    <div className="flex-1 min-w-0">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-lg border" style={{ backgroundColor: theme.parallelLight, color: theme.parallelText, borderColor: theme.parallelBorder }}>
                        {TRANSLATION_INFO[parallelTranslation].label}
                        <span className="text-[10px] font-medium opacity-60 hidden sm:inline">{TRANSLATION_INFO[parallelTranslation].full}</span>
                      </span>
                    </div>
                  </div>
                  {verses.map(({ verse, text }) => {
                    const hlList = notebook.getHighlightsForVerse(loadedBook, loadedChapter, verse);
                    const fullHl = hlList.find((h) => !h.highlighted_text);
                    const partialHls = hlList.filter((h) => h.highlighted_text);
                    const hlColor = fullHl ? (fullHl.color as HighlightColor) : null;
                    const hlBg = hlColor ? HIGHLIGHT_COLORS[hlColor].text : '';

                    let renderedText: React.ReactNode = text;
                    if (partialHls.length > 0) {
                      const parts: React.ReactNode[] = [];
                      let remaining = text;
                      let keyIdx = 0;
                      const sorted = [...partialHls].sort((a, b) => {
                        const ia = remaining.indexOf(a.highlighted_text!);
                        const ib = remaining.indexOf(b.highlighted_text!);
                        return (ia === -1 ? 9999 : ia) - (ib === -1 ? 9999 : ib);
                      });
                      for (const hl of sorted) {
                        const idx = remaining.indexOf(hl.highlighted_text!);
                        if (idx === -1) continue;
                        if (idx > 0) parts.push(<span key={keyIdx++}>{remaining.slice(0, idx)}</span>);
                        const c = hl.color as HighlightColor;
                        parts.push(<mark key={keyIdx++} className={`${HIGHLIGHT_COLORS[c].text} rounded px-0.5`}>{hl.highlighted_text}</mark>);
                        remaining = remaining.slice(idx + hl.highlighted_text!.length);
                      }
                      if (remaining) parts.push(<span key={keyIdx++}>{remaining}</span>);
                      renderedText = <>{parts}</>;
                    }

                    const pv = parallelVerses.find((v) => v.verse === verse);

                    return (
                      <div
                        key={verse}
                        id={`verse-${verse}`}
                        className={`flex gap-3 group rounded-lg px-2 py-1 -mx-2 transition-colors cursor-pointer mb-1 ${
                          hlBg
                        } ${
                          selectedVerse === verse && !hlBg ? 'bg-emerald-100/60' : ''
                        } ${!hlBg ? 'hover:bg-black/5' : ''}`}
                        onMouseUp={(e) => {
                          const sel = window.getSelection();
                          const selectedText = sel && sel.toString().trim().length > 0 ? sel.toString().trim() : null;
                          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          openVersePopup(verse, rect, selectedText);
                        }}
                      >
                        <span className="text-xs font-bold w-7 flex-shrink-0 pt-0.5 text-right tabular-nums select-none" style={{ color: theme.verseNum }}>
                          {verse}
                        </span>
                        <p className="leading-relaxed flex-1 min-w-0 text-sm sm:text-base" style={{ color: theme.text }}>
                          {renderedText}
                        </p>
                        <span className="w-px flex-shrink-0 self-stretch" style={{ backgroundColor: theme.border }} />
                        <p className="leading-relaxed flex-1 min-w-0 text-sm sm:text-base" style={{ color: theme.text, opacity: 0.85 }}>
                          {pv ? pv.text : '—'}
                        </p>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t" style={{ borderColor: theme.border }}>
                    <button
                      onClick={() => handleNavigate('prev')}
                      disabled={!prevChapter}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ borderColor: theme.border, color: theme.text }}
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
                      style={{ borderColor: theme.border, color: theme.text }}
                    >
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wide opacity-60">Next</p>
                        <p className="text-sm font-bold">{nextChapter ? `${nextChapter.book} ${nextChapter.chapter}` : '—'}</p>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
              <div ref={scrollContainerRef} className="px-3 py-1.5 space-y-1 max-h-[calc(65vh+150px)] overflow-y-auto">
                {verses.map(({ verse, text }) => {
                  const hlList = notebook.getHighlightsForVerse(loadedBook, loadedChapter, verse);
                  const fullHl = hlList.find((h) => !h.highlighted_text);
                  const partialHls = hlList.filter((h) => h.highlighted_text);
                  const hlColor = fullHl ? (fullHl.color as HighlightColor) : null;
                  const hlBg = hlColor ? HIGHLIGHT_COLORS[hlColor].text : '';

                  let renderedText: React.ReactNode = text;
                  if (partialHls.length > 0) {
                    const parts: React.ReactNode[] = [];
                    let remaining = text;
                    let keyIdx = 0;
                    const sorted = [...partialHls].sort((a, b) => {
                      const ia = remaining.indexOf(a.highlighted_text!);
                      const ib = remaining.indexOf(b.highlighted_text!);
                      return (ia === -1 ? 9999 : ia) - (ib === -1 ? 9999 : ib);
                    });
                    for (const hl of sorted) {
                      const idx = remaining.indexOf(hl.highlighted_text!);
                      if (idx === -1) continue;
                      if (idx > 0) {
                        parts.push(<span key={keyIdx++}>{remaining.slice(0, idx)}</span>);
                      }
                      const c = hl.color as HighlightColor;
                      parts.push(
                        <mark key={keyIdx++} className={`${HIGHLIGHT_COLORS[c].text} rounded px-0.5`}>
                          {hl.highlighted_text}
                        </mark>
                      );
                      remaining = remaining.slice(idx + hl.highlighted_text!.length);
                    }
                    if (remaining) parts.push(<span key={keyIdx++}>{remaining}</span>);
                    renderedText = <>{parts}</>;
                  }

                  return (
                  <div
                    key={verse}
                    id={`verse-${verse}`}
                    className={`flex gap-3 group rounded-lg px-2 py-1 -mx-2 transition-colors cursor-pointer ${
                      hlBg
                    } ${
                      selectedVerse === verse && !hlBg ? 'bg-emerald-100/60' : ''
                    } ${!hlBg ? 'hover:bg-black/5' : ''}`}
                    onMouseUp={(e) => {
                      const sel = window.getSelection();
                      const selectedText = sel && sel.toString().trim().length > 0 ? sel.toString().trim() : null;
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      openVersePopup(verse, rect, selectedText);
                    }}
                  >
                    <span className="text-xs font-bold w-7 flex-shrink-0 pt-0.5 text-right tabular-nums select-none" style={{ color: theme.verseNum }}>
                      {verse}
                    </span>
                    <p className="leading-relaxed flex-1 text-base" style={{ color: theme.text }}>
                      {renderedText}
                    </p>
                  </div>
                  );
                })}

                {/* Next / Previous chapter navigation */}
                <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t" style={{ borderColor: theme.border }}>
                  <button
                    onClick={() => handleNavigate('prev')}
                    disabled={!prevChapter}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ borderColor: theme.border, color: theme.text }}
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
                    style={{ borderColor: theme.border, color: theme.text }}
                  >
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wide opacity-60">Next</p>
                      <p className="text-sm font-bold">{nextChapter ? `${nextChapter.book} ${nextChapter.chapter}` : '—'}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              )}
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

      <NotepadPanel
        open={notepadOpen}
        onClose={() => setNotepadOpen(false)}
        savedVerses={notebook.savedVerses}
        onRemove={notebook.removeSavedVerse}
        onUpdateNote={notebook.updateNote}
      />

      {versePopup && (
        <VerseActionPopup
          anchorRect={versePopup.rect}
          book={loadedBook}
          chapter={loadedChapter}
          verse={versePopup.verse}
          verseText={versePopup.text}
          translation={loadedTranslation}
          currentHighlightColor={currentHighlightColor}
          selectedText={versePopup.selectedText}
          onHighlight={(color, highlightedText) => {
            notebook.toggleHighlight(loadedBook, loadedChapter, versePopup.verse, color, highlightedText);
          }}
          onRemoveHighlight={() => {
            notebook.removeHighlight(loadedBook, loadedChapter, versePopup.verse);
          }}
          onSave={() => {
            notebook.saveVerse({
              book: loadedBook,
              chapter: loadedChapter,
              verse: versePopup.verse,
              verse_text: versePopup.text,
              translation: loadedTranslation,
            });
          }}
          onClose={() => setVersePopup(null)}
        />
      )}
    </>
  );
}
