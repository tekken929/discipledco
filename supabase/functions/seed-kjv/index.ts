import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const KJV_BOOKS = [
  { order: 1,  name: "Genesis",          testament: "Old Testament", chapters: 50  },
  { order: 2,  name: "Exodus",           testament: "Old Testament", chapters: 40  },
  { order: 3,  name: "Leviticus",        testament: "Old Testament", chapters: 27  },
  { order: 4,  name: "Numbers",          testament: "Old Testament", chapters: 36  },
  { order: 5,  name: "Deuteronomy",      testament: "Old Testament", chapters: 34  },
  { order: 6,  name: "Joshua",           testament: "Old Testament", chapters: 24  },
  { order: 7,  name: "Judges",           testament: "Old Testament", chapters: 21  },
  { order: 8,  name: "Ruth",             testament: "Old Testament", chapters: 4   },
  { order: 9,  name: "1 Samuel",         testament: "Old Testament", chapters: 31  },
  { order: 10, name: "2 Samuel",         testament: "Old Testament", chapters: 24  },
  { order: 11, name: "1 Kings",          testament: "Old Testament", chapters: 22  },
  { order: 12, name: "2 Kings",          testament: "Old Testament", chapters: 25  },
  { order: 13, name: "1 Chronicles",     testament: "Old Testament", chapters: 29  },
  { order: 14, name: "2 Chronicles",     testament: "Old Testament", chapters: 36  },
  { order: 15, name: "Ezra",             testament: "Old Testament", chapters: 10  },
  { order: 16, name: "Nehemiah",         testament: "Old Testament", chapters: 13  },
  { order: 17, name: "Esther",           testament: "Old Testament", chapters: 10  },
  { order: 18, name: "Job",              testament: "Old Testament", chapters: 42  },
  { order: 19, name: "Psalms",           testament: "Old Testament", chapters: 150 },
  { order: 20, name: "Proverbs",         testament: "Old Testament", chapters: 31  },
  { order: 21, name: "Ecclesiastes",     testament: "Old Testament", chapters: 12  },
  { order: 22, name: "Song of Solomon",  testament: "Old Testament", chapters: 8   },
  { order: 23, name: "Isaiah",           testament: "Old Testament", chapters: 66  },
  { order: 24, name: "Jeremiah",         testament: "Old Testament", chapters: 52  },
  { order: 25, name: "Lamentations",     testament: "Old Testament", chapters: 5   },
  { order: 26, name: "Ezekiel",          testament: "Old Testament", chapters: 48  },
  { order: 27, name: "Daniel",           testament: "Old Testament", chapters: 12  },
  { order: 28, name: "Hosea",            testament: "Old Testament", chapters: 14  },
  { order: 29, name: "Joel",             testament: "Old Testament", chapters: 3   },
  { order: 30, name: "Amos",             testament: "Old Testament", chapters: 9   },
  { order: 31, name: "Obadiah",          testament: "Old Testament", chapters: 1   },
  { order: 32, name: "Jonah",            testament: "Old Testament", chapters: 4   },
  { order: 33, name: "Micah",            testament: "Old Testament", chapters: 7   },
  { order: 34, name: "Nahum",            testament: "Old Testament", chapters: 3   },
  { order: 35, name: "Habakkuk",         testament: "Old Testament", chapters: 3   },
  { order: 36, name: "Zephaniah",        testament: "Old Testament", chapters: 3   },
  { order: 37, name: "Haggai",           testament: "Old Testament", chapters: 2   },
  { order: 38, name: "Zechariah",        testament: "Old Testament", chapters: 14  },
  { order: 39, name: "Malachi",          testament: "Old Testament", chapters: 4   },
  { order: 40, name: "Matthew",          testament: "New Testament", chapters: 28  },
  { order: 41, name: "Mark",             testament: "New Testament", chapters: 16  },
  { order: 42, name: "Luke",             testament: "New Testament", chapters: 24  },
  { order: 43, name: "John",             testament: "New Testament", chapters: 21  },
  { order: 44, name: "Acts",             testament: "New Testament", chapters: 28  },
  { order: 45, name: "Romans",           testament: "New Testament", chapters: 16  },
  { order: 46, name: "1 Corinthians",    testament: "New Testament", chapters: 16  },
  { order: 47, name: "2 Corinthians",    testament: "New Testament", chapters: 13  },
  { order: 48, name: "Galatians",        testament: "New Testament", chapters: 6   },
  { order: 49, name: "Ephesians",        testament: "New Testament", chapters: 6   },
  { order: 50, name: "Philippians",      testament: "New Testament", chapters: 4   },
  { order: 51, name: "Colossians",       testament: "New Testament", chapters: 4   },
  { order: 52, name: "1 Thessalonians",  testament: "New Testament", chapters: 5   },
  { order: 53, name: "2 Thessalonians",  testament: "New Testament", chapters: 3   },
  { order: 54, name: "1 Timothy",        testament: "New Testament", chapters: 6   },
  { order: 55, name: "2 Timothy",        testament: "New Testament", chapters: 4   },
  { order: 56, name: "Titus",            testament: "New Testament", chapters: 3   },
  { order: 57, name: "Philemon",         testament: "New Testament", chapters: 1   },
  { order: 58, name: "Hebrews",          testament: "New Testament", chapters: 13  },
  { order: 59, name: "James",            testament: "New Testament", chapters: 5   },
  { order: 60, name: "1 Peter",          testament: "New Testament", chapters: 5   },
  { order: 61, name: "2 Peter",          testament: "New Testament", chapters: 3   },
  { order: 62, name: "1 John",           testament: "New Testament", chapters: 5   },
  { order: 63, name: "2 John",           testament: "New Testament", chapters: 1   },
  { order: 64, name: "3 John",           testament: "New Testament", chapters: 1   },
  { order: 65, name: "Jude",             testament: "New Testament", chapters: 1   },
  { order: 66, name: "Revelation",       testament: "New Testament", chapters: 22  },
];

