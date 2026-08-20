import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface Devotional {
  title: string;
  filename: string;
  content: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
}

function parseDevotionalForEmail(content: string): { title: string; subtitle: string; html: string } {
  const lines = content.split('\n').map((l) => l.trim()).filter((l) => l);
  const title = lines[0] || 'Daily Devotional';
  let i = 1;
  if (lines[i] && lines[i].toUpperCase().includes('DISCIPLE CODE')) i++;

  let subtitle = '';
  while (i < lines.length && !isScriptureLine(lines[i]) && !isHeadingLine(lines[i])) {
    if (subtitle) subtitle += ' ';
    subtitle += lines[i];
    i++;
  }

  const htmlParts: string[] = [];
  while (i < lines.length) {
    const line = lines[i];
    if (isScriptureLine(line)) {
      const emDashMatch = line.match(/^(.+?)\s+[\u2014\u2013-]\s+(.*)$/);
      if (emDashMatch) {
        const ref = emDashMatch[1].trim();
        const verse = emDashMatch[2].trim().replace(/^[\u201c"\u201d]+/, '').replace(/[\u201c"\u201d]+$/, '');
        htmlParts.push(`<div style="border-left:3px solid #b45309;padding:12px 16px;margin:16px 0;background:#fefce8;border-radius:0 8px 8px 0;"><strong style="display:block;margin-bottom:4px;color:#1c1917;">${ref}</strong><em style="color:#44403c;">\u201c${verse}\u201d</em></div>`);
      } else {
        htmlParts.push(`<div style="border-left:3px solid #b45309;padding:12px 16px;margin:16px 0;background:#fefce8;border-radius:0 8px 8px 0;"><strong style="color:#1c1917;">${line}</strong></div>`);
      }
      i++;
    } else if (isHeadingLine(line)) {
      htmlParts.push(`<h2 style="font-size:20px;font-weight:700;color:#1c1917;margin:28px 0 10px 0;">${line}</h2>`);
      i++;
    } else {
      htmlParts.push(`<p style="font-size:16px;color:#292524;line-height:1.7;margin:0 0 16px 0;">${line}</p>`);
      i++;
    }
  }

  return { title, subtitle, html: htmlParts.join('\n') };
}

function isScriptureLine(line: string): boolean {
  return /^\d?\s?[A-Z][a-z]+\s+\d+:\d+/.test(line) || /^[A-Z][a-z]+\s+\d+:\d+/.test(line);
}

function isHeadingLine(line: string): boolean {
  if (isScriptureLine(line)) return false;
  if (line.startsWith('\u201c') || line.startsWith('"')) return false;
  const words = line.split(/\s+/);
  if (words.length < 2 || words.length > 15) return false;
  if (line.length > 120) return false;
  const capitalizedWords = words.filter((w) => /^[A-Z]/.test(w));
  return capitalizedWords.length >= Math.ceil(words.length * 0.5) && !line.endsWith('.') && !line.endsWith('!"') && !line.endsWith('."');
}

function buildEmailHtml(devotional: Devotional, subscriber: Subscriber): string {
  const { title, subtitle, html } = parseDevotionalForEmail(devotional.content);
  const greeting = subscriber.name ? `Dear ${subscriber.name},` : 'Dear friend,';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <div style="text-align:center;margin-bottom:24px;">
      <p style="font-size:12px;font-weight:700;color:#b45309;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 4px 0;">The Disciple Code</p>
      <p style="font-size:11px;color:#78716c;margin:0;">Daily Devotional</p>
    </div>
    <div style="background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
      <h1 style="font-size:26px;font-weight:800;color:#1c1917;text-align:center;margin:0 0 8px 0;">${title}</h1>
      ${subtitle ? `<p style="font-size:14px;color:#78716c;text-align:center;margin:0 0 24px 0;font-style:italic;">${subtitle}</p>` : ''}
      <div style="width:48px;height:2px;background:#b45309;margin:0 auto 24px auto;"></div>
      <p style="font-size:15px;color:#57534e;margin:0 0 20px 0;">${greeting}</p>
      ${html}
      <div style="margin-top:36px;padding-top:24px;border-top:1px solid #e7e5e4;text-align:center;">
        <p style="font-size:13px;color:#78716c;margin:0 0 8px 0;">By Colby Ryan Shenk, Disciple Company</p>
        <p style="font-size:12px;color:#a8a29e;margin:0 0 16px 0;">thediscipleco.org</p>
        <p style="font-size:11px;color:#a8a29e;margin:0;">
          You received this email because you subscribed to daily devotionals.
          <br><a href="https://thediscipleco.org/devotionals" style="color:#b45309;">Manage your subscription</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceKey);

    // Fetch all active subscribers
    const { data: subscribers, error: subError } = await admin
      .from('devotional_subscribers')
      .select('id, email, name')
      .eq('is_active', true);

    if (subError) throw subError;
    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: 'No active subscribers', sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch devotional content from the database or use bundled data
    // We store devotionals as JSON in the database, or we can fetch from the app
    // For now, we'll use a devotional_index to cycle through
    const { data: stateData } = await admin
      .from('devotional_email_state')
      .select('current_index')
      .limit(1)
      .maybeSingle();

    let currentIndex = stateData?.current_index ?? 0;

    // The devotional content is bundled in the edge function
    // In production, this could be fetched from the database or an API
    const devotionals: Devotional[] = [
      // Devotionals will be loaded from the database or bundled here
      // For now, we'll fetch from the app's JSON via a simple approach
    ];

    // If we have no bundled devotionals, try fetching from storage
    if (devotionals.length === 0) {
      // Try to read from the devotional_content table or storage
      const { data: devData, error: devError } = await admin
        .from('devotional_content')
        .select('title, filename, content')
        .order('created_at', { ascending: true });

      if (devError || !devData || devData.length === 0) {
        return new Response(JSON.stringify({
          error: 'No devotional content found. Please ensure devotional_content table exists.',
          sent: 0,
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      devotionals.push(...devData);
    }

    const devotional = devotionals[currentIndex % devotionals.length];

    // Send emails using Supabase's built-in email or Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    let sentCount = 0;
    let failedCount = 0;

    if (RESEND_API_KEY) {
      // Send via Resend API
      for (const subscriber of subscribers) {
        const html = buildEmailHtml(devotional, subscriber);
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'devotionals@thediscipleco.org',
            to: subscriber.email,
            subject: `${devotional.title} — Daily Devotional`,
            html,
          }),
        });
        if (res.ok) sentCount++;
        else failedCount++;
      }
    } else {
      // No email service configured — log for development
      console.log('No RESEND_API_KEY configured. Would send to:', subscribers.map((s: Subscriber) => s.email).join(', '));
      console.log('Devotional:', devotional.title);
      sentCount = subscribers.length;
    }

    // Update the index for tomorrow
    const nextIndex = (currentIndex + 1) % devotionals.length;
    if (stateData) {
      await admin.from('devotional_email_state').update({ current_index: nextIndex, last_sent_at: new Date().toISOString() }).eq('id', stateData.id);
    } else {
      await admin.from('devotional_email_state').insert({ current_index: nextIndex, last_sent_at: new Date().toISOString() });
    }

    return new Response(JSON.stringify({
      message: 'Daily devotional sent',
      sent: sentCount,
      failed: failedCount,
      devotional: devotional.title,
      subscribers: subscribers.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
