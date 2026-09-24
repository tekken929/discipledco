import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lock } from 'lucide-react';
import { stories } from '../data/stories';
import { BibleVersePopup } from '../components/BibleVersePopup';
import { useState } from 'react';
import type React from 'react';

const BODY_SCRIPTURE_PATTERN = /((?:\d\s?)?[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\s+\d+:\d+(?:[-\u2013\u2014]\d+(?::\d+)?)?(?:\s*\([A-Z]+\))?)/g;

function parseScriptureRef(ref: string): { book: string; chapter: number; verseStart: number | null; verseEnd: number | null } | null {
  const m = ref.match(/^((?:\d\s?)?[A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+(\d+):(\d+)(?:[-\u2013\u2014](\d+)(?::(\d+))?)?/);
  if (!m) return null;
  const chapter = parseInt(m[2]);
  const verseStart = parseInt(m[3]);
  let verseEnd: number | null = null;
  if (m[4]) {
    if (m[5]) {
      // Cross-chapter range like 1:1–2:25
      verseEnd = parseInt(m[5]);
    } else {
      verseEnd = parseInt(m[4]);
    }
  }
  return {
    book: m[1].trim() === 'Psalm' ? 'Psalms' : m[1].trim(),
    chapter,
    verseStart,
    verseEnd,
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
        onClick={() => onRef(ref)}
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
            <div className="space-y-0">
              {/* Hero banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-800 dark:via-teal-900 dark:to-cyan-900 shadow-xl mb-6">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative px-6 py-10 md:py-14 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 text-3xl">
                    {selectedStory.icon}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                    {selectedStory.title}
                  </h1>
                  <p className="text-white/80 text-sm font-medium max-w-lg mx-auto leading-relaxed">
                    {selectedStory.shortSummary}
                  </p>
                </div>
              </div>

              {/* Content sections with visual variety */}
              <div className="space-y-3">
                {selectedStory.content!.map((section, idx) => {
                  if (section.type === 'scripture') {
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-2xl px-5 py-4 my-3"
                      >
                        <span className="block font-bold text-amber-900 dark:text-amber-200 text-sm mb-1">
                          {section.reference || section.text}
                        </span>
                        {section.verseText && (
                          <span className="block italic text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {section.verseText}
                          </span>
                        )}
                      </div>
                    );
                  }
                  if (section.type === 'heading') {
                    const isDaySection = section.text.startsWith('Day ');
                    if (isDaySection) {
                      return null;
                    }
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-2xl px-5 py-3 mt-6 shadow-md"
                      >
                        <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                          {section.text}
                        </h2>
                      </div>
                    );
                  }
                  if (section.type === 'subheading') {
                    const dayMatch = section.text.match(/^Day (\d+)\s*—\s*(.+)$/);
                    if (dayMatch) {
                      const dayNum = parseInt(dayMatch[1]);
                      const dayTitle = dayMatch[2];
                      const dayColors = [
                        'from-yellow-400 to-orange-400',
                        'from-sky-400 to-blue-500',
                        'from-green-400 to-emerald-500',
                        'from-amber-400 to-yellow-500',
                        'from-cyan-400 to-teal-500',
                        'from-rose-400 to-pink-500',
                      ];
                      const dayIcons = ['☀️', '☁️', '🌿', '⭐', '🐟', '🐾'];
                      const colorClass = dayColors[(dayNum - 1) % dayColors.length];
                      const icon = dayIcons[(dayNum - 1) % dayIcons.length];
                      return (
                        <div
                          key={idx}
                          className={`bg-gradient-to-r ${colorClass} rounded-2xl px-5 py-4 mt-4 shadow-md flex items-center gap-3`}
                        >
                          <span className="text-2xl flex-shrink-0">{icon}</span>
                          <div>
                            <span className="block text-white/80 text-xs font-bold uppercase tracking-wider">Day {dayNum}</span>
                            <h3 className="text-white font-bold text-base leading-snug">
                              {dayTitle}
                            </h3>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2.5 mt-4"
                      >
                        <h3 className="text-amber-700 dark:text-amber-400 font-bold text-sm leading-snug">
                          {section.text}
                        </h3>
                      </div>
                    );
                  }
                  if (section.type === 'emphasis') {
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl px-6 py-5 mt-6 text-center border border-emerald-200 dark:border-emerald-700"
                      >
                        <p className="text-base font-bold text-emerald-800 dark:text-emerald-200 leading-relaxed italic">
                          {section.text}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className="text-gray-700 dark:text-gray-300 text-base leading-relaxed px-1"
                    >
                      {renderWithScriptureLinks(section.text, handleScriptureRefClick)}
                    </p>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  By Colby Ryan Shenk, Disciple Company
                </p>
              </div>
            </div>
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
