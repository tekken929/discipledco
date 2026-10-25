/**
 * Book correspondence layer between the Brenton Septuagint (OSIS IDs)
 * and the modern Bible books used by the existing BibleLookup reader.
 *
 * Each mapping records:
 *  - lxxId: the OSIS book ID in the Septuagint file
 *  - modernBook: the book name used in the KJV/NIV/ESV/NASB/NLT tables
 *  - status: the nature of the correspondence
 *  - note: a brief, neutral explanation (displayed in the TOC comparison)
 *
 * Mappings are based on verified book correspondences.  Books with no
 * modern equivalent are marked "additional".  Numbering differences
 * (e.g. 1–2 Samuel ↔ 1–2 Kingdoms in some LXX editions) are noted but
 * verse-level alignment is NOT assumed — chapter/verse numbers may differ.
 */

export type CorrespondenceStatus =
  | 'matching'
  | 'different_title'
  | 'different_placement'
  | 'additional'
  | 'no_match'
  | 'needs_review';

export interface BookCorrespondence {
  lxxId: string;
  lxxName: string;
  modernBook: string | null;
  status: CorrespondenceStatus;
  note?: string;
}

export const SEPTUAGINT_CORRESPONDENCE: BookCorrespondence[] = [
  { lxxId: 'Gen', lxxName: 'Genesis', modernBook: 'Genesis', status: 'matching' },
  { lxxId: 'Exod', lxxName: 'Exodus', modernBook: 'Exodus', status: 'matching' },
  { lxxId: 'Lev', lxxName: 'Leviticus', modernBook: 'Leviticus', status: 'matching' },
  { lxxId: 'Num', lxxName: 'Numbers', modernBook: 'Numbers', status: 'matching' },
  { lxxId: 'Deut', lxxName: 'Deuteronomy', modernBook: 'Deuteronomy', status: 'matching' },
  { lxxId: 'Josh', lxxName: 'Joshua', modernBook: 'Joshua', status: 'matching' },
  { lxxId: 'Judg', lxxName: 'Judges', modernBook: 'Judges', status: 'matching' },
  { lxxId: 'Ruth', lxxName: 'Ruth', modernBook: 'Ruth', status: 'matching' },
  { lxxId: '1Sam', lxxName: '1 Samuel', modernBook: '1 Samuel', status: 'matching', note: 'LXX order places 1–2 Samuel after Ruth, same as modern Bibles.' },
  { lxxId: '2Sam', lxxName: '2 Samuel', modernBook: '2 Samuel', status: 'matching' },
  { lxxId: '1Kgs', lxxName: '1 Kings', modernBook: '1 Kings', status: 'matching', note: 'In some LXX editions these are titled 3–4 Kingdoms.' },
  { lxxId: '2Kgs', lxxName: '2 Kings', modernBook: '2 Kings', status: 'matching', note: 'In some LXX editions these are titled 3–4 Kingdoms.' },
  { lxxId: '1Chr', lxxName: '1 Chronicles', modernBook: '1 Chronicles', status: 'matching', note: 'In some LXX editions these are titled 1–2 Paralipomena.' },
  { lxxId: '2Chr', lxxName: '2 Chronicles', modernBook: '2 Chronicles', status: 'matching' },
  { lxxId: 'Ezra', lxxName: 'Ezra', modernBook: 'Ezra', status: 'matching', note: 'LXX Ezra may correspond to 1 Esdras in some editions; mapping needs review for this file.' },
  { lxxId: 'Neh', lxxName: 'Nehemiah', modernBook: 'Nehemiah', status: 'matching' },
  { lxxId: 'Esth', lxxName: 'Esther', modernBook: 'Esther', status: 'matching', note: 'LXX Esther includes additional material (Additions to Esther) not in the Masoretic text.' },
  { lxxId: 'Job', lxxName: 'Job', modernBook: 'Job', status: 'matching' },
  { lxxId: 'Ps', lxxName: 'Psalms', modernBook: 'Psalms', status: 'different_placement', note: 'Psalm numbering differs between LXX and Masoretic texts, especially from Psalm 9 onward. Verse alignment is not assumed.' },
  { lxxId: 'Prov', lxxName: 'Proverbs', modernBook: 'Proverbs', status: 'matching' },
  { lxxId: 'Eccl', lxxName: 'Ecclesiastes', modernBook: 'Ecclesiastes', status: 'matching' },
  { lxxId: 'Song', lxxName: 'Song of Solomon', modernBook: 'Song of Solomon', status: 'matching' },
  { lxxId: 'Isa', lxxName: 'Isaiah', modernBook: 'Isaiah', status: 'matching' },
  { lxxId: 'Jer', lxxName: 'Jeremiah', modernBook: 'Jeremiah', status: 'different_placement', note: 'The LXX Jeremiah is shorter and arranged differently (oracles against nations placed after 25:14). Chapter/verse alignment is not assumed.' },
  { lxxId: 'Lam', lxxName: 'Lamentations', modernBook: 'Lamentations', status: 'matching' },
  { lxxId: 'Ezek', lxxName: 'Ezekiel', modernBook: 'Ezekiel', status: 'matching' },
  { lxxId: 'Dan', lxxName: 'Daniel', modernBook: 'Daniel', status: 'different_placement', note: 'LXX Daniel includes Susanna, Bel and the Dragon, and the Prayer of Azariah within the book. The Additions are separate entries in this file.' },
  { lxxId: 'Hos', lxxName: 'Hosea', modernBook: 'Hosea', status: 'matching' },
  { lxxId: 'Joel', lxxName: 'Joel', modernBook: 'Joel', status: 'matching' },
  { lxxId: 'Amos', lxxName: 'Amos', modernBook: 'Amos', status: 'matching' },
  { lxxId: 'Obad', lxxName: 'Obadiah', modernBook: 'Obadiah', status: 'matching' },
  { lxxId: 'Jonah', lxxName: 'Jonah', modernBook: 'Jonah', status: 'matching' },
  { lxxId: 'Mic', lxxName: 'Micah', modernBook: 'Micah', status: 'matching' },
  { lxxId: 'Nah', lxxName: 'Nahum', modernBook: 'Nahum', status: 'matching' },
  { lxxId: 'Hab', lxxName: 'Habakkuk', modernBook: 'Habakkuk', status: 'matching' },
  { lxxId: 'Zeph', lxxName: 'Zephaniah', modernBook: 'Zephaniah', status: 'matching' },
  { lxxId: 'Hag', lxxName: 'Haggai', modernBook: 'Haggai', status: 'matching' },
  { lxxId: 'Zech', lxxName: 'Zechariah', modernBook: 'Zechariah', status: 'matching' },
  { lxxId: 'Mal', lxxName: 'Malachi', modernBook: 'Malachi', status: 'matching' },
  // Deuterocanonical / additional books
  { lxxId: 'Jdt', lxxName: 'Judith', modernBook: null, status: 'additional', note: 'Judith is included in the Septuagint but not in Protestant Bibles. It appears in Catholic and Orthodox canons.' },
  { lxxId: 'Wis', lxxName: 'Wisdom of Solomon', modernBook: null, status: 'additional', note: 'Wisdom of Solomon is included in the Septuagint and in Catholic/Orthodox Bibles, but not in Protestant Bibles.' },
  { lxxId: 'Tob', lxxName: 'Tobit', modernBook: null, status: 'additional', note: 'Tobit is included in the Septuagint and in Catholic/Orthodox Bibles, but not in Protestant Bibles.' },
  { lxxId: 'Sir', lxxName: 'Sirach (Ecclesiasticus)', modernBook: null, status: 'additional', note: 'Sirach is included in the Septuagint and in Catholic/Orthodox Bibles, but not in Protestant Bibles.' },
  { lxxId: 'Bar', lxxName: 'Baruch', modernBook: null, status: 'additional', note: 'Baruch is included in the Septuagint and in Catholic/Orthodox Bibles, but not in Protestant Bibles.' },
  { lxxId: '1Macc', lxxName: '1 Maccabees', modernBook: null, status: 'additional', note: '1 Maccabees is included in the Septuagint and in Catholic/Orthodox Bibles, but not in Protestant Bibles.' },
  { lxxId: '2Macc', lxxName: '2 Maccabees', modernBook: null, status: 'additional', note: '2 Maccabees is included in the Septuagint and in Catholic/Orthodox Bibles, but not in Protestant Bibles.' },
  { lxxId: 'AddDan', lxxName: 'Additions to Daniel', modernBook: 'Daniel', status: 'different_placement', note: 'These additions (Prayer of Azariah, Song of the Three Young Men) are part of Daniel in the LXX but separate in this file. In Catholic/Orthodox Bibles they appear within Daniel.' },
  { lxxId: 'PrMan', lxxName: 'Prayer of Manasseh', modernBook: null, status: 'additional', note: 'Prayer of Manasseh appears in some LXX editions and in Orthodox Bibles, but not in Protestant or Catholic canons.' },
  { lxxId: '3Macc', lxxName: '3 Maccabees', modernBook: null, status: 'additional', note: '3 Maccabees appears in some LXX editions and in the Orthodox Bible, but not in Protestant or Catholic canons.' },
  { lxxId: '4Macc', lxxName: '4 Maccabees', modernBook: null, status: 'additional', note: '4 Maccabees appears in some LXX editions and in the Orthodox Bible as an appendix, but not in Protestant or Catholic canons.' },
  { lxxId: '1Esd', lxxName: '1 Esdras', modernBook: null, status: 'additional', note: '1 Esdras appears in some LXX editions and in Orthodox Bibles. It parallels material in Ezra–Nehemiah with variations.' },
  { lxxId: 'Sus', lxxName: 'Susanna', modernBook: 'Daniel', status: 'different_placement', note: 'Susanna appears as chapter 13 of Daniel in the LXX. In this file it is a separate entry. It is included in Catholic/Orthodox Bibles as part of Daniel.' },
  { lxxId: 'Ps151', lxxName: 'Psalm 151', modernBook: 'Psalms', status: 'additional', note: 'Psalm 151 is a supernumerary psalm found in the LXX and in Orthodox Bibles, but not in Protestant or Catholic canons.' },
  { lxxId: 'BelTh', lxxName: 'Bel and the Dragon', modernBook: 'Daniel', status: 'different_placement', note: 'Bel and the Dragon appears as part of Daniel in the LXX. In this file it is a separate entry. It is included in Catholic/Orthodox Bibles as part of Daniel.' },
];

/** Map an LXX OSIS ID to its correspondence entry. */
export function getCorrespondence(lxxId: string): BookCorrespondence | undefined {
  return SEPTUAGINT_CORRESPONDENCE.find(c => c.lxxId === lxxId);
}

/** Map a modern Bible book name to the LXX OSIS ID(s) that correspond to it. */
export function getLxxForModernBook(modernBook: string): BookCorrespondence[] {
  return SEPTUAGINT_CORRESPONDENCE.filter(c => c.modernBook === modernBook);
}

export const STATUS_LABELS: Record<CorrespondenceStatus, string> = {
  matching: 'Corresponding book',
  different_title: 'Different title',
  different_placement: 'Different placement',
  additional: 'Additional material',
  no_match: 'No corresponding text in this edition',
  needs_review: 'Mapping needs review',
};

export const STATUS_COLORS: Record<CorrespondenceStatus, string> = {
  matching: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  different_title: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  different_placement: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  additional: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
  no_match: 'bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700',
  needs_review: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
};
