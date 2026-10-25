/**
 * OSIS XML parser for Brenton's English Septuagint.
 *
 * The source file (public/data/lxxe.xml) uses the OSIS 2.1.1 schema with
 * container-style <verse> elements (not milestones).  Books are wrapped in
 * <div type="book" osisID="...">, chapters in <chapter osisID="...">, and
 * verses in <verse osisID="...">.  Inline <note> elements carry translator
 * footnotes.
 *
 * This module parses the XML in the browser using DOMParser, builds an
 * in-memory index, and exposes helpers for fetching chapters on demand.
 */

export interface LxxVerse {
  verse: number;
  text: string;
  notes: string[];
}

export interface LxxChapter {
  book: string;
  chapter: number;
  verses: LxxVerse[];
}

export interface LxxBook {
  osisId: string;
  name: string;
  chapterCount: number;
  chapters: number[];
}

export interface LxxIndex {
  editionName: string;
  language: string;
  books: LxxBook[];
  bookMap: Map<string, LxxBook>;
}

const OSIS_NS = 'http://www.bibletechnologies.net/2003/OSIS/namespace';

/** OSIS ID → human-readable title for the Brenton Septuagint. */
const OSIS_NAMES: Record<string, string> = {
  Gen: 'Genesis',
  Exod: 'Exodus',
  Lev: 'Leviticus',
  Num: 'Numbers',
  Deut: 'Deuteronomy',
  Josh: 'Joshua',
  Judg: 'Judges',
  Ruth: 'Ruth',
  '1Sam': '1 Samuel',
  '2Sam': '2 Samuel',
  '1Kgs': '1 Kings',
  '2Kgs': '2 Kings',
  '1Chr': '1 Chronicles',
  '2Chr': '2 Chronicles',
  Ezra: 'Ezra',
  Neh: 'Nehemiah',
  Esth: 'Esther',
  Job: 'Job',
  Ps: 'Psalms',
  Prov: 'Proverbs',
  Eccl: 'Ecclesiastes',
  Song: 'Song of Solomon',
  Isa: 'Isaiah',
  Jer: 'Jeremiah',
  Lam: 'Lamentations',
  Ezek: 'Ezekiel',
  Dan: 'Daniel',
  Hos: 'Hosea',
  Joel: 'Joel',
  Amos: 'Amos',
  Obad: 'Obadiah',
  Jonah: 'Jonah',
  Mic: 'Micah',
  Nah: 'Nahum',
  Hab: 'Habakkuk',
  Zeph: 'Zephaniah',
  Hag: 'Haggai',
  Zech: 'Zechariah',
  Mal: 'Malachi',
  Jdt: 'Judith',
  Wis: 'Wisdom of Solomon',
  Tob: 'Tobit',
  Sir: 'Sirach (Ecclesiasticus)',
  Bar: 'Baruch',
  '1Macc': '1 Maccabees',
  '2Macc': '2 Maccabees',
  AddDan: 'Additions to Daniel',
  PrMan: 'Prayer of Manasseh',
  '3Macc': '3 Maccabees',
  '4Macc': '4 Maccabees',
  '1Esd': '1 Esdras',
  Sus: 'Susanna',
  Ps151: 'Psalm 151',
  BelTh: 'Bel and the Dragon',
};

let cachedIndex: LxxIndex | null = null;
let cachedDoc: Document | null = null;

/** Extract the inner text of a verse element, stripping <note> content. */
function extractVerseText(verseEl: Element): { text: string; notes: string[] } {
  const notes: string[] = [];
  let text = '';

  for (const child of Array.from(verseEl.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      text += child.textContent || '';
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as Element;
      const localName = el.localName || el.tagName.replace(/^.*:/, '');
      if (localName === 'note') {
        const noteText = (el.textContent || '').trim();
        if (noteText) notes.push(noteText);
      } else {
        text += el.textContent || '';
      }
    }
  }

  return { text: text.trim().replace(/\s+/g, ' '), notes };
}

/** Parse the OSIS ID like "Gen.1.1" → { book: "Gen", chapter: 1, verse: 1 }. */
function parseOsisId(id: string): { book: string; chapter: number; verse: number } | null {
  const parts = id.split('.');
  if (parts.length < 3) return null;
  const chapter = parseInt(parts[1], 10);
  const verse = parseInt(parts[2], 10);
  if (isNaN(chapter) || isNaN(verse)) return null;
  return { book: parts[0], chapter, verse };
}

/** Load and parse the XML document, caching the DOM for subsequent calls. */
async function loadDoc(): Promise<Document> {
  if (cachedDoc) return cachedDoc;

  const res = await fetch('/data/lxxe.xml');
  if (!res.ok) throw new Error(`Could not load Septuagint data (${res.status}).`);
  const xml = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) throw new Error('The Septuagint XML file could not be parsed.');

  cachedDoc = doc;
  return doc;
}

