import { useState, useEffect, useRef } from 'react';
import { X, BookOpen, Loader2, AlertCircle } from 'lucide-react';

interface Verse {
  verse: number;
  text: string;
}

interface BibleVersePopupProps {
  book: string;
  chapter: number;
  label: string;
  categoryBadgeClass: string;
  onClose: () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function BibleVersePopup({ book, chapter, label, categoryBadgeClass, onClose }: BibleVersePopupProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = `${SUPABASE_URL}/functions/v1/fetch-verses?book=${encodeURIComponent(book)}&chapter=${chapter}`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        });
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setVerses(data.verses || []);
      } catch {
        setError('Could not load chapter. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [book, chapter]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col theme-card rounded-2xl shadow-2xl border-2 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`${categoryBadgeClass} p-2 rounded-lg`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{label}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">World English Bible (WEB)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-7 h-7 animate-spin text-gray-400" />
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 py-10 justify-center text-red-500">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          {!loading && !error && (
            <div className="space-y-3">
              {verses.map(({ verse, text }) => (
                <div key={verse} className="flex gap-3 group">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-7 flex-shrink-0 pt-0.5 text-right tabular-nums">
                    {verse}
                  </span>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed flex-1">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
