import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InterlinearWord {
  strongsNumber: string;
  originalWord: string;
  transliteration: string;
  englishGloss: string;
  partOfSpeech: string;
}

interface LexiconEntry {
  strongsNumber: string;
  language: string;
  originalWord: string;
  transliteration: string;
  pronunciation: string;
  kjvTranslation: string;
  nasbTranslation: string;
  definition: string;
  wordOrigin: string;
}

interface TranslationWord {
  translation: string;
  word: string;
}

interface WordStudyResponse {
  book: string;
  chapter: number;
  verse: number;
  selectedWord: string;
  interlinear: InterlinearWord[];
  matchedWord: InterlinearWord | null;
  lexicon: LexiconEntry | null;
  translations: TranslationWord[];
  error?: string;
}

const BOOK_SLUGS: Record<string, string> = {
  'Genesis': 'genesis', 'Exodus': 'exodus', 'Leviticus': 'leviticus',
  'Numbers': 'numbers', 'Deuteronomy': 'deuteronomy',
  'Joshua': 'joshua', 'Judges': 'judges', 'Ruth': 'ruth',
  '1 Samuel': '1_samuel', '2 Samuel': '2_samuel',
  '1 Kings': '1_kings', '2 Kings': '2_kings',
  '1 Chronicles': '1_chronicles', '2 Chronicles': '2_chronicles',
  'Ezra': 'ezra', 'Nehemiah': 'nehemiah', 'Esther': 'esther',
  'Job': 'job', 'Psalms': 'psalms', 'Psalm': 'psalms',
  'Proverbs': 'proverbs', 'Ecclesiastes': 'ecclesiastes',
  'Song of Solomon': 'song_of_solomon', 'Song of Songs': 'song_of_solomon',
  'Isaiah': 'isaiah', 'Jeremiah': 'jeremiah', 'Lamentations': 'lamentations',
  'Ezekiel': 'ezekiel', 'Daniel': 'daniel', 'Hosea': 'hosea',
  'Joel': 'joel', 'Amos': 'amos', 'Obadiah': 'obadiah',
  'Jonah': 'jonah', 'Micah': 'micah', 'Nahum': 'nahum',
  'Habakkuk': 'habakkuk', 'Zephaniah': 'zephaniah',
  'Haggai': 'haggai', 'Zechariah': 'zechariah', 'Malachi': 'malachi',
  'Matthew': 'matthew', 'Mark': 'mark', 'Luke': 'luke',
  'John': 'john', 'Acts': 'acts', 'Romans': 'romans',
  '1 Corinthians': '1_corinthians', '2 Corinthians': '2_corinthians',
  'Galatians': 'galatians', 'Ephesians': 'ephesians',
  'Philippians': 'philippians', 'Colossians': 'colossians',
  '1 Thessalonians': '1_thessalonians', '2 Thessalonians': '2_thessalonians',
  '1 Timothy': '1_timothy', '2 Timothy': '2_timothy',
  'Titus': 'titus', 'Philemon': 'philemon', 'Hebrews': 'hebrews',
  'James': 'james', '1 Peter': '1_peter', '2 Peter': '2_peter',
  '1 John': '1_john', '2 John': '2_john', '3 John': '3_john',
  'Jude': 'jude', 'Revelation': 'revelation',
};

const OT_BOOKS = new Set([
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
  '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job',
  'Psalms', 'Psalm', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea',
  'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
]);

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'of', 'for',
  'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does',
  'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can',
  'that', 'this', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
  'not', 'no', 'so', 'if', 'as', 'by', 'with', 'from', 'up', 'out', 'about',
  'into', 'over', 'after', 'now', 'then', 'there', 'here', 'all', 'also',
]);

