import { useEffect, useRef, useState } from 'react';
import { Highlighter, Bookmark, Share2, X, Send } from 'lucide-react';
import { HIGHLIGHT_COLORS, type HighlightColor } from '../hooks/useBibleNotebook';

interface VerseActionPopupProps {
  anchorRect: DOMRect | null;
  book: string;
  chapter: number;
  verse: number;
  verseText: string;
  translation: string;
  currentHighlightColor: HighlightColor | null;
  onHighlight: (color: HighlightColor) => void;
  onRemoveHighlight: () => void;
  onSave: () => void;
  onClose: () => void;
}

export function VerseActionPopup({
  anchorRect,
  book,
  chapter,
  verse,
  verseText,
  translation,
  currentHighlightColor,
  onHighlight,
  onRemoveHighlight,
  onSave,
  onClose,
}: VerseActionPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!anchorRect) return;
    const popupWidth = 280;
    const popupHeight = 120;
    let left = anchorRect.left + anchorRect.width / 2 - popupWidth / 2;
    let top = anchorRect.top - popupHeight - 10;

    if (left < 8) left = 8;
    if (left + popupWidth > window.innerWidth - 8) left = window.innerWidth - popupWidth - 8;
    if (top < 8) top = anchorRect.bottom + 10;

    setPos({ top, left });
  }, [anchorRect]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [onClose]);

  if (!anchorRect || !pos) return null;

  const ref = `${book} ${chapter}:${verse}`;

  function handleShare() {
    const text = `"${verseText}" — ${ref} (${translation.toUpperCase()})`;
    if (navigator.share) {
      navigator.share({ text, title: ref }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
    }
  }

  function handleSend() {
    const text = `"${verseText}" — ${ref} (${translation.toUpperCase()})`;
    const subject = `Bible verse: ${ref}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  }

  return (
    <div
      ref={popupRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 600 }}
      className="w-[280px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700">
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{ref}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-3 py-2.5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Highlighter className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Highlight
          </span>
          {currentHighlightColor && (
            <button
              onClick={onRemoveHighlight}
              className="ml-auto text-[10px] font-semibold text-gray-400 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3">
          {(Object.keys(HIGHLIGHT_COLORS) as HighlightColor[]).map((color) => {
            const cfg = HIGHLIGHT_COLORS[color];
            const isActive = currentHighlightColor === color;
            return (
              <button
                key={color}
                onClick={() => onHighlight(color)}
                title={cfg.label}
                className={`w-8 h-8 rounded-full ${cfg.bg} border-2 transition-all ${
                  isActive
                    ? `ring-2 ${cfg.ring} ring-offset-1 dark:ring-offset-gray-800 scale-110 border-white dark:border-gray-600`
                    : 'border-white/60 dark:border-gray-600/60 hover:scale-105'
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onSave();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            Save
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
