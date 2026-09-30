import { useState } from 'react';
import { X, Bookmark, Trash2, StickyNote, Send, NotebookPen } from 'lucide-react';
import type { SavedVerse } from '../hooks/useBibleNotebook';

interface NotepadPanelProps {
  open: boolean;
  onClose: () => void;
  savedVerses: SavedVerse[];
  onRemove: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
}

export function NotepadPanel({ open, onClose, savedVerses, onRemove, onUpdateNote }: NotepadPanelProps) {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  function startEdit(sv: SavedVerse) {
    setEditingNoteId(sv.id);
    setNoteDraft(sv.note || '');
  }

  function saveNote(id: string) {
    onUpdateNote(id, noteDraft.trim());
    setEditingNoteId(null);
  }

  function sendVerse(sv: SavedVerse) {
    const ref = sv.verse_end ? `${sv.book} ${sv.chapter}:${sv.verse}-${sv.verse_end}` : `${sv.book} ${sv.chapter}:${sv.verse}`;
    const text = `"${sv.verse_text}" — ${ref} (${sv.translation.toUpperCase()})`;
    const subject = `Bible verse: ${ref}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-[400] bg-black/20 backdrop-blur-[1px]" onClick={onClose} />}

      <aside
        className={`fixed top-0 right-0 z-[410] h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
              <NotebookPen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">My Notebook</h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {savedVerses.length} saved {savedVerses.length === 1 ? 'verse' : 'verses'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved verses list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {savedVerses.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-3">
              <Bookmark className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              <p className="text-sm text-gray-400 dark:text-gray-500 max-w-[200px]">
                No saved verses yet. Select any verse while reading to save it here.
              </p>
            </div>
          )}

          {savedVerses.map((sv) => {
            const ref = sv.verse_end
              ? `${sv.book} ${sv.chapter}:${sv.verse}-${sv.verse_end}`
              : `${sv.book} ${sv.chapter}:${sv.verse}`;
            return (
              <div
                key={sv.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                      {sv.translation.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{ref}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => sendVerse(sv)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                      title="Send"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemove(sv.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic mb-2">
                  {sv.verse_text}
                </p>

                {editingNoteId === sv.id ? (
                  <div className="mt-2">
                    <textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Add a personal note..."
                      rows={3}
                      className="w-full text-xs rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 px-2.5 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2 mt-1.5">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="text-xs font-semibold text-gray-500 px-2.5 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveNote(sv.id)}
                        className="text-xs font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(sv)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <StickyNote className="w-3 h-3" />
                    {sv.note ? sv.note : 'Add a note'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
