import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { stories } from '../data/stories';
import { ReturnToHome } from '../components/ReturnToHome';

export function Stories() {
  const { storyId } = useParams();
  const selectedStory = storyId ? stories.find(s => s.id === storyId) : null;

  if (selectedStory) {
    return (
      <>
        <ReturnToHome />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Stories
        </Link>

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
      </main>
      </>
    );
  }

  return (
    <>
      <ReturnToHome />
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
        {stories.sort((a, b) => a.order - b.order).map((story) => (
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
        ))}
      </div>
    </main>
    </>
  );
}
