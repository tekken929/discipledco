import { useState, useRef, useEffect, useCallback } from 'react';
import { Download, RefreshCw, Type, Image as ImageIcon, ChevronDown, Loader2, Check } from 'lucide-react';
import { ReturnToHome } from '../components/ReturnToHome';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Background {
  id: number;
  label: string;
  gradient: string;
  textColor: string;
  accentColor: string;
  overlayOpacity: number;
  pattern?: string;
}

const BACKGROUNDS: Background[] = [
  {
    id: 1,
    label: 'Heavenly Dawn',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f093fb 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(255,255,255,0.85)',
    overlayOpacity: 0.15,
  },
  {
    id: 2,
    label: 'Deep Waters',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    textColor: '#e0f2fe',
    accentColor: 'rgba(186,230,253,0.9)',
    overlayOpacity: 0.1,
  },
  {
    id: 3,
    label: 'Morning Glory',
    gradient: 'linear-gradient(160deg, #a8edea 0%, #fed6e3 100%)',
    textColor: '#1e3a5f',
    accentColor: 'rgba(30,58,95,0.8)',
    overlayOpacity: 0.05,
  },
  {
    id: 4,
    label: 'Sacred Fire',
    gradient: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(255,255,255,0.9)',
    overlayOpacity: 0.2,
  },
  {
    id: 5,
    label: 'Midnight Prayer',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    textColor: '#fbbf24',
    accentColor: 'rgba(251,191,36,0.9)',
    overlayOpacity: 0.05,
  },
  {
    id: 6,
    label: 'Olive Garden',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(255,255,255,0.85)',
    overlayOpacity: 0.1,
  },
  {
    id: 7,
    label: 'Holy Mountain',
    gradient: 'linear-gradient(160deg, #a1c4fd 0%, #c2e9fb 100%)',
    textColor: '#1e3a5f',
    accentColor: 'rgba(30,58,95,0.85)',
    overlayOpacity: 0.05,
  },
  {
    id: 8,
    label: 'Desert Sand',
    gradient: 'linear-gradient(135deg, #c9a96e 0%, #e8d5b7 50%, #c9a96e 100%)',
    textColor: '#3b2a1a',
    accentColor: 'rgba(59,42,26,0.85)',
    overlayOpacity: 0.1,
  },
  {
    id: 9,
    label: 'River of Life',
    gradient: 'linear-gradient(135deg, #006994 0%, #00a86b 50%, #50c878 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(255,255,255,0.9)',
    overlayOpacity: 0.15,
  },
  {
    id: 10,
    label: 'Crimson Cross',
    gradient: 'linear-gradient(135deg, #8b0000 0%, #c41e3a 50%, #8b0000 100%)',
    textColor: '#fff5f5',
    accentColor: 'rgba(255,245,245,0.9)',
    overlayOpacity: 0.15,
  },
  {
    id: 11,
    label: 'Cloud of Glory',
    gradient: 'linear-gradient(160deg, #ffffff 0%, #e8eaf6 30%, #c5cae9 100%)',
    textColor: '#283593',
    accentColor: 'rgba(40,53,147,0.85)',
    overlayOpacity: 0.0,
  },
  {
    id: 12,
    label: 'Burning Bush',
    gradient: 'linear-gradient(135deg, #e65c00 0%, #f9d423 100%)',
    textColor: '#1a0800',
    accentColor: 'rgba(26,8,0,0.85)',
    overlayOpacity: 0.1,
  },
  {
    id: 13,
    label: 'Still Waters',
    gradient: 'linear-gradient(135deg, #1c3f6e 0%, #3a7bd5 50%, #00d2ff 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(255,255,255,0.9)',
    overlayOpacity: 0.15,
  },
  {
    id: 14,
    label: 'Solomon Gold',
    gradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 50%, #ffd700 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(255,215,0,0.95)',
    overlayOpacity: 0.1,
  },
  {
    id: 15,
    label: 'Resurrection Dawn',
    gradient: 'linear-gradient(135deg, #4a0404 0%, #c0392b 30%, #f39c12 70%, #f9e79f 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(249,231,159,0.95)',
    overlayOpacity: 0.15,
  },
  {
    id: 16,
    label: 'Forest Chapel',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #2d5a27 50%, #4a7c59 100%)',
    textColor: '#d4edda',
    accentColor: 'rgba(212,237,218,0.9)',
    overlayOpacity: 0.1,
  },
  {
    id: 17,
    label: 'Stone Altar',
    gradient: 'linear-gradient(135deg, #3d3d3d 0%, #6b6b6b 50%, #9e9e9e 100%)',
    textColor: '#ffffff',
    accentColor: 'rgba(255,255,255,0.9)',
    overlayOpacity: 0.1,
  },
  {
    id: 18,
    label: 'Promised Land',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    textColor: '#1a3a0a',
    accentColor: 'rgba(26,58,10,0.85)',
    overlayOpacity: 0.05,
  },
  {
    id: 19,
    label: 'Sea of Glass',
    gradient: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 50%, #a8c0e0 100%)',
    textColor: '#1a2a4a',
    accentColor: 'rgba(26,42,74,0.85)',
    overlayOpacity: 0.0,
  },
  {
    id: 20,
    label: 'Ancient Parchment',
    gradient: 'linear-gradient(135deg, #f5e6c8 0%, #edddb4 50%, #d4b896 100%)',
    textColor: '#3d2b1f',
    accentColor: 'rgba(61,43,31,0.85)',
    overlayOpacity: 0.0,
  },
];

