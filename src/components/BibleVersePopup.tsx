import { useState, useEffect, useRef } from 'react';
import { X, BookOpen, Loader2, AlertCircle, ChevronDown } from 'lucide-react';

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

const VERSIONS = [
  { id: 'nlt', name: 'New Living Translation' },
  { id: 'esv', name: 'English Standard Version' },
  { id: 'nasb', name: 'New American Standard Bible' },
  { id: 'kjv', name: 'King James Version' },
  { id: 'web', name: 'World English Bible' },
];

const STORAGE_KEY = 'discipleco-bible-version';

function getInitialVersion(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VERSIONS.some((v) => v.id === saved)) return saved;
  } catch {
    // ignore
  }
  return 'nlt';
}

export function BibleVersePopup({ book, chapter, label, categoryBadgeClass, onClose }: BibleVersePopupProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string>(getInitialVersion);
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = `${SUPABASE_URL}/functions/v1/fetch-verses?book=${encodeURIComponent(book)}&chapter=${chapter}&translation=${encodeURIComponent(version)}`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        });
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setVerses(data.verses || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load chapter. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [book, chapter, version, SUPABASE_URL, SUPABASE_ANON_KEY]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (versionMenuOpen) setVersionMenuOpen(false);
        else onClose();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, versionMenuOpen]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVersionMenuOpen(false);
      }
    }
    if (versionMenuOpen) {
      document.addEventListener('mousedown', onClick);
      return () => document.removeEventListener('mousedown', onClick);
    }
  }, [versionMenuOpen]);

  function selectVersion(id: string) {
    setVersion(id);
    setVersionMenuOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
  }

  const currentVersion = VERSIONS.find((v) => v.id === version);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col theme-card rounded-2xl shadow-2xl border-2 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`${categoryBadgeClass} p-2 rounded-lg flex-shrink-0`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight truncate">{label}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{currentVersion?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setVersionMenuOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                aria-label="Choose Bible version"
              >
                <span className="uppercase tracking-wide">{version}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${versionMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {versionMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 theme-card rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                  <div className="px-3 py-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                    Bible Version
                  </div>
                  {VERSIONS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => selectVersion(v.id)}
                      className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors ${
                        v.id === version
                          ? 'bg-gray-100 dark:bg-gray-700/60'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{v.name}</div>
                        <div className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">{v.id}</div>
                      </div>
                      {v.id === version && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-gray-400" />
              <p className="text-xs text-gray-400 dark:text-gray-500">Loading {currentVersion?.name}…</p>
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
