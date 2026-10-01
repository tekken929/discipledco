import { useEffect, useRef, useState } from 'react';
import { X, Loader2, BookOpen, Languages, ListChecks, ExternalLink } from 'lucide-react';

export interface WordStudyData {
  book: string;
  chapter: number;
  verse: number;
  selectedWord: string;
  interlinear: {
    strongsNumber: string;
    greekOrHebrew: string;
    transliteration: string;
    englishGloss: string;
    partOfSpeech: string;
  }[];
  matchedWord: {
    strongsNumber: string;
    greekOrHebrew: string;
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
  onClose: () => void;
}

const TRANSLATION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  KJV: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-700' },
  NIV: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-700' },
  ESV: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-700' },
  NASB: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-700' },
  NLT: { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-700' },
};

export function WordStudyPopup({
  anchorRect,
  book,
  chapter,
  verse,
  selectedWord,
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

    const url = `${supabaseUrl}/functions/v1/word-study?book=${encodeURIComponent(book)}&chapter=${chapter}&verse=${verse}&word=${encodeURIComponent(selectedWord)}`;

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
  }, [book, chapter, verse, selectedWord, supabaseUrl, supabaseAnonKey]);

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
  const langColor = isHebrew ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400';
  const langBg = isHebrew ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-blue-50 dark:bg-blue-900/20';
  const langBorder = isHebrew ? 'border-amber-200 dark:border-amber-700' : 'border-blue-200 dark:border-blue-700';

  return (
    <div
      ref={popupRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 700, maxHeight: '520px' }}
      className="w-[380px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">
            Word Study — {ref}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
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
                <div className={`rounded-xl border ${langBorder} ${langBg} p-3`}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Languages className={`w-3.5 h-3.5 ${langColor}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${langColor}`}>
                      {data.lexicon.language}
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-gray-400">
                      {isHebrew ? 'H' : 'G'}{data.matchedWord.strongsNumber}
                    </span>
                  </div>

                  {data.lexicon.originalWord && (
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 text-center" dir={isHebrew ? 'rtl' : 'ltr'}>
                      {data.lexicon.originalWord}
                    </p>
                  )}

                  {data.lexicon.transliteration && (
                    <p className={`text-sm font-semibold ${langColor} text-center mb-1`}>
                      {data.lexicon.transliteration}
                    </p>
                  )}

                  {data.lexicon.pronunciation && (
                    <p className="text-xs text-gray-400 text-center italic">
                      {data.lexicon.pronunciation}
                    </p>
                  )}

                  {data.matchedWord.partOfSpeech && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                      {data.matchedWord.partOfSpeech}
                    </p>
                  )}
                </div>

                {/* Definition */}
                {data.lexicon.definition && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                      Definition
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {data.lexicon.definition}
                    </p>
                  </div>
                )}

                {/* Word Origin */}
                {data.lexicon.wordOrigin && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                      Word Origin
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {data.lexicon.wordOrigin}
                    </p>
                  </div>
                )}

                {/* Translation comparison */}
                {data.translations.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <ListChecks className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        Translation Comparison
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      {data.translations.map((t) => {
                        const colors = TRANSLATION_COLORS[t.translation] || {
                          bg: 'bg-gray-50 dark:bg-gray-700/40',
                          text: 'text-gray-700 dark:text-gray-300',
                          border: 'border-gray-200 dark:border-gray-600',
                        };
                        return (
                          <div
                            key={t.translation}
                            className={`flex items-center gap-2 rounded-lg border ${colors.border} ${colors.bg} px-2.5 py-1.5`}
                          >
                            <span className={`text-[10px] font-bold w-10 flex-shrink-0 ${colors.text}`}>
                              {t.translation}
                            </span>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {t.word}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* KJV / NASB translation lists */}
                {(data.lexicon.kjvTranslation || data.lexicon.nasbTranslation) && (
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2 space-y-1.5">
                    {data.lexicon.kjvTranslation && (
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        <span className="font-bold">KJV uses:</span> {data.lexicon.kjvTranslation}
                      </p>
                    )}
                    {data.lexicon.nasbTranslation && (
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        <span className="font-bold">NASB uses:</span> {data.lexicon.nasbTranslation}
                      </p>
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
