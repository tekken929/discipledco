import { BookOpen, Target, Music, Book, Users, MessageCircle, Church } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Welcome() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 text-center transition-colors">
          <div className="flex justify-center mb-6">
            <img
              src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
              alt="Discipled Co."
              className="w-32 h-32 rounded-2xl object-cover shadow-lg"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
           The Disciple Co.
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Genesis 6:5 (NIV), "The Lord saw how great the wickedness of the human race had become on the earth, and that every inclination of the thoughts of the human heart was only evil all the time."
          </p>
        </div>

        <Link
          to="/easter"
          className="block mb-8 print:hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl group cursor-pointer overflow-hidden rounded-xl shadow-2xl border-4 border-pink-400/40 hover:border-pink-400"
          style={{
            height: '80px',
            backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 25%, #ddd6fe 50%, #bfdbfe 75%, #a7f3d0 100%)',
            position: 'relative'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-white/30 group-hover:from-white/20 group-hover:via-white/5 group-hover:to-white/20 transition-all flex items-center justify-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-blue-500 transition-all tracking-wide" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(255,255,255,0.5)' }}>
              Easter - He Is Risen
            </h2>
          </div>
        </Link>

        <Link
          to="/resurrection"
          className="block mb-8 print:hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl group cursor-pointer overflow-hidden rounded-xl shadow-2xl border-4 border-amber-500/30 hover:border-amber-500"
          style={{
            height: '100px',
            backgroundImage: 'url(/images/p52.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 group-hover:from-black/70 group-hover:via-black/50 group-hover:to-black/70 transition-all flex items-center justify-center">
            <h2 className="text-2xl font-bold text-amber-100 group-hover:text-amber-50 transition-colors tracking-wide" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
              Resurrection
            </h2>
          </div>
        </Link>

        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Start here:</h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg mb-6">
              Navigate the Bible with clarity and confidence.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <Link
                  to="/bible"
                  className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-blue-200 dark:border-blue-700 w-full justify-center"
                >
                  <BookOpen className="w-4 h-4" />
                  Bible Overviews
                </Link>
                <p className="text-gray-700 dark:text-gray-300 md:pt-2">
                  Explore all 66 books of the Bible with chapter summaries and timelines
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <Link
                  to="/bible-versions"
                  className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-green-200 dark:border-green-700 w-full justify-center"
                >
                  <Book className="w-4 h-4" />
                  Bible Versions
                </Link>
                <p className="text-gray-700 dark:text-gray-300 md:pt-2">
                  Understand the differences between translations and versions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <Link
                  to="/topics"
                  className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-purple-200 dark:border-purple-700 w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  Biblical Topics
                </Link>
                <p className="text-gray-700 dark:text-gray-300 md:pt-2">
                  Discover topics covering marriage, relationships, sin, salvation, and more
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <Link
                  to="/stories"
                  className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-orange-200 dark:border-orange-700 w-full justify-center"
                >
                  <BookOpen className="w-4 h-4" />
                  Bible Stories
                </Link>
                <p className="text-gray-700 dark:text-gray-300 md:pt-2">
                  Read Bible stories with context and meaning
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <Link
                  to="/religions"
                  className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-rose-200 dark:border-rose-700 w-full justify-center"
                >
                  <Church className="w-4 h-4" />
                  Religion Insights
                </Link>
                <p className="text-gray-700 dark:text-gray-300 md:pt-2">
                  Learn how Christianity and other religions developed and how different churches emerged
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Music className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Music JukeBox</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Enjoy music and songs while you explore. All of these songs are originals and come from the Book of Psalms. Visit the Music page to start listening.
          </p>
          <Link
            to="/music"
            className="inline-flex items-center gap-2 theme-primary-button text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <Music className="w-5 h-5" />
            View Full Playlist
          </Link>
        </div>

      </div>
    </main>
  );
}