const FEATURED_VERSES = [
  { ref: 'John 3:16', text: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."' },
  { ref: 'Psalm 23:1', text: '"The Lord is my shepherd; I shall not want."' },
  { ref: 'Philippians 4:13', text: '"I can do all things through Christ who strengthens me."' },
  { ref: 'Jeremiah 29:11', text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."' },
  { ref: 'Romans 8:28', text: '"And we know that in all things God works for the good of those who love him, who have been called according to his purpose."' },
  { ref: 'Isaiah 40:31', text: '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary."' },
  { ref: 'Proverbs 3:5-6', text: '"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."' },
  { ref: 'Matthew 5:16', text: '"Let your light shine before others, that they may see your good deeds and glorify your Father in heaven."' },
];

const BOOKS_OT = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
];
const BOOKS_NT = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation',
];
const CHAPTER_COUNTS: Record<string, number> = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34, Joshua: 24, Judges: 21,
  Ruth: 4, '1 Samuel': 31, '2 Samuel': 24, '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29,
  '2 Chronicles': 36, Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31,
  Ecclesiastes: 12, 'Song of Solomon': 8, Isaiah: 66, Jeremiah: 52, Lamentations: 5, Ezekiel: 48,
  Daniel: 12, Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3,
  Habakkuk: 3, Zephaniah: 3, Haggai: 2, Zechariah: 14, Malachi: 4,
  Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28, Romans: 16, '1 Corinthians': 16,
  '2 Corinthians': 13, Galatians: 6, Ephesians: 6, Philippians: 4, Colossians: 4,
  '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4, Titus: 3,
  Philemon: 1, Hebrews: 13, James: 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5,
  '2 John': 1, '3 John': 1, Jude: 1, Revelation: 22,
};

type InputMode = 'type' | 'lookup';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';

const FONT_SIZE_MAP: Record<FontSize, { verse: number; ref: number; label: string }> = {
  sm: { verse: 22, ref: 16, label: 'Small' },
  md: { verse: 28, ref: 18, label: 'Medium' },
  lg: { verse: 34, ref: 21, label: 'Large' },
  xl: { verse: 40, ref: 24, label: 'X-Large' },
};

