import { useState, useEffect } from 'react';
import { Play, Pause, Trash2, Music as MusicIcon, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useMusicPlayer } from '../context/MusicPlayerContext';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DELETE_PASSWORD = import.meta.env.VITE_MUSIC_DELETE_PASSWORD;

export function Music() {
  const { tracks: globalTracks, currentTrack, isPlaying, playTrack, setTracks } = useMusicPlayer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePasswordInput, setDeletePasswordInput] = useState('');
  const [deletePasswordError, setDeletePasswordError] = useState('');
  const [trackToDelete, setTrackToDelete] = useState<typeof globalTracks[0] | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

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

  const handleDeleteButtonClick = (track: typeof globalTracks[0]) => {
    setTrackToDelete(track);
    setShowDeleteModal(true);
    setDeletePasswordInput('');
    setDeletePasswordError('');
  };

  const handleDeletePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      setDeletePasswordError('Too many failed attempts. Please try again later.');
      return;
    }

    if (deletePasswordInput === DELETE_PASSWORD) {
      if (trackToDelete) {
        await supabase.storage.from('music').remove([trackToDelete.file_path]);
        await supabase.from('music_tracks').delete().eq('id', trackToDelete.id);
        await loadTracks();
      }
      setShowDeleteModal(false);
      setDeletePasswordInput('');
      setDeletePasswordError('');
      setTrackToDelete(null);
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLocked(true);
        setDeletePasswordError('Too many failed attempts. Locked for 5 minutes.');
        setTimeout(() => {
          setIsLocked(false);
          setFailedAttempts(0);
        }, 5 * 60 * 1000);
      } else {
        setDeletePasswordError(`Incorrect password (${newAttempts}/5 attempts)`);
      }
      setDeletePasswordInput('');
    }
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

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="theme-card rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Delete Song</h2>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePasswordInput('');
                    setDeletePasswordError('');
                    setTrackToDelete(null);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You're about to delete "{trackToDelete?.title}". Enter the password to confirm.
              </p>

              <form onSubmit={handleDeletePasswordSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password required to delete music
                  </label>
                  <input
                    type="password"
                    value={deletePasswordInput}
                    onChange={(e) => {
                      setDeletePasswordInput(e.target.value);
                      setDeletePasswordError('');
                    }}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter password"
                    autoFocus
                  />
                  {deletePasswordError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{deletePasswordError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletePasswordInput('');
                      setDeletePasswordError('');
                      setTrackToDelete(null);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  <button
                    onClick={() => handleDeleteButtonClick(track)}
                    className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                      currentTrack?.id === track.id
                        ? 'hover:bg-white hover:bg-opacity-20'
                        : 'hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400'
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
