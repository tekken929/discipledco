import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MISSING_BOOKS = [
  { order: 20, name: "Proverbs",         testament: "Old Testament", chapters: 31 },
  { order: 8,  name: "Ruth",              testament: "Old Testament", chapters: 4  },
  { order: 22, name: "Song of Solomon",   testament: "Old Testament", chapters: 8  },
  { order: 45, name: "Romans",           testament: "New Testament", chapters: 16 },
  { order: 56, name: "Titus",             testament: "New Testament", chapters: 3  },
  { order: 38, name: "Zechariah",        testament: "Old Testament", chapters: 14 },
  { order: 36, name: "Zephaniah",        testament: "Old Testament", chapters: 3  },
  { order: 39, name: "Malachi",          testament: "Old Testament", chapters: 4  },
];

async function fetchChapter(
  bookName: string,
  chapter: number,
  retries = 3
): Promise<{ verse: number; text: string }[]> {
  const encoded = encodeURIComponent(bookName);
  const url = `https://bolls.life/get-text/NIV/${encoded}/${chapter}/`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const resp = await fetch(url);
      if (resp.status === 429) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      if (!Array.isArray(data)) return [];
      return data.map((v: { verse: number; text: string }) => ({
        verse: v.verse,
        text: v.text.replace(/<br\/>/g, " ").replace(/<[^>]+>/g, "").trim(),
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
    const force = url.searchParams.get("force") === "true";
    const delay = parseInt(url.searchParams.get("delay") ?? "400");

    let totalInserted = 0;
    const errors: string[] = [];
    const skipped: string[] = [];

    for (const book of MISSING_BOOKS) {
      if (!force) {
        const { count } = await supabase
          .from("translations_bible")
          .select("*", { count: "exact", head: true })
          .eq("translation", "niv")
          .eq("book", book.name);
        if (count && count > 0) {
          skipped.push(book.name);
          continue;
        }
      }

      const rows: {
        translation: string;
        book_order: number;
        book: string;
        testament: string;
        chapter: number;
        verse: number;
        text: string;
      }[] = [];

      for (let ch = 1; ch <= book.chapters; ch++) {
        try {
          const verses = await fetchChapter(book.name, ch);
          for (const v of verses) {
            rows.push({
              translation: "niv",
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
          const { error } = await supabase
            .from("translations_bible")
            .insert(rows.slice(i, i + 500));
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