function isOldTestament(book: string): boolean {
  return OT_BOOKS.has(book);
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function fetchInterlinear(book: string, chapter: number, verse: number): Promise<InterlinearWord[]> {
  const slug = BOOK_SLUGS[book];
  if (!slug) return [];

  const url = `https://biblehub.com/interlinear/${slug}/${chapter}-${verse}.htm`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });

  if (!res.ok) return [];

  const html = await res.text();
  const isHebrew = isOldTestament(book);
  const langCode = isHebrew ? 'hebrew' : 'greek';
  const tableClass = isHebrew ? 'tablefloatheb' : 'tablefloat';
  const words: InterlinearWord[] = [];

  const tableRegex = new RegExp(`<table class="${tableClass}">(.*?)</table>`, 'gs');
  const tables = html.match(tableRegex);
  if (!tables) return [];

  for (const tableHtml of tables) {
    const strongsMatch = tableHtml.match(
      new RegExp(`<a href="/${langCode}/(\\d+[a-z]?)\\.htm"`, 'i')
    );
    if (!strongsMatch) continue;

    const strongsNumber = strongsMatch[1];

    const translitMatch = tableHtml.match(/<span class="translit"><a[^>]*>(.*?)<\/a><\/span>/s);
    const transliteration = translitMatch ? stripTags(translitMatch[1]) : '';

    const origMatch = tableHtml.match(
      new RegExp(`<span class="${isHebrew ? 'hebrew' : 'greek'}">(.*?)</span>`, 's')
    );
    const originalWord = origMatch ? stripTags(origMatch[1]) : '';

    const engMatch = tableHtml.match(/<span class="eng">(.*?)<\/span>/s);
    const englishGloss = engMatch ? stripTags(engMatch[1]) : '';

    const strongsntMatches = tableHtml.matchAll(
      /<span class="strongsnt"><a[^>]*>(.*?)<\/a><\/span>/gs
    );
    const strongsntList = [...strongsntMatches];
    let partOfSpeech = '';
    if (strongsntList.length >= 2) {
      partOfSpeech = stripTags(strongsntList[1][1]);
    }

    if (strongsNumber && englishGloss) {
      words.push({ strongsNumber, originalWord, transliteration, englishGloss, partOfSpeech });
    }
  }

  return words;
}

async function fetchLexicon(strongsNumber: string, isHebrew: boolean): Promise<LexiconEntry | null> {
  const langCode = isHebrew ? 'hebrew' : 'greek';
  const url = `https://biblehub.com/${langCode}/${strongsNumber}.htm`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });

  if (!res.ok) return null;

  const html = await res.text();

  function extractField(label: string): string {
    const pattern = new RegExp(
      `<span class="tophdg">${escapeRegex(label)}:?\\s*</span>(.*?)(?=<span class="tophdg">|<span class="hdg">|$)`,
      's'
    );
    const match = html.match(pattern);
    return match ? stripTags(match[1]) : '';
  }

  function extractHdgField(label: string): string {
    const pattern = new RegExp(
      `<span class="hdg">${escapeRegex(label)}</span>(.*?)(?=<span class="hdg">|<span class="tophdg">|<h\\d|$)`,
      's'
    );
    const match = html.match(pattern);
    return match ? stripTags(match[1]) : '';
  }

  // Extract the clean Definition from the hdg section (much cleaner than the tophdg Word Origin)
  const cleanDefinition = extractHdgField('Definition');
  const cleanWordOrigin = extractHdgField('Word Origin');

  // Fallback: if no hdg Definition, use the Strong's Exhaustive Concordance section
  let definition = cleanDefinition;
  if (!definition) {
    const secIdx = html.indexOf("Strong's Exhaustive Concordance");
    if (secIdx >= 0) {
      let chunk = html.slice(secIdx);
      const cutIdx = chunk.search(/HELPS Word-studies|NAS Exhaustive/i);
      if (cutIdx > 0) chunk = chunk.slice(0, cutIdx);
      chunk = chunk.replace(/Strong's Exhaustive Concordance\s*/i, '');
      const fullText = stripTags(chunk);
      definition = fullText.split(/\.\s/)[0] || fullText.slice(0, 200);
    }
  }

  return {
    strongsNumber,
    language: isHebrew ? 'Hebrew' : 'Greek',
    originalWord: extractField('Original Word'),
    transliteration: extractField('Transliteration'),
    pronunciation: extractField('Phonetic Spelling'),
    kjvTranslation: extractField('KJV'),
    nasbTranslation: extractField('NASB'),
    definition,
    wordOrigin: cleanWordOrigin || extractField('Word Origin'),
  };
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^\w]/g, '');
}

