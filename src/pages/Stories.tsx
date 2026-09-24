import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lock } from 'lucide-react';
import { stories } from '../data/stories';
import { BibleVersePopup } from '../components/BibleVersePopup';
import { useState } from 'react';
import type React from 'react';

const BODY_SCRIPTURE_PATTERN = /((?:\d\s?)?[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\s+\d+:\d+(?:-\d+)?(?:\s*\([A-Z]+\))?)/g;

let hoverTimer: ReturnType<typeof setTimeout> | null = null;

function parseScriptureRef(ref: string): { book: string; chapter: number; verseStart: number | null; verseEnd: number | null } | null {
  const m = ref.match(/^((?:\d\s?)?[A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+(\d+):(\d+)(?:[-\u2013\u2014](\d+))?/);
  if (!m) return null;
  return {
    book: m[1].trim(),
    chapter: parseInt(m[2]),
    verseStart: parseInt(m[3]),
    verseEnd: m[4] ? parseInt(m[4]) : null,
  };
}

function renderWithScriptureLinks(
  text: string,
  onRef: (ref: string) => void
): React.ReactNode {
  const pattern = new RegExp(BODY_SCRIPTURE_PATTERN.source, 'g');
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    const ref = m[1];
    parts.push(
      <span
        key={m.index}
        onMouseEnter={() => {
          if (hoverTimer) clearTimeout(hoverTimer);
          hoverTimer = setTimeout(() => onRef(ref), 350);
        }}
        onMouseLeave={() => {
          if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
        }}
        className="text-amber-600 dark:text-amber-400 font-semibold underline decoration-dotted underline-offset-2 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
      >
        {ref}
      </span>
    );
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts.length > 0 ? <>{parts}</> : <>{text}</>;
}

export function Stories() {
  const { storyId } = useParams();
  const selectedStory = storyId ? stories.find(s => s.id === storyId) : null;
  const [versePopup, setVersePopup] = useState<{ book: string; chapter: number; label: string; verseStart: number | null; verseEnd: number | null } | null>(null);

  function handleScriptureRefClick(ref: string) {
    const parsed = parseScriptureRef(ref);
    if (parsed) setVersePopup({ ...parsed, label: ref });
  }

  if (selectedStory) {
    const hasContent = selectedStory.content && selectedStory.content.length > 0;

    return (
      <>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Stories
          </Link>

          {hasContent ? (
            <article className="theme-card border rounded-2xl p-8 md:p-12 shadow-sm">
              {/* Title header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 mb-4">
                  <span className="text-2xl">{selectedStory.icon}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
                  {selectedStory.title}
                </h1>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em] mb-3">
                  The Disciple Company
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
                  {selectedStory.shortSummary}
                </p>
                <div className="flex justify-center mt-6">
                  <div className="w-12 h-px bg-amber-400/50" />
                </div>
              </div>

              {/* Content sections */}
              <div className="space-y-4">
                {selectedStory.content!.map((section, idx) => {
                  if (section.type === 'scripture') {
                    return (
                      <div
                        key={idx}
                        className="border-l-4 border-amber-400 dark:border-amber-600 pl-4 py-2 my-4 text-sm leading-relaxed"
                      >
                        <span className="block font-bold text-gray-900 dark:text-white mb-1">
                          {section.reference || section.text}
                        </span>
                        {section.verseText && (
                          <span className="italic text-gray-600 dark:text-gray-400">
                            {section.verseText}
                          </span>
                        )}
                      </div>
                    );
                  }
                  if (section.type === 'heading') {
                    return (
                      <h2
                        key={idx}
                        className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 leading-snug"
                      >
                        {section.text}
                      </h2>
                    );
                  }
                  if (section.type === 'subheading') {
                    return (
                      <h3
                        key={idx}
                        className="text-base font-bold text-amber-700 dark:text-amber-400 mt-5 mb-1.5 leading-snug"
                      >
                        {section.text}
                      </h3>
                    );
                  }
                  if (section.type === 'emphasis') {
                    return (
                      <p
                        key={idx}
                        className="text-base font-bold text-gray-900 dark:text-white mt-6 mb-4 leading-relaxed text-center italic"
                      >
                        {section.text}
                      </p>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4"
                    >
                      {renderWithScriptureLinks(section.text, handleScriptureRefClick)}
                    </p>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  By Colby Ryan Shenk, Disciple Company
                </p>
              </div>
            </article>
          ) : (
            <div className="theme-card rounded-2xl shadow-xl p-8 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{selectedStory.icon}</span>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedStory.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg whitespace-pre-line">
                    {selectedStory.summary}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Scripture References
                </h2>

                <div className="space-y-6">
                  {selectedStory.references.map((ref, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700 transition-colors hover:shadow-lg"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg text-sm">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg">
                            {ref.book} {ref.chapter}:{ref.verse}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed pl-12">
                        "{ref.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Link>
          </div>
        </main>

        {versePopup && (
          <BibleVersePopup
            book={versePopup.book}
            chapter={versePopup.chapter}
            label={versePopup.label}
            categoryBadgeClass="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
            onClose={() => setVersePopup(null)}
            verseStart={versePopup.verseStart}
            verseEnd={versePopup.verseEnd}
          />
        )}
      </>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Bible Stories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore ten of the most beloved stories from Scripture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.sort((a, b) => a.order - b.order).map((story) => {
            const isAvailable = story.id === 'creation';
            if (!isAvailable) {
              return (
                <div
                  key={story.id}
                  className="theme-card rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 opacity-40 cursor-not-allowed select-none"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl grayscale">
                      {story.icon}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-500">
                      {story.title}
                    </h2>
                  </div>
                  <p className="text-gray-400 dark:text-gray-500 mb-4">
                    {story.shortSummary}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400 dark:text-gray-600 font-semibold">
                    <span>Coming Soon</span>
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={story.id}
                to={`/stories/${story.id}`}
                className="theme-card rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {story.icon}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {story.title}
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  {story.shortSummary}
                </p>
                <div className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 font-semibold">
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
