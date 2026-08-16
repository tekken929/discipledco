import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ScrollText, Heart, Shield, Lightbulb, Download } from 'lucide-react';
import devotionalsData from '../data/devotionals/devotionals.json';
import { BackgroundPicker, ThemeBackground } from '../components/WelcomeHero';
import type { HeroTheme } from '../context/HeroThemeContext';

interface Devotional {
  title: string;
  filename: string;
  content: string;
}

const devotionals: Devotional[] = devotionalsData as Devotional[];

const DEVOTIONAL_META: Record<string, { icon: typeof BookOpen; color: string; bg: string; border: string; description: string }> = {
  'The Table of Grace': {
    icon: ScrollText,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    border: 'border-amber-200 dark:border-amber-800',
    description: 'What Jesus changed about clean foods, dietary laws, and the New Covenant.',
  },
  'Prayer': {
    icon: Heart,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/40',
    border: 'border-rose-200 dark:border-rose-800',
    description: 'How to approach the throne of grace with confidence through our great High Priest.',
  },
  'Strongholds vs. Sins': {
    icon: Shield,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-900/40',
    border: 'border-sky-200 dark:border-sky-800',
    description: 'Breaking down the devil\u2019s strongholds with God\u2019s mighty weapons.',
  },
  'The Dark Room': {
    icon: Lightbulb,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-900/40',
    border: 'border-violet-200 dark:border-violet-800',
    description: 'How the enemy blinds minds and how the light of Christ breaks through.',
  },
};

interface ParsedSection {
  type: 'scripture' | 'heading' | 'body';
  text: string;
  reference?: string;
  verseText?: string;
}

function parseDevotionalContent(content: string): { title: string; subtitle: string; sections: ParsedSection[] } {
  const lines = content.split('\n').map((l) => l.trim()).filter((l) => l);
  const title = lines[0] || '';
  // Line 2 is "THE DISCIPLE CODE" - skip it
  // Lines 3+ until first scripture or heading is the subtitle
  let subtitle = '';
  let i = 1;
  // Skip "THE DISCIPLE CODE"
  if (lines[i] && lines[i].toUpperCase().includes('DISCIPLE CODE')) i++;
  // Collect subtitle lines (typically 1-2 lines before scripture references begin)
  while (i < lines.length && !isScriptureLine(lines[i]) && !isHeadingLine(lines[i])) {
    if (subtitle) subtitle += ' ';
    subtitle += lines[i];
    i++;
  }

  const sections: ParsedSection[] = [];
  while (i < lines.length) {
    const line = lines[i];
    if (isScriptureLine(line)) {
      const { reference, verseText, consumed } = extractScripture(lines, i);
      if (verseText) {
        sections.push({ type: 'scripture', text: line, reference, verseText });
      } else {
        sections.push({ type: 'scripture', text: line, reference, verseText: '' });
      }
      i += consumed;
    } else if (isHeadingLine(line)) {
      sections.push({ type: 'heading', text: line });
      i++;
    } else {
      sections.push({ type: 'body', text: line });
      i++;
    }
  }

  return { title, subtitle, sections };
}

