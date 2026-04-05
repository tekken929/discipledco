import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Mic, BookText, UserCheck, Radio, Calendar, Home, SkipBack, SkipForward, Play, Pause, Volume2, Music as MusicIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useMusicPlayer } from '../context/MusicPlayerContext';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Music() {
  const { tracks: globalTracks, currentTrack, isPlaying, playTrack, pauseTrack, nextTrack, previousTrack, setTracks, volume, setVolume } = useMusicPlayer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [localVolume, setLocalVolume] = useState(volume * 100);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    const { data, error } = await supabase
      .from('music_tracks')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (!error && data) {
      setTracks(data);
    }
  };

  const handlePlayTrack = (track: typeof globalTracks[0]) => {
    playTrack(track);

    supabase
      .from('music_tracks')
      .update({ play_count: track.play_count + 1 })
      .eq('id', track.id)
      .then(() => loadTracks());
  };

  const handleVolumeChange = (newVolume: number) => {
    setLocalVolume(newVolume);
    setVolume(newVolume / 100);
  };

  const navigationLinks = [
    { to: '/', icon: Home, title: 'Home' },
    { to: '/bible', icon: BookOpen, title: 'Bible Overview' },
    { to: '/bible-versions', icon: BookOpen, title: 'Bible Versions' },
    { to: '/topics', icon: MessageCircle, title: 'Biblical Topics' },
    { to: '/stories', icon: Book, title: 'Bible Stories' },
    { to: '/religions', icon: FolderOpen, title: 'Religions' },
    { to: '/christian-holidays', icon: Calendar, title: 'Holiday Origins' },
    { to: '/faqs', icon: Users, title: 'FAQs' },
  ];

  const resourceLinks = [
    { to: '/preaching', icon: Mic, title: 'Wisdom' },
    { to: '/books', icon: BookText, title: 'Books' },
    { to: '/church-mentors', icon: UserCheck, title: 'Mentors' },
    { to: '/podcasts', icon: Radio, title: 'Podcasts' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 dark:from-orange-600 dark:via-red-700 dark:to-pink-700 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 left-6 z-50 bg-black/30 backdrop-blur-sm border-2 border-white/20 p-3 rounded-lg shadow-2xl hover:bg-black/40 transition-all"
        aria-label="Navigation menu"
      >
        {menuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-950 shadow-2xl z-50 overflow-y-auto">
            <div className="p-6 border-b border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-100 to-orange-200 dark:from-amber-800 dark:to-orange-900 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-xl font-bold text-amber-950 dark:text-amber-50">Navigation</h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-amber-900 dark:text-amber-100 hover:text-amber-950 dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4">
              <div className="mb-6">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-3 px-3">Main</p>
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors group mb-1"
                    >
                      <Icon className="w-5 h-5 text-amber-700 dark:text-amber-300 group-hover:text-amber-900 dark:group-hover:text-amber-100" />
                      <span className="text-amber-900 dark:text-amber-100 font-medium group-hover:text-amber-950 dark:group-hover:text-white">{link.title}</span>
                    </Link>
                  );
                })}
              </div>

              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-3 px-3">Resources</p>
                {resourceLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors group mb-1"
                    >
                      <Icon className="w-5 h-5 text-amber-700 dark:text-amber-300 group-hover:text-amber-900 dark:group-hover:text-amber-100" />
                      <span className="text-amber-900 dark:text-amber-100 font-medium group-hover:text-amber-950 dark:group-hover:text-white">{link.title}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </>
      )}

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border-8 border-gray-700 relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-600 rounded-full shadow-inner"></div>

          <div className="mt-8 mb-6">
            <div className="bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500 rounded-lg p-6 shadow-inner border-4 border-emerald-600 min-h-[120px] flex items-center justify-center">
              {currentTrack ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-950 mb-1 font-mono tracking-tight">
                    {currentTrack.title}
                  </div>
                  <div className="text-lg text-emerald-900 font-mono">
                    {currentTrack.artist}
                  </div>
                </div>
              ) : (
                <div className="text-center text-emerald-900">
                  <MusicIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <div className="text-sm font-mono">No track selected</div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-2 text-center font-bold">VOLUME</div>
                  <div className="relative">
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-red-500 transition-all"
                        style={{ width: `${localVolume}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={localVolume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg border-4 border-gray-600 flex items-center justify-center relative group cursor-pointer"
                  onClick={() => handleVolumeChange(localVolume === 0 ? 50 : 0)}
                >
                  <Volume2 className="w-6 h-6 text-yellow-500" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <div className="text-xs text-gray-400 mb-3 text-center font-bold">PLAYLIST ({globalTracks.length})</div>
                {globalTracks.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No tracks available
                  </div>
                ) : (
                  <div className="space-y-1">
                    {globalTracks.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => handlePlayTrack(track)}
                        className={`w-full text-left px-3 py-2 rounded transition-all text-sm ${
                          currentTrack?.id === track.id
                            ? 'bg-yellow-500 text-gray-900 font-bold'
                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <div className="truncate font-medium">{track.title}</div>
                        <div className="text-xs opacity-75 truncate">{track.artist}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-xs text-gray-400 mb-4 text-center font-bold">CONTROLS</div>
              <div className="flex items-center justify-center gap-6 mb-8">
                <button
                  onClick={previousTrack}
                  disabled={globalTracks.length === 0}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg border-4 border-blue-600 flex items-center justify-center relative group hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <SkipBack className="w-7 h-7 text-white fill-white" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </button>

                <button
                  onClick={isPlaying ? pauseTrack : () => currentTrack && playTrack(currentTrack)}
                  disabled={!currentTrack}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-xl border-4 border-red-600 flex items-center justify-center relative group hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white fill-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </button>

                <button
                  onClick={nextTrack}
                  disabled={globalTracks.length === 0}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg border-4 border-blue-600 flex items-center justify-center relative group hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <SkipForward className="w-7 h-7 text-white fill-white" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg border-4 border-gray-600 flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-xs text-gray-400 font-bold">BASS</div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg border-4 border-gray-600 flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-xs text-gray-400 font-bold">TREBLE</div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-2">
            <div className="w-4 h-8 bg-gray-600 rounded-sm shadow-lg"></div>
            <div className="w-4 h-8 bg-gray-600 rounded-sm shadow-lg"></div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Music Jukebox</h1>
          <p className="text-white/90 text-lg drop-shadow">Worship songs and Christian music</p>
        </div>
      </div>
    </div>
  );
}
