import { BookOpen, Target, Music, Book, Users, MessageCircle, Church } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Welcome() {
  const { setTracks, playTrack } = useMusicPlayer();

  useEffect(() => {
    const loadAndPlayMusic = async () => {
      const { data, error } = await supabase
        .from('music_tracks')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setTracks(data);
        playTrack(data[0]);
      }
    };

    loadAndPlayMusic();
  }, []);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
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

        {/* What This Website Is For */}
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

        {/* Music Section */}
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Music className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Music JukeBox</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Enjoy music and songs while you explore. The music player will continue playing as you navigate through the site. A pop up in the bottom right corner controls the music. All of these songs are originals and come from the Book of Psalms.
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
