import { Radio } from 'lucide-react';
import { ReturnToHome } from '../components/ReturnToHome';

export function Podcasts() {
  const topPodcasts = [
    {
      title: 'The Bible Project',
      description: 'Exploring the Bible through animated videos and in-depth discussions',
      url: 'https://bibleproject.com/podcast/'
    },
    {
      title: 'Ask Pastor John',
      description: 'John Piper answers biblical and pastoral questions',
      url: 'https://www.desiringgod.org/ask-pastor-john'
    },
    {
      title: 'The Gospel Coalition',
      description: 'Conversations on theology, culture, and the Christian life',
      url: 'https://www.thegospelcoalition.org/podcasts/'
    }
  ];

  return (
    <>
      <ReturnToHome />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Radio className="w-12 h-12 theme-accent" />
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Podcasts
          </h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Listen and learn from biblical teaching and Christian wisdom
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Top Three Recommended Podcasts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPodcasts.map((podcast, index) => (
            <a
              key={index}
              href={podcast.url}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-card border-2 rounded-xl p-6 hover:shadow-lg transition-all group hover:scale-105"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="theme-primary-button text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1">
                  {podcast.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {podcast.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      <div className="theme-card border-2 rounded-xl p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
            alt="The Discipled Co. Logo"
            className="w-32 h-32 rounded-2xl shadow-lg mb-6 object-cover"
          />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            The Discipled Co. Podcast
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Coming Soon
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            We're working on bringing you meaningful conversations about faith, discipleship, and living out the Gospel in everyday life. Stay tuned for updates!
          </p>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            YouTube Content
          </h3>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
            <Radio className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <p className="text-gray-600 dark:text-gray-400">
              Our YouTube channel is currently in development. Check back soon for video content, teachings, and more!
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