function extractScripture(lines: string[], startIdx: number): { reference: string; verseText: string; consumed: number } {
  const line = lines[startIdx];
  // Try to split reference from verse text on the same line
  // Pattern 1: "Matthew 5:17 — \"verse\"" (em dash separator)
  const emDashMatch = line.match(/^(.+?)\s+[\u2014\u2013-]\s+(.*)$/);
  if (emDashMatch) {
    return { reference: emDashMatch[1].trim(), verseText: ensureQuotes(emDashMatch[2].trim()), consumed: 1 };
  }
  // Pattern 2: "2 Corinthians 10:4\u20135 (NLT)\u201cverse\u201d" (reference directly followed by quote)
  const directQuoteMatch = line.match(/^((?:\d?\s)?[A-Z][a-z]+\s+\d+:\d+[\u2013\u2014-]?\d*[\u2013\u2014-]?\d*\s*(?:\([^)]*\))?[,\s]*)[\u201c"\u201d](.*)$/);
  if (directQuoteMatch) {
    return { reference: directQuoteMatch[1].trim(), verseText: ensureQuotes(directQuoteMatch[2].trim()), consumed: 1 };
  }
  // Pattern 3: reference only, verse text on following lines (e.g. "Hebrews 4:14\u201316 (NLT)")
  // Collect following lines as verse text until next scripture, heading, or unquoted body text
  let verseLines: string[] = [];
  let j = startIdx + 1;
  while (j < lines.length && !isScriptureLine(lines[j]) && !isHeadingLine(lines[j])) {
    verseLines.push(lines[j]);
    j++;
    // Stop after we've collected at least one line and hit a closing quote
    if (verseLines.join(' ').includes('\u201d') || verseLines.join(' ').includes('"')) break;
  }
  if (verseLines.length > 0) {
    return { reference: line.trim(), verseText: ensureQuotes(verseLines.join(' ').trim()), consumed: 1 + verseLines.length };
  }
  // Fallback: just the reference, no verse text
  return { reference: line.trim(), verseText: '', consumed: 1 };
}

function ensureQuotes(text: string): string {
  // Strip surrounding smart/straight quotes and re-wrap uniformly
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^[\u201c"\u201d\u2018'\u2019]+/, '').replace(/[\u201c"\u201d\u2018'\u2019]+$/, '');
  return `\u201c${cleaned}\u201d`;
}

function isScriptureLine(line: string): boolean {
  // Matches patterns like "Matthew 5:17 — ..." or "John 3:3 ..." or "2 Corinthians 10:4\u20135 (NLT)..."
  return /^\d?\s?[A-Z][a-z]+\s+\d+:\d+/.test(line) || /^[A-Z][a-z]+\s+\d+:\d+/.test(line);
}

function isHeadingLine(line: string): boolean {
  // Headings are typically Title Case, not starting with a scripture reference, not a quote
  // and are relatively short (less than ~100 chars), and don't end with typical sentence punctuation
  if (isScriptureLine(line)) return false;
  if (line.startsWith('"') || line.startsWith('"') || line.startsWith('"')) return false;
  // Headings: Title Case with spaces, not too long, no period at end
  const words = line.split(/\s+/);
  if (words.length < 2 || words.length > 15) return false;
  if (line.length > 120) return false;
  // Check if it looks like a heading: most words are capitalized
  const capitalizedWords = words.filter((w) => /^[A-Z]/.test(w) || /^[\u201c"']/.test(w));
  return capitalizedWords.length >= Math.ceil(words.length * 0.5) && !line.endsWith('.') && !line.endsWith('!"') && !line.endsWith('."');
}

function handlePrint(dev: Devotional) {
  const parsed = parseDevotionalContent(dev.content);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${parsed.title} — The Disciple Co.</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    color: #1a1a1a;
    line-height: 1.7;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 2px solid #d6d3d1;
    @media print { display: none; }
  }
  .toolbar-title { font-size: 14px; font-weight: 700; color: #57534e; }
  .toolbar-actions { display: flex; gap: 8px; }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border: none; border-radius: 8px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    font-family: system-ui, sans-serif;
  }
  .btn-print { background: #1c1917; color: white; }
  .btn-save { background: #b45309; color: white; }
  .btn-close { background: #e7e5e4; color: #44403c; }
  h1 {
    font-size: 28px; font-weight: 800; color: #1c1917;
    margin: 0 0 4px 0; text-align: center;
  }
  .subtitle {
    font-size: 14px; font-weight: 600; color: #b45309;
    text-align: center; margin-bottom: 8px;
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .divider {
    width: 60px; height: 2px; background: #b45309;
    margin: 24px auto;
  }
  .scripture {
    padding: 12px 0; margin: 8px 0;
    border-left: 3px solid #b45309;
    padding-left: 16px;
    font-size: 15px;
  }
  .scripture-ref {
    font-weight: 700; font-style: normal; color: #1c1917;
    display: block; margin-bottom: 4px;
  }
  .scripture-verse {
    font-style: italic; color: #44403c;
  }
  .heading {
    font-size: 20px; font-weight: 700; color: #1c1917;
    margin: 32px 0 12px 0;
  }
  .body {
    font-size: 16px; color: #292524; margin: 0 0 16px 0;
  }
  .footer {
    margin-top: 48px; padding-top: 24px;
    border-top: 1px solid #d6d3d1;
    text-align: center; font-size: 13px; color: #78716c;
  }
  @media print {
    body { padding: 0; max-width: none; }
    .toolbar { display: none; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <span class="toolbar-title">${parsed.title} — The Disciple Co.</span>
    <div class="toolbar-actions">
      <button class="btn btn-save" onclick="window.print()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Save as PDF
      </button>
      <button class="btn btn-print" onclick="window.print()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
      <button class="btn btn-close" onclick="window.close()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Close
      </button>
    </div>
  </div>

  <h1>${parsed.title}</h1>
  <div class="subtitle">The Disciple Code</div>
  <div class="divider"></div>

  ${parsed.sections.map((s) => {
    if (s.type === 'scripture') return `<div class="scripture"><span class="scripture-ref">${s.reference || s.text}</span><span class="scripture-verse">${s.verseText || ''}</span></div>`;
    if (s.type === 'heading') return `<h2 class="heading">${s.text}</h2>`;
    return `<p class="body">${s.text}</p>`;
  }).join('\n  ')}

  <div class="footer">By Colby Ryan Shenk, Disciple Company &nbsp;·&nbsp; thediscipleco.org</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function Devotionals() {
  const [selected, setSelected] = useState<Devotional | null>(null);
  const [devTheme, setDevTheme] = useState<HeroTheme>('frost');

  if (selected) {
    const meta = DEVOTIONAL_META[selected.title];
    const parsed = parseDevotionalContent(selected.content);

    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All devotionals
            </button>
            <button
              onClick={() => handlePrint(selected)}
              className="flex items-center gap-2 theme-primary-button text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Download/Save PDF</span>
              <span className="sm:hidden text-sm">Save PDF</span>
            </button>
          </div>

          <article className="theme-card border rounded-2xl p-8 md:p-12 shadow-sm">
            {/* Title header */}
            <div className="text-center mb-8">
              {meta && (
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${meta.bg} mb-4`}>
                  {(() => {
                    const Icon = meta.icon;
                    return <Icon className={`w-6 h-6 ${meta.color}`} />;
                  })()}
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
                {parsed.title}
              </h1>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em] mb-3">
                The Disciple Code
              </p>
              {parsed.subtitle && (
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
                  {parsed.subtitle}
                </p>
              )}
              <div className="flex justify-center mt-6">
                <div className="w-12 h-px bg-amber-400/50" />
              </div>
            </div>

            {/* Content sections */}
            <div className="space-y-4">
              {parsed.sections.map((section, idx) => {
                if (section.type === 'scripture') {
                  return (
                    <div
                      key={idx}
                      className="border-l-4 border-amber-400 dark:border-amber-600 pl-4 py-2 my-4 text-sm leading-relaxed"
                    >
                      <span className="block font-bold text-gray-900 dark:text-white mb-1">
                        {section.reference || section.text}
                      </span>
                      <span className="italic text-gray-600 dark:text-gray-400">
                        {section.verseText || ''}
                      </span>
                    </div>
                  );
                }
                if (section.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 leading-snug"
                    >
                      {section.text}
                    </h2>
                  );
                }
                return (
                  <p
                    key={idx}
                    className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4"
                  >
                    {section.text}
                  </p>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                By Colby Ryan Shenk, Disciple Company
              </p>
            </div>
          </article>

          <div className="mt-8 text-center">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to devotionals
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950">
      {/* Hero header with theme picker */}
      <section className="relative overflow-hidden">
        <ThemeBackground theme={devTheme} />
        <div className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <BackgroundPicker value={devTheme} onChange={setDevTheme} />
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8 pb-10">
          <div className="relative rounded-[2rem] bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
            <div className="relative px-6 py-10 sm:px-10 md:px-14 md:py-14 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 mb-5">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-3 leading-tight tracking-wide drop-shadow-2xl">
                Daily Devotionals
              </h1>
              <p className="text-amber-200/70 text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-6">
                The Disciple Code
              </p>
              <div className="flex justify-center mb-6">
                <div className="w-12 h-px bg-white/25" />
              </div>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light italic drop-shadow-lg">
                Short, Scripture-rich reflections to strengthen your walk with Christ.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 dark:from-gray-950 to-transparent pointer-events-none" />
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {devotionals.map((dev) => {
            const meta = DEVOTIONAL_META[dev.title] || {
              icon: BookOpen,
              color: 'text-gray-600 dark:text-gray-400',
              bg: 'bg-gray-100 dark:bg-gray-800',
              border: 'border-gray-200 dark:border-gray-700',
              description: '',
            };
            const Icon = meta.icon;

            return (
              <button
                key={dev.filename}
                onClick={() => setSelected(dev)}
                className={`group text-left p-6 rounded-2xl theme-card border-2 ${meta.border} hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${meta.color}`} />
                  </div>
                  <ArrowRight className={`w-4 h-4 ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  {dev.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {meta.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            By Colby Ryan Shenk, Disciple Company
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}