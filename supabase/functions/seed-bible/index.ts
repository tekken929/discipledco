import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BOOK_ORDER: Record<string, number> = {
  Genesis: 1, Exodus: 2, Leviticus: 3, Numbers: 4, Deuteronomy: 5,
  Joshua: 6, Judges: 7, Ruth: 8, "1 Samuel": 9, "2 Samuel": 10,
  "1 Kings": 11, "2 Kings": 12, "1 Chronicles": 13, "2 Chronicles": 14,
  Ezra: 15, Nehemiah: 16, Esther: 17, Job: 18, Psalms: 19, Proverbs: 20,
  Ecclesiastes: 21, "Song of Solomon": 22, Isaiah: 23, Jeremiah: 24,
  Lamentations: 25, Ezekiel: 26, Daniel: 27, Hosea: 28, Joel: 29, Amos: 30,
  Obadiah: 31, Jonah: 32, Micah: 33, Nahum: 34, Habakkuk: 35, Zephaniah: 36,
  Haggai: 37, Zechariah: 38, Malachi: 39,
  Matthew: 40, Mark: 41, Luke: 42, John: 43, Acts: 44, Romans: 45,
  "1 Corinthians": 46, "2 Corinthians": 47, Galatians: 48, Ephesians: 49,
  Philippians: 50, Colossians: 51, "1 Thessalonians": 52, "2 Thessalonians": 53,
  "1 Timothy": 54, "2 Timothy": 55, Titus: 56, Philemon: 57, Hebrews: 58,
  James: 59, "1 Peter": 60, "2 Peter": 61, "1 John": 62, "2 John": 63,
  "3 John": 64, Jude: 65, Revelation: 66,
};

const TESTAMENT_MAP: Record<string, string> = {
  Genesis: "Old Testament", Exodus: "Old Testament", Leviticus: "Old Testament", Numbers: "Old Testament", Deuteronomy: "Old Testament",
  Joshua: "Old Testament", Judges: "Old Testament", Ruth: "Old Testament", "1 Samuel": "Old Testament", "2 Samuel": "Old Testament",
  "1 Kings": "Old Testament", "2 Kings": "Old Testament", "1 Chronicles": "Old Testament", "2 Chronicles": "Old Testament",
  Ezra: "Old Testament", Nehemiah: "Old Testament", Esther: "Old Testament", Job: "Old Testament", Psalms: "Old Testament", Proverbs: "Old Testament",
  Ecclesiastes: "Old Testament", "Song of Solomon": "Old Testament", Isaiah: "Old Testament", Jeremiah: "Old Testament",
  Lamentations: "Old Testament", Ezekiel: "Old Testament", Daniel: "Old Testament", Hosea: "Old Testament", Joel: "Old Testament", Amos: "Old Testament",
  Obadiah: "Old Testament", Jonah: "Old Testament", Micah: "Old Testament", Nahum: "Old Testament", Habakkuk: "Old Testament", Zephaniah: "Old Testament",
  Haggai: "Old Testament", Zechariah: "Old Testament", Malachi: "Old Testament",
  Matthew: "New Testament", Mark: "New Testament", Luke: "New Testament", John: "New Testament", Acts: "New Testament", Romans: "New Testament",
  "1 Corinthians": "New Testament", "2 Corinthians": "New Testament", Galatians: "New Testament", Ephesians: "New Testament",
  Philippians: "New Testament", Colossians: "New Testament", "1 Thessalonians": "New Testament", "2 Thessalonians": "New Testament",
  "1 Timothy": "New Testament", "2 Timothy": "New Testament", Titus: "New Testament", Philemon: "New Testament", Hebrews: "New Testament",
  James: "New Testament", "1 Peter": "New Testament", "2 Peter": "New Testament", "1 John": "New Testament", "2 John": "New Testament",
  "3 John": "New Testament", Jude: "New Testament", Revelation: "New Testament",
};

