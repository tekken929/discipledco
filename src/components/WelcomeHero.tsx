import { Link } from 'react-router-dom';
import { Map, ArrowRight, Sunrise, Flame, Waves } from 'lucide-react';
import { useHeroTheme, type HeroTheme } from '../context/HeroThemeContext';

const LOGO_SRC = '/images/Untitled_design_(34)_Large.jpeg';

const BG_LABELS: { id: HeroTheme; label: string; icon: typeof Sunrise }[] = [
  { id: 'dawn', label: 'Dawn', icon: Sunrise },
  { id: 'sanctuary', label: 'Sanctuary', icon: Flame },
  { id: 'aurora', label: 'Aurora', icon: Waves },
];

function BackgroundPicker({ value, onChange }: { value: HeroTheme; onChange: (b: HeroTheme) => void }) {
  return (
    <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg">
      {BG_LABELS.map(({ id, label, icon: Icon }) => (
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
        aria-label="Download The Disciple Company App"
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl px-4 py-3 shadow-xl transition-all hover:scale-105"
      >
        <img src={LOGO_SRC} alt="The Disciple Company App" className="w-12 h-12 rounded-xl object-cover shadow-md flex-shrink-0" />
        <div className="text-left">
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest leading-none mb-0.5">Download the App</p>
          <p className="text-white text-sm font-bold leading-tight">The Disciple Company</p>
          <p className="text-white/60 text-xs">Available on the App Store</p>
        </div>
      </a>
    </div>
  );
}

/* ---------- Backgrounds ---------- */

function DawnBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f3a] via-[#3d2f4a] to-[#c97b4a]" />
      <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[120vw] h-[60vh] rounded-[100%] bg-gradient-to-t from-amber-300/70 via-orange-400/30 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(255,200,120,0.35),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-900/30 to-transparent blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_40%,rgba(10,10,30,0.5))]" />
    </div>
  );
}

function SanctuaryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1810] via-[#3d2415] to-[#1a0f08]" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[60vw] h-full bg-gradient-to-b from-amber-300/25 via-amber-400/10 to-transparent blur-2xl" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-200/40 to-transparent" style={{ transform: 'translateX(-50%) rotate(8deg)', transformOrigin: 'top' }} />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-200/30 to-transparent" style={{ transform: 'translateX(-50%) rotate(-8deg)', transformOrigin: 'top' }} />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-200/20 to-transparent" style={{ transform: 'translateX(-50%) rotate(16deg)', transformOrigin: 'top' }} />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-200/20 to-transparent" style={{ transform: 'translateX(-50%) rotate(-16deg)', transformOrigin: 'top' }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full bg-amber-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_35%,rgba(10,5,2,0.7))]" />
    </div>
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020a18] via-[#04142a] to-[#01060f]" />
      <div className="absolute -top-1/4 left-[-10%] w-[120%] h-[70%] bg-[radial-gradient(ellipse_60%_40%_at_30%_40%,rgba(45,212,191,0.30),transparent)] blur-3xl" />
      <div className="absolute top-0 left-[-5%] w-[120%] h-[70%] bg-[radial-gradient(ellipse_50%_35%_at_70%_35%,rgba(59,130,246,0.28),transparent)] blur-3xl" />
      <div className="absolute top-1/4 left-[10%] w-[100%] h-[60%] bg-[radial-gradient(ellipse_45%_30%_at_50%_50%,rgba(16,185,129,0.22),transparent)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15)_0.5px,transparent_1px),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12)_0.5px,transparent_1px),radial-gradient(circle_at_60%_70%,rgba(255,255,255,0.10)_0.5px,transparent_1px),radial-gradient(circle_at_35%_80%,rgba(255,255,255,0.10)_0.5px,transparent_1px)] bg-[length:200px_200px,250px_250px,180px_180px,220px_220px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(0,0,0,0.6))]" />
    </div>
  );
}

/* ---------- Glass hero ---------- */

function LogoBadge() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[2.5rem] opacity-60 blur-2xl scale-110 bg-sky-400/50" />
      <img
        src={LOGO_SRC}
        alt="The Disciple Company"
        className="relative w-28 h-28 md:w-32 md:h-32 rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/30"
      />
    </div>
  );
}

function GlassHero() {
  return (
    <div className="relative flex justify-center">
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[560px] h-[70vw] max-h-[560px] object-contain opacity-[0.10] blur-3xl select-none pointer-events-none"
      />

      <div className="relative w-full max-w-lg">
        <div className="relative rounded-[2rem] bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

          <div className="relative px-8 py-10 md:px-12 md:py-14 text-center">
            <div className="flex justify-center mb-6">
              <LogoBadge />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-3 leading-tight tracking-wide drop-shadow-2xl">
              The Disciple Company
            </h1>
            <p className="text-amber-200/70 text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-6">Discipleship, Simplified</p>

            <div className="flex justify-center mb-8">
              <div className="w-12 h-px bg-white/25" />
            </div>

            <p className="text-base md:text-lg text-white/80 mb-3 leading-relaxed font-light italic drop-shadow-lg">
              "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
            </p>
            <p className="text-sm text-white/55 mb-8 font-semibold tracking-wide">— Luke 9:23</p>

            <Link
              to="/bible"
              className="group inline-flex items-center justify-center gap-2 w-full bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/50 rounded-2xl px-6 py-4 hover:shadow-2xl transition-all hover:-translate-y-0.5 backdrop-blur-md"
            >
              <Map className="w-5 h-5 text-amber-300" />
              <span className="text-base font-bold text-white">Start Here</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-xs text-white/45 mt-3">Bible Overview — all 66 books, guided.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WelcomeHero() {
  const { heroTheme, setHeroTheme } = useHeroTheme();

  return (
    <>
      {heroTheme === 'dawn' && <DawnBackground />}
      {heroTheme === 'sanctuary' && <SanctuaryBackground />}
      {heroTheme === 'aurora' && <AuroraBackground />}

      <BackgroundPicker value={heroTheme} onChange={setHeroTheme} />
      <AppDownloadCard />

      {/* Moved up: top padding aligns with the download card top */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-16 md:pb-20">
        <GlassHero />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 dark:from-gray-950 to-transparent pointer-events-none" />
    </>
  );
}