function findMatchingWordByGloss(
  selectedWord: string,
  interlinear: InterlinearWord[]
): InterlinearWord | null {
  const lower = normalize(selectedWord);

  for (const w of interlinear) {
    if (normalize(w.englishGloss) === lower) return w;
  }
  for (const w of interlinear) {
    const gloss = normalize(w.englishGloss);
    if (gloss && (lower.includes(gloss) || gloss.includes(lower))) return w;
  }
  for (const w of interlinear) {
    const glossWords = w.englishGloss.split(/\s+/).map(normalize);
    if (glossWords.includes(lower)) return w;
  }
  return null;
}

function findMatchingWordByLexicon(
  selectedWord: string,
  interlinear: InterlinearWord[],
  lexicons: Map<string, LexiconEntry>
): InterlinearWord | null {
  const lower = normalize(selectedWord);

  for (const w of interlinear) {
    const lex = lexicons.get(w.strongsNumber);
    if (!lex) continue;

    if (lex.kjvTranslation) {
      const kjvWords = lex.kjvTranslation.split(/[,;]/).map(s => normalize(s.trim()));
      if (kjvWords.includes(lower)) return w;
    }

    if (lex.nasbTranslation) {
      const nasbWords = lex.nasbTranslation.split(/[,;]/).map(s => normalize(s.trim()));
      if (nasbWords.includes(lower)) return w;
    }

    if (lex.definition) {
      const defWords = lex.definition.toLowerCase().split(/\W+/);
      if (defWords.includes(selectedWord.toLowerCase())) return w;
    }
  }

  return null;
}

function findWordInVerse(verseText: string, candidates: string[]): string {
  const verseLower = verseText.toLowerCase();
  const sorted = [...candidates].filter(w => w.length > 2).sort((a, b) => b.length - a.length);
  for (const w of sorted) {
    const escaped = escapeRegex(w.toLowerCase());
    if (new RegExp(`\\b${escaped}\\b`, 'i').test(verseLower)) {
      return w;
    }
  }
  return '';
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const book = url.searchParams.get("book");
    const chapter = parseInt(url.searchParams.get("chapter") || "0");
    const verse = parseInt(url.searchParams.get("verse") || "0");
    const word = url.searchParams.get("word");
    const sourceTranslation = (url.searchParams.get("sourceTranslation") || 'kjv').toLowerCase();

    if (!book || !chapter || !verse || !word) {
      return new Response(
        JSON.stringify({ error: "book, chapter, verse, and word are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isHebrew = isOldTestament(book);
    const normalizedBook = book === 'Psalm' ? 'Psalms' : book;

    // Step 1: Fetch interlinear data
    const interlinear = await fetchInterlinear(normalizedBook, chapter, verse);

    if (interlinear.length === 0) {
      return new Response(
        JSON.stringify({
          book: normalizedBook, chapter, verse, selectedWord: word,
          interlinear: [], matchedWord: null, lexicon: null, translations: [],
          error: "Word study data not available for this verse.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Try matching by English gloss first (fast path)
    let matchedWord = findMatchingWordByGloss(word, interlinear);

    // Step 3: If no gloss match, fetch all lexicons and match by KJV/NASB translation lists
    const lexicons = new Map<string, LexiconEntry>();

    if (!matchedWord) {
      const uniqueStrongs = [...new Set(interlinear.map(w => w.strongsNumber))];
      const lexiconPromises = uniqueStrongs.map(async (sn) => {
        const lex = await fetchLexicon(sn, isHebrew);
        if (lex) lexicons.set(sn, lex);
      });
      await Promise.all(lexiconPromises);
      matchedWord = findMatchingWordByLexicon(word, interlinear, lexicons);
    }

    // Step 4: Fetch the matched word's lexicon if not already fetched
    let lexicon: LexiconEntry | null = null;
    if (matchedWord) {
      lexicon = lexicons.get(matchedWord.strongsNumber) || null;
      if (!lexicon) {
        lexicon = await fetchLexicon(matchedWord.strongsNumber, isHebrew);
      }
    }

    // Step 5: Return response (translation comparison removed -- popup now focuses on word study)
    const translations: TranslationWord[] = [];

    const response: WordStudyResponse = {
      book: normalizedBook,
      chapter,
      verse,
      selectedWord: word,
      interlinear,
      matchedWord,
      lexicon,
      translations,
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
