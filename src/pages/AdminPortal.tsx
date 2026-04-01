import { useState, useRef, useEffect } from 'react';
import { X, Upload, Music as MusicIcon, BookOpen, Loader, Trash2, ArrowLeft } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { BookUpload } from '../components/BookUpload';
import { createClient } from '@supabase/supabase-js';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { StickyNav } from '../components/StickyNav';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ADMIN_PASSWORD = import.meta.env.VITE_MUSIC_UPLOAD_PASSWORD;

interface AdminPortalProps {
  onClose: () => void;
}

interface UploadStatus {
  fileName: string;
  progress: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_image_url: string;
  total_pages: number;
  category: string;
  order_index: number;
}

type ViewMode = 'main' | 'music' | 'books';

export function AdminPortal({ onClose }: AdminPortalProps) {
  const { isDarkMode } = useDarkMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [showBookUpload, setShowBookUpload] = useState(false);
  const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const { tracks, setTracks } = useMusicPlayer();
  const musicFileInputRef = useRef<HTMLInputElement>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      setPasswordError('Too many failed attempts. Please try again later.');
      return;
    }

    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput('');
      setPasswordError('');
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLocked(true);
        setPasswordError('Too many failed attempts. Locked for 5 minutes.');
        setTimeout(() => {
          setIsLocked(false);
          setFailedAttempts(0);
        }, 5 * 60 * 1000);
      } else {
        setPasswordError(`Incorrect password (${newAttempts}/5 attempts)`);
      }
      setPasswordInput('');
    }
  };

  const loadMusicTracks = async () => {
    const { data, error } = await supabase
      .from('music_tracks')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (!error && data) {
      setTracks(data);
    }
  };

  const loadBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setBooks(data);
    }
  };

  useEffect(() => {
    if (isAuthenticated && viewMode === 'music') {
      loadMusicTracks();
    } else if (isAuthenticated && viewMode === 'books') {
      loadBooks();
    }
  }, [isAuthenticated, viewMode]);

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const audioFiles = files.filter(file =>
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a)$/i)
    );

    if (audioFiles.length === 0) {
      alert('Please select valid audio files');
      return;
    }

    const newStatuses: UploadStatus[] = audioFiles.map(file => ({
      fileName: file.name,
      progress: 'uploading'
    }));
    setUploadStatuses(newStatuses);

    for (let i = 0; i < audioFiles.length; i++) {
      const file = audioFiles[i];
      try {
        setUploadStatuses(prev => prev.map((status, idx) =>
          idx === i ? { ...status, progress: 'uploading' } : status
        ));

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `music/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('music')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('music')
          .getPublicUrl(filePath);

        setUploadStatuses(prev => prev.map((status, idx) =>
          idx === i ? { ...status, progress: 'processing' } : status
        ));

        const audio = new Audio();
        audio.src = URL.createObjectURL(file);

        await new Promise((resolve, reject) => {
          audio.addEventListener('loadedmetadata', resolve);
          audio.addEventListener('error', reject);
        });

        const duration = Math.floor(audio.duration);
        const title = file.name.replace(/\.[^/.]+$/, '');

        const { error: dbError } = await supabase
          .from('music_tracks')
          .insert({
            title,
            artist: 'Unknown Artist',
            file_path: filePath,
            file_url: publicUrl,
            duration,
            play_count: 0
          });

        if (dbError) throw dbError;

        setUploadStatuses(prev => prev.map((status, idx) =>
          idx === i ? { ...status, progress: 'complete' } : status
        ));

      } catch (error) {
        console.error('Upload error:', error);
        setUploadStatuses(prev => prev.map((status, idx) =>
          idx === i ? {
            ...status,
            progress: 'error',
            error: error instanceof Error ? error.message : 'Upload failed'
          } : status
        ));
      }
    }

    await loadMusicTracks();
    setTimeout(() => setUploadStatuses([]), 3000);
    if (musicFileInputRef.current) {
      musicFileInputRef.current.value = '';
    }
  };

  const handleDeleteTrack = async (trackId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;

    try {
      await supabase.storage.from('music').remove([filePath]);
      await supabase.from('music_tracks').delete().eq('id', trackId);
      await loadMusicTracks();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete track');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book? This will also delete all its pages.')) return;

    try {
      await supabase.from('book_pages').delete().eq('book_id', bookId);
      await supabase.from('books').delete().eq('id', bookId);
      await loadBooks();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete book');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <StickyNav />
        <div className={`rounded-2xl shadow-2xl max-w-md w-full ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter admin password"
                disabled={isLocked}
                autoFocus
              />
            </div>

            {passwordError && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {passwordError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLocked || !passwordInput}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLocked ? 'Locked' : 'Access Admin Portal'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (viewMode === 'music') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <StickyNav />
        <div className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-inherit z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('main')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Music</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <button
                onClick={() => musicFileInputRef.current?.click()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Upload className="w-5 h-5" />
                Upload Music Files
              </button>
              <input
                ref={musicFileInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.ogg,.m4a"
                multiple
                onChange={handleMusicUpload}
                className="hidden"
              />
            </div>

            {uploadStatuses.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Upload Progress:</h4>
                {uploadStatuses.map((status, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      status.progress === 'complete'
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-700'
                        : status.progress === 'error'
                        ? 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-700'
                        : 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{status.fileName}</span>
                      {status.progress === 'uploading' || status.progress === 'processing' ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : status.progress === 'complete' ? (
                        <span className="text-green-600 dark:text-green-400 text-sm">✓ Complete</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 text-sm">✗ Failed</span>
                      )}
                    </div>
                    {status.error && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">{status.error}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold mb-4">Current Tracks ({tracks.length})</h3>
              {tracks.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No tracks uploaded yet
                </div>
              ) : (
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <div
                      key={track.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{track.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {track.artist} • {formatTime(track.duration)} • {track.play_count} plays
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteTrack(track.id, track.file_path)}
                        className="ml-4 p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'books') {
    return (
      <>
        <StickyNav />
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-inherit z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode('main')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Books</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <button
                  onClick={() => setShowBookUpload(true)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Upload className="w-5 h-5" />
                  Upload Book
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Current Books ({books.length})</h3>
                {books.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No books uploaded yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {books.map((book) => (
                      <div
                        key={book.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{book.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            by {book.author} • {book.total_pages} pages • {book.category}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="ml-4 p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showBookUpload && (
          <BookUpload
            onClose={() => setShowBookUpload(false)}
            onUploadComplete={() => {
              setShowBookUpload(false);
              loadBooks();
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <StickyNav />
      <div className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Portal</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setViewMode('music')}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-blue-500' : 'bg-gray-50 border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <MusicIcon className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold">Manage Music</h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Upload and delete music tracks
              </p>
            </button>

            <button
              onClick={() => setViewMode('books')}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-green-500' : 'bg-gray-50 border-gray-200 hover:border-green-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold">Manage Books</h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Upload and delete books
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
