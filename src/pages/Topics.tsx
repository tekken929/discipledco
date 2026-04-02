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
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed"><b>Follow (new life begins)</b><br/>

2 Corinthians 5:17 — “If anyone is in Christ… new creation”<br></br>

John 8:36 — “If the Son sets you free, you will be free indeed”</p>
                </div>
              
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm min-w-[28px] text-center">***</span>
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
                const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${ref.book} ${ref.chapter}:${ref.verse}`)}&version=ESV`;

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
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg">
                            {ref.book} {ref.chapter}:{ref.verse}
                          </h3>
                          <a
                            href={bibleGatewayUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
                          >
                            Click for more →
                          </a>
                        </div>
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
    );
  }

  const featuredTopic = topics.find(t => t.id === 'grace');
  const regularTopics = topics.filter(t => t.id !== 'grace');

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

      {featuredTopic && (
        <Link
          to={`/topics/${featuredTopic.id}`}
          className="block mb-8 theme-card rounded-2xl p-8 border-4 border-blue-500 dark:border-blue-600 hover:shadow-2xl transition-all group hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl group-hover:scale-110 transition-transform">
              {featuredTopic.icon}
            </span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {featuredTopic.title}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-200">
                {featuredTopic.shortDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-base text-blue-600 dark:text-blue-400 font-bold">
            <span>{featuredTopic.references.length} Scripture references</span>
            <span>→</span>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularTopics.sort((a, b) => a.order - b.order).map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            className="theme-card rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {topic.icon}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {topic.title}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              {topic.shortDescription}
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
