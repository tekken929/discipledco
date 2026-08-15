import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ArrowRight, Lock, Download, ChevronDown, Lightbulb, Sparkles, Users } from 'lucide-react';
import { topics } from '../data/topics';
import { supabase } from '../lib/supabase';
import { Topic, BibleReference } from '../types/topic';

type Translation = 'kjv' | 'web' | 'esv' | 'nasb' | 'nlt';

const TRANSLATION_LABELS: Record<Translation, string> = {
  kjv: 'KJV',
  web: 'WEB',
  esv: 'ESV',
  nasb: 'NASB',
  nlt: 'NLT',
};

function normalizeBookName(book: string): string {
  if (book === 'Psalm') return 'Psalms';
  return book;
}

function parseVerseRange(verse: string): { start: number; end: number } {
  const cleaned = verse.replace(/[\u2013\u2014]/g, '-');
  if (cleaned.includes('-')) {
    const parts = cleaned.split('-').map(v => parseInt(v.trim(), 10));
    return { start: parts[0] || 1, end: parts[1] || parts[0] || 1 };
  }
  const single = parseInt(cleaned.trim(), 10);
  return { start: single, end: single };
}

async function fetchVersesByTranslation(refs: BibleReference[], translation: Translation): Promise<Record<number, string>> {
  const results: Record<number, string> = {};
  for (let i = 0; i < refs.length; i++) {
    const ref = refs[i];
    const { start, end } = parseVerseRange(ref.verse);
    const { data, error } = await supabase
      .from('translations_bible')
      .select('text')
      .eq('translation', translation)
      .eq('book', normalizeBookName(ref.book))
      .eq('chapter', ref.chapter)
      .gte('verse', start)
      .lte('verse', end)
      .order('verse', { ascending: true });
    if (!error && data && data.length > 0) {
      results[i] = data.map((v: { text: string }) => v.text).join(' ');
    }
  }
  return results;
}

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #78350f 0%, #b45309 30%, #d97706 60%, #fbbf24 85%, #fde68a 100%)';

const TILE_GRADIENTS: Record<string, string> = {
  'sobriety-self-control': 'linear-gradient(135deg, #0a2e2e 0%, #064e4e 30%, #0f766e 60%, #14b8a6 85%, #5eead4 100%)',
  'forbidden-practices': 'linear-gradient(135deg, #1a0a0a 0%, #3b0f0f 30%, #7f1d1d 60%, #b91c1c 85%, #fca5a5 100%)',
  marriage:             'linear-gradient(135deg, #3b0a0a 0%, #7f1d1d 30%, #b91c1c 60%, #f43f5e 85%, #fecdd3 100%)',
  lust:                 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 30%, #1e40af 65%, #3b82f6 85%, #93c5fd 100%)',
  sin:                  'linear-gradient(135deg, #0f172a 0%, #1e3a5f 30%, #1e40af 65%, #3b82f6 85%, #93c5fd 100%)',
  forgiveness:          'linear-gradient(135deg, #0c1a2e 0%, #064e3b 30%, #065f46 60%, #059669 85%, #6ee7b7 100%)',
  prayer:               'linear-gradient(135deg, #0a1a2e 0%, #0c2340 30%, #1e3a5f 60%, #2563eb 85%, #bfdbfe 100%)',
  love:                 'linear-gradient(135deg, #4a0011 0%, #881337 30%, #be123c 60%, #fb7185 85%, #fecdd3 100%)',
  'fear-anxiety':       'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 75%, #4e9af1 100%)',
  wisdom:               'linear-gradient(135deg, #1a1a0a 0%, #3b3b0f 30%, #7c6f14 60%, #ca8a04 85%, #fef08a 100%)',
  anger:                'linear-gradient(135deg, #1a0a0a 0%, #450a0a 30%, #991b1b 60%, #dc2626 85%, #fca5a5 100%)',
  faith:                'linear-gradient(135deg, #0a1628 0%, #1e3a5f 30%, #1d4ed8 60%, #60a5fa 85%, #dbeafe 100%)',
  demons:               'linear-gradient(135deg, #09090b 0%, #18181b 30%, #27272a 60%, #52525b 85%, #a1a1aa 100%)',
  possession:           'linear-gradient(135deg, #0a0a0a 0%, #1c1917 30%, #44403c 60%, #78716c 85%, #d6d3d1 100%)',
  suffering:            'linear-gradient(135deg, #1c0a2e 0%, #3b0764 30%, #6d28d9 60%, #8b5cf6 85%, #ddd6fe 100%)',
  'children-death':     'linear-gradient(135deg, #0a1628 0%, #1e3a5f 30%, #0e7490 60%, #06b6d4 85%, #cffafe 100%)',
  hell:                 'linear-gradient(135deg, #1a0000 0%, #450a0a 30%, #7f1d1d 60%, #b45309 85%, #fde68a 100%)',
  heaven:               'linear-gradient(135deg, #0c1a2e 0%, #1e3a5f 30%, #1d4ed8 60%, #60a5fa 85%, #e0f2fe 100%)',
  'god-sovereignty':    'linear-gradient(135deg, #0a0a00 0%, #1a1a00 30%, #713f12 60%, #a16207 85%, #fef9c3 100%)',
  grace:                'linear-gradient(135deg, #78350f 0%, #b45309 30%, #d97706 60%, #fbbf24 85%, #fde68a 100%)',
  'holy-spirit':        'linear-gradient(135deg, #0c1a2e 0%, #064e3b 30%, #0f766e 60%, #0d9488 85%, #ccfbf1 100%)',
  'end-times':          'linear-gradient(135deg, #09090b 0%, #0f172a 30%, #1e293b 60%, #334155 85%, #e2e8f0 100%)',
};

