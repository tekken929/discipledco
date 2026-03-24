import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Trash2, Music as MusicIcon, Upload, Loader, Lock, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useMusicPlayer } from '../context/MusicPlayerContext';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UPLOAD_PASSWORD = 'jukebox2024';

interface UploadStatus {
  fileName: string;
  progress: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export function Music() {
  const { tracks: globalTracks, currentTrack, isPlaying, playTrack, setTracks } = useMusicPlayer();
  const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadButtonClick = () => {
    setShowPasswordModal(true);
    setPasswordInput('');
    setPasswordError('');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === UPLOAD_PASSWORD) {
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
      fileInputRef.current?.click();
    } else {
      setPasswordError('Incorrect password');
      setPasswordInput('');
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

  const deleteTrack = async (track: typeof globalTracks[0]) => {
    if (!confirm(`Delete "${track.title}"?`)) return;

    await supabase.storage.from('music').remove([track.file_path]);
    await supabase.from('music_tracks').delete().eq('id', track.id);

    loadTracks();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const initialStatuses: UploadStatus[] = fileArray.map(file => ({
      fileName: file.name,
      progress: 'uploading'
    }));
    setUploadStatuses(initialStatuses);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      if (!file.type.startsWith('audio/')) {
        setUploadStatuses(prev => prev.map((status, idx) =>
          idx === i ? { ...status, progress: 'error', error: 'Not an audio file' } : status
        ));
        continue;
      }

      try {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('music')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        setUploadStatuses(prev => prev.map((status, idx) =>
          idx === i ? { ...status, progress: 'processing' } : status
        ));

        const { data: urlData } = supabase.storage
          .from('music')
          .getPublicUrl(filePath);

        const audio = new Audio();
        audio.src = urlData.publicUrl;

        await new Promise<void>((resolve, reject) => {
          audio.addEventListener('loadedmetadata', async () => {
            try {
              const trackName = file.name.replace(/\.[^/.]+$/, '');

              const { error: insertError } = await supabase.from('music_tracks').insert({
                title: trackName,
                artist: 'Unknown Artist',
                file_path: filePath,
                file_url: urlData.publicUrl,
                duration: Math.floor(audio.duration),
                play_count: 0
              });

              if (insertError) {
                throw new Error(insertError.message);
              }

              setUploadStatuses(prev => prev.map((status, idx) =>
                idx === i ? { ...status, progress: 'complete' } : status
              ));

              await loadTracks();
              resolve();
            } catch (error) {
              reject(error);
            }
          });

          audio.addEventListener('error', () => {
            reject(new Error('Failed to load audio metadata'));
          });

          setTimeout(() => reject(new Error('Timeout loading metadata')), 10000);
        });
      } catch (error) {
        setUploadStatuses(prev => prev.map((status, idx) =>
          idx === i ? { ...status, progress: 'error', error: error instanceof Error ? error.message : 'Upload failed' } : status
        ));
      }
    }

    setTimeout(() => {
      setUploadStatuses([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 3000);
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
          <p className="text-lg text-gray-600 dark:text-gray-400">Worship songs and Christian music</p>
        </div>

        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="music-upload"
          />
          <button
            onClick={handleUploadButtonClick}
            className="inline-flex items-center gap-2 px-6 py-3 theme-primary-button text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Lock className="w-5 h-5" />
            <Upload className="w-5 h-5" />
            Upload Music
          </button>
        </div>

        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="theme-card rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Password</h2>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordInput('');
                    setPasswordError('');
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password required to upload music
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError('');
                    }}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter password"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordInput('');
                      setPasswordError('');
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 theme-primary-button text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {uploadStatuses.length > 0 && (
          <div className="mb-6 space-y-2">
            {uploadStatuses.map((status, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 theme-card rounded-lg border"
              >
                {status.progress === 'uploading' && <Loader className="w-4 h-4 animate-spin text-blue-600" />}
                {status.progress === 'processing' && <Loader className="w-4 h-4 animate-spin text-yellow-600" />}
                {status.progress === 'complete' && <Play className="w-4 h-4 text-green-600" />}
                {status.progress === 'error' && <Trash2 className="w-4 h-4 text-red-600" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{status.fileName}</p>
                  {status.progress === 'uploading' && <p className="text-xs text-blue-600">Uploading...</p>}
                  {status.progress === 'processing' && <p className="text-xs text-yellow-600">Processing...</p>}
                  {status.progress === 'complete' && <p className="text-xs text-green-600">Complete!</p>}
                  {status.progress === 'error' && <p className="text-xs text-red-600">{status.error}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Playlist ({globalTracks.length} {globalTracks.length === 1 ? 'song' : 'songs'})
          </h2>
          {globalTracks.length === 0 ? (
            <div className="text-center py-12">
              <MusicIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No songs yet. Upload some music to get started!</p>
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
                      currentTrack?.id === track.id ? 'text-white opacity-90' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {track.artist} • {formatTime(track.duration)} • {track.play_count} plays
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTrack(track)}
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
