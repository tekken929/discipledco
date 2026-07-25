import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowRight, Sparkles, LayoutGrid, AlignLeft } from 'lucide-react';

const LOGO_SRC = '/images/Untitled_design_(34)_Large.jpeg';

type HeroStyle = 'centered' | 'split' | 'inline';

const STYLE_LABELS: { id: HeroStyle; label: string; icon: typeof Sparkles }[] = [
  { id: 'centered', label: 'Centered', icon: Sparkles },
  { id: 'split', label: 'Showcase', icon: LayoutGrid },
  { id: 'inline', label: 'Inline', icon: AlignLeft },
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

function BackgroundLogo() {
  return (
    <>
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-none h-[120vw] max-h-[120vw] object-contain opacity-[0.10] blur-3xl select-none pointer-events-none"
      />
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[640px] h-[60vw] max-h-[640px] object-contain opacity-[0.07] blur-2xl select-none pointer-events-none"
      />
    </>
  );
}

function LogoBadge({ size = 'lg' }: { size?: 'lg' | 'md' | 'sm' }) {
  const dims = size === 'lg' ? 'w-40 h-40 md:w-48 md:h-48' : size === 'md' ? 'w-32 h-32 md:w-36 md:h-36' : 'w-20 h-20 md:w-24 md:h-24';
  const radius = size === 'sm' ? 'rounded-[1.5rem]' : 'rounded-[2rem]';
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[2.5rem] opacity-50 blur-2xl scale-110 bg-sky-400/60" />
      <img
        src={LOGO_SRC}
        alt="The Disciple Co."
        className={`relative ${dims} ${radius} object-cover shadow-2xl ring-1 ring-white/30`}
      />
    </div>
  );
}

function Verse() {
  return (
    <div className="mb-10">
      <p className="text-lg md:text-xl text-white/80 mb-3 leading-relaxed font-light italic drop-shadow-lg">
        "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
      </p>
      <p className="text-sm text-white/60 font-semibold tracking-wide">— Luke 9:23</p>
    </div>
  );
}

function StartHereCard() {
  return (
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
  );
}

function CenteredHero() {
  return (
    <div className="relative text-center max-w-3xl mx-auto">
      <div className="flex justify-center mb-8">
        <LogoBadge size="lg" />
      </div>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight tracking-wide drop-shadow-2xl">
        The Disciple Co.
      </h1>
      <Verse />
      <StartHereCard />
    </div>
  );
}

function SplitHero() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
        <div className="flex-shrink-0">
          <LogoBadge size="md" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-4 leading-tight tracking-wide drop-shadow-2xl">
            The Disciple Co.
          </h1>
          <Verse />
          <div className="flex md:justify-start justify-center">
            <Link
              to="/bible"
              className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-2xl px-5 py-4 hover:shadow-2xl transition-all hover:-translate-y-1 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest leading-none mb-1">Begin Your Journey</p>
                <p className="text-base font-bold text-white leading-tight">Start Here</p>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineHero() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-5 md:gap-6">
          <LogoBadge size="sm" />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight tracking-wide drop-shadow-2xl">
              The Disciple Co.
            </h1>
            <p className="text-sm md:text-base text-amber-200/80 font-semibold tracking-widest uppercase mt-1">Discipleship, Simplified</p>
          </div>
        </div>
        <Verse />
        <StartHereCard />
      </div>
    </div>
  );
}

export function WelcomeHero() {
  const [heroStyle, setHeroStyle] = useState<HeroStyle>('centered');

  return (
    <>
      <BackgroundLogo />
      <StylePicker value={heroStyle} onChange={setHeroStyle} />
      <AppDownloadCard />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        {heroStyle === 'centered' && <CenteredHero />}
        {heroStyle === 'split' && <SplitHero />}
        {heroStyle === 'inline' && <InlineHero />}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 dark:from-gray-950 to-transparent pointer-events-none" />
    </>
  );
}
