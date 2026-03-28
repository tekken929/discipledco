import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Sermon {
  id: string;
  preacher: string;
  title: string;
  videoId: string;
  description: string;
}

const sermons: Sermon[] = [
  {
    id: 'wes-huff',
    preacher: 'Wes Huff',
    title: 'How to Talk About Jesus Without Sounding Like an Idiot',
    videoId: 'NxzVW0L5QJs',
    description: 'Wesley Huff shares practical strategies for Christians to talk about their faith with others, combining real world experience and Biblical teachings on engaging in meaningful conversations about faith in Jesus.'
  },
  {
    id: 'anthony-mitchell',
    preacher: 'Philip Anthony Mitchell',
    title: 'You Are Anointed for This',
    videoId: '0zaCUBTT8tU',
    description: 'A powerful sermon from 2819 Church in Atlanta on recognizing and walking in the anointing God has placed on your life for His purposes.'
  },
  {
    id: 'td-jakes',
    preacher: 'T.D. Jakes',
    title: 'Woman Thou Art Loosed',
    videoId: 'q3rLof2eiAQ',
    description: 'Bishop T.D. Jakes delivers a transformative message about freedom, healing, and restoration from Luke 13:10-17. A powerful word for anyone seeking spiritual breakthrough and liberation.'
  }
];

export function Preaching() {
  const [activeTab, setActiveTab] = useState(sermons[0].id);
  const activeSermon = sermons.find(s => s.id === activeTab) || sermons[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Preaching
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Sermons and biblical teaching to strengthen your faith
        </p>
      </div>

      <div className="theme-card rounded-2xl shadow-xl overflow-hidden transition-colors">
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
          {sermons.map((sermon) => (
            <button
              key={sermon.id}
              onClick={() => setActiveTab(sermon.id)}
              className={`flex-1 min-w-[200px] px-6 py-4 font-semibold text-center transition-all ${
                activeTab === sermon.id
                  ? 'bg-blue-600 text-white border-b-4 border-blue-800'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {sermon.preacher}
            </button>
          ))}
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {activeSermon.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {activeSermon.description}
            </p>
          </div>

          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
              src={`https://www.youtube.com/embed/${activeSermon.videoId}`}
              title={activeSermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-6 flex justify-end">
            <a
              href={`https://www.youtube.com/watch?v=${activeSermon.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <ExternalLink size={20} />
              Open in YouTube
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
