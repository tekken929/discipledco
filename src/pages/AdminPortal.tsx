import { useState, useRef, useEffect } from 'react';
import { X, Upload, Music as MusicIcon, BookOpen, Loader, Trash2, ArrowLeft, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { BookUpload } from '../components/BookUpload';
import { createClient } from '@supabase/supabase-js';
import { useMusicPlayer } from '../context/MusicPlayerContext';

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

interface VerseRow {
  translation: string;
  book_order: number;
  book: string;
  testament: string;
  chapter: number;
  verse: number;
  text: string;
}

type ViewMode = 'main' | 'music' | 'books' | 'bible';

type BibleStatus = 'idle' | 'parsing' | 'clearing' | 'uploading' | 'done' | 'error';

const BOOK_NAMES: Record<number, { name: string; testament: string }> = {
  1: { name: 'Genesis', testament: 'Old Testament' },
  2: { name: 'Exodus', testament: 'Old Testament' },
  3: { name: 'Leviticus', testament: 'Old Testament' },
  4: { name: 'Numbers', testament: 'Old Testament' },
  5: { name: 'Deuteronomy', testament: 'Old Testament' },
  6: { name: 'Joshua', testament: 'Old Testament' },
  7: { name: 'Judges', testament: 'Old Testament' },
  8: { name: 'Ruth', testament: 'Old Testament' },
  9: { name: '1 Samuel', testament: 'Old Testament' },
  10: { name: '2 Samuel', testament: 'Old Testament' },
  11: { name: '1 Kings', testament: 'Old Testament' },
  12: { name: '2 Kings', testament: 'Old Testament' },
  13: { name: '1 Chronicles', testament: 'Old Testament' },
  14: { name: '2 Chronicles', testament: 'Old Testament' },
  15: { name: 'Ezra', testament: 'Old Testament' },
  16: { name: 'Nehemiah', testament: 'Old Testament' },
  17: { name: 'Esther', testament: 'Old Testament' },
  18: { name: 'Job', testament: 'Old Testament' },
  19: { name: 'Psalms', testament: 'Old Testament' },
  20: { name: 'Proverbs', testament: 'Old Testament' },
  21: { name: 'Ecclesiastes', testament: 'Old Testament' },
  22: { name: 'Song of Solomon', testament: 'Old Testament' },
  23: { name: 'Isaiah', testament: 'Old Testament' },
  24: { name: 'Jeremiah', testament: 'Old Testament' },
  25: { name: 'Lamentations', testament: 'Old Testament' },
  26: { name: 'Ezekiel', testament: 'Old Testament' },
  27: { name: 'Daniel', testament: 'Old Testament' },
  28: { name: 'Hosea', testament: 'Old Testament' },
  29: { name: 'Joel', testament: 'Old Testament' },
  30: { name: 'Amos', testament: 'Old Testament' },
  31: { name: 'Obadiah', testament: 'Old Testament' },
  32: { name: 'Jonah', testament: 'Old Testament' },
  33: { name: 'Micah', testament: 'Old Testament' },
  34: { name: 'Nahum', testament: 'Old Testament' },
  35: { name: 'Habakkuk', testament: 'Old Testament' },
  36: { name: 'Zephaniah', testament: 'Old Testament' },
  37: { name: 'Haggai', testament: 'Old Testament' },
  38: { name: 'Zechariah', testament: 'Old Testament' },
  39: { name: 'Malachi', testament: 'Old Testament' },
  40: { name: 'Matthew', testament: 'New Testament' },
  41: { name: 'Mark', testament: 'New Testament' },
  42: { name: 'Luke', testament: 'New Testament' },
  43: { name: 'John', testament: 'New Testament' },
  44: { name: 'Acts', testament: 'New Testament' },
  45: { name: 'Romans', testament: 'New Testament' },
  46: { name: '1 Corinthians', testament: 'New Testament' },
  47: { name: '2 Corinthians', testament: 'New Testament' },
  48: { name: 'Galatians', testament: 'New Testament' },
  49: { name: 'Ephesians', testament: 'New Testament' },
  50: { name: 'Philippians', testament: 'New Testament' },
  51: { name: 'Colossians', testament: 'New Testament' },
  52: { name: '1 Thessalonians', testament: 'New Testament' },
  53: { name: '2 Thessalonians', testament: 'New Testament' },
  54: { name: '1 Timothy', testament: 'New Testament' },
  55: { name: '2 Timothy', testament: 'New Testament' },
  56: { name: 'Titus', testament: 'New Testament' },
  57: { name: 'Philemon', testament: 'New Testament' },
  58: { name: 'Hebrews', testament: 'New Testament' },
  59: { name: 'James', testament: 'New Testament' },
  60: { name: '1 Peter', testament: 'New Testament' },
  61: { name: '2 Peter', testament: 'New Testament' },
  62: { name: '1 John', testament: 'New Testament' },
  63: { name: '2 John', testament: 'New Testament' },
  64: { name: '3 John', testament: 'New Testament' },
  65: { name: 'Jude', testament: 'New Testament' },
  66: { name: 'Revelation', testament: 'New Testament' },
};

function detectTranslation(raw: string): 'esv' | 'nasb' | 'nlt' | null {
  const upper = raw.toUpperCase();
  if (upper.includes('ESV')) return 'esv';
  if (upper.includes('NASB')) return 'nasb';
  if (upper.includes('NLT')) return 'nlt';
  return null;
}

function parseXml(xmlText: string): { translation: string | null; verses: VerseRow[] } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');

  const bibleEl = doc.querySelector('bible');
  const rawTranslation = bibleEl?.getAttribute('translation') || '';
  const translation = detectTranslation(rawTranslation);

  const verses: VerseRow[] = [];
  const bookEls = doc.querySelectorAll('book');

  bookEls.forEach((bookEl) => {
    const bookNum = parseInt(bookEl.getAttribute('number') || '0');
    const bookInfo = BOOK_NAMES[bookNum];
    if (!bookInfo) return;

    const chapterEls = bookEl.querySelectorAll('chapter');
    chapterEls.forEach((chapterEl) => {
      const chapterNum = parseInt(chapterEl.getAttribute('number') || '0');
      const verseEls = chapterEl.querySelectorAll('verse');
      verseEls.forEach((verseEl) => {
        const verseNum = parseInt(verseEl.getAttribute('number') || '0');
        const text = verseEl.textContent?.trim() || '';
        if (verseNum && text && translation) {
          verses.push({
            translation,
            book_order: bookNum,
            book: bookInfo.name,
            testament: bookInfo.testament,
            chapter: chapterNum,
            verse: verseNum,
            text,
          });
        }
      });
    });
  });

  return { translation, verses };
}

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
  const bibleFileInputRef = useRef<HTMLInputElement>(null);

  // Bible upload state
  const [bibleFileName, setBibleFileName] = useState('');
  const [bibleTranslation, setBibleTranslation] = useState<'esv' | 'nasb' | 'nlt' | null>(null);
  const [bibleStatus, setBibleStatus] = useState<BibleStatus>('idle');
  const [bibleProgress, setBibleProgress] = useState(0);
  const [bibleTotalBatches, setBibleTotalBatches] = useState(0);
  const [bibleVerseCount, setBibleVerseCount] = useState(0);
  const [bibleError, setBibleError] = useState('');
  const [existingCounts, setExistingCounts] = useState<Record<string, number>>({});

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
        setTimeout(() => { setIsLocked(false); setFailedAttempts(0); }, 5 * 60 * 1000);
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
    if (!error && data) setTracks(data);
  };

  const loadBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('order_index', { ascending: true });
    if (!error && data) setBooks(data);
  };

  const loadExistingCounts = async () => {
    const { data } = await supabase
      .from('translations_bible')
      .select('translation')
      .in('translation', ['esv', 'nasb', 'nlt']);
    if (data) {
      const counts: Record<string, number> = {};
      for (const row of data) {
        counts[row.translation] = (counts[row.translation] || 0) + 1;
      }
      setExistingCounts(counts);
    }
  };

  useEffect(() => {
    if (isAuthenticated && viewMode === 'music') loadMusicTracks();
    else if (isAuthenticated && viewMode === 'books') loadBooks();
    else if (isAuthenticated && viewMode === 'bible') loadExistingCounts();
  }, [isAuthenticated, viewMode]);

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const audioFiles = files.filter(file =>
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a)$/i)
    );
    if (audioFiles.length === 0) { alert('Please select valid audio files'); return; }

    const newStatuses: UploadStatus[] = audioFiles.map(file => ({ fileName: file.name, progress: 'uploading' }));
    setUploadStatuses(newStatuses);

    for (let i = 0; i < audioFiles.length; i++) {
      const file = audioFiles[i];
      try {
        setUploadStatuses(prev => prev.map((s, idx) => idx === i ? { ...s, progress: 'uploading' } : s));
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `music/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('music').upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('music').getPublicUrl(filePath);
        setUploadStatuses(prev => prev.map((s, idx) => idx === i ? { ...s, progress: 'processing' } : s));
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
          audio.addEventListener('loadedmetadata', resolve);
          audio.addEventListener('error', reject);
        });
        const duration = Math.floor(audio.duration);
        const title = file.name.replace(/\.[^/.]+$/, '');
        const { error: dbError } = await supabase.from('music_tracks').insert({
          title, artist: 'Unknown Artist', file_path: filePath, file_url: publicUrl, duration, play_count: 0
        });
        if (dbError) throw dbError;
        setUploadStatuses(prev => prev.map((s, idx) => idx === i ? { ...s, progress: 'complete' } : s));
      } catch (error) {
        setUploadStatuses(prev => prev.map((s, idx) =>
          idx === i ? { ...s, progress: 'error', error: error instanceof Error ? error.message : 'Upload failed' } : s
        ));
      }
    }
    await loadMusicTracks();
    setTimeout(() => setUploadStatuses([]), 3000);
    if (musicFileInputRef.current) musicFileInputRef.current.value = '';
  };

  const handleDeleteTrack = async (trackId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;
    try {
      await supabase.storage.from('music').remove([filePath]);
      await supabase.from('music_tracks').delete().eq('id', trackId);
      await loadMusicTracks();
    } catch { alert('Failed to delete track'); }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book? This will also delete all its pages.')) return;
    try {
      await supabase.from('book_pages').delete().eq('book_id', bookId);
      await supabase.from('books').delete().eq('id', bookId);
      await loadBooks();
    } catch { alert('Failed to delete book'); }
  };

  const handleBibleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBibleFileName(file.name);
    setBibleStatus('parsing');
    setBibleError('');
    setBibleTranslation(null);
    setBibleProgress(0);
    setBibleTotalBatches(0);
    setBibleVerseCount(0);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const xmlText = ev.target?.result as string;
        const { translation, verses } = parseXml(xmlText);
        if (!translation) {
          setBibleError('Could not detect translation (ESV, NASB, or NLT) from the XML file.');
          setBibleStatus('error');
          return;
        }
        setBibleTranslation(translation);
        setBibleVerseCount(verses.length);
        setBibleStatus('idle');
        // Store verses for later upload
        (bibleFileInputRef.current as any)._parsedVerses = verses;
      } catch (err) {
        setBibleError(`Failed to parse XML: ${err instanceof Error ? err.message : String(err)}`);
        setBibleStatus('error');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleBibleImport = async () => {
    const verses: VerseRow[] = (bibleFileInputRef.current as any)?._parsedVerses;
    if (!verses || !bibleTranslation) return;

    const BATCH_SIZE = 1500;
    const totalBatches = Math.ceil(verses.length / BATCH_SIZE);
    setBibleTotalBatches(totalBatches);
    setBibleProgress(0);

    try {
      // Clear existing data for this translation
      setBibleStatus('clearing');
      const clearRes = await fetch(
        `${supabaseUrl}/functions/v1/seed-translation?translation=${bibleTranslation}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${supabaseAnonKey}` } }
      );
      if (!clearRes.ok) throw new Error(`Clear failed: ${clearRes.status}`);

      // Upload in batches
      setBibleStatus('uploading');
      for (let i = 0; i < totalBatches; i++) {
        const batch = verses.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
        const res = await fetch(`${supabaseUrl}/functions/v1/seed-translation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ verses: batch }),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Batch ${i + 1} failed`);
        }
        setBibleProgress(i + 1);
      }

      setBibleStatus('done');
      await loadExistingCounts();
    } catch (err) {
      setBibleError(err instanceof Error ? err.message : String(err));
      setBibleStatus('error');
    }
  };

  const handleDeleteTranslation = async (translation: string) => {
    if (!confirm(`Delete all ${translation.toUpperCase()} verses from the database?`)) return;
    const res = await fetch(
      `${supabaseUrl}/functions/v1/seed-translation?translation=${translation}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${supabaseAnonKey}` } }
    );
    if (res.ok) {
      await loadExistingCounts();
    } else {
      alert('Delete failed');
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
        <div className={`rounded-2xl shadow-2xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
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
                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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
        <div className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-inherit z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setViewMode('main')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Music</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
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
              <input ref={musicFileInputRef} type="file" accept="audio/*,.mp3,.wav,.ogg,.m4a" multiple onChange={handleMusicUpload} className="hidden" />
            </div>
            {uploadStatuses.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Upload Progress:</h4>
                {uploadStatuses.map((status, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${
                    status.progress === 'complete' ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-700'
                    : status.progress === 'error' ? 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-700'
                    : 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{status.fileName}</span>
                      {status.progress === 'uploading' || status.progress === 'processing'
                        ? <Loader className="w-4 h-4 animate-spin" />
                        : status.progress === 'complete'
                        ? <span className="text-green-600 dark:text-green-400 text-sm">Complete</span>
                        : <span className="text-red-600 dark:text-red-400 text-sm">Failed</span>
                      }
                    </div>
                    {status.error && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{status.error}</p>}
                  </div>
                ))}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold mb-4">Current Tracks ({tracks.length})</h3>
              {tracks.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">No tracks uploaded yet</div>
              ) : (
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <div key={track.id} className={`flex items-center justify-between p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{track.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {track.artist} • {formatTime(track.duration)} • {track.play_count} plays
                        </p>
                      </div>
                      <button onClick={() => handleDeleteTrack(track.id, track.file_path)} className="ml-4 p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-inherit z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setViewMode('main')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Books</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
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
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">No books uploaded yet</div>
                ) : (
                  <div className="space-y-2">
                    {books.map((book) => (
                      <div key={book.id} className={`flex items-center justify-between p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{book.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">by {book.author} • {book.total_pages} pages • {book.category}</p>
                        </div>
                        <button onClick={() => handleDeleteBook(book.id)} className="ml-4 p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
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
            onUploadComplete={() => { setShowBookUpload(false); loadBooks(); }}
          />
        )}
      </>
    );
  }

  if (viewMode === 'bible') {
    const isWorking = bibleStatus === 'parsing' || bibleStatus === 'clearing' || bibleStatus === 'uploading';
    const progressPct = bibleTotalBatches > 0 ? Math.round((bibleProgress / bibleTotalBatches) * 100) : 0;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-inherit z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setViewMode('main')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bible Translations</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Existing translations */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Currently in Database</h3>
              <div className="grid grid-cols-3 gap-3">
                {(['esv', 'nasb', 'nlt'] as const).map((t) => {
                  const count = existingCounts[t] || 0;
                  return (
                    <div key={t} className={`rounded-xl border-2 p-4 ${count > 0 ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-lg text-gray-900 dark:text-white">{t.toUpperCase()}</span>
                        {count > 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {count > 0 ? `${count.toLocaleString()} verses` : 'Not imported'}
                      </p>
                      {count > 0 && (
                        <button
                          onClick={() => handleDeleteTranslation(t)}
                          className="mt-2 text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Import new XML */}
            <div className={`rounded-xl border-2 p-5 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Import XML File</h3>

              <button
                onClick={() => bibleFileInputRef.current?.click()}
                disabled={isWorking}
                className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-teal-400 dark:hover:border-teal-500 rounded-xl py-8 px-4 text-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {bibleFileName ? bibleFileName : 'Click to select Bible XML file'}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">ESV, NASB, or NLT format</p>
              </button>
              <input
                ref={bibleFileInputRef}
                type="file"
                accept=".xml"
                onChange={handleBibleFileSelect}
                className="hidden"
              />

              {/* Parsed file info */}
              {bibleStatus === 'idle' && bibleTranslation && bibleVerseCount > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-teal-800 dark:text-teal-200">
                        {bibleTranslation.toUpperCase()} detected
                      </p>
                      <p className="text-sm text-teal-600 dark:text-teal-400">
                        {bibleVerseCount.toLocaleString()} verses ready to import
                      </p>
                    </div>
                  </div>
                  {existingCounts[bibleTranslation] ? (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mb-3">
                      Existing {bibleTranslation.toUpperCase()} data will be replaced.
                    </p>
                  ) : null}
                  <button
                    onClick={handleBibleImport}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Import {bibleTranslation.toUpperCase()} into Database
                  </button>
                </div>
              )}

              {/* Progress */}
              {(bibleStatus === 'clearing' || bibleStatus === 'uploading') && (
                <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Loader className="w-4 h-4 animate-spin text-blue-500" />
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      {bibleStatus === 'clearing' ? 'Clearing existing data...' : `Uploading... batch ${bibleProgress} of ${bibleTotalBatches}`}
                    </p>
                  </div>
                  {bibleStatus === 'uploading' && (
                    <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Done */}
              {bibleStatus === 'done' && (
                <div className="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-200">Import complete!</p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {bibleVerseCount.toLocaleString()} {bibleTranslation?.toUpperCase()} verses are now available in Bible Lookup.
                    </p>
                  </div>
                </div>
              )}

              {/* Error */}
              {bibleStatus === 'error' && (
                <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200">Import failed</p>
                    <p className="text-sm text-red-600 dark:text-red-400">{bibleError}</p>
                  </div>
                </div>
              )}

              {/* Parsing */}
              {bibleStatus === 'parsing' && (
                <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center gap-3">
                  <Loader className="w-4 h-4 animate-spin text-gray-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Parsing XML file...</p>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              XML format: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">&lt;bible translation="..."&gt;&lt;testament&gt;&lt;book number="N"&gt;&lt;chapter number="N"&gt;&lt;verse number="N"&gt;</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Portal</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => setViewMode('music')}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-blue-500' : 'bg-gray-50 border-gray-200 hover:border-blue-400'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <MusicIcon className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold">Manage Music</h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Upload and delete music tracks</p>
            </button>

            <button
              onClick={() => setViewMode('books')}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-green-500' : 'bg-gray-50 border-gray-200 hover:border-green-400'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold">Manage Books</h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Upload and delete books</p>
            </button>

            <button
              onClick={() => setViewMode('bible')}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-teal-500' : 'bg-gray-50 border-gray-200 hover:border-teal-400'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-teal-600" />
                <h3 className="text-xl font-bold">Bible Translations</h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Import ESV, NASB, and NLT from XML</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
