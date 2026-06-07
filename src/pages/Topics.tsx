import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { topics } from '../data/topics';
import { ReturnToHome } from '../components/ReturnToHome';

export function Topics() {
  const { topicId } = useParams();
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const selectedTopic = topicId ? topics.find(t => t.id === topicId) : null;

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedTopics(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (selectedTopic) {
    const hasRichContent = !!(selectedTopic.bodyContent || selectedTopic.whatWeLearns || selectedTopic.prayer);

    return (
      <>
        <ReturnToHome />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Topics
          </Link>

          {/* Hero header */}
          <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
            <div
              className="relative px-8 py-14 flex flex-col items-center text-center"
              style={{
                background: 'linear-gradient(135deg, #78350f 0%, #b45309 30%, #d97706 60%, #fbbf24 85%, #fde68a 100%)',
              }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                {selectedTopic.subtitle && (
                  <p className="text-amber-200 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                    {selectedTopic.subtitle}
                  </p>
                )}
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-sm">
                  {selectedTopic.title}
                </h1>
                <p className="text-amber-100 text-lg leading-relaxed max-w-xl drop-shadow-sm">
                  {selectedTopic.shortDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Body paragraphs */}
          {selectedTopic.bodyContent && (
            <div className="space-y-5 mb-10">
              {selectedTopic.bodyContent.map((paragraph, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 leading-[1.9] text-[1.05rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Legacy expandedContent fallback */}
          {!hasRichContent && selectedTopic.expandedContent && (
            <div className="mb-8 p-6 rounded-xl bg-stone-50 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-700">
              <p className="text-gray-700 dark:text-gray-300 leading-loose">
                {selectedTopic.expandedContent}
              </p>
            </div>
          )}

          {/* What We Learn */}
          {selectedTopic.whatWeLearns && (
            <div className="mb-10 theme-card rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">What We Learn</h2>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {selectedTopic.whatWeLearns.map((point, i) => (
                  <li key={i} className="flex items-start gap-4 px-6 py-4">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Special sin content */}
          {selectedTopic.id === 'sin' && (
            <div className="mt-6 mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Key Points About Salvation
              </h2>
              <div className="space-y-3">
                {[
                  { n: '1', title: 'Believe (Trust in Jesus)', body: 'John 3:16 — "Whoever believes in him shall not perish but have eternal life"\nRomans 10:9 — "If you declare… \'Jesus is Lord\'… you will be saved"' },
                  { n: '2', title: 'Recognize the problem (sin)', body: 'Romans 3:23 — "All have sinned…"\nRomans 6:23 — "The wages of sin is death…"' },
                  { n: '3', title: 'Receive grace (not earned)', body: 'Ephesians 2:8–9 — "By grace you have been saved… not by works"' },
                  { n: '4', title: 'Turn (repentance = change of direction)', body: 'Acts 3:19 — "Repent… that your sins may be wiped out"' },
                  { n: '5', title: 'Follow (new life begins)', body: '2 Corinthians 5:17 — "If anyone is in Christ… new creation"\nJohn 8:36 — "If the Son sets you free, you will be free indeed"' },
                ].map(item => (
                  <div key={item.n} className="flex items-start gap-3">
                    <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">{item.n}</span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      <b>{item.title}</b><br />{item.body}
                    </p>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">**</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">You are saved not by what you do, but by what Jesus has already done. When you trust in Him, turn from sin, and follow Him, you receive new life.</p>
                </div>
              </div>
            </div>
          )}

          {/* Bible Verses */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              {selectedTopic.references.length === 5 && hasRichContent ? 'Five Key Bible Verses' : 'Biblical References'}
            </h2>
            <div className="space-y-4">
              {selectedTopic.references.map((ref, index) => {
                const verseReference = `${ref.book} ${ref.chapter}:${ref.verse}`;
                return (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/60 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm tracking-wide">
                        {verseReference}
                      </h3>
                      {ref.translation && (
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                          {ref.translation}
                        </span>
                      )}
                    </div>
                    <div className="px-5 py-4 theme-card">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-[0.98rem]">
                        "{ref.text}"
                      </p>
                      {ref.summary && (
                        <p className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {ref.summary}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Family Conversation */}
          {selectedTopic.familyConversation && (
            <div className="mb-8 rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 px-6 py-5">
              <h2 className="text-base font-bold text-amber-900 dark:text-amber-300 uppercase tracking-widest mb-3 text-sm">
                Family Conversation
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedTopic.familyConversation}
              </p>
            </div>
          )}

          {/* Prayer */}
          {selectedTopic.prayer && (
            <div className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-700 theme-card px-6 py-6">
              <h2 className="text-base font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-sm">
                Prayer
              </h2>
              <div className="space-y-3">
                {selectedTopic.prayer.split('\n').filter(l => l.trim()).map((line, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      i === 0 || line.trim().startsWith('In ') || line.trim() === 'Amen.'
                        ? 'text-gray-500 dark:text-gray-400 text-sm'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

        </main>
      </>
    );
  }

  const featuredTopic = topics.find(t => t.id === 'grace');
  const regularTopics = topics.filter(t => t.id !== 'grace');

  return (
    <>
      <ReturnToHome />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Biblical Topics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore biblical guidance on various life topics with Bible references
          </p>
        </div>

        {featuredTopic && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-amber-300 dark:border-amber-700/50">
            <div
              className="relative px-8 py-10"
              style={{
                background: 'linear-gradient(135deg, #78350f 0%, #b45309 30%, #d97706 60%, #fbbf24 85%, #fde68a 100%)',
              }}
            >
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative z-10">
                <p className="text-amber-200 text-xs font-bold uppercase tracking-[0.2em] mb-2">Featured Topic</p>
                <h2 className="text-3xl font-bold text-white mb-2">{featuredTopic.title}</h2>
                {featuredTopic.subtitle && (
                  <p className="text-amber-200 text-sm mb-3">{featuredTopic.subtitle}</p>
                )}
                <p className="text-amber-100 leading-relaxed max-w-2xl text-base mb-6">
                  {featuredTopic.shortDescription}
                </p>
                <Link
                  to={`/topics/${featuredTopic.id}`}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/40 text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  Explore with Scripture
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularTopics.sort((a, b) => a.order - b.order).map((topic) => {
            const isExpanded = expandedTopics.has(topic.id);
            return (
              <div
                key={topic.id}
                className="theme-card rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{topic.icon}</span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {topic.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 mb-3 leading-relaxed">
                    {topic.shortDescription}
                  </p>

                  {topic.expandedContent && isExpanded && (
                    <div className="mb-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {topic.expandedContent}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/topics/${topic.id}`}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {topic.expandedContent && (
                      <button
                        onClick={(e) => toggleExpand(topic.id, e)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {isExpanded ? (
                          <><ChevronUp className="w-3.5 h-3.5" /> Less</>
                        ) : (
                          <><ChevronDown className="w-3.5 h-3.5" /> More</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Go Deeper bridge to course */}
        <div className="mt-16 theme-card rounded-2xl border-2 p-8 md:p-10 text-center">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Go Deeper</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            These topics connect to a larger journey.
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto mb-8">
            Grace, faith, sin, purpose, identity — these are not isolated subjects. They are threads woven through all of Scripture. Module 8 of the Foundation course walks through each one in depth.
          </p>
          <Link
            to="/courses/module/module-8"
            className="inline-flex items-center gap-2 px-6 py-3 theme-primary-button rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Explore Module 8 — Going Deeper
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </>
  );
}
