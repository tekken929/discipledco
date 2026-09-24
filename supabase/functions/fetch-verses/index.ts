import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const book = url.searchParams.get("book");
    const chapter = parseInt(url.searchParams.get("chapter") || "0");
    const translation = (url.searchParams.get("translation") || "nlt").toLowerCase();
    const verseStart = url.searchParams.get("verseStart") ? parseInt(url.searchParams.get("verseStart")!) : null;
    const verseEnd = url.searchParams.get("verseEnd") ? parseInt(url.searchParams.get("verseEnd")!) : null;

    if (!book || !chapter) {
      return new Response(
        JSON.stringify({ error: "book and chapter are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normalize book name: "Psalm" (singular) -> "Psalms" (as stored in DB)
    const normalizedBook = book.trim() === "Psalm" ? "Psalms" : book.trim();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ESV, NASB, NLT, NIV — query translations_bible table
    if (["esv", "nasb", "nlt", "niv"].includes(translation)) {
      let query = supabase
        .from("translations_bible")
        .select("verse, text")
        .eq("translation", translation)
        .eq("book", normalizedBook)
        .eq("chapter", chapter);
      if (verseStart !== null) {
        query = query.gte("verse", verseStart);
        if (verseEnd !== null) query = query.lte("verse", verseEnd);
        else query = query.eq("verse", verseStart);
      }
      const { data, error } = await query.order("verse");

      if (error) throw error;

      if (!data || data.length === 0) {
        return new Response(
          JSON.stringify({ error: `${translation.toUpperCase()} has not been imported yet. Upload the XML file in the Admin Portal under Bible Translations.` }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ book: normalizedBook, chapter, verses: data, source: "db", translation }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // KJV — query kjv_bible table
    if (translation === "kjv") {
      let kjvQuery = supabase
        .from("kjv_bible")
        .select("verse, text")
        .eq("book", normalizedBook)
        .eq("chapter", chapter);
      if (verseStart !== null) {
        kjvQuery = kjvQuery.gte("verse", verseStart);
        if (verseEnd !== null) kjvQuery = kjvQuery.lte("verse", verseEnd);
        else kjvQuery = kjvQuery.eq("verse", verseStart);
      }
      const { data, error } = await kjvQuery.order("verse");

      if (error) throw error;

      if (!data || data.length === 0) {
        return new Response(
          JSON.stringify({ error: "Chapter not found in KJV database" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ book: normalizedBook, chapter, verses: data, source: "kjv_db", translation: "kjv" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: `Unknown translation: ${translation}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
