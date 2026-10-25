import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Menu as MenuIcon,
  X,
  Columns2,
  Maximize2,
  Minimize2,
  Search,
  Type,
  Moon,
  Sun,
  FileText,
  Scroll,
  AlertCircle,
  BookMarked,
  Info,
} from 'lucide-react';
import { fetchBibleChapter, type BibleVerse, type Translation, TRANSLATION_LABELS } from '../lib/bibleApi';
import {
  loadSeptuagintIndex,
  fetchLxxChapter,
  getAdjacentLxxChapter,
  getLxxBookName,
  type LxxIndex,
  type LxxVerse,
  type LxxChapter,
} from '../lib/septuagintParser';
import {
  SEPTUAGINT_CORRESPONDENCE,
  getCorrespondence,
  STATUS_LABELS,
  STATUS_COLORS,
  type CorrespondenceStatus,
} from '../data/septuagintMapping';
import '../septuagint.css';

type ReadingMode = 'light' | 'sepia' | 'dark';
type SidebarView = 'books' | 'toc';

interface PaneState {
  osisId: string;
  chapter: number;
}

const MODERN_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
  'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi',
];

const MODERN_CHAPTER_COUNTS: Record<string, number> = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
  Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31,
  Ecclesiastes: 12, 'Song of Solomon': 8, Isaiah: 66, Jeremiah: 52,
  Lamentations: 5, Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9,
  Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3, Habakkuk: 3, Zephaniah: 3,
  Haggai: 2, Zechariah: 14, Malachi: 4,
};

