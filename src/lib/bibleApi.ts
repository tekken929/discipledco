export interface BibleVerse {
  verse: number;
  text: string;
}

type Translation = 'kjv' | 'niv' | 'esv' | 'nasb' | 'nlt';

const API_VERSION_MAP: Record<Translation, string> = {
  kjv: 'en-kjv',
  niv: 'en-bsb',
  esv: 'en-asv',
  nasb: 'en-web',
  nlt: 'en-lsv',
};

const BOOK_NAME_MAP: Record<string, string> = {
  'Genesis': 'genesis', 'Exodus': 'exodus', 'Leviticus': 'leviticus',
  'Numbers': 'numbers', 'Deuteronomy': 'deuteronomy', 'Joshua': 'joshua',
  'Judges': 'judges', 'Ruth': 'ruth', '1 Samuel': '1samuel', '2 Samuel': '2samuel',
  '1 Kings': '1kings', '2 Kings': '2kings', '1 Chronicles': '1chronicles',
  '2 Chronicles': '2chronicles', 'Ezra': 'ezra', 'Nehemiah': 'nehemiah',
  'Esther': 'esther', 'Job': 'job', 'Psalms': 'psalms', 'Psalm': 'psalms',
  'Proverbs': 'proverbs', 'Ecclesiastes': 'ecclesiastes',
  'Song of Solomon': 'songofsolomon', 'Isaiah': 'isaiah', 'Jeremiah': 'jeremiah',
  'Lamentations': 'lamentations', 'Ezekiel': 'ezekiel', 'Daniel': 'daniel',
  'Hosea': 'hosea', 'Joel': 'joel', 'Amos': 'amos', 'Obadiah': 'obadiah',
  'Jonah': 'jonah', 'Micah': 'micah', 'Nahum': 'nahum', 'Habakkuk': 'habakkuk',
  'Zephaniah': 'zephaniah', 'Haggai': 'haggai', 'Zechariah': 'zechariah',
  'Malachi': 'malachi', 'Matthew': 'matthew', 'Mark': 'mark', 'Luke': 'luke',
  'John': 'john', 'Acts': 'acts', 'Romans': 'romans',
  '1 Corinthians': '1corinthians', '2 Corinthians': '2corinthians',
  'Galatians': 'galatians', 'Ephesians': 'ephesians', 'Philippians': 'philippians',
  'Colossians': 'colossians', '1 Thessalonians': '1thessalonians',
  '2 Thessalonians': '2thessalonians', '1 Timothy': '1timothy',
  '2 Timothy': '2timothy', 'Titus': 'titus', 'Philemon': 'philemon',
  'Hebrews': 'hebrews', 'James': 'james', '1 Peter': '1peter', '2 Peter': '2peter',
  '1 John': '1john', '2 John': '2john', '3 John': '3john', 'Jude': 'jude',
  'Revelation': 'revelation',
};

function getApiBookName(book: string): string {
  return BOOK_NAME_MAP[book] || book.toLowerCase().replace(/[\s-]/g, '');
}

export async function fetchBibleChapter(
  book: string,
  chapter: number,
  translation: Translation,
  verseStart?: number | null,
  verseEnd?: number | null
): Promise<BibleVerse[]> {
  const apiVersion = API_VERSION_MAP[translation];
  const apiBook = getApiBookName(book);
  const url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${apiVersion}/books/${apiBook}/chapters/${chapter}.json`;

  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Could not find ${book} ${chapter} in this translation.`);
    }
    throw new Error('Could not load this chapter. Please try again.');
  }

  const data = await res.json();
  const rawVerses: Array<{ verse: string; text: string }> = data.data || [];

  let verses: BibleVerse[] = rawVerses.map((v) => ({
    verse: parseInt(v.verse, 10),
    text: v.text.trim(),
  }));

  // Deduplicate (some translations have duplicate entries)
  const seen = new Set<number>();
  verses = verses.filter((v) => {
    if (seen.has(v.verse)) return false;
    seen.add(v.verse);
    return true;
  });

  verses.sort((a, b) => a.verse - b.verse);

  if (verseStart !== null && verseStart !== undefined) {
    verses = verses.filter((v) => {
      if (verseEnd !== null && verseEnd !== undefined) {
        return v.verse >= verseStart! && v.verse <= verseEnd;
      }
      return v.verse === verseStart;
    });
  }

  return verses;
}