type AccentKey = 'amber' | 'blue' | 'green' | 'rose' | 'sky' | 'slate' | 'orange' | 'red';

const ACCENT: Record<AccentKey, {
  badgeBg: string; badgeText: string;
  convBorder: string; convBg: string; convTitle: string;
  translationBg: string; translationText: string;
  bookIcon: string;
  sectionBg: string; sectionBorder: string;
  headerBg: string; headerText: string;
  verseAltBg: string; leftBar: string;
}> = {
  amber: {
    badgeBg: 'bg-amber-100 dark:bg-amber-900/40', badgeText: 'text-amber-700 dark:text-amber-400',
    convBorder: 'border-amber-200 dark:border-amber-800/50', convBg: 'bg-amber-50 dark:bg-amber-900/20', convTitle: 'text-amber-900 dark:text-amber-300',
    translationBg: 'bg-amber-100 dark:bg-amber-900/40', translationText: 'text-amber-700 dark:text-amber-400',
    bookIcon: 'text-amber-600 dark:text-amber-400',
    sectionBg: 'bg-amber-50/40 dark:bg-amber-950/15', sectionBorder: 'border-amber-200/60 dark:border-amber-800/40',
    headerBg: 'bg-amber-100/70 dark:bg-amber-900/40', headerText: 'text-amber-800 dark:text-amber-200',
    verseAltBg: 'bg-amber-50/30 dark:bg-amber-950/10', leftBar: 'border-l-amber-400 dark:border-l-amber-600',
  },
  blue: {
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40', badgeText: 'text-blue-700 dark:text-blue-400',
    convBorder: 'border-blue-200 dark:border-blue-800/50', convBg: 'bg-blue-50 dark:bg-blue-900/20', convTitle: 'text-blue-900 dark:text-blue-300',
    translationBg: 'bg-blue-100 dark:bg-blue-900/40', translationText: 'text-blue-700 dark:text-blue-400',
    bookIcon: 'text-blue-600 dark:text-blue-400',
    sectionBg: 'bg-blue-50/40 dark:bg-blue-950/15', sectionBorder: 'border-blue-200/60 dark:border-blue-800/40',
    headerBg: 'bg-blue-100/70 dark:bg-blue-900/40', headerText: 'text-blue-800 dark:text-blue-200',
    verseAltBg: 'bg-blue-50/30 dark:bg-blue-950/10', leftBar: 'border-l-blue-400 dark:border-l-blue-600',
  },
  green: {
    badgeBg: 'bg-green-100 dark:bg-green-900/40', badgeText: 'text-green-700 dark:text-green-400',
    convBorder: 'border-green-200 dark:border-green-800/50', convBg: 'bg-green-50 dark:bg-green-900/20', convTitle: 'text-green-900 dark:text-green-300',
    translationBg: 'bg-green-100 dark:bg-green-900/40', translationText: 'text-green-700 dark:text-green-400',
    bookIcon: 'text-green-600 dark:text-green-400',
    sectionBg: 'bg-green-50/40 dark:bg-green-950/15', sectionBorder: 'border-green-200/60 dark:border-green-800/40',
    headerBg: 'bg-green-100/70 dark:bg-green-900/40', headerText: 'text-green-800 dark:text-green-200',
    verseAltBg: 'bg-green-50/30 dark:bg-green-950/10', leftBar: 'border-l-green-400 dark:border-l-green-600',
  },
  rose: {
    badgeBg: 'bg-rose-100 dark:bg-rose-900/40', badgeText: 'text-rose-700 dark:text-rose-400',
    convBorder: 'border-rose-200 dark:border-rose-800/50', convBg: 'bg-rose-50 dark:bg-rose-900/20', convTitle: 'text-rose-900 dark:text-rose-300',
    translationBg: 'bg-rose-100 dark:bg-rose-900/40', translationText: 'text-rose-700 dark:text-rose-400',
    bookIcon: 'text-rose-600 dark:text-rose-400',
    sectionBg: 'bg-rose-50/40 dark:bg-rose-950/15', sectionBorder: 'border-rose-200/60 dark:border-rose-800/40',
    headerBg: 'bg-rose-100/70 dark:bg-rose-900/40', headerText: 'text-rose-800 dark:text-rose-200',
    verseAltBg: 'bg-rose-50/30 dark:bg-rose-950/10', leftBar: 'border-l-rose-400 dark:border-l-rose-600',
  },
  sky: {
    badgeBg: 'bg-sky-100 dark:bg-sky-900/40', badgeText: 'text-sky-700 dark:text-sky-400',
    convBorder: 'border-sky-200 dark:border-sky-800/50', convBg: 'bg-sky-50 dark:bg-sky-900/20', convTitle: 'text-sky-900 dark:text-sky-300',
    translationBg: 'bg-sky-100 dark:bg-sky-900/40', translationText: 'text-sky-700 dark:text-sky-400',
    bookIcon: 'text-sky-600 dark:text-sky-400',
    sectionBg: 'bg-sky-50/40 dark:bg-sky-950/15', sectionBorder: 'border-sky-200/60 dark:border-sky-800/40',
    headerBg: 'bg-sky-100/70 dark:bg-sky-900/40', headerText: 'text-sky-800 dark:text-sky-200',
    verseAltBg: 'bg-sky-50/30 dark:bg-sky-950/10', leftBar: 'border-l-sky-400 dark:border-l-sky-600',
  },
  slate: {
    badgeBg: 'bg-slate-100 dark:bg-slate-800/60', badgeText: 'text-slate-700 dark:text-slate-300',
    convBorder: 'border-slate-200 dark:border-slate-700', convBg: 'bg-slate-50 dark:bg-slate-800/30', convTitle: 'text-slate-800 dark:text-slate-300',
    translationBg: 'bg-slate-100 dark:bg-slate-800', translationText: 'text-slate-600 dark:text-slate-400',
    bookIcon: 'text-slate-600 dark:text-slate-400',
    sectionBg: 'bg-slate-50/40 dark:bg-slate-900/15', sectionBorder: 'border-slate-200/60 dark:border-slate-700/40',
    headerBg: 'bg-slate-100/70 dark:bg-slate-800/40', headerText: 'text-slate-700 dark:text-slate-200',
    verseAltBg: 'bg-slate-50/30 dark:bg-slate-900/10', leftBar: 'border-l-slate-400 dark:border-l-slate-600',
  },
  orange: {
    badgeBg: 'bg-orange-100 dark:bg-orange-900/40', badgeText: 'text-orange-700 dark:text-orange-400',
    convBorder: 'border-orange-200 dark:border-orange-800/50', convBg: 'bg-orange-50 dark:bg-orange-900/20', convTitle: 'text-orange-900 dark:text-orange-300',
    translationBg: 'bg-orange-100 dark:bg-orange-900/40', translationText: 'text-orange-700 dark:text-orange-400',
    bookIcon: 'text-orange-600 dark:text-orange-400',
    sectionBg: 'bg-orange-50/40 dark:bg-orange-950/15', sectionBorder: 'border-orange-200/60 dark:border-orange-800/40',
    headerBg: 'bg-orange-100/70 dark:bg-orange-900/40', headerText: 'text-orange-800 dark:text-orange-200',
    verseAltBg: 'bg-orange-50/30 dark:bg-orange-950/10', leftBar: 'border-l-orange-400 dark:border-l-orange-600',
  },
  red: {
    badgeBg: 'bg-red-100 dark:bg-red-900/40', badgeText: 'text-red-700 dark:text-red-400',
    convBorder: 'border-red-200 dark:border-red-800/50', convBg: 'bg-red-50 dark:bg-red-900/20', convTitle: 'text-red-900 dark:text-red-300',
    translationBg: 'bg-red-100 dark:bg-red-900/40', translationText: 'text-red-700 dark:text-red-400',
    bookIcon: 'text-red-600 dark:text-red-400',
    sectionBg: 'bg-red-50/40 dark:bg-red-950/15', sectionBorder: 'border-red-200/60 dark:border-red-800/40',
    headerBg: 'bg-red-100/70 dark:bg-red-900/40', headerText: 'text-red-800 dark:text-red-200',
    verseAltBg: 'bg-red-50/30 dark:bg-red-950/10', leftBar: 'border-l-red-400 dark:border-l-red-600',
  },
};

