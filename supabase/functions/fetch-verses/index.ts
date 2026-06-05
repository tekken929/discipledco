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
    const translation = (url.searchParams.get("translation") || "web").toLowerCase();

    if (!book || !chapter) {
      return new Response(
        JSON.stringify({ error: "book and chapter are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
