import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface VerseRow {
  translation: string;
  book_order: number;
  book: string;
  testament: string;
  chapter: number;
  verse: number;
  text: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const url = new URL(req.url);

    // DELETE /seed-translation?translation=nlt — clear all verses for a translation
    if (req.method === "DELETE") {
      const translation = url.searchParams.get("translation");
      if (!translation) {
        return new Response(JSON.stringify({ error: "translation param required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await supabase
        .from("translations_bible")
        .delete()
        .eq("translation", translation);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, translation }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST — insert a batch of verses
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const verses: VerseRow[] = body.verses;

    if (!Array.isArray(verses) || verses.length === 0) {
      return new Response(JSON.stringify({ error: "verses array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert in sub-batches of 500 to stay within Postgres limits
    let inserted = 0;
    for (let i = 0; i < verses.length; i += 500) {
      const { error } = await supabase
        .from("translations_bible")
        .insert(verses.slice(i, i + 500));
      if (error) throw error;
      inserted += Math.min(500, verses.length - i);
    }

    return new Response(JSON.stringify({ success: true, inserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