/** Build the book/chapter index without loading verse text. */
export async function loadSeptuagintIndex(): Promise<LxxIndex> {
  if (cachedIndex) return cachedIndex;

  const doc = await loadDoc();
  const bookDivs = Array.from(doc.getElementsByTagNameNS(OSIS_NS, 'div'))
    .filter(el => el.getAttribute('type') === 'book');

  const books: LxxBook[] = [];
  const bookMap = new Map<string, LxxBook>();

  for (const div of bookDivs) {
    const osisId = div.getAttribute('osisID') || '';
    if (!osisId) continue;

    const chapterEls = Array.from(div.children).filter(
      el => (el.localName || el.tagName.replace(/^.*:/, '')) === 'chapter'
    );

    const chapterNumbers = chapterEls
      .map(el => {
        const cid = el.getAttribute('osisID') || '';
        const m = cid.match(/\.(\d+)$/);
        return m ? parseInt(m[1], 10) : 0;
      })
      .filter(n => n > 0)
      .sort((a, b) => a - b);

    const book: LxxBook = {
      osisId,
      name: OSIS_NAMES[osisId] || osisId,
      chapterCount: chapterNumbers.length,
      chapters: chapterNumbers,
    };

    books.push(book);
    bookMap.set(osisId, book);
  }

  // Extract edition metadata from the header
  let editionName = "Brenton's English Septuagint";
  let language = 'en';
  const titleEl = doc.getElementsByTagNameNS(OSIS_NS, 'title').item(0);
  if (titleEl?.textContent) editionName = titleEl.textContent.trim();
  const osisText = doc.getElementsByTagNameNS(OSIS_NS, 'osisText').item(0);
  if (osisText) {
    const lang = osisText.getAttribute('xml:lang') || osisText.getAttribute('lang');
    if (lang) language = lang;
  }

  cachedIndex = { editionName, language, books, bookMap };
  return cachedIndex;
}

/** Fetch a specific chapter from the parsed document. */
export async function fetchLxxChapter(osisId: string, chapter: number): Promise<LxxChapter | null> {
  const doc = await loadDoc();

  const bookDiv = Array.from(doc.getElementsByTagNameNS(OSIS_NS, 'div')).find(
    el => el.getAttribute('type') === 'book' && el.getAttribute('osisID') === osisId
  );
  if (!bookDiv) return null;

  const chapterEl = Array.from(bookDiv.children).find(el => {
    const localName = el.localName || el.tagName.replace(/^.*:/, '');
    if (localName !== 'chapter') return false;
    const cid = el.getAttribute('osisID') || '';
    return cid === `${osisId}.${chapter}`;
  });
  if (!chapterEl) return null;

  const verses: LxxVerse[] = [];
  const verseEls = Array.from(chapterEl.children).filter(
    el => (el.localName || el.tagName.replace(/^.*:/, '')) === 'verse'
  );

  for (const vEl of verseEls) {
    const vid = vEl.getAttribute('osisID') || '';
    const parsed = parseOsisId(vid);
    if (!parsed) continue;
    const { text, notes } = extractVerseText(vEl);
    if (text || notes.length > 0) {
      verses.push({ verse: parsed.verse, text, notes });
    }
  }

  // Merge verse fragments with the same verse number
  const merged: LxxVerse[] = [];
  const mergeMap = new Map<number, number>();
  for (const v of verses) {
    const idx = mergeMap.get(v.verse);
    if (idx !== undefined) {
      merged[idx].text += ' ' + v.text;
      merged[idx].notes.push(...v.notes);
    } else {
      mergeMap.set(v.verse, merged.length);
      merged.push({ ...v });
    }
  }

  return { book: osisId, chapter, verses: merged };
}

/** Get the next chapter in book order, crossing book boundaries. */
export function getAdjacentLxxChapter(
  index: LxxIndex,
  osisId: string,
  chapter: number,
  direction: 'prev' | 'next'
): { osisId: string; chapter: number } | null {
  const bookIdx = index.books.findIndex(b => b.osisId === osisId);
  if (bookIdx === -1) return null;
  const book = index.books[bookIdx];

  if (direction === 'next') {
    if (chapter < book.chapterCount) return { osisId, chapter: chapter + 1 };
    if (bookIdx < index.books.length - 1) {
      return { osisId: index.books[bookIdx + 1].osisId, chapter: 1 };
    }
    return null;
  } else {
    if (chapter > 1) return { osisId, chapter: chapter - 1 };
    if (bookIdx > 0) {
      const prevBook = index.books[bookIdx - 1];
      return { osisId: prevBook.osisId, chapter: prevBook.chapterCount };
    }
    return null;
  }
}

/** Get the book name for an OSIS ID from the index. */
export function getLxxBookName(index: LxxIndex, osisId: string): string {
  return index.bookMap.get(osisId)?.name || OSIS_NAMES[osisId] || osisId;
}
