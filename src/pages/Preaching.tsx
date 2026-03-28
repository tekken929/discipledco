import { useState } from 'react';
import { ExternalLink, Instagram, Facebook } from 'lucide-react';

interface Sermon {
  id: string;
  preacher: string;
  title: string;
  videoId: string;
  description: string;
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

const sermons: Sermon[] = [
  {
    id: 'wes-huff',
    preacher: 'Wes Huff',
    title: 'How to Talk About Jesus Without Sounding Like an Idiot',
    videoId: 'NxzVW0L5QJs',
    description: 'Wesley Huff shares practical strategies for Christians to talk about their faith with others, combining real world experience and Biblical teachings on engaging in meaningful conversations about faith in Jesus.',
    socials: {
      instagram: 'https://www.instagram.com/huff.wes',
      facebook: 'https://www.facebook.com/wesleyhuffapologetics',
      tiktok: 'https://www.tiktok.com/@huff.wes'
    }
  },
  {
    id: 'anthony-mitchell',
    preacher: 'Philip Anthony Mitchell',
    title: 'You Are Anointed for This',
    videoId: '0zaCUBTT8tU',
    description: 'A powerful sermon from 2819 Church in Atlanta on recognizing and walking in the anointing God has placed on your life for His purposes.',
    socials: {
      instagram: 'https://www.instagram.com/philipamitchell',
      facebook: 'https://www.facebook.com/philipanthonymitchell',
      tiktok: 'https://www.tiktok.com/@philipanthonymitchell'
    }
  },
  {
    id: 'td-jakes',
    preacher: 'T.D. Jakes',
    title: 'Woman Thou Art Loosed',
    videoId: 'q3rLof2eiAQ',
    description: 'Bishop T.D. Jakes delivers a transformative message about freedom, healing, and restoration from Luke 13:10-17. A powerful word for anyone seeking spiritual breakthrough and liberation.',
    socials: {
      instagram: 'https://www.instagram.com/bishopjakes',
      facebook: 'https://www.facebook.com/BishopTDJakes',
      tiktok: 'https://www.tiktok.com/@bishoptdjakes'
    }
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

          <a
            href={`https://www.youtube.com/watch?v=${activeSermon.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full group cursor-pointer"
            style={{ paddingBottom: '56.25%' }}
          >
            <img
              src={`https://img.youtube.com/vi/${activeSermon.videoId}/maxresdefault.jpg`}
              alt={activeSermon.title}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${activeSermon.videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-xl flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-6 transform scale-100 group-hover:scale-110 transition-transform shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {activeSermon.socials.instagram && (
                <a
                  href={activeSermon.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all shadow-lg"
                >
                  <Instagram size={20} />
                  Instagram
                </a>
              )}
              {activeSermon.socials.facebook && (
                <a
                  href={activeSermon.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
                >
                  <Facebook size={20} />
                  Facebook
                </a>
              )}
              {activeSermon.socials.tiktok && (
                <a
                  href={activeSermon.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-all shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  TikTok
                </a>
              )}
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${activeSermon.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <ExternalLink size={20} />
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
