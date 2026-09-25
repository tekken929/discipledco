import { supabase } from './supabase';

export interface BibleVerse {
  verse: number;
  text: string;
}

export type Translation = 'kjv' | 'niv' | 'esv' | 'nasb' | 'nlt';

export const TRANSLATION_LABELS: Record<Translation, { label: string; full: string; description: string }> = {
  kjv: { label: 'KJV', full: 'King James Version', description: 'Classic 1611 — Public Domain' },
  niv: { label: 'NIV', full: 'New International Version', description: 'Modern & readable' },
  esv: { label: 'ESV', full: 'English Standard Version', description: 'Literal & elegant' },
  nasb: { label: 'NASB', full: 'New American Standard Bible', description: 'Highly literal' },
  nlt: { label: 'NLT', full: 'New Living Translation', description: 'Clear & conversational' },
};

function normalizeBookName(book: string): string {
  if (book === 'Psalm') return 'Psalms';
  return book;
}

export async function fetchBibleChapter(
  book: string,
  chapter: number,
  translation: Translation,
  verseStart?: number | null,
  verseEnd?: number | null
): Promise<BibleVerse[]> {
  if (!supabase) {
    throw new Error('Database connection not available.');
  }

  const normalizedBook = normalizeBookName(book);

  let query;
  if (translation === 'kjv') {
    query = supabase
      .from('kjv_bible')
      .select('verse, text')
      .eq('book', normalizedBook)
      .eq('chapter', chapter)
      .order('verse', { ascending: true });
  } else {
    query = supabase
      .from('translations_bible')
      .select('verse, text')
      .eq('translation', translation)
      .eq('book', normalizedBook)
      .eq('chapter', chapter)
      .order('verse', { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Could not load this chapter. Please try again.');
  }

  if (!data || data.length === 0) {
    throw new Error(`Could not find ${book} ${chapter} in this translation.`);
  }

  let verses: BibleVerse[] = data.map((v: { verse: number; text: string }) => ({
    verse: v.verse,
    text: v.text.trim(),
  }));

  if (verseStart !== null && verseStart !== undefined) {
    verses = verses.filter((v) => {
      if (verseEnd !== null && verseEnd !== undefined) {
        return v.verse >= verseStart && v.verse <= verseEnd;
      }
      return v.verse === verseStart;
    });
  }

  return verses;
}
