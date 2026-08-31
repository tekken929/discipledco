import { useState } from 'react';
import { ScrollText, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { josephusData, type JosephusVerse } from '../data/josephus';

export function Josephus() {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [approved, setApproved] = useState<Set<number>>(new Set());
  const [rejected, setRejected] = useState<Set<number>>(new Set());

  const chapter = josephusData[chapterIdx];
  const hasPrev = chapterIdx > 0;
  const hasNext = chapterIdx < josephusData.length - 1;

  function toggleApproved(verse: number) {
    setApproved((prev) => {
      const next = new Set(prev);
      if (next.has(verse)) next.delete(verse);
      else {
        next.add(verse);
        setRejected((r) => {
          const nr = new Set(r);
          nr.delete(verse);
          return nr;
        });
      }
      return next;
    });
  }

  function toggleRejected(verse: number) {
    setRejected((prev) => {
      const next = new Set(prev);
      if (next.has(verse)) next.delete(verse);
      else {
        next.add(verse);
        setApproved((a) => {
          const na = new Set(a);
          na.delete(verse);
          return na;
        });
      }
      return next;
    });
  }

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

      {/* Chapter selector */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => hasPrev && setChapterIdx(chapterIdx - 1)}
          disabled={!hasPrev}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <div className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-800 border border-stone-200 dark:border-gray-700">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Book {chapter.book} · Chapter {chapter.chapter}
          </span>
        </div>
        <button
          onClick={() => hasNext && setChapterIdx(chapterIdx + 1)}
          disabled={!hasNext}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Approval summary bar */}
      <div className="flex items-center justify-center gap-4 mb-6 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <Check className="w-3.5 h-3.5" />
          {approved.size} Approved
        </span>
        <span className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
          <X className="w-3.5 h-3.5" />
          {rejected.size} Needs Revision
        </span>
        <span className="text-gray-400 dark:text-gray-500">
          {chapter.verses.length - approved.size - rejected.size} Pending
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

      {/* Side-by-side verses */}
      <div className="space-y-3">
        {chapter.verses.map((v: JosephusVerse) => {
          const isApproved = approved.has(v.verse);
          const isRejected = rejected.has(v.verse);
          return (
            <div
              key={v.verse}
              className={`grid md:grid-cols-2 gap-4 rounded-xl border p-4 transition-all ${
                isApproved
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10'
                  : isRejected
                  ? 'border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10'
                  : 'border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
              }`}
            >
              {/* Verse number + original text */}
              <div className="flex gap-3">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 w-7 flex-shrink-0 pt-0.5 text-right tabular-nums select-none">
                  {v.verse}
                </span>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-sm">
                  {v.original}
                </p>
              </div>

              {/* Translation + approve/reject controls */}
              <div className="flex gap-3 md:border-l md:border-stone-200 dark:md:border-gray-700 md:pl-4">
                <div className="flex-1">
                  <p className="leading-relaxed text-gray-900 dark:text-gray-100 text-sm font-medium">
                    {v.translation}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => toggleApproved(v.verse)}
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
                    onClick={() => toggleRejected(v.verse)}
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
        })}
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-stone-200 dark:border-gray-700">
        <button
          onClick={() => hasPrev && setChapterIdx(chapterIdx - 1)}
          disabled={!hasPrev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-gray-700 font-semibold text-sm text-gray-600 dark:text-gray-400 hover:bg-stone-50 dark:hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Chapter
        </button>
        <button
          onClick={() => hasNext && setChapterIdx(chapterIdx + 1)}
          disabled={!hasNext}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-gray-700 font-semibold text-sm text-gray-600 dark:text-gray-400 hover:bg-stone-50 dark:hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next Chapter
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
