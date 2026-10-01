import { useEffect, useRef, useState } from 'react';
import { X, Loader2, BookOpen, Languages, ExternalLink } from 'lucide-react';

export interface WordStudyData {
  book: string;
  chapter: number;
  verse: number;
  selectedWord: string;
  interlinear: {
    strongsNumber: string;
    originalWord: string;
    transliteration: string;
    englishGloss: string;
    partOfSpeech: string;
  }[];
  matchedWord: {
    strongsNumber: string;
    originalWord: string;
    transliteration: string;
    englishGloss: string;
    partOfSpeech: string;
  } | null;
  lexicon: {
    strongsNumber: string;
    language: string;
    originalWord: string;
    transliteration: string;
    pronunciation: string;
    kjvTranslation: string;
    nasbTranslation: string;
    definition: string;
    wordOrigin: string;
  } | null;
  translations: {
    translation: string;
    word: string;
  }[];
  error?: string;
}

interface WordStudyPopupProps {
  anchorRect: DOMRect | null;
  book: string;
  chapter: number;
  verse: number;
  selectedWord: string;
  sourceTranslation: string;
  onClose: () => void;
}

export function WordStudyPopup({
  anchorRect,
  book,
  chapter,
  verse,
  selectedWord,
  sourceTranslation,
  onClose,
}: WordStudyPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [data, setData] = useState<WordStudyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (!anchorRect) return;

    const popupWidth = 380;
    const popupMaxHeight = 520;
    let left = anchorRect.left + anchorRect.width / 2 - popupWidth / 2;
    let top = anchorRect.top - popupMaxHeight - 10;

    if (left < 8) left = 8;
    if (left + popupWidth > window.innerWidth - 8) left = window.innerWidth - popupWidth - 8;
    if (top < 8) top = anchorRect.bottom + 10;
    if (top + popupMaxHeight > window.innerHeight - 8) {
      top = Math.max(8, window.innerHeight - popupMaxHeight - 8);
    }

    setPos({ top, left });
  }, [anchorRect]);

  useEffect(() => {
    if (!book || !chapter || !verse || !selectedWord) return;

    setLoading(true);
    setError(null);
    setData(null);

    const url = `${supabaseUrl}/functions/v1/word-study?book=${encodeURIComponent(book)}&chapter=${chapter}&verse=${verse}&word=${encodeURIComponent(selectedWord)}&sourceTranslation=${encodeURIComponent(sourceTranslation)}`;

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'apikey': supabaseAnonKey,
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      })
      .catch(() => {
        setError('Could not load word study data. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [book, chapter, verse, selectedWord, sourceTranslation, supabaseUrl, supabaseAnonKey]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  if (!anchorRect || !pos) return null;

  const ref = `${book} ${chapter}:${verse}`;
  const isHebrew = data?.lexicon?.language === 'Hebrew';

  // Color themes: Hebrew = warm amber/rose, Greek = cool teal/sky
  const theme = isHebrew
    ? {
        gradFrom: 'from-amber-500',
        gradTo: 'to-rose-500',
        accent: 'text-amber-600 dark:text-amber-400',
        accentBg: 'bg-amber-50 dark:bg-amber-900/30',
        accentBorder: 'border-amber-300 dark:border-amber-700',
        chipBg: 'bg-amber-100 dark:bg-amber-900/40',
        chipText: 'text-amber-700 dark:text-amber-300',
        labelColor: 'text-amber-500 dark:text-amber-400',
        sectionBg: 'bg-amber-50/60 dark:bg-amber-900/10',
        strongsPrefix: 'H',
      }
    : {
        gradFrom: 'from-teal-500',
        gradTo: 'to-sky-600',
        accent: 'text-teal-600 dark:text-teal-400',
        accentBg: 'bg-teal-50 dark:bg-teal-900/30',
        accentBorder: 'border-teal-300 dark:border-teal-700',
        chipBg: 'bg-teal-100 dark:bg-teal-900/40',
        chipText: 'text-teal-700 dark:text-teal-300',
        labelColor: 'text-teal-500 dark:text-teal-400',
        sectionBg: 'bg-teal-50/60 dark:bg-teal-900/10',
        strongsPrefix: 'G',
      };

  return (
    <div
      ref={popupRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 700, maxHeight: '520px' }}
      className="w-[380px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden flex flex-col"
    >
      {/* Header with gradient */}
      <div className={`flex items-center justify-between px-4 py-2.5 bg-gradient-to-r ${theme.gradFrom} ${theme.gradTo} text-white`}>
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-bold truncate text-white">
            Word Study — {ref}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/20 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-sm text-gray-400">Loading word study...</span>
          </div>
        )}

        {error && !loading && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
          </div>
        )}

        {data && !loading && !error && (
          <div className="px-4 py-3 space-y-3">
            {/* Selected word */}
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                Selected Word
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                &ldquo;{selectedWord}&rdquo;
              </p>
            </div>

            {data.matchedWord && data.lexicon ? (
              <>
                {/* Original Language Word */}
                <div className={`rounded-xl border-2 ${theme.accentBorder} ${theme.accentBg} p-3.5`}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Languages className={`w-3.5 h-3.5 ${theme.accent}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.accent}`}>
                      {data.lexicon.language}
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-gray-400">
                      {theme.strongsPrefix}{data.matchedWord.strongsNumber}
                    </span>
                  </div>

                  {data.lexicon.originalWord && (
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1.5 text-center" dir={isHebrew ? 'rtl' : 'ltr'}>
                      {data.lexicon.originalWord}
                    </p>
                  )}

                  {data.lexicon.transliteration && (
                    <p className={`text-base font-semibold ${theme.accent} text-center mb-1`}>
                      {data.lexicon.transliteration}
                    </p>
                  )}

                  {data.lexicon.pronunciation && (
                    <p className="text-xs text-gray-400 text-center italic">
                      {data.lexicon.pronunciation}
                    </p>
                  )}

                  {data.matchedWord.partOfSpeech && (
                    <div className="flex justify-center mt-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.chipBg} ${theme.chipText}`}>
                        {data.matchedWord.partOfSpeech}
                      </span>
                    </div>
                  )}
                </div>

                {/* Definition */}
                {data.lexicon.definition && (
                  <div className={`rounded-lg ${theme.sectionBg} px-3 py-2.5`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.labelColor} mb-1.5`}>
                      Definition
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {data.lexicon.definition}
                    </p>
                  </div>
                )}

                {/* How this word is applied */}
                {(data.lexicon.kjvTranslation || data.lexicon.nasbTranslation) && (
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2.5 space-y-2">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.labelColor}`}>
                      How This Word Is Applied
                    </p>
                    {data.lexicon.kjvTranslation && (
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                          KJV
                        </span>
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                          {data.lexicon.kjvTranslation}
                        </p>
                      </div>
                    )}
                    {data.lexicon.nasbTranslation && (
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/30 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                          NASB
                        </span>
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                          {data.lexicon.nasbTranslation}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Link to BibleHub */}
                <a
                  href={`https://biblehub.com/${isHebrew ? 'hebrew' : 'greek'}/${data.matchedWord.strongsNumber}.htm`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors pt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View full lexicon on BibleHub
                </a>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No word study data found for &ldquo;{selectedWord}&rdquo; in this verse.
                </p>
                {data.interlinear.length > 0 && (
                  <div className="mt-3 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                      Interlinear Words in This Verse
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {data.interlinear.map((w, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        >
                          {w.englishGloss}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
