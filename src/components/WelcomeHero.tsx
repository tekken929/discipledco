import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowRight, Sparkles, LayoutGrid, AlignLeft, Quote } from 'lucide-react';

const LOGO_SRC = '/images/Untitled_design_(34)_Large.jpeg';

type HeroStyle = 'spotlight' | 'editorial' | 'glass';

const STYLE_LABELS: { id: HeroStyle; label: string; icon: typeof Sparkles }[] = [
  { id: 'spotlight', label: 'Spotlight', icon: Sparkles },
  { id: 'editorial', label: 'Editorial', icon: AlignLeft },
  { id: 'glass', label: 'Glass', icon: LayoutGrid },
];

function StylePicker({ value, onChange }: { value: HeroStyle; onChange: (s: HeroStyle) => void }) {
  return (
    <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg">
      {STYLE_LABELS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            value === id
              ? 'bg-white/90 text-gray-900 shadow'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

function AppDownloadCard() {
  return (
    <div className="hidden sm:flex absolute top-6 right-4 sm:right-6 lg:right-8 flex-col items-end gap-3 z-20">
      <a
        href="https://thediscipleco.org/app"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download The Disciple Co. App"
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl px-4 py-3 shadow-xl transition-all hover:scale-105"
      >
        <img src={LOGO_SRC} alt="The Disciple Co. App" className="w-12 h-12 rounded-xl object-cover shadow-md flex-shrink-0" />
        <div className="text-left">
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest leading-none mb-0.5">Download the App</p>
          <p className="text-white text-sm font-bold leading-tight">The Disciple Co.</p>
          <p className="text-white/60 text-xs">Available on the App Store</p>
        </div>
      </a>
    </div>
  );
}

/* ---------- Shared pieces ---------- */

function LogoBadge({ size = 'lg' }: { size?: 'lg' | 'md' | 'sm' }) {
  const dims = size === 'lg' ? 'w-36 h-36 md:w-44 md:h-44' : size === 'md' ? 'w-28 h-28 md:w-32 md:h-32' : 'w-20 h-20 md:w-24 md:h-24';
  const radius = size === 'sm' ? 'rounded-[1.5rem]' : 'rounded-[2rem]';
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[2.5rem] opacity-60 blur-2xl scale-110 bg-sky-400/50" />
      <img
        src={LOGO_SRC}
        alt="The Disciple Co."
        className={`relative ${dims} ${radius} object-cover shadow-2xl ring-1 ring-white/30`}
      />
    </div>
  );
}

/* ---------- 1. SPOTLIGHT ----------
   Large blurred logo glowing behind a centered, focused layout. */
function SpotlightHero() {
  return (
    <div className="relative text-center max-w-3xl mx-auto">
      {/* Blurred logo backdrop — broad, soft, sits behind everything */}
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-[90vw] max-w-[760px] h-[90vw] max-h-[760px] object-contain opacity-[0.12] blur-3xl select-none pointer-events-none"
      />
      {/* Radial spotlight glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[640px] h-[80vw] max-h-[640px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex justify-center mb-8">
        <LogoBadge size="lg" />
      </div>
      <div className="relative">
        <p className="text-amber-200/70 text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-4">Discipleship, Simplified</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight tracking-wide drop-shadow-2xl">
          The Disciple Co.
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-3 leading-relaxed font-light italic drop-shadow-lg">
          "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
        </p>
        <p className="text-sm text-white/60 mb-10 font-semibold tracking-wide">— Luke 9:23</p>

        <div className="flex justify-center">
          <Link
            to="/bible"
            className="group text-left bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-2xl px-6 py-5 hover:shadow-2xl transition-all hover:-translate-y-1 backdrop-blur-md max-w-2xl w-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Begin Your Journey</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 leading-snug">Start Here</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">Your guided entry point — browse all 66 books, understand the Bible's structure, and find where to begin.</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
              Bible Overview <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. EDITORIAL ----------
   Magazine-style: oversized left-aligned title, gold accent rule,
   pull-quote verse, small logo badge, underlined CTA. Clean and bold. */
function EditorialHero() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="flex flex-col gap-10 md:gap-14">
        {/* Top row: small logo badge + eyebrow */}
        <div className="flex items-center gap-4">
          <img
            src={LOGO_SRC}
            alt="The Disciple Co."
            className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] object-cover shadow-2xl ring-1 ring-white/30 flex-shrink-0"
          />
          <div>
            <p className="text-amber-200/70 text-xs md:text-sm font-bold uppercase tracking-[0.35em]">The Disciple Co.</p>
            <p className="text-white/50 text-xs md:text-sm font-medium tracking-wide mt-0.5">Discipleship, Simplified</p>
          </div>
        </div>

        {/* Oversized title with accent rule */}
        <div>
          <div className="w-16 h-1 bg-amber-300/80 rounded-full mb-6" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-[1.05] tracking-tight drop-shadow-2xl">
            Follow Him.<br />
            <span className="text-white/85">Daily.</span>
          </h1>
        </div>

        {/* Pull-quote verse */}
        <div className="flex items-start gap-4 max-w-2xl">
          <Quote className="w-8 h-8 text-amber-300/60 flex-shrink-0 mt-1" />
          <div>
            <p className="text-xl md:text-2xl text-white/85 leading-relaxed font-light italic drop-shadow-lg">
              "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
            </p>
            <p className="text-sm text-white/55 mt-3 font-semibold tracking-wide">— Luke 9:23</p>
          </div>
        </div>

        {/* Underlined CTA */}
        <div>
          <Link
            to="/bible"
            className="group inline-flex items-center gap-3 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center flex-shrink-0">
              <Map className="w-5 h-5 text-amber-300" />
            </div>
            <div className="border-b border-white/30 group-hover:border-amber-300 transition-colors pb-1">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest leading-none mb-1">Begin Your Journey</p>
              <p className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                Start Here — Bible Overview
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. GLASS ----------
   A centered frosted-glass card — like a premium app launch screen.
   Blurred logo glows softly behind the glass. */
function GlassHero() {
  return (
    <div className="relative flex justify-center">
      {/* Blurred logo glow behind the card */}
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[560px] h-[70vw] max-h-[560px] object-contain opacity-[0.10] blur-3xl select-none pointer-events-none"
      />

      <div className="relative w-full max-w-lg">
        <div className="relative rounded-[2rem] bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Top sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

          <div className="relative px-8 py-12 md:px-12 md:py-16 text-center">
            <div className="flex justify-center mb-8">
              <LogoBadge size="md" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-3 leading-tight tracking-wide drop-shadow-2xl">
              The Disciple Co.
            </h1>
            <p className="text-amber-200/70 text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-8">Discipleship, Simplified</p>

            <div className="flex justify-center mb-10">
              <div className="w-12 h-px bg-white/25" />
            </div>

            <p className="text-base md:text-lg text-white/80 mb-3 leading-relaxed font-light italic drop-shadow-lg">
              "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
            </p>
            <p className="text-sm text-white/55 mb-10 font-semibold tracking-wide">— Luke 9:23</p>

            <Link
              to="/bible"
              className="group inline-flex items-center justify-center gap-2 w-full bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/50 rounded-2xl px-6 py-4 hover:shadow-2xl transition-all hover:-translate-y-0.5 backdrop-blur-md"
            >
              <Map className="w-5 h-5 text-amber-300" />
              <span className="text-base font-bold text-white">Start Here</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-xs text-white/45 mt-4">Bible Overview — all 66 books, guided.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WelcomeHero() {
  const [heroStyle, setHeroStyle] = useState<HeroStyle>('spotlight');

  return (
    <>
      <StylePicker value={heroStyle} onChange={setHeroStyle} />
      <AppDownloadCard />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        {heroStyle === 'spotlight' && <SpotlightHero />}
        {heroStyle === 'editorial' && <EditorialHero />}
        {heroStyle === 'glass' && <GlassHero />}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 dark:from-gray-950 to-transparent pointer-events-none" />
    </>
  );
}
