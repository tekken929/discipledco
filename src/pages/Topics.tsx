import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { topics } from '../data/topics';

export function Topics() {
  const { topicId } = useParams();
  const selectedTopic = topicId ? topics.find(t => t.id === topicId) : null;

  if (selectedTopic) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/topics"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Topics
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{selectedTopic.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedTopic.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {selectedTopic.description}
              </p>
            </div>
          </div>

          {selectedTopic.id === 'sin' && (
            <div className="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-8 border border-purple-200 dark:border-purple-700 transition-colors">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                Key Points About Salvation
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">1</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    <b>Believe (Trust in Jesus)</b><br />
                    John 3:16 — "Whoever believes in him shall not perish but have eternal life" <br></br>Romans 10:9 — "If you declare… 'Jesus is Lord'… you will be saved"<br></br>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">2</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Recognize the problem (sin)</b><br/>
Romans 3:23 — “All have sinned…”
<br></br>Romans 6:23 — “The wages of sin is death…”</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">3</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Receive grace (not earned)</b><br/>
Ephesians 2:8–9 — “By grace you have been saved… not by works”</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">4</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Turn (repentance = change of direction)</b><br/>
Acts 3:19 — “Repent… that your sins may be wiped out”</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">5</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">Excepteur sint occaecat cupidatat non proident sunt in culpa.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">6</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">Qui officia deserunt mollit anim id est laborum et consectetur.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">7</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">Adipiscing elit pellentesque habitant morbi tristique senectus.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">8</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">Netus et malesuada fames ac turpis egestas maecenas pharetra.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">9</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">Convallis posuere morbi leo urna molestie at elementum eu.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">10</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">Facilisis mauris sit amet massa vitae tortor condimentum lacinia.</p>
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
              {selectedTopic.references.map((ref, index) => (
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
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Biblical Topics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Explore biblical guidance on various life topics with Scripture references
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.sort((a, b) => a.order - b.order).map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {topic.icon}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {topic.title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {topic.description}
            </p>
            <div className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 font-semibold">
              <span>{topic.references.length} Scripture references</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
