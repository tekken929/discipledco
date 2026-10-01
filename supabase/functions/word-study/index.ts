import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InterlinearWord {
  strongsNumber: string;
  greekOrHebrew: string;
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

function isOldTestament(book: string): boolean {
  const otBooks = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
    '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job',
    'Psalms', 'Psalm', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
    'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea',
    'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
    'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];
  return otBooks.includes(book);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, '').trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '')
    .trim();
}

async function fetchInterlinear(book: string, chapter: number, verse: number): Promise<InterlinearWord[]> {
  const slug = BOOK_SLUGS[book];
  if (!slug) return [];

  const url = `https://biblehub.com/interlinear/${slug}/${chapter}-${verse}.htm`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BibleStudyApp/1.0)' },
  });

  if (!res.ok) return [];

  const html = await res.text();
  const words: InterlinearWord[] = [];

  // BibleHub interlinear pages have table rows with this pattern:
  // Each word is in a <td> with links like /greek/3870.htm or /hebrew/430.htm
  const isHebrew = isOldTestament(book);
  const langPrefix = isHebrew ? 'hebrew' : 'greek';
  const langCode = isHebrew ? 'hebrew' : 'greek';

  // Extract all Strong's number links and their associated data
  // Pattern: [number](/greek/NUMBER.htm "Title") or links with strongs_ prefix
  const strongsRegex = new RegExp(
    `\\[(\\d+[a-z]?)\\]\\(/${langCode}/(\\d+[a-z]?)\\.htm\\s+"([^"]+)"\\)`,
    'g'
  );

  // Also try parsing the table structure more directly
  // Look for patterns: number, transliteration, greek word, english gloss, part of speech
  const rowRegex = new RegExp(
    `(?:\\[(\\d+[a-z]?)\\]\\(/${langCode}/(?:strongs_)?(\\d+[a-z]?)\\.htm[^)]*\\))?` +
    `.*?\\[([^\\]]+)\\]\\(/${langCode}/(?:strongs_)?\\d+[a-z]?\\.htm[^)]*\\)` +
    `.*?([\\u0370-\\u03FF\\u0590-\\u05FF\\s]+)` +
    `.*?([A-Za-z][^|\\[]{2,40})` +
    `.*?(?:\\[([A-Z][^\\]]{2,50})\\]\\(/grammar/[^)]*\\))?`,
    'gs'
  );

  // Simpler approach: extract all the td cells in order
  // The interlinear table has columns: Strong's # | Transliteration | Original Word | English | Grammar
  const tableMatch = html.match(/<table[^>]*class="table"[^>]*>([\s\S]*?)<\/table>/i);
  if (tableMatch) {
    const tableHtml = tableMatch[1];
    const rowMatches = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];

    for (const rowHtml of rowMatches) {
      const cells = rowHtml.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];
      if (cells.length < 4) continue;

      // Extract Strong's number from first cell
      const strongsMatch = cells[0].match(new RegExp(`/${langCode}/(\\d+[a-z]?)\\.htm`, 'i'));
      if (!strongsMatch) continue;

      const strongsNumber = strongsMatch[1];
      const englishGloss = decodeEntities(cells[3] || '');
      const transliteration = decodeEntities(cells[1] || '');
      const originalWord = decodeEntities(cells[2] || '');
      const partOfSpeech = decodeEntities(cells[4] || '');

      if (strongsNumber && englishGloss) {
        words.push({
          strongsNumber,
          greekOrHebrew: originalWord,
          transliteration,
          englishGloss,
          partOfSpeech,
        });
      }
    }
  }

  // Fallback: if table parsing didn't work, try regex approach
  if (words.length === 0) {
    const linkRegex = new RegExp(
      `\\[(\\d+[a-z]?)\\]\\(/${langCode}/(?:strongs_)?(\\d+[a-z]?)\\.htm\\s+"([^"]+)"\\)`,
      'g'
    );
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const strongsNumber = match[1];
      const title = match[3];
      // Title usually contains: "Strong's Greek 3870: I exhort"
      const glossMatch = title.match(/:\s*(.+)$/);
      const englishGloss = glossMatch ? glossMatch[1] : title;

      words.push({
        strongsNumber,
        greekOrHebrew: '',
        transliteration: '',
        englishGloss,
        partOfSpeech: '',
      });
    }
  }

  return words;
}