const ALL_CHAPTERS: [string, number][] = [
  ["Genesis", 1], ["Genesis", 2], ["Genesis", 3], ["Genesis", 6], ["Genesis", 7],
  ["Genesis", 8], ["Genesis", 9], ["Genesis", 12], ["Genesis", 15], ["Genesis", 17],
  ["Genesis", 22], ["Exodus", 1], ["Exodus", 3], ["Exodus", 7], ["Exodus", 12],
  ["Exodus", 14], ["Exodus", 19], ["Exodus", 20], ["1 Samuel", 17], ["2 Samuel", 5],
  ["1 Kings", 6], ["2 Kings", 25], ["Ezra", 1], ["Nehemiah", 1], ["Nehemiah", 4],
  ["Psalms", 22], ["Psalms", 23], ["Psalms", 51], ["Psalms", 119],
  ["Isaiah", 7], ["Isaiah", 9], ["Isaiah", 53], ["Jeremiah", 29], ["Jeremiah", 31],
  ["Daniel", 1], ["Daniel", 3], ["Daniel", 6],
  ["Matthew", 1], ["Matthew", 2], ["Matthew", 5], ["Matthew", 6], ["Matthew", 7],
  ["Matthew", 27], ["Matthew", 28],
  ["Mark", 1], ["Mark", 16],
  ["Luke", 1], ["Luke", 2], ["Luke", 4], ["Luke", 9], ["Luke", 15], ["Luke", 23], ["Luke", 24],
  ["John", 1], ["John", 3], ["John", 10], ["John", 14], ["John", 15], ["John", 17], ["John", 20],
  ["Acts", 1], ["Acts", 2], ["Acts", 9], ["Acts", 10],
  ["Romans", 1], ["Romans", 3], ["Romans", 5], ["Romans", 6], ["Romans", 8], ["Romans", 10],
  ["Romans", 12],
  ["1 Corinthians", 13], ["1 Corinthians", 15],
  ["Galatians", 2], ["Galatians", 3], ["Galatians", 5],
  ["Ephesians", 1], ["Ephesians", 2], ["Ephesians", 6],
  ["Hebrews", 11], ["Hebrews", 12],
  ["James", 2],
  ["Revelation", 1], ["Revelation", 20], ["Revelation", 21], ["Revelation", 22],
];

async function fetchChapter(book: string, chapter: number): Promise<{ v: number; t: string }[]> {
  const bookEncoded = encodeURIComponent(book);
  const url = `https://bible-api.com/${bookEncoded}+${chapter}?translation=web`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  if (!data.verses) return [];
  return data.verses.map((v: { verse: number; text: string }) => ({ v: v.verse, t: v.text.trim() }));
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
    const startParam = parseInt(url.searchParams.get("start") || "0");
    const endParam = parseInt(url.searchParams.get("end") || "10");
    const batchSize = Math.min(endParam - startParam, 15);
    const batch = ALL_CHAPTERS.slice(startParam, startParam + batchSize);

    let inserted = 0;
    let skipped = 0;

    for (const [book, chapter] of batch) {
      const { count } = await supabase
        .from("bible_verses")
        .select("id", { count: "exact", head: true })
        .eq("book", book)
        .eq("chapter", chapter);

      if ((count ?? 0) > 0) {
        skipped++;
        continue;
      }

      const verses = await fetchChapter(book, chapter);
      if (verses.length === 0) continue;

      const rows = verses.map(({ v, t }) => ({
        book,
        chapter,
        verse: v,
        text: t,
        version: "WEB",
        testament: TESTAMENT_MAP[book] || "OT",
        book_number: BOOK_ORDER[book] || 0,
      }));

      const { error } = await supabase.from("bible_verses").insert(rows);
      if (!error) inserted++;
      else console.error("Insert error:", JSON.stringify(error));
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: batch.length,
        inserted,
        skipped,
        total_chapters: ALL_CHAPTERS.length,
        next_start: startParam + batchSize,
        done: startParam + batchSize >= ALL_CHAPTERS.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
