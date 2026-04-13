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
    return (
      <>
        <ReturnToHome />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Topics
          </Link>

          <div className="theme-card rounded-2xl shadow-xl p-8 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{selectedTopic.icon}</span>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedTopic.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {selectedTopic.shortDescription}
                </p>
              </div>
            </div>

            {selectedTopic.expandedContent && (
              <div className="mb-6 p-6 rounded-xl bg-stone-50 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-700">
                <p className="text-gray-700 dark:text-gray-300 leading-loose">
                  {selectedTopic.expandedContent}
                </p>
              </div>
            )}

            {selectedTopic.id === 'sin' && (
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Key Points About Salvation
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">1</span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      <b>Believe (Trust in Jesus)</b><br />
                      John 3:16 — "Whoever believes in him shall not perish but have eternal life"<br />Romans 10:9 — "If you declare… 'Jesus is Lord'… you will be saved"
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">2</span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Recognize the problem (sin)</b><br />
                      Romans 3:23 — "All have sinned…"<br />Romans 6:23 — "The wages of sin is death…"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">3</span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Receive grace (not earned)</b><br />
                      Ephesians 2:8–9 — "By grace you have been saved… not by works"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">4</span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Turn (repentance = change of direction)</b><br />
                      Acts 3:19 — "Repent… that your sins may be wiped out"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">5</span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Follow (new life begins)</b><br />
                      2 Corinthians 5:17 — "If anyone is in Christ… new creation"<br />John 8:36 — "If the Son sets you free, you will be free indeed"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-gray-700 dark:bg-gray-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">**</span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">You are saved not by what you do, but by what Jesus has already done.
                      When you trust in Him, turn from sin, and follow Him, you receive new life.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Biblical References
              </h2>

              <div className="space-y-6">
                {selectedTopic.references.map((ref, index) => {
                  const verseReference = `${ref.book} ${ref.chapter}:${ref.verse}`;

                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700 transition-colors hover:shadow-lg"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg">
                            {verseReference}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed pl-12 mb-3">
                        "{ref.text}"
                      </p>
                      {ref.summary && (
                        <div className="pl-12 pt-3 border-t border-blue-300 dark:border-blue-600">
                          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                            {ref.summary}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
          <div className="mb-8 theme-card rounded-2xl border-4 border-blue-500 dark:border-blue-600 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-6xl flex-shrink-0">
                  {featuredTopic.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {featuredTopic.title}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                    {featuredTopic.shortDescription}
                  </p>
                </div>
              </div>

              {featuredTopic.expandedContent && expandedTopics.has(featuredTopic.id) && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-loose">
                    {featuredTopic.expandedContent}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-6">
                <Link
                  to={`/topics/${featuredTopic.id}`}
                  className="inline-flex items-center gap-2 text-base text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Explore with Scripture
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {featuredTopic.expandedContent && (
                  <button
                    onClick={(e) => toggleExpand(featuredTopic.id, e)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    {expandedTopics.has(featuredTopic.id) ? (
                      <><ChevronUp className="w-4 h-4" /> Read less</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> Read more</>
                    )}
                  </button>
                )}
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
