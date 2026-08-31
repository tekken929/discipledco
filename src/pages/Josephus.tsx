import { useState } from 'react';
import { ScrollText, ChevronLeft, ChevronRight, Check, X, BookOpen, FileText } from 'lucide-react';
import { josephusContent, type JosephusSection } from '../data/josephus';

type View = 'preface' | 'chapter';

export function Josephus() {
  const [view, setView] = useState<View>('preface');
  const [chapterIdx, setChapterIdx] = useState(0);
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [rejected, setRejected] = useState<Set<string>>(new Set());

  const chapters = josephusContent.chapters;
  const chapter = chapters[chapterIdx];
  const hasPrev = view === 'chapter' && (chapterIdx > 0 || true);
  const hasNext = view === 'chapter' && (chapterIdx < chapters.length - 1 || view === 'preface');

  function getKey(section: number): string {
    if (view === 'preface') return `preface-${section}`;
    return `ch${chapter.chapter}-${section}`;
  }

  function toggleApproved(key: string) {
    setApproved((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else {
        next.add(key);
        setRejected((r) => {
          const nr = new Set(r);
          nr.delete(key);
          return nr;
        });
      }
      return next;
    });
  }

  function toggleRejected(key: string) {
    setRejected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else {
        next.add(key);
        setApproved((a) => {
          const na = new Set(a);
          na.delete(key);
          return na;
        });
      }
      return next;
    });
  }

  function renderSection(sec: JosephusSection, key: string) {
    const isApproved = approved.has(key);
    const isRejected = rejected.has(key);
    return (
      <div
        key={key}
        className={`grid md:grid-cols-2 gap-4 rounded-xl border p-4 transition-all ${
          isApproved
            ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10'
            : isRejected
            ? 'border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10'
            : 'border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
        }`}
      >
        <div className="flex gap-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 w-7 flex-shrink-0 pt-0.5 text-right tabular-nums select-none">
            {sec.section}
          </span>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-sm">
            {sec.original}
          </p>
        </div>
        <div className="flex gap-3 md:border-l md:border-stone-200 dark:md:border-gray-700 md:pl-4">
          <div className="flex-1">
            <p className="leading-relaxed text-gray-900 dark:text-gray-100 text-sm font-medium">
              {sec.translation}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            <button
              onClick={() => toggleApproved(key)}
              title="Approve this translation"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isApproved
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
              }`}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleRejected(key)}
              title="Needs revision"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isRejected
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sections: JosephusSection[] =
    view === 'preface' ? josephusContent.preface.sections : chapter.sections;
  const totalSections = sections.length;
  const approvedCount = sections.filter((s) => approved.has(getKey(s.section))).length;
  const rejectedCount = sections.filter((s) => rejected.has(getKey(s.section))).length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 mb-4">
          <ScrollText className="w-7 h-7 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">
          Antiquities of the Jews
        </h1>
        <p className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
          Flavius Josephus
        </p>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-px bg-amber-400/50" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          A modern NIV-style translation of Josephus&apos;s historical account, presented alongside the original Whiston translation for your review.
        </p>
      </div>

      {/* Tab selector: Preface + Chapters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setView('preface')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
            view === 'preface'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-stone-200 dark:hover:bg-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Preface
        </button>
        {chapters.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => {
              setChapterIdx(idx);
              setView('chapter');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              view === 'chapter' && chapterIdx === idx
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-stone-200 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Ch {ch.chapter}
          </button>
        ))}
      </div>

      {/* Chapter title */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {view === 'preface'
            ? josephusContent.preface.title
            : `Book ${chapter.book}, Chapter ${chapter.chapter}: ${chapter.title}`}
        </h2>
      </div>

      {/* Approval summary bar */}
      <div className="flex items-center justify-center gap-4 mb-6 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <Check className="w-3.5 h-3.5" />
          {approvedCount} Approved
        </span>
        <span className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
          <X className="w-3.5 h-3.5" />
          {rejectedCount} Needs Revision
        </span>
        <span className="text-gray-400 dark:text-gray-500">
          {totalSections - approvedCount - rejectedCount} Pending
        </span>
      </div>

      {/* Column headers */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 mb-3 px-2">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Original (Whiston Translation)
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Modern Translation (NIV-style)
        </div>
      </div>

      {/* Side-by-side sections */}
      <div className="space-y-3">
        {sections.map((sec) => renderSection(sec, getKey(sec.section)))}
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-stone-200 dark:border-gray-700">
        <button
          onClick={() => {
            if (view === 'preface') return;
            if (chapterIdx > 0) {
              setChapterIdx(chapterIdx - 1);
            } else {
              setView('preface');
            }
          }}
          disabled={view === 'preface'}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-gray-700 font-semibold text-sm text-gray-600 dark:text-gray-400 hover:bg-stone-50 dark:hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          {view === 'chapter' && chapterIdx === 0 ? 'Preface' : 'Previous'}
        </button>
        <button
          onClick={() => {
            if (view === 'preface') {
              setChapterIdx(0);
              setView('chapter');
            } else if (chapterIdx < chapters.length - 1) {
              setChapterIdx(chapterIdx + 1);
            }
          }}
          disabled={view === 'chapter' && chapterIdx >= chapters.length - 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-gray-700 font-semibold text-sm text-gray-600 dark:text-gray-400 hover:bg-stone-50 dark:hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {view === 'preface' ? 'Chapter 1' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