export function Septuagint() {
  const [index, setIndex] = useState<LxxIndex | null>(null);
  const [indexError, setIndexError] = useState<string | null>(null);

  const [leftPane, setLeftPane] = useState<PaneState>({ osisId: 'Gen', chapter: 1 });
  const [rightPane, setRightPane] = useState<PaneState>({ osisId: 'Gen', chapter: 1 });
  const [rightTranslation, setRightTranslation] = useState<Translation>('kjv');

  const [lxxVerses, setLxxVerses] = useState<LxxVerse[]>([]);
  const [lxxLoading, setLxxLoading] = useState(false);
  const [lxxError, setLxxError] = useState<string | null>(null);

  const [modernVerses, setModernVerses] = useState<BibleVerse[]>([]);
  const [modernLoading, setModernLoading] = useState(false);
  const [modernError, setModernError] = useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>('books');
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [bookSearch, setBookSearch] = useState('');

  const [readingMode, setReadingMode] = useState<ReadingMode>('light');
  const [fontSize, setFontSize] = useState(18);
  const [showVerseNums, setShowVerseNums] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [linkedNav, setLinkedNav] = useState(true);
  const [focusedPane, setFocusedPane] = useState<'both' | 'left' | 'right'>('both');

  const [dividerPos, setDividerPos] = useState(50);
  const [tocCompareBook, setTocCompareBook] = useState<string>('');

  const draggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const [hoveredNote, setHoveredNote] = useState<{ text: string; x: number; y: number } | null>(null);

  // Load index on mount
  useEffect(() => {
    loadSeptuagintIndex()
      .then(idx => {
        setIndex(idx);
        setExpandedBook(idx.books[0]?.osisId || null);
      })
      .catch(err => {
        setIndexError(err instanceof Error ? err.message : 'Could not load the Septuagint data.');
      });
  }, []);

  // Fetch LXX chapter
  useEffect(() => {
    if (!index) return;
    setLxxLoading(true);
    setLxxError(null);
    setLxxVerses([]);
    fetchLxxChapter(leftPane.osisId, leftPane.chapter)
      .then(ch => {
        if (ch) setLxxVerses(ch.verses);
        else setLxxError('This chapter was not found in the Septuagint file.');
      })
      .catch(() => setLxxError('Could not load this chapter.'))
      .finally(() => setLxxLoading(false));
  }, [index, leftPane]);

  // Fetch modern Bible chapter (right pane)
  useEffect(() => {
    if (!index) return;
    const corr = getCorrespondence(rightPane.osisId);
    const modernBook = corr?.modernBook;
    if (!modernBook) {
      setModernVerses([]);
      setModernError(null);
      return;
    }
    setModernLoading(true);
    setModernError(null);
    setModernVerses([]);
    fetchBibleChapter(modernBook, rightPane.chapter, rightTranslation)
      .then(data => setModernVerses(data))
      .catch(err => {
        setModernError(err instanceof Error ? err.message : 'Could not load this chapter.');
      })
      .finally(() => setModernLoading(false));
  }, [index, rightPane, rightTranslation]);

  // Linked navigation: when left pane changes and linked, update right pane
  const navigateLeft = useCallback((osisId: string, chapter: number) => {
    setLeftPane({ osisId, chapter });
    if (linkedNav) {
      setRightPane({ osisId, chapter });
    }
    setExpandedBook(osisId);
  }, [linkedNav]);

  const navigateRight = useCallback((osisId: string, chapter: number) => {
    setRightPane({ osisId, chapter });
  }, []);

  // Divider drag
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setDividerPos(Math.max(25, Math.min(75, pct)));
    }
    function onUp() {
      draggingRef.current = false;
      document.body.style.cursor = '';
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  const filteredBooks = useMemo(() => {
    if (!index) return [];
    if (!bookSearch.trim()) return index.books;
    const q = bookSearch.toLowerCase();
    return index.books.filter(b => b.name.toLowerCase().includes(q) || b.osisId.toLowerCase().includes(q));
  }, [index, bookSearch]);

  const leftBookName = index ? getLxxBookName(index, leftPane.osisId) : '';
  const rightBookName = index ? getLxxBookName(index, rightPane.osisId) : '';
  const rightCorr = getCorrespondence(rightPane.osisId);
  const rightModernBook = rightCorr?.modernBook || null;

  const leftAdj = index ? getAdjacentLxxChapter(index, leftPane.osisId, leftPane.chapter, 'prev') : null;
  const leftAdjNext = index ? getAdjacentLxxChapter(index, leftPane.osisId, leftPane.chapter, 'next') : null;

  const rightModernChapterCount = rightModernBook ? MODERN_CHAPTER_COUNTS[rightModernBook] || 1 : 0;

  const alignmentNote = useMemo(() => {
    if (!rightCorr) return null;
    if (rightCorr.status === 'different_placement') return rightCorr.note || 'Passage alignment may differ.';
    if (rightCorr.status === 'additional') return rightCorr.note || 'This book has no corresponding text in the selected modern edition.';
    if (rightCorr.status === 'different_title') return rightCorr.note;
    return null;
  }, [rightCorr]);

  if (indexError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-gray-950 px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Could not load the Septuagint</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{indexError}</p>
        </div>
      </div>
    );
  }

  if (!index) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-amber-500 mx-auto mb-3 animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400 lxx-sans">Loading the Septuagint…</p>
        </div>
      </div>
    );
  }

  const ChapterContent = ({ verses, loading, error, isLxx }: {
    verses: { verse: number; text: string; notes?: string[] }[];
    loading: boolean;
    error: string | null;
    isLxx: boolean;
  }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center py-16 px-6 text-center">
          <div>
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <p className="text-sm" style={{ color: 'var(--lxx-muted)' }}>{error}</p>
          </div>
        </div>
      );
    }
    if (verses.length === 0) {
      return (
        <div className="flex items-center justify-center py-16 px-6 text-center">
          <div>
            <Info className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--lxx-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--lxx-muted)' }}>
              {isLxx
                ? 'No text available for this passage in the Septuagint file.'
                : rightModernBook
                ? 'No text found for this passage in the selected translation.'
                : 'This book has no corresponding text in the selected modern edition.'}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="lxx-serif" style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
        {verses.map((v) => (
          <div key={v.verse} className="lxx-verse-row" id={`v-${isLxx ? 'lxx' : 'mod'}-${v.verse}`}>
            {showVerseNums && <span className="lxx-verse-num">{v.verse}</span>}
            <span className="lxx-verse-text">
              {v.text}
              {showNotes && isLxx && v.notes && v.notes.length > 0 && v.notes.map((note, i) => (
                <span
                  key={i}
                  className="lxx-note"
                  onMouseEnter={(e) => setHoveredNote({ text: note, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHoveredNote(null)}
                >
                  [{i + 1}]
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const Sidebar = () => (
    <div className="lxx-sidebar lxx-sans flex flex-col h-full" style={{ background: 'var(--lxx-sidebar-bg)' }}>
      {/* Sidebar header */}
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--lxx-border)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Scroll className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--lxx-accent)' }} />
          <h2 className="text-sm font-bold" style={{ color: 'var(--lxx-text)' }}>Septuagint</h2>
        </div>
        {/* View toggle */}
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--lxx-bg)' }}>
          <button
            onClick={() => setSidebarView('books')}
            className={`lxx-toolbar-btn flex-1 ${sidebarView === 'books' ? 'active' : ''}`}
            style={{ fontSize: '0.72rem' }}
          >
            <BookOpen className="w-3.5 h-3.5" /> Books
          </button>
          <button
            onClick={() => setSidebarView('toc')}
            className={`lxx-toolbar-btn flex-1 ${sidebarView === 'toc' ? 'active' : ''}`}
            style={{ fontSize: '0.72rem' }}
          >
            <Columns2 className="w-3.5 h-3.5" /> Compare
          </button>
        </div>
      </div>

      {/* Search */}
      {sidebarView === 'books' && (
        <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--lxx-border)' }}>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--lxx-muted)' }} />
            <input
              type="text"
              value={bookSearch}
              onChange={e => setBookSearch(e.target.value)}
              placeholder="Search books…"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs lxx-sans"
              style={{
                background: 'var(--lxx-surface)',
                border: '1px solid var(--lxx-border)',
                color: 'var(--lxx-text)',
              }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto lxx-scroll">
        {sidebarView === 'books' ? (
          <div className="py-1">
            {filteredBooks.map(book => {
              const corr = getCorrespondence(book.osisId);
              const isActive = leftPane.osisId === book.osisId;
              const isExpanded = expandedBook === book.osisId;
              return (
                <div key={book.osisId}>
                  <button
                    onClick={() => {
                      setExpandedBook(isExpanded ? null : book.osisId);
                      navigateLeft(book.osisId, 1);
                    }}
                    className={`lxx-sidebar-book w-full text-left px-4 py-2 flex items-center gap-2 border-l-2 ${isActive ? 'active' : ''}`}
                    style={{ borderColor: isActive ? 'var(--lxx-accent)' : 'transparent' }}
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                      style={{ color: 'var(--lxx-muted)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--lxx-text)' }}>
                        {book.name}
                      </p>
                      {corr && corr.status !== 'matching' && (
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--lxx-muted)' }}>
                          {STATUS_LABELS[corr.status]}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--lxx-muted)' }}>
                      {book.chapterCount}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-4 py-2 flex flex-wrap gap-1.5" style={{ background: 'var(--lxx-bg)' }}>
                      {book.chapters.map(ch => (
                        <button
                          key={ch}
                          onClick={() => navigateLeft(book.osisId, ch)}
                          className={`lxx-chapter-pill ${leftPane.osisId === book.osisId && leftPane.chapter === ch ? 'active' : ''}`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredBooks.length === 0 && (
              <p className="text-xs px-4 py-6 text-center" style={{ color: 'var(--lxx-muted)' }}>
                No books match your search.
              </p>
            )}
          </div>
        ) : (
          <TOCComparison />
        )}
      </div>
    </div>
  );

  const TOCComparison = () => (
    <div className="px-3 py-3 space-y-2">
      <div className="mb-3 px-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--lxx-muted)' }}>
          Books in this Septuagint edition
        </p>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--lxx-muted)' }}>
          {index.editionName}. Compare with a modern Bible edition below.
        </p>
      </div>

      {/* Comparison edition selector */}
      <div className="mb-3 px-1">
        <label className="text-[10px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--lxx-muted)' }}>
          Compare with
        </label>
        <select
          value={tocCompareBook}
          onChange={e => setTocCompareBook(e.target.value)}
          className="w-full px-2 py-1.5 rounded-lg text-xs lxx-sans"
          style={{
            background: 'var(--lxx-surface)',
            border: '1px solid var(--lxx-border)',
            color: 'var(--lxx-text)',
          }}
        >
          <option value="">All modern Bible books</option>
          {Object.entries(TRANSLATION_LABELS).map(([key, info]) => (
            <option key={key} value={key}>{info.full}</option>
          ))}
        </select>
      </div>

      {SEPTUAGINT_CORRESPONDENCE.map((corr, i) => {
        const lxxBook = index.bookMap.get(corr.lxxId);
        const hasModern = !!corr.modernBook;
        return (
          <button
            key={corr.lxxId}
            onClick={() => {
              navigateLeft(corr.lxxId, 1);
              setSidebarView('books');
              setExpandedBook(corr.lxxId);
            }}
            className="w-full text-left rounded-lg p-2.5 transition-all hover:shadow-sm"
            style={{
              background: 'var(--lxx-surface)',
              border: '1px solid var(--lxx-border)',
            }}
          >
            <div className="flex items-start gap-2 mb-1">
              <span className="text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ color: 'var(--lxx-muted)' }}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--lxx-text)' }}>
                  {corr.lxxName}
                </p>
                {hasModern && corr.modernBook !== corr.lxxName && (
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--lxx-muted)' }}>
                    ≈ {corr.modernBook}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`lxx-status-badge ${STATUS_COLORS[corr.status]}`}>
                {STATUS_LABELS[corr.status]}
              </span>
              {!hasModern && (
                <span className="text-[10px]" style={{ color: 'var(--lxx-muted)' }}>
                  Not in modern edition
                </span>
              )}
            </div>
            {corr.note && (
              <p className="text-[10px] mt-1.5 leading-relaxed" style={{ color: 'var(--lxx-muted)' }}>
                {corr.note}
              </p>
            )}
            {lxxBook && (
              <p className="text-[10px] mt-1" style={{ color: 'var(--lxx-muted)' }}>
                {lxxBook.chapterCount} chapter{lxxBook.chapterCount !== 1 ? 's' : ''}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );

  const Toolbar = () => (
    <div
      className="flex items-center gap-1 px-3 py-2 border-b lxx-sans flex-wrap"
      style={{ background: 'var(--lxx-surface)', borderColor: 'var(--lxx-border)' }}
    >
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lxx-toolbar-btn" title="Toggle sidebar">
        <MenuIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-5 mx-0.5" style={{ background: 'var(--lxx-border)' }} />

      <button
        onClick={() => setFocusedPane(focusedPane === 'both' ? 'left' : 'both')}
        className={`lxx-toolbar-btn ${focusedPane !== 'both' ? 'active' : ''}`}
        title="Toggle panes"
      >
        {focusedPane === 'both' ? <Columns2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        <span className="hidden sm:inline">{focusedPane === 'both' ? 'Dual' : 'Single'}</span>
      </button>

      <button
        onClick={() => setLinkedNav(!linkedNav)}
        className={`lxx-toolbar-btn ${linkedNav ? 'active' : ''}`}
        title="Linked navigation"
      >
        <BookMarked className="w-4 h-4" />
        <span className="hidden sm:inline">Linked</span>
      </button>

      <div className="w-px h-5 mx-0.5" style={{ background: 'var(--lxx-border)' }} />

      {/* Font size */}
      <button
        onClick={() => setFontSize(Math.max(14, fontSize - 2))}
        className="lxx-toolbar-btn"
        title="Decrease font size"
      >
        <Type className="w-3.5 h-3.5" />
        <span className="text-xs">A-</span>
      </button>
      <button
        onClick={() => setFontSize(Math.min(28, fontSize + 2))}
        className="lxx-toolbar-btn"
        title="Increase font size"
      >
        <Type className="w-4 h-4" />
        <span className="text-xs">A+</span>
      </button>

      <button
        onClick={() => setShowVerseNums(!showVerseNums)}
        className={`lxx-toolbar-btn ${showVerseNums ? 'active' : ''}`}
        title="Verse numbers"
      >
        <span className="text-xs">v.</span>
      </button>

      <button
        onClick={() => setShowNotes(!showNotes)}
        className={`lxx-toolbar-btn ${showNotes ? 'active' : ''}`}
        title="Footnotes"
      >
        <FileText className="w-4 h-4" />
      </button>

      <div className="w-px h-5 mx-0.5" style={{ background: 'var(--lxx-border)' }} />

      {/* Reading mode */}
      <button
        onClick={() => setReadingMode(readingMode === 'light' ? 'sepia' : readingMode === 'sepia' ? 'dark' : 'light')}
        className="lxx-toolbar-btn"
        title={`Reading mode: ${readingMode}`}
      >
        {readingMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        <span className="hidden sm:inline capitalize">{readingMode}</span>
      </button>

      <div className="flex-1" />

      <span className="text-xs hidden md:inline" style={{ color: 'var(--lxx-muted)' }}>
        Brenton's English Septuagint
      </span>
    </div>
  );

  const PaneHeader = ({ pane, isLeft }: { pane: PaneState; isLeft: boolean }) => {
    const corr = getCorrespondence(pane.osisId);
    const bookName = getLxxBookName(index, pane.osisId);

    if (isLeft) {
      const adjPrev = getAdjacentLxxChapter(index, pane.osisId, pane.chapter, 'prev');
      const adjNext = getAdjacentLxxChapter(index, pane.osisId, pane.chapter, 'next');
      return (
        <div className="px-4 py-2.5 border-b lxx-sans" style={{ borderColor: 'var(--lxx-border)' }}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--lxx-accent)' }}>LXX</span>
                <span className="text-xs" style={{ color: 'var(--lxx-muted)' }}>· English · Brenton</span>
              </div>
              <h3 className="text-sm font-bold truncate mt-0.5" style={{ color: 'var(--lxx-text)' }}>
                {bookName} {pane.chapter}
              </h3>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {adjPrev && (
                <button
                  onClick={() => navigateLeft(adjPrev.osisId, adjPrev.chapter)}
                  className="lxx-toolbar-btn"
                  title="Previous chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {adjNext && (
                <button
                  onClick={() => navigateLeft(adjNext.osisId, adjNext.chapter)}
                  className="lxx-toolbar-btn"
                  title="Next chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Right pane header
    const modernBook = corr?.modernBook;
    const adjPrev = leftAdj;
    const adjNext = leftAdjNext;
    return (
      <div className="px-4 py-2.5 border-b lxx-sans" style={{ borderColor: 'var(--lxx-border)' }}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            {/* Translation selector */}
            <div className="flex items-center gap-1.5 mb-1">
              <select
                value={rightTranslation}
                onChange={e => setRightTranslation(e.target.value as Translation)}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest lxx-sans"
                style={{
                  background: 'var(--lxx-surface)',
                  border: '1px solid var(--lxx-border)',
                  color: 'var(--lxx-accent)',
                }}
              >
                {Object.entries(TRANSLATION_LABELS).map(([key, info]) => (
                  <option key={key} value={key}>{info.label}</option>
                ))}
              </select>
              {modernBook && (
                <span className="text-[10px]" style={{ color: 'var(--lxx-muted)' }}>
                  {TRANSLATION_LABELS[rightTranslation].full}
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold truncate" style={{ color: 'var(--lxx-text)' }}>
              {modernBook ? `${modernBook} ${rightPane.chapter}` : `${bookName} — no modern equivalent`}
            </h3>
            {alignmentNote && (
              <p className="text-[10px] mt-0.5 leading-relaxed italic" style={{ color: 'var(--lxx-muted)' }}>
                {alignmentNote}
              </p>
            )}
          </div>
          {modernBook && (
            <div className="flex items-center gap-1 flex-shrink-0">
              {rightPane.chapter > 1 && (
                <button
                  onClick={() => navigateRight(rightPane.osisId, rightPane.chapter - 1)}
                  className="lxx-toolbar-btn"
                  title="Previous chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {rightPane.chapter < rightModernChapterCount && (
                <button
                  onClick={() => navigateRight(rightPane.osisId, rightPane.chapter + 1)}
                  className="lxx-toolbar-btn"
                  title="Next chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="lxx-page lxx-sans" data-reading-mode={readingMode}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lxx-overlay md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`lxx-sidebar-drawer ${sidebarOpen ? 'open' : ''} md:relative md:transform-none md:flex-shrink-0`}
          style={{ width: sidebarOpen ? '280px' : '0' }}
        >
          {sidebarOpen && <Sidebar />}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden" ref={containerRef}>
          <Toolbar />

          {/* Reading area */}
          <div className="flex-1 flex overflow-hidden">
            {focusedPane === 'both' ? (
              <>
                {/* Left pane — LXX */}
                <div
                  className="flex flex-col overflow-hidden"
                  style={{ width: `${dividerPos}%` }}
                >
                  <PaneHeader pane={leftPane} isLeft={true} />
                  <div
                    ref={leftScrollRef}
                    className="flex-1 overflow-y-auto lxx-scroll px-5 py-4"
                  >
                    <div className="lxx-pane rounded-xl p-5 sm:p-6 max-w-3xl mx-auto">
                      <ChapterContent
                        verses={lxxVerses}
                        loading={lxxLoading}
                        error={lxxError}
                        isLxx={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="lxx-divider"
                  onMouseDown={() => {
                    draggingRef.current = true;
                    document.body.style.cursor = 'col-resize';
                  }}
                />

                {/* Right pane — Modern Bible */}
                <div className="flex flex-col overflow-hidden flex-1">
                  <PaneHeader pane={rightPane} isLeft={false} />
                  <div
                    ref={rightScrollRef}
                    className="flex-1 overflow-y-auto lxx-scroll px-5 py-4"
                  >
                    <div className="lxx-pane rounded-xl p-5 sm:p-6 max-w-3xl mx-auto">
                      <ChapterContent
                        verses={modernVerses}
                        loading={modernLoading}
                        error={modernError}
                        isLxx={false}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Single pane (left/LXX focused)
              <div className="flex-1 flex flex-col overflow-hidden">
                <PaneHeader pane={leftPane} isLeft={true} />
                <div
                  ref={leftScrollRef}
                  className="flex-1 overflow-y-auto lxx-scroll px-5 py-4"
                >
                  <div className="lxx-pane rounded-xl p-5 sm:p-8 max-w-3xl mx-auto">
                    <ChapterContent
                      verses={lxxVerses}
                      loading={lxxLoading}
                      error={lxxError}
                      isLxx={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Note popup */}
      {hoveredNote && (
        <div
          className="lxx-note-popup lxx-sans"
          style={{
            left: Math.min(hoveredNote.x + 12, window.innerWidth - 300),
            top: hoveredNote.y + 12,
          }}
        >
          {hoveredNote.text}
        </div>
      )}
    </div>
  );
}