// Fetch a single chapter from bible-api.com with retry logic
async function fetchChapter(
  bookName: string,
  chapter: number,
  retries = 3
): Promise<{ verse: number; text: string }[]> {
  // Single-chapter books: API interprets "Book 1" as verse 1, need explicit range
  // Known verse counts: Obadiah=21, Philemon=25, 2John=13, 3John=14, Jude=25
  const singleChapterVerses: Record<string, number> = {
    "Obadiah": 21, "Philemon": 25, "2 John": 13, "3 John": 14, "Jude": 25,
  };
  let url: string;
  if (singleChapterVerses[bookName]) {
    const maxV = singleChapterVerses[bookName];
    const bookEncoded = encodeURIComponent(bookName);
    url = `https://bible-api.com/${bookEncoded}+${chapter}:1-${maxV}?translation=kjv`;
  } else {
    const encoded = encodeURIComponent(`${bookName} ${chapter}`);
    url = `https://bible-api.com/${encoded}?translation=kjv`;
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const resp = await fetch(url);
      if (resp.status === 429) {
        // Back off and retry
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      if (!data.verses || !Array.isArray(data.verses)) return [];
      return data.verses.map((v: { verse: number; text: string }) => ({
        verse: v.verse,
        text: v.text.replace(/\n/g, " ").trim(),
      }));
    } catch (e) {
      if (attempt === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  return [];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const url = new URL(req.url);
    const startIdx = parseInt(url.searchParams.get("start") ?? "0");
    const endIdx = parseInt(url.searchParams.get("end") ?? String(KJV_BOOKS.length - 1));
    const force = url.searchParams.get("force") === "true";
    const delay = parseInt(url.searchParams.get("delay") ?? "300");
    // Optional chapter range override (only used when seeding a single book)
    const chStart = url.searchParams.get("chstart") ? parseInt(url.searchParams.get("chstart")!) : null;
    const chEnd = url.searchParams.get("chend") ? parseInt(url.searchParams.get("chend")!) : null;

    let totalInserted = 0;
    const errors: string[] = [];
    const skipped: string[] = [];
    // missingonly=true: only fetch chapters not yet in the DB for each book
    const missingOnly = url.searchParams.get("missingonly") === "true";

    for (let bi = startIdx; bi <= Math.min(endIdx, KJV_BOOKS.length - 1); bi++) {
      const book = KJV_BOOKS[bi];
      const chapterStart = chStart ?? 1;
      const chapterEnd = chEnd ?? book.chapters;

      if (!force && !missingOnly && chStart === null) {
        const { count } = await supabase
          .from("kjv_bible")
          .select("*", { count: "exact", head: true })
          .eq("book", book.name);
        if (count && count > 0) {
          skipped.push(book.name);
          continue;
        }
      }

      // Get existing chapters for this book so we can skip them
      let existingChapters = new Set<number>();
      if (missingOnly) {
        const { data } = await supabase
          .from("kjv_bible")
          .select("chapter")
          .eq("book", book.name);
        if (data) {
          for (const row of data) existingChapters.add(row.chapter);
        }
      }

      const rows: {
        book_order: number; book: string; testament: string;
        chapter: number; verse: number; text: string;
      }[] = [];

      for (let ch = chapterStart; ch <= chapterEnd; ch++) {
        if (missingOnly && existingChapters.has(ch)) continue;
        try {
          const verses = await fetchChapter(book.name, ch);
          for (const v of verses) {
            rows.push({
              book_order: book.order,
              book: book.name,
              testament: book.testament,
              chapter: ch,
              verse: v.verse,
              text: v.text,
            });
          }
          await new Promise((r) => setTimeout(r, delay));
        } catch (e) {
          errors.push(`${book.name} ${ch}: ${e}`);
        }
      }

      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i += 500) {
          const { error } = await supabase.from("kjv_bible").insert(rows.slice(i, i + 500));
          if (error) {
            errors.push(`${book.name} insert: ${error.message}`);
          } else {
            totalInserted += Math.min(500, rows.length - i);
          }
        }
      } else {
        errors.push(`${book.name}: 0 verses fetched`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, totalInserted, skipped, errors: errors.slice(0, 30) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