async function fetchLexicon(strongsNumber: string, isHebrew: boolean): Promise<LexiconEntry | null> {
  const langCode = isHebrew ? 'hebrew' : 'greek';
  const url = `https://biblehub.com/${langCode}/${strongsNumber}.htm`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BibleStudyApp/1.0)' },
  });

  if (!res.ok) return null;

  const html = await res.text();

  // Extract data from the page using text patterns
  // The extracted text has patterns like:
  // "Original Word: παρακαλέω Part of Speech: Verb Transliteration: parakaleó"
  // "KJV: beseech, call for..." "NASB: urge, comforted..."

  function extractField(label: string): string {
    const regex = new RegExp(`${label}:\\s*([^\\n]+?)(?=\\s+(?:Part of Speech|Transliteration|Pronunciation|Phonetic|KJV|NASB|Word Origin|Strong's|Original|Definition|see|HELPS|$))`, 'i');
    const match = html.match(regex);
    return match ? decodeEntities(match[1]) : '';
  }

  // Try to extract from the text content
  const textContent = html.replace(/<[^>]*>/g, '\n').replace(/\n{3,}/g, '\n\n');

  const originalWordMatch = textContent.match(/Original Word:\s*(\S+)/);
  const transliterationMatch = textContent.match(/Transliteration:\s*(\S+)/);
  const pronunciationMatch = textContent.match(/Phonetic Spelling:\s*\(([^)]+)\)/);
  const kjvMatch = textContent.match(/KJV:\s*([^\n]+)/);
  const nasbMatch = textContent.match(/NASB:\s*([^\n]+)/);
  const wordOriginMatch = textContent.match(/Word Origin:\s*([^\n]+)/);

  // Definition - try "Strong's Exhaustive Concordance" section
  const defMatch = textContent.match(/Strong's Exhaustive Concordance\s*([^\n]+(?:\n(?!\s*(?:see|HELPS|Thayer))[^\n]+)*)/);

  // Part of speech
  const partOfSpeechMatch = textContent.match(/Part of Speech:\s*(\S+)/);

  return {
    strongsNumber,
    language: isHebrew ? 'Hebrew' : 'Greek',
    originalWord: originalWordMatch ? decodeEntities(originalWordMatch[1]) : '',
    transliteration: transliterationMatch ? decodeEntities(transliterationMatch[1]) : '',
    pronunciation: pronunciationMatch ? pronunciationMatch[1] : '',
    kjvTranslation: kjvMatch ? decodeEntities(kjvMatch[1]) : '',
    nasbTranslation: nasbMatch ? decodeEntities(nasbMatch[1]) : '',
    definition: defMatch ? decodeEntities(defMatch[1]).trim() : '',
    wordOrigin: wordOriginMatch ? decodeEntities(wordOriginMatch[1]) : '',
  };
}

