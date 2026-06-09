import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// scripture.api.bible Bible IDs
const BIBLE_IDS: Record<string, string> = {
  esv: "01b29f4b-0add-4026-a59b-4d53daa1e3e0",
  nasb: "f231a68a-d0c6-47bb-9af3-bb13c8a51ccc",
  nlt: "65eec8e0-c3e7-11e8-b805-59099d66d57d",
};

// Book name -> OSIS ID mapping for scripture.api.bible
const OSIS_MAP: Record<string, string> = {
  "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM",
  "Deuteronomy": "DEU", "Joshua": "JOS", "Judges": "JDG", "Ruth": "RUT",
  "1 Samuel": "1SA", "2 Samuel": "2SA", "1 Kings": "1KI", "2 Kings": "2KI",
  "1 Chronicles": "1CH", "2 Chronicles": "2CH", "Ezra": "EZR", "Nehemiah": "NEH",
  "Esther": "EST", "Job": "JOB", "Psalms": "PSA", "Proverbs": "PRO",
  "Ecclesiastes": "ECC", "Song of Solomon": "SNG", "Isaiah": "ISA",
  "Jeremiah": "JER", "Lamentations": "LAM", "Ezekiel": "EZK", "Daniel": "DAN",
  "Hosea": "HOS", "Joel": "JOL", "Amos": "AMO", "Obadiah": "OBA",
  "Jonah": "JON", "Micah": "MIC", "Nahum": "NAM", "Habakkuk": "HAB",
  "Zephaniah": "ZEP", "Haggai": "HAG", "Zechariah": "ZEC", "Malachi": "MAL",
  "Matthew": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN",
  "Acts": "ACT", "Romans": "ROM", "1 Corinthians": "1CO", "2 Corinthians": "2CO",
  "Galatians": "GAL", "Ephesians": "EPH", "Philippians": "PHP", "Colossians": "COL",
  "1 Thessalonians": "1TH", "2 Thessalonians": "2TH", "1 Timothy": "1TI",
  "2 Timothy": "2TI", "Titus": "TIT", "Philemon": "PHM", "Hebrews": "HEB",
  "James": "JAS", "1 Peter": "1PE", "2 Peter": "2PE", "1 John": "1JN",
  "2 John": "2JN", "3 John": "3JN", "Jude": "JUD", "Revelation": "REV",
};

function parseVerseText(content: string): { verse: number; text: string }[] {
  // Remove pilcrow/paragraph marks and normalize whitespace
  const clean = content.replace(/[¶\u00b6\u2029]/g, " ").replace(/\r\n/g, "\n");
  const parts = clean.split(/\[(\d+)\]/);
  const verses: { verse: number; text: string }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const num = parseInt(parts[i]);
    const text = (parts[i + 1] || "").replace(/\s+/g, " ").trim();
    if (!isNaN(num) && text) verses.push({ verse: num, text });
  }
  return verses;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const book = url.searchParams.get("book");
    const chapter = parseInt(url.searchParams.get("chapter") || "0");
    const translation = (url.searchParams.get("translation") || "web").toLowerCase();

    if (!book || !chapter) {
      return new Response(
        JSON.stringify({ error: "book and chapter are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ESV, NASB, NLT — via scripture.api.bible
    if (["esv", "nasb", "nlt"].includes(translation)) {
      const apiKey = Deno.env.get("BIBLE_API_KEY");
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "Bible API key not configured. Add BIBLE_API_KEY to your Supabase edge function secrets (get a free key at scripture.api.bible)." }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const bibleId = BIBLE_IDS[translation];
      const osisBook = OSIS_MAP[book];
      if (!osisBook) {
        return new Response(
          JSON.stringify({ error: `Book not found: ${book}` }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const chapterId = `${osisBook}.${chapter}`;
      const apiUrl = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`;

      const res = await fetch(apiUrl, {
        headers: { "api-key": apiKey },
      });

      if (!res.ok) {
        const body = await res.text();
        return new Response(
          JSON.stringify({ error: `Translation API error: ${res.status} — ${body.slice(0, 200)}` }),
          { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const json = await res.json();
      const content = json?.data?.content || "";
      const verses = parseVerseText(content);

      if (!verses.length) {
        return new Response(
          JSON.stringify({ error: "No verses found for this chapter." }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ book, chapter, verses, source: "scripture_api", translation }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // KJV — query kjv_bible table directly
    if (translation === "kjv") {
      const { data, error } = await supabase
        .from("kjv_bible")
        .select("verse, text")
        .eq("book", book)
        .eq("chapter", chapter)
        .order("verse");

      if (error) throw error;

      if (!data || data.length === 0) {
        return new Response(
          JSON.stringify({ error: "Chapter not found in KJV database" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ book, chapter, verses: data, source: "kjv_db", translation: "kjv" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // WEB — query bible_verses table, fall back to bible-api.com
    const { data, error } = await supabase
      .from("bible_verses")
      .select("verse, text")
      .eq("book", book)
      .eq("chapter", chapter)
      .order("verse");

    if (error) throw error;

    if (!data || data.length === 0) {
      const apiUrl = `https://bible-api.com/${encodeURIComponent(book)}+${chapter}?translation=web`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        return new Response(
          JSON.stringify({ error: "Chapter not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const apiData = await res.json();
      const verses = (apiData.verses || []).map((v: { verse: number; text: string }) => ({
        verse: v.verse,
        text: v.text.trim(),
      }));
      return new Response(
        JSON.stringify({ book, chapter, verses, source: "api", translation: "web" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ book, chapter, verses: data, source: "db", translation: "web" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
