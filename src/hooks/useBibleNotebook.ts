import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const USER_ID_KEY = 'discipleco-bible-user-id';

export interface SavedVerse {
  id: string;
  user_id: string;
  book: string;
  chapter: number;
  verse: number;
  verse_end: number | null;
  verse_text: string;
  translation: string;
  note: string | null;
  created_at: string;
}

export interface VerseHighlight {
  id: string;
  user_id: string;
  book: string;
  chapter: number;
  verse: number;
  color: string;
  created_at: string;
}

export type HighlightColor = 'yellow' | 'green' | 'blue';

export const HIGHLIGHT_COLORS: Record<HighlightColor, { label: string; bg: string; ring: string }> = {
  yellow: { label: 'Yellow', bg: 'bg-amber-300/60', ring: 'ring-amber-400' },
  green: { label: 'Green', bg: 'bg-emerald-300/60', ring: 'ring-emerald-400' },
  blue: { label: 'Blue', bg: 'bg-sky-300/60', ring: 'ring-sky-400' },
};

function getOrCreateUserId(): string {
  try {
    let id = localStorage.getItem(USER_ID_KEY);
    if (id) return id;
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function useBibleNotebook() {
  const [userId, setUserId] = useState<string | null>(null);
  const [savedVerses, setSavedVerses] = useState<SavedVerse[]>([]);
  const [highlights, setHighlights] = useState<VerseHighlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    const id = getOrCreateUserId();
    setUserId(id);

    (async () => {
      try {
        await supabase.from('bible_notebook_users').upsert({ id }, { onConflict: 'id' }).select();

        const [savedRes, hlRes] = await Promise.all([
          supabase.from('bible_saved_verses').select('*').eq('user_id', id).order('created_at', { ascending: false }),
          supabase.from('bible_verse_highlights').select('*').eq('user_id', id),
        ]);

        if (savedRes.data) setSavedVerses(savedRes.data as SavedVerse[]);
        if (hlRes.data) setHighlights(hlRes.data as VerseHighlight[]);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveVerse = useCallback(
    async (params: {
      book: string;
      chapter: number;
      verse: number;
      verse_end?: number | null;
      verse_text: string;
      translation: string;
      note?: string;
    }) => {
      if (!supabase || !userId) return null;
      const { data, error } = await supabase
        .from('bible_saved_verses')
        .insert({
          user_id: userId,
          book: params.book,
          chapter: params.chapter,
          verse: params.verse,
          verse_end: params.verse_end ?? null,
          verse_text: params.verse_text,
          translation: params.translation,
          note: params.note ?? null,
        })
        .select()
        .single();
      if (data) {
        setSavedVerses((prev) => [data as SavedVerse, ...prev]);
        return data as SavedVerse;
      }
      return null;
    },
    [userId],
  );

  const removeSavedVerse = useCallback(
    async (id: string) => {
      if (!supabase || !userId) return;
      await supabase.from('bible_saved_verses').delete().eq('id', id).eq('user_id', userId);
      setSavedVerses((prev) => prev.filter((v) => v.id !== id));
    },
    [userId],
  );

  const updateNote = useCallback(
    async (id: string, note: string) => {
      if (!supabase || !userId) return;
      await supabase.from('bible_saved_verses').update({ note }).eq('id', id).eq('user_id', userId);
      setSavedVerses((prev) => prev.map((v) => (v.id === id ? { ...v, note } : v)));
    },
    [userId],
  );

  const toggleHighlight = useCallback(
    async (book: string, chapter: number, verse: number, color: HighlightColor) => {
      if (!supabase || !userId) return;
      const existing = highlights.find(
        (h) => h.book === book && h.chapter === chapter && h.verse === verse,
      );
      if (existing) {
        if (existing.color === color) {
          await supabase.from('bible_verse_highlights').delete().eq('id', existing.id).eq('user_id', userId);
          setHighlights((prev) => prev.filter((h) => h.id !== existing.id));
        } else {
          const { data } = await supabase
            .from('bible_verse_highlights')
            .update({ color })
            .eq('id', existing.id)
            .eq('user_id', userId)
            .select()
            .single();
          if (data) {
            setHighlights((prev) => prev.map((h) => (h.id === existing.id ? (data as VerseHighlight) : h)));
          }
        }
      } else {
        const { data } = await supabase
          .from('bible_verse_highlights')
          .insert({ user_id: userId, book, chapter, verse, color })
          .select()
          .single();
        if (data) {
          setHighlights((prev) => [...prev, data as VerseHighlight]);
        }
      }
    },
    [userId, highlights],
  );

  const removeHighlight = useCallback(
    async (book: string, chapter: number, verse: number) => {
      if (!supabase || !userId) return;
      const existing = highlights.find(
        (h) => h.book === book && h.chapter === chapter && h.verse === verse,
      );
      if (!existing) return;
      await supabase.from('bible_verse_highlights').delete().eq('id', existing.id).eq('user_id', userId);
      setHighlights((prev) => prev.filter((h) => h.id !== existing.id));
    },
    [userId, highlights],
  );

  const getHighlight = useCallback(
    (book: string, chapter: number, verse: number): VerseHighlight | undefined => {
      return highlights.find((h) => h.book === book && h.chapter === chapter && h.verse === verse);
    },
    [highlights],
  );

  return {
    userId,
    savedVerses,
    highlights,
    loading,
    saveVerse,
    removeSavedVerse,
    updateNote,
    toggleHighlight,
    removeHighlight,
    getHighlight,
  };
}
