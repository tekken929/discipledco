import { useEffect, useState } from 'react';
import { SkipBack, SkipForward, Play, Pause, Volume2, Music as MusicIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { ReturnToHome } from '../components/ReturnToHome';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Category = 'All' | 'Heavy Metal' | 'House' | 'Calm' | 'Worship';

export function Music() {
  const { tracks: globalTracks, currentTrack, isPlaying, playTrack, togglePlayPause, playNext, playPrevious, setTracks, volume, setVolume, currentTime, duration, seek } = useMusicPlayer();
  const [localVolume, setLocalVolume] = useState(volume * 100);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [allTracks, setAllTracks] = useState<typeof globalTracks>([]);

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    if (allTracks.length === 0) return;
    if (selectedCategory === 'All') {
      setTracks(allTracks);
    } else {
      setTracks(allTracks.filter(track => track.category === selectedCategory));
    }
  }, [selectedCategory, allTracks]);

  const loadTracks = async () => {
    const { data, error } = await supabase
      .from('music_tracks')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (!error && data) {
      setAllTracks(data);
      if (!currentTrack && globalTracks.length === 0) {
        const chosenOne = data.find((t: typeof data[0]) =>
          t.title.toLowerCase().includes('chosen one') || t.title.toLowerCase() === 'the chosen one'
        );
        if (chosenOne) {
          playTrack(chosenOne);
        }
      }
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

  const handlePlayPause = () => {
    if (currentTrack) {
      togglePlayPause();
    } else if (globalTracks.length > 0) {
      handlePlayTrack(globalTracks[0]);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setLocalVolume(newVolume);
    setVolume(newVolume / 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const categories: Category[] = ['All', 'Worship', 'Heavy Metal', 'House', 'Calm'];

  const getCategoryColor = (category: Category) => {
    switch(category) {
      case 'Heavy Metal': return 'from-red-600 to-black';
      case 'House': return 'from-purple-500 to-pink-500';
      case 'Calm': return 'from-blue-400 to-cyan-300';
      case 'Worship': return 'from-amber-500 to-orange-600';
      case 'All': return 'from-gray-600 to-gray-800';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <>
      <ReturnToHome />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(0,0,0,0))]"></div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl shadow-2xl p-8 border-[12px] border-zinc-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 via-transparent to-zinc-900/50 pointer-events-none"></div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <div className="w-24 h-4 bg-zinc-600 rounded-full shadow-inner"></div>
          </div>

          <div className="absolute top-6 right-6 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50 animate-pulse"></div>
          </div>

          <div className="relative z-10 mt-8 mb-6">
            <div className="bg-gradient-to-b from-black via-zinc-900 to-black rounded-xl p-8 shadow-inner border-4 border-zinc-700 min-h-[200px] flex flex-col backdrop-blur-sm">
              <div className="flex-1 flex items-center justify-center">
                {currentTrack ? (
                  <div className="text-center w-full">
                    <div className="text-3xl font-bold text-cyan-400 mb-2 font-mono tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                      {currentTrack.title}
                    </div>
                    <div className="text-xl text-cyan-300 font-mono drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]">
                      {currentTrack.artist}
                    </div>
                    {currentTrack.category && (
                      <div className="mt-2 inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full">
                        <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider">{currentTrack.category}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-cyan-400/60">
                    <MusicIcon className="w-16 h-16 mx-auto mb-3 opacity-40 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                    <div className="text-sm font-mono tracking-wider">SELECT A TRACK</div>
                  </div>
                )}
              </div>

              {currentTrack && (
                <div className="mt-6 max-w-2xl mx-auto w-full px-4">
                  <div
                    className="h-2 bg-zinc-800 rounded-full cursor-pointer group relative border border-zinc-700"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;
                      seek(percentage * duration);
                    }}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all relative shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-cyan-400 mt-2 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs text-zinc-400 mb-2 text-center font-bold tracking-wider">VOLUME</div>
                  <div className="relative bg-zinc-950 p-3 rounded-lg border-2 border-zinc-700">
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all shadow-[0_0_10px_rgba(34,211,238,0.5)]"
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
                <button
                  onClick={() => handleVolumeChange(localVolume === 0 ? 50 : 0)}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-lg border-4 border-zinc-600 flex items-center justify-center relative group cursor-pointer hover:scale-105 transition-transform"
                >
                  <Volume2 className="w-7 h-7 text-cyan-400" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent"></div>
                </button>
              </div>

              <div className="bg-zinc-950 rounded-lg p-4 max-h-72 overflow-y-auto border-2 border-zinc-700 shadow-inner">
                <div className="text-xs text-zinc-400 mb-3 text-center font-bold tracking-wider">PLAYLIST ({globalTracks.length})</div>
                {globalTracks.length === 0 ? (
                  <div className="text-center py-6 text-zinc-500 text-sm">
                    No tracks in this category
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categories.filter(cat => cat !== 'All').map((category) => {
                      const categoryTracks = globalTracks.filter(track => track.category === category);
                      if (categoryTracks.length === 0 && selectedCategory === 'All') return null;
                      if (selectedCategory !== 'All' && selectedCategory !== category) return null;

                      return (
                        <div key={category} className="space-y-1">
                          {selectedCategory === 'All' && (
                            <div className={`text-xs font-bold tracking-wider px-2 py-1 rounded bg-gradient-to-r ${getCategoryColor(category as Category)} text-white`}>
                              {category}
                            </div>
                          )}
                          {categoryTracks.map((track) => (
                            <button
                              key={track.id}
                              onClick={() => handlePlayTrack(track)}
                              className={`w-full text-left px-3 py-2 rounded transition-all text-sm ${
                                currentTrack?.id === track.id
                                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg'
                                  : 'bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                              }`}
                            >
                              <div className="truncate font-medium">{track.title}</div>
                              <div className="text-xs opacity-75 truncate">{track.artist}</div>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-xs text-zinc-400 mb-6 text-center font-bold tracking-wider">CONTROLS</div>
              <div className="flex items-center justify-center gap-8 mb-10">
                <button
                  onClick={playPrevious}
                  disabled={globalTracks.length === 0}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-xl border-4 border-zinc-600 flex items-center justify-center relative group hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-cyan-500/20"
                >
                  <SkipBack className="w-8 h-8 text-cyan-400 fill-cyan-400" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                </button>

                <button
                  onClick={handlePlayPause}
                  disabled={globalTracks.length === 0}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl border-4 border-cyan-400 flex items-center justify-center relative group hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-cyan-500/50"
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white fill-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white fill-white ml-1" />
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  {isPlaying && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-cyan-400/20"></div>
                  )}
                </button>

                <button
                  onClick={playNext}
                  disabled={globalTracks.length === 0}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-xl border-4 border-zinc-600 flex items-center justify-center relative group hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-cyan-500/20"
                >
                  <SkipForward className="w-8 h-8 text-cyan-400 fill-cyan-400" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-lg border-4 border-zinc-600 flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-xs text-cyan-400 font-bold">BASS</div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent"></div>
                </div>
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-lg border-4 border-zinc-600 flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-xs text-cyan-400 font-bold">TREBLE</div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center gap-3 pt-6 border-t-2 border-zinc-700">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="w-16 h-3 bg-zinc-600 rounded-sm shadow-inner"></div>
            <div className="w-16 h-3 bg-zinc-600 rounded-sm shadow-inner"></div>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'ring-4 ring-white shadow-2xl scale-105'
                    : 'hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category)} opacity-90`}></div>
                <div className="relative z-10">
                  <MusicIcon className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="text-white font-bold text-sm text-center">{category}</div>
                  {selectedCategory === category && (
                    <div className="mt-2 w-2 h-2 bg-white rounded-full mx-auto shadow-lg"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/hallowed"
              className="inline-block px-8 py-4 bg-gradient-to-r from-black via-zinc-900 to-black border-2 border-white/20 rounded-xl text-white font-bold tracking-widest uppercase text-sm hover:border-white/40 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 transform hover:scale-105"
            >
              Visit Hallowed Band Page
            </a>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
