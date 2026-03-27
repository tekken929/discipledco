import { useEffect } from 'react';
import { Play, Pause, Music as MusicIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useMusicPlayer } from '../context/MusicPlayerContext';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Music() {
  const { tracks: globalTracks, currentTrack, isPlaying, playTrack, setTracks } = useMusicPlayer();

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">Music Jukebox</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200">Worship songs and Christian music</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Playlist ({globalTracks.length} {globalTracks.length === 1 ? 'song' : 'songs'})
          </h2>
          {globalTracks.length === 0 ? (
            <div className="text-center py-12">
              <MusicIcon className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
              <p className="text-gray-700 dark:text-gray-200 mb-4">No songs yet. Upload some music to get started!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {globalTracks.map((track) => (
                <div
                  key={track.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    currentTrack?.id === track.id
                      ? 'theme-primary-button text-white'
                      : 'theme-card hover:shadow-md cursor-pointer'
                  }`}
                >
                  <button
                    onClick={() => handlePlayTrack(track)}
                    className="flex-shrink-0"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0" onClick={() => handlePlayTrack(track)}>
                    <h3 className="font-semibold truncate">{track.title}</h3>
                    <p className={`text-sm truncate ${
                      currentTrack?.id === track.id ? 'text-white opacity-90' : 'text-gray-700 dark:text-gray-200'
                    }`}>
                      {track.artist} • {formatTime(track.duration)} • {track.play_count} plays
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