export function VerseOfTheDay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputMode, setInputMode] = useState<InputMode>('type');
  const [verseText, setVerseText] = useState(FEATURED_VERSES[0].text);
  const [verseRef, setVerseRef] = useState(FEATURED_VERSES[0].ref);
  const [selectedBg, setSelectedBg] = useState<Background>(BACKGROUNDS[0]);
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [downloaded, setDownloaded] = useState(false);

  // Lookup state
  const [lookupBook, setLookupBook] = useState('John');
  const [lookupChapter, setLookupChapter] = useState(3);
  const [lookupVerse, setLookupVerse] = useState(16);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [chapterVerseCount, setChapterVerseCount] = useState(36);

  const chapterCount = CHAPTER_COUNTS[lookupBook] || 1;

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    // Draw gradient background
    const gradientColors = parseGradient(selectedBg.gradient);
    if (gradientColors.length >= 2) {
      const grd = ctx.createLinearGradient(0, 0, W, H);
      gradientColors.forEach((color, i) => {
        grd.addColorStop(i / (gradientColors.length - 1), color.color);
      });
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, W, H);
    }

    // Subtle overlay for depth
    if (selectedBg.overlayOpacity > 0) {
      ctx.fillStyle = `rgba(0,0,0,${selectedBg.overlayOpacity})`;
      ctx.fillRect(0, 0, W, H);
    }

    // Decorative cross watermark
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = selectedBg.textColor;
    ctx.lineWidth = 60;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.08);
    ctx.lineTo(W / 2, H * 0.92);
    ctx.moveTo(W * 0.25, H * 0.3);
    ctx.lineTo(W * 0.75, H * 0.3);
    ctx.stroke();
    ctx.restore();

    // Top decorative line
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = selectedBg.accentColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W * 0.12, H * 0.12);
    ctx.lineTo(W * 0.88, H * 0.12);
    ctx.stroke();
    ctx.restore();

    // Bottom decorative line
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = selectedBg.accentColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W * 0.12, H * 0.88);
    ctx.lineTo(W * 0.88, H * 0.88);
    ctx.stroke();
    ctx.restore();

    const fs = FONT_SIZE_MAP[fontSize];
    const padding = 100;
    const textWidth = W - padding * 2;

    // Draw verse text
    ctx.fillStyle = selectedBg.textColor;
    ctx.textAlign = 'center';
    ctx.font = `italic ${fs.verse}px Georgia, serif`;
    ctx.globalAlpha = 1;

    const lines = wrapText(ctx, verseText, textWidth, fs.verse);
    const lineHeight = fs.verse * 1.55;
    const totalTextHeight = lines.length * lineHeight;

    const startY = (H - totalTextHeight - fs.ref * 2.5) / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, startY + i * lineHeight);
    });

    // Verse reference
    const refY = startY + totalTextHeight + fs.ref * 1.8;
    ctx.font = `600 ${fs.ref}px Inter, Arial, sans-serif`;
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = selectedBg.accentColor;
    ctx.fillText(`— ${verseRef}`, W / 2, refY);

    // Branding
    ctx.font = `500 14px Inter, Arial, sans-serif`;
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = selectedBg.textColor;
    ctx.fillText('thediscipleco.org', W / 2, H * 0.91);
  }, [selectedBg, verseText, verseRef, fontSize]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, size: number): string[] {
    ctx.font = `italic ${size}px Georgia, serif`;
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function parseGradient(gradient: string): { color: string }[] {
    const colorRegex = /#[0-9a-fA-F]{6}|rgba?\([^)]+\)/g;
    const matches = gradient.match(colorRegex) || [];
    return matches.map((c) => ({ color: c }));
  }

  async function handleLookup() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
    setLookupLoading(true);
    setLookupError('');
    try {
      const url = `${SUPABASE_URL}/functions/v1/fetch-verses?book=${encodeURIComponent(lookupBook)}&chapter=${lookupChapter}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` } });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const verses: { verse: number; text: string }[] = data.verses || [];
      setChapterVerseCount(verses.length);
      const target = verses.find((v) => v.verse === lookupVerse) || verses[0];
      if (target) {
        setVerseText(`"${target.text}"`);
        setVerseRef(`${lookupBook} ${lookupChapter}:${target.verse}`);
      }
    } catch {
      setLookupError('Could not load verse. Try another reference.');
    } finally {
      setLookupLoading(false);
    }
  }

  function handleFeatured(fv: typeof FEATURED_VERSES[0]) {
    setVerseText(fv.text);
    setVerseRef(fv.ref);
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `verse-${verseRef.replace(/\s+/g, '-').replace(/[:/]/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

  return (
    <>
      <ReturnToHome />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
              <ImageIcon className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Verse of the Day</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create a beautiful verse image for social media</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4 max-w-2xl">
            Pick a verse, choose a background, and download a 1080x1080 image perfect for Instagram, Facebook, or any social platform.
          </p>
        </div>

        <div className="grid xl:grid-cols-[420px_1fr] gap-8 items-start">
          {/* Left panel */}
          <div className="space-y-5">
            {/* Verse Input */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Verse Text</h2>

              {/* Mode toggle */}
              <div className="flex rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
                <button
                  onClick={() => setInputMode('type')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
                    inputMode === 'type'
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  Type
                </button>
                <button
                  onClick={() => setInputMode('lookup')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
                    inputMode === 'lookup'
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Lookup
                </button>
              </div>

              {inputMode === 'type' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Verse Text</label>
                    <textarea
                      value={verseText}
                      onChange={(e) => setVerseText(e.target.value)}
                      rows={4}
                      placeholder="Type your verse here..."
                      className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Reference</label>
                    <input
                      type="text"
                      value={verseRef}
                      onChange={(e) => setVerseRef(e.target.value)}
                      placeholder="e.g. John 3:16"
                      className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {inputMode === 'lookup' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Book</label>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-1">Old Testament</p>
                        <div className="relative">
                          <select
                            value={BOOKS_OT.includes(lookupBook) ? lookupBook : ''}
                            onChange={(e) => { if (e.target.value) { setLookupBook(e.target.value); setLookupChapter(1); setLookupVerse(1); } }}
                            className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            {!BOOKS_OT.includes(lookupBook) && <option value="">-- Select --</option>}
                            {BOOKS_OT.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">New Testament</p>
                        <div className="relative">
                          <select
                            value={BOOKS_NT.includes(lookupBook) ? lookupBook : ''}
                            onChange={(e) => { if (e.target.value) { setLookupBook(e.target.value); setLookupChapter(1); setLookupVerse(1); } }}
                            className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            {!BOOKS_NT.includes(lookupBook) && <option value="">-- Select --</option>}
                            {BOOKS_NT.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Chapter</label>
                      <div className="relative">
                        <select
                          value={lookupChapter}
                          onChange={(e) => { setLookupChapter(Number(e.target.value)); setLookupVerse(1); }}
                          className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {Array.from({ length: chapterCount }, (_, i) => i + 1).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Verse</label>
                      <div className="relative">
                        <select
                          value={lookupVerse}
                          onChange={(e) => setLookupVerse(Number(e.target.value))}
                          className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {Array.from({ length: chapterVerseCount }, (_, i) => i + 1).map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {lookupError && (
                    <p className="text-xs text-red-500 dark:text-red-400">{lookupError}</p>
                  )}

                  <button
                    onClick={handleLookup}
                    disabled={lookupLoading}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
                  >
                    {lookupLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Load Verse
                  </button>
                </div>
              )}
            </div>

            {/* Featured Verses */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Featured Verses</h2>
              <div className="space-y-1.5">
                {FEATURED_VERSES.map((fv) => (
                  <button
                    key={fv.ref}
                    onClick={() => handleFeatured(fv)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      verseRef === fv.ref
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {fv.ref}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Text Size</h2>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(FONT_SIZE_MAP) as FontSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                      fontSize === s
                        ? 'bg-amber-500 text-white'
                        : 'theme-card border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {FONT_SIZE_MAP[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Canvas Preview */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Preview</h2>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">1080 × 1080 px</span>
              </div>
              <div className="p-4">
                <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '1/1' }}>
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>
            </div>

            {/* Background Picker */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Choose Background</h2>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBg(bg)}
                    title={bg.label}
                    className={`group relative aspect-square rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-lg ${
                      selectedBg.id === bg.id
                        ? 'ring-3 ring-offset-2 ring-amber-500 scale-105 shadow-lg'
                        : 'ring-1 ring-gray-200 dark:ring-gray-600'
                    }`}
                    style={{ background: bg.gradient }}
                  >
                    {selectedBg.id === bg.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow">
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-[9px] font-semibold text-center leading-tight truncate">{bg.label}</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">{selectedBg.label}</p>
            </div>

            {/* Download */}
            <button
              onClick={handleDownload}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] ${
                downloaded
                  ? 'bg-green-500 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="w-5 h-5" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Image
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
