import { BookOpen, Target, Music } from 'lucide-react';
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What you will find here:</h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
             Nnavigate the Bible
              with clarity and confidence. 
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Bible Overviews</strong> of all 66 books of the Bible with chapter summaries and timelines</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Bible Version/Translation guides</strong> to help you understand the differences between translations and versions</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Biblical Topics</strong> covering marriage, relationships, sin, salvation, and more</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Bible stories</strong> with context and meaning</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Religion insights</strong> into how Christianity and other Religions developed and how different Churches emerged.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Music Section */}
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Music className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Music JukeBox</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Enjoy music and songs while you explore. The music player will continue playing as you navigate through the site. All of these songs are originals and come from the Book of Psalms.
          </p>
          <Link
            to="/music"
            className="inline-flex items-center gap-2 theme-primary-button text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <Music className="w-5 h-5" />
            View Full Playlist
          </Link>
        </div>

        {/* Call to Action */}
        <div className="theme-card rounded-2xl shadow-xl p-8 text-center transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Next Steps:
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              to="/bible"
              className="inline-flex items-center gap-2 theme-primary-button text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
            >
              <BookOpen className="w-6 h-6" />
              Bible Overview
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