function TopicDetail({ topic }: { topic: Topic }) {
  const hasRichContent = !!(topic.bodyContent || topic.whatWeLearns || topic.prayer);
  const accent = ACCENT[topic.accentColor ?? 'amber'];
  const gradient = topic.heroGradient ?? DEFAULT_GRADIENT;

  const [verseTexts, setVerseTexts] = useState<Record<number, string>>({});
  const [versesLoading, setVersesLoading] = useState(true);
  const [translation, setTranslation] = useState<Translation>('esv');
  const [translationOpen, setTranslationOpen] = useState(false);

  useEffect(() => {
    setVersesLoading(true);
    fetchVersesByTranslation(topic.references, translation).then(texts => {
      setVerseTexts(texts);
      setVersesLoading(false);
    });
  }, [topic.id, translation]);

  const handlePrint = () => {
    const versesHtml = topic.references.map((ref, index) => {
      const verseReference = `${ref.book} ${ref.chapter}:${ref.verse}`;
      const fetchedText = verseTexts[index];
      const displayText = fetchedText ?? ref.text;
      return `<div class="verse-card ${index % 2 === 0 ? 'alt' : ''}">
        <div class="verse-header">
          <span class="verse-ref">${verseReference}</span>
          <span class="verse-translation">${TRANSLATION_LABELS[translation]}</span>
        </div>
        <div class="verse-body">
          <p class="verse-text">"${displayText}"</p>
          ${ref.summary ? `<p class="verse-summary">${ref.summary}</p>` : ''}
        </div>
      </div>`;
    }).join('\n    ');

    const learnHtml = topic.whatWeLearns
      ? `<h2>What We Learn</h2>
      <ul class="learn-list">
        ${topic.whatWeLearns.map((point, i) => `<li class="${i % 2 === 0 ? 'alt' : ''}"><span class="learn-num">${i + 1}</span><span>${point}</span></li>`).join('\n        ')}
      </ul>`
      : '';

    const bodyHtml = topic.bodyContent
      ? topic.bodyContent.map(p => `<p>${p}</p>`).join('\n      ')
      : '';

    const conversationHtml = topic.familyConversation
      ? `<div class="conversation-box">
        <h2>Family Conversation</h2>
        <p>${topic.familyConversation}</p>
      </div>`
      : '';

    const prayerHtml = topic.prayer
      ? `<div class="prayer-box">
        <h2>Prayer</h2>
        <div class="prayer-body">
          ${topic.prayer.split('\n').filter(l => l.trim()).map(l => `<p>${l}</p>`).join('\n          ')}
        </div>
      </div>`
      : '';

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${topic.title} — The Disciple Co.</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #ffffff;
      color: #111827;
      padding: 40px;
      padding-top: 88px;
      max-width: 820px;
      margin: 0 auto;
    }
    h1 { font-size: 2.4rem; font-weight: 800; margin-bottom: 8px; color: #111827; }
    .subtitle { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #6b7280; margin-bottom: 12px; }
    .short-desc { font-size: 1.05rem; color: #374151; line-height: 1.7; margin-bottom: 32px; }
    h2 { font-size: 1.4rem; font-weight: 700; margin-bottom: 16px; margin-top: 32px; color: #111827; display: flex; align-items: center; gap: 8px; }
    .overview { background: #fafaf9; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px 28px; margin-bottom: 28px; }
    .overview p { color: #374151; line-height: 1.75; margin-bottom: 12px; font-size: 0.95rem; }
    .overview p:last-child { margin-bottom: 0; }
    .learn-list { list-style: none; margin-bottom: 28px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
    .learn-list li { display: flex; align-items: flex-start; gap: 14px; padding: 12px 18px; }
    .learn-list li.alt { background: #fafaf9; }
    .learn-list li + li { border-top: 1px solid #f3f4f6; }
    .learn-num { width: 26px; height: 26px; border-radius: 50%; background: #f3f4f6; color: #374151; font-size: 0.78rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .learn-list li span:last-child { color: #374151; line-height: 1.6; font-size: 0.9rem; }
    .verse-card { border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 14px; overflow: hidden; page-break-inside: avoid; }
    .verse-card.alt { background: #fafaf9; }
    .verse-header { padding: 10px 16px; background: #f5f5f4; display: flex; align-items: center; justify-content: space-between; }
    .verse-ref { font-weight: 700; color: #111827; font-size: 0.88rem; }
    .verse-translation { font-size: 0.72rem; font-weight: 600; color: #6b7280; background: #f3f4f6; padding: 2px 10px; border-radius: 999px; }
    .verse-body { padding: 14px 18px; }
    .verse-text { font-style: italic; color: #374151; line-height: 1.7; font-size: 0.92rem; margin-bottom: 8px; }
    .verse-summary { color: #6b7280; font-size: 0.85rem; line-height: 1.6; padding-top: 10px; border-top: 1px solid #f3f4f6; }
    .conversation-box { border-radius: 12px; border: 1px solid #e5e7eb; background: #f9fafb; padding: 18px 22px; margin-top: 28px; }
    .conversation-box h2 { margin-top: 0; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.15em; color: #6b7280; }
    .conversation-box p { color: #374151; line-height: 1.7; font-size: 0.92rem; }
    .prayer-box { border-radius: 12px; border: 1px solid #e5e7eb; background: #f9fafb; padding: 18px 22px; margin-top: 28px; }
    .prayer-box h2 { margin-top: 0; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.15em; color: #6b7280; }
    .prayer-body p { color: #374151; line-height: 1.7; font-size: 0.92rem; margin-bottom: 6px; }
    .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 0.75rem; color: #9ca3af; }
    .toolbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 56px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      z-index: 100;
    }
    .toolbar-title { font-size: 0.9rem; font-weight: 600; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .toolbar-actions { display: flex; gap: 10px; flex-shrink: 0; }
    .btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: none; transition: opacity 0.15s, transform 0.1s; }
    .btn:active { transform: scale(0.97); }
    .btn-save { background: #0f766e; color: #ffffff; }
    .btn-save:hover { opacity: 0.88; }
    .btn-print { background: #f3f4f6; color: #111827; border: 1px solid #d1d5db; }
    .btn-print:hover { background: #e5e7eb; }
    .btn-close { background: #f3f4f6; color: #6b7280; border: 1px solid #d1d5db; }
    .btn-close:hover { background: #fee2e2; color: #dc2626; border-color: #fca5a5; }
    @page { margin: 0; }
    @media print {
      .toolbar { display: none; }
      body { padding: 20px 40px; }
      .verse-card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <span class="toolbar-title">${topic.title} — The Disciple Co.</span>
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

  ${topic.subtitle ? `<p class="subtitle">${topic.subtitle}</p>` : ''}
  <h1>${topic.title}</h1>
  <p class="short-desc">${topic.shortDescription}</p>

  ${bodyHtml ? `<div class="overview">${bodyHtml}</div>` : ''}

  ${learnHtml}

  <h2>Biblical References</h2>
    ${versesHtml}

  ${conversationHtml}
  ${prayerHtml}

  <div class="footer">The Disciple Co. &nbsp;·&nbsp; thediscipleco.org</div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return (
    <>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Topics
          </Link>
          <button
            onClick={handlePrint}
            disabled={versesLoading}
            className="flex items-center justify-center gap-2 theme-primary-button text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg flex-shrink-0 disabled:opacity-60"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Download/Save PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>

        {/* Hero header */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
          <div
            className="relative px-8 py-14 flex flex-col items-center text-center"
            style={{ background: gradient }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              {topic.subtitle && (
                <p className="text-white/70 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                  {topic.subtitle}
                </p>
              )}
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-sm">
                {topic.title}
              </h1>
              <p className="text-white/85 text-lg leading-relaxed max-w-xl drop-shadow-sm">
                {topic.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Body paragraphs */}
        {topic.bodyContent && (
          <div className={`mb-8 rounded-2xl border ${accent.sectionBorder} ${accent.sectionBg} overflow-hidden`}>
            <div className={`px-6 py-3 ${accent.headerBg} border-b ${accent.sectionBorder}`}>
              <h2 className={`text-sm font-bold ${accent.headerText} uppercase tracking-widest`}>
                Overview
              </h2>
            </div>
            <div className="px-6 py-6 sm:px-8 sm:py-7 space-y-5">
              {topic.bodyContent.map((paragraph, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 leading-[1.9] text-[1.05rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Legacy expandedContent fallback */}
        {!hasRichContent && topic.expandedContent && (
          <div className="mb-8 p-6 rounded-xl bg-stone-50 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-700">
            <p className="text-gray-700 dark:text-gray-300 leading-loose">
              {topic.expandedContent}
            </p>
          </div>
        )}

        {/* What We Learn */}
        {topic.whatWeLearns && (
          <div className={`mb-8 rounded-2xl border ${accent.sectionBorder} overflow-hidden`}>
            <div className={`px-6 py-3.5 ${accent.headerBg} border-b ${accent.sectionBorder} flex items-center gap-2`}>
              <Lightbulb className={`w-5 h-5 ${accent.bookIcon}`} />
              <h2 className={`text-base font-bold ${accent.headerText} tracking-tight`}>What We Learn</h2>
            </div>
            <ul>
              {topic.whatWeLearns.map((point, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? accent.verseAltBg : ''} ${i < topic.whatWeLearns!.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                >
                  <span className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full ${accent.badgeBg} ${accent.badgeText} text-xs font-bold flex items-center justify-center`}>
                    {i + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bible Verses */}
        <div className={`mb-8 rounded-2xl border ${accent.sectionBorder} ${accent.sectionBg} overflow-hidden`}>
          <div className={`px-6 py-3.5 ${accent.headerBg} border-b ${accent.sectionBorder} flex items-center justify-between gap-4 flex-wrap`}>
            <h2 className={`text-base font-bold ${accent.headerText} flex items-center gap-2`}>
              <BookOpen className="w-5 h-5" />
              {topic.references.length === 5 && hasRichContent ? 'Five Key Bible Verses' : 'Biblical References'}
            </h2>
            {/* Translation selector */}
            <div className="relative">
              <button
                onClick={() => setTranslationOpen(o => !o)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-white dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-colors"
              >
                {TRANSLATION_LABELS[translation]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${translationOpen ? 'rotate-180' : ''}`} />
              </button>
              {translationOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setTranslationOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-30 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[140px]">
                    {(Object.keys(TRANSLATION_LABELS) as Translation[]).map(t => (
                      <button
                        key={t}
                        onClick={() => { setTranslation(t); setTranslationOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                          t === translation
                            ? `${accent.badgeBg} ${accent.badgeText}`
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        {TRANSLATION_LABELS[t]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3">
            {topic.references.map((ref, index) => {
              const verseReference = `${ref.book} ${ref.chapter}:${ref.verse}`;
              const fetchedText = verseTexts[index];
              const displayText = fetchedText ?? ref.text;
              return (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm ${index % 2 === 0 ? accent.verseAltBg : 'bg-white dark:bg-gray-900/40'}`}
                >
                  <div className={`px-5 py-2.5 ${accent.headerBg} flex items-center justify-between`}>
                    <h3 className={`font-bold ${accent.headerText} text-sm tracking-wide`}>
                      {verseReference}
                    </h3>
                    <span className={`text-xs font-semibold ${accent.translationText} ${accent.translationBg} px-2 py-0.5 rounded-full`}>
                      {TRANSLATION_LABELS[translation]}
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-[0.98rem]">
                      "{versesLoading && !fetchedText ? 'Loading…' : displayText}"
                    </p>
                    {ref.summary && (
                      <p className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {ref.summary}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Family Conversation */}
        {topic.familyConversation && (
          <div className={`mb-8 rounded-2xl border ${accent.convBorder} ${accent.convBg} overflow-hidden`}>
            <div className={`px-6 py-3.5 ${accent.headerBg} border-b ${accent.convBorder} flex items-center gap-2`}>
              <Users className={`w-5 h-5 ${accent.bookIcon}`} />
              <h2 className={`text-sm font-bold ${accent.convTitle} uppercase tracking-widest`}>
                Family Conversation
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {topic.familyConversation}
              </p>
            </div>
          </div>
        )}

        {/* Prayer */}
        {topic.prayer && (
          <div className={`mb-8 rounded-2xl border ${accent.sectionBorder} ${accent.sectionBg} overflow-hidden`}>
            <div className={`px-6 py-3.5 ${accent.headerBg} border-b ${accent.sectionBorder} flex items-center gap-2`}>
              <Sparkles className={`w-5 h-5 ${accent.bookIcon}`} />
              <h2 className={`text-sm font-bold ${accent.headerText} uppercase tracking-widest`}>
                Prayer
              </h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {topic.prayer.split('\n').filter(l => l.trim()).map((line, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    i === 0 || line.trim().startsWith('In ') || line.trim() === 'Amen.'
                      ? 'text-gray-500 dark:text-gray-400 text-sm'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

      </main>
    </>
  );
}

export function Topics() {
  const { topicId } = useParams();
  const selectedTopic = topicId ? topics.find(t => t.id === topicId) : null;

  if (selectedTopic) {
    return <TopicDetail topic={selectedTopic} />;
  }

  const featuredTopic = topics.find(t => t.id === 'grace');
  const regularTopics = topics.filter(t => t.id !== 'grace');

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Biblical Topics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore biblical guidance on various life topics with Bible references
          </p>
        </div>

        {featuredTopic && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-amber-300 dark:border-amber-700/50">
            <div
              className="relative px-8 py-10"
              style={{
                background: 'linear-gradient(135deg, #78350f 0%, #b45309 30%, #d97706 60%, #fbbf24 85%, #fde68a 100%)',
              }}
            >
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative z-10">
                <p className="text-amber-200 text-xs font-bold uppercase tracking-[0.2em] mb-2">Featured Topic</p>
                <h2 className="text-3xl font-bold text-white mb-2">{featuredTopic.title}</h2>
                {featuredTopic.subtitle && (
                  <p className="text-amber-200 text-sm mb-3">{featuredTopic.subtitle}</p>
                )}
                <p className="text-amber-100 leading-relaxed max-w-2xl text-base mb-6">
                  {featuredTopic.shortDescription}
                </p>
                <Link
                  to={`/topics/${featuredTopic.id}`}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/40 text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  Explore with Scripture
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularTopics.sort((a, b) => a.order - b.order).map((topic) => {
            const tileGradient = topic.heroGradient ?? TILE_GRADIENTS[topic.id] ?? DEFAULT_GRADIENT;
            const isUnlocked = !!topic.bodyContent;
            return (
              isUnlocked ? (
                <Link
                  key={topic.id}
                  to={`/topics/${topic.id}`}
                  className="block rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  <div
                    className="relative px-6 py-7 h-full flex flex-col"
                    style={{ background: tileGradient }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white mb-2 leading-snug">
                          {topic.title}
                        </h2>
                        {topic.subtitle && (
                          <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{topic.subtitle}</p>
                        )}
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                          {topic.shortDescription}
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/20">
                        <span className="inline-flex items-center gap-2 bg-white/20 group-hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 text-xs font-bold px-4 py-2 rounded-lg transition-all">
                          Explore
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  key={topic.id}
                  className="rounded-xl overflow-hidden shadow-md opacity-50 cursor-not-allowed grayscale"
                >
                  <div
                    className="relative px-6 py-7 h-full flex flex-col"
                    style={{ background: tileGradient }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-white/20">
                      <Lock className="w-2.5 h-2.5" />
                      Soon
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white mb-2 leading-snug">
                          {topic.title}
                        </h2>
                        {topic.subtitle && (
                          <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{topic.subtitle}</p>
                        )}
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                          {topic.shortDescription}
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/20">
                        <span className="inline-flex items-center gap-2 bg-black/30 text-white/50 border border-white/10 text-xs font-bold px-4 py-2 rounded-lg">
                          <Lock className="w-3 h-3" />
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>

        {/* Go Deeper bridge to course */}
        <div className="mt-16 theme-card rounded-2xl border-2 p-8 md:p-10 text-center">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Ready to Go Deeper?</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Start the Foundation Course
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto mb-8">
            These topics are just the beginning. The Foundation Course takes you through the essential truths of Scripture — from who God is and what He has done, to what it means to follow Jesus in everyday life.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 theme-primary-button rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Begin the Foundation Course
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </>
  );
}