function findMatchingWord(
  selectedWord: string,
  interlinear: InterlinearWord[]
): InterlinearWord | null {
  const lower = selectedWord.toLowerCase().replace(/[^\w]/g, '');

  // Try exact match on English gloss
  for (const w of interlinear) {
    if (w.englishGloss.toLowerCase().replace(/[^\w]/g, '') === lower) {
      return w;
    }
  }

  // Try partial match - the selected word contains the gloss or vice versa
  for (const w of interlinear) {
    const gloss = w.englishGloss.toLowerCase().replace(/[^\w]/g, '');
    if (gloss && (lower.includes(gloss) || gloss.includes(lower))) {
      return w;
    }
  }

  // Try matching first word of gloss
  for (const w of interlinear) {
    const firstWord = w.englishGloss.split(/\s+/)[0]?.toLowerCase().replace(/[^\w]/g, '');
    if (firstWord && firstWord === lower) {
      return w;
    }
  }

  return null;
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

    if (!book || !chapter || !verse || !word) {
      return new Response(
        JSON.stringify({ error: "book, chapter, verse, and word are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isHebrew = isOldTestament(book);
    const normalizedBook = book === 'Psalm' ? 'Psalms' : book;

    // Fetch interlinear data
    const interlinear = await fetchInterlinear(normalizedBook, chapter, verse);

    if (interlinear.length === 0) {
      return new Response(
        JSON.stringify({
          book: normalizedBook,
          chapter,
          verse,
          selectedWord: word,
          interlinear: [],
          matchedWord: null,
          lexicon: null,
          translations: [],
          error: "Word study data not available for this verse.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Find the matching word
    const matchedWord = findMatchingWord(word, interlinear);

    // Fetch lexicon entry if we found a match
    let lexicon: LexiconEntry | null = null;
    if (matchedWord) {
      lexicon = await fetchLexicon(matchedWord.strongsNumber, isHebrew);
    }

    // Build translation comparison
    // We know KJV uses the word from the interlinear gloss
    // For other translations, we'll fetch the verse text and find the corresponding word
    const translations: TranslationWord[] = [];

    // KJV - from interlinear gloss or lexicon
    if (matchedWord) {
      if (lexicon?.kjvTranslation) {
        // The KJV translation list from lexicon shows all possible translations
        // Try to find which one appears in the actual verse
        translations.push({
          translation: 'KJV',
          word: word, // The user selected this word from KJV text
        });
      } else {
        translations.push({ translation: 'KJV', word: matchedWord.englishGloss });
      }
    }

    // For other translations, we need to fetch the verse text
    // We'll use the Supabase database to get the verse in each translation
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("npm:@supabase/supabase-js@2");
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Fetch verse from translations_bible for NIV, ESV, NASB, NLT
      const transList = ['niv', 'esv', 'nasb', 'nlt'];
      const versePromises = transList.map(async (trans) => {
        const { data } = await supabase
          .from('translations_bible')
          .select('text')
          .eq('translation', trans)
          .eq('book', normalizedBook)
          .eq('chapter', chapter)
          .eq('verse', verse)
          .single();
        return { translation: trans, text: data?.text || '' };
      });

      const verseResults = await Promise.all(versePromises);

      // Also get KJV
      const { data: kjvData } = await supabase
        .from('kjv_bible')
        .select('text')
        .eq('book', normalizedBook)
        .eq('chapter', chapter)
        .eq('verse', verse)
        .single();

      const kjvText = kjvData?.text || '';

      // For each translation, try to find the corresponding word
      // We use the lexicon's translation lists to identify which word each translation uses
      for (const result of verseResults) {
        if (!result.text) {
          translations.push({ translation: result.translation.toUpperCase(), word: '—' });
          continue;
        }

        // Try to find the word in the verse text
        // Use the NASB translation list from lexicon if available
        let foundWord = '';

        if (lexicon) {
          // Try NASB translations first for NASB
          if (result.translation === 'nasb' && lexicon.nasbTranslation) {
            const nasbWords = lexicon.nasbTranslation.split(/[,;]/).map(w => w.trim().toLowerCase());
            for (const nw of nasbWords) {
              if (nw && result.text.toLowerCase().includes(nw)) {
                foundWord = nw;
                break;
              }
            }
          }

          // Try KJV translations for matching
          if (!foundWord && lexicon.kjvTranslation) {
            const kjvWords = lexicon.kjvTranslation.split(/[,;]/).map(w => w.trim().toLowerCase());
            for (const kw of kjvWords) {
              if (kw && kw !== 'pray' && result.text.toLowerCase().includes(kw)) {
                foundWord = kw;
                break;
              }
            }
          }
        }

        // Fallback: try the selected word itself
        if (!foundWord) {
          if (result.text.toLowerCase().includes(word.toLowerCase())) {
            foundWord = word;
          }
        }

        // Fallback: try the English gloss from interlinear
        if (!foundWord && matchedWord) {
          if (result.text.toLowerCase().includes(matchedWord.englishGloss.toLowerCase())) {
            foundWord = matchedWord.englishGloss;
          }
        }

        translations.push({
          translation: result.translation.toUpperCase(),
          word: foundWord || '—',
        });
      }

      // Update KJV entry with actual verse text lookup
      if (kjvText) {
        const kjvEntry = translations.find(t => t.translation === 'KJV');
        if (kjvEntry) {
          kjvEntry.word = word;
        }
      }
    }

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
