import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  BookMarked,
  Heart,
  Compass,
  ScrollText,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { useHeroTheme } from '../context/HeroThemeContext';
import { DawnBackground, SanctuaryBackground, AuroraBackground, ForestBackground, EmberBackground, FrostBackground } from './WelcomeHero';

const LOGO_SRC = '/images/Untitled_design_(34)_Large.jpeg';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { heroTheme } = useHeroTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const features = [
    { icon: BookOpen, title: 'Complete Bible', desc: 'Read any chapter from any book — KJV, ESV, NASB, NLT & NIV', to: '/bible-lookup' },
    { icon: BookMarked, title: 'Daily Devotionals', desc: '5-minute study devotionals for your day', to: '/devotionals' },
    { icon: Compass, title: 'Bible Roadmap', desc: 'Where to start, what to read next, and why order matters', to: '/bible' },
    { icon: Heart, title: 'Verses for Sadness', desc: 'Comfort and hope from God\u2019s Word for the hard seasons', to: '/verses-on-sadness' },
    { icon: ScrollText, title: 'Foundation Course', desc: 'A guided discipleship path covering what the Bible is', to: '/courses' },
    { icon: Sparkles, title: 'Religions Explained', desc: 'How Christianity developed and how denominations emerged', to: '/religions' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated theme background */}
      <div className="absolute inset-0 z-0">
        {heroTheme === 'dawn' && <DawnBackground />}
        {heroTheme === 'sanctuary' && <SanctuaryBackground />}
        {heroTheme === 'aurora' && <AuroraBackground />}
        {heroTheme === 'forest' && <ForestBackground />}
        {heroTheme === 'ember' && <EmberBackground />}
        {heroTheme === 'frost' && <FrostBackground />}
      </div>

      {/* Dark mode toggle — top right */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-5 right-5 z-50 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full px-4 py-2 shadow-lg transition-all"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-4 h-4 text-white/80" /> : <Moon className="w-4 h-4 text-white/80" />}
        <span className="text-xs font-bold text-white/80">{darkMode ? 'Light' : 'Dark'}</span>
      </button>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div
          className={`transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-[2rem] opacity-60 blur-3xl scale-110 bg-sky-400/40" />
            <img
              src={LOGO_SRC}
              alt="The Disciple Company"
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-2xl ring-1 ring-white/30"
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white mb-3 leading-tight tracking-wide drop-shadow-2xl transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          The Disciple Company
        </h1>

        <p
          className={`text-amber-200/80 text-xs sm:text-sm font-bold uppercase tracking-[0.35em] mb-6 transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Discipleship, Simplified
        </p>

        {/* Scripture */}
        <div
          className={`max-w-2xl transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative rounded-2xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-2xl px-6 py-7 sm:px-10 sm:py-8 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
            <p className="relative text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-light italic drop-shadow-lg mb-2">
              &ldquo;Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me.&rdquo;
            </p>
            <p className="relative text-sm text-white/55 font-semibold tracking-wide">&mdash; Luke 9:23</p>
          </div>
        </div>

        {/* Enter button */}
        <div
          className={`mt-10 transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={onEnter}
            className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/50 rounded-full pl-7 pr-5 py-4 shadow-2xl transition-all hover:scale-105"
          >
            <span className="text-white font-bold text-base sm:text-lg tracking-wide">Enter</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 group-hover:bg-white/25 transition-all">
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className={`mt-16 transition-opacity duration-1000 delay-1000 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest animate-pulse">Scroll to explore</p>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-3 drop-shadow-lg">
              Everything you need, now.
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
              Bible studies, devotionals, discipleship tools, prayer resources, and more &mdash; all in one place, always free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/15 hover:border-white/30 hover:bg-white/[0.12] shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <div className="relative flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                      <Icon className="w-6 h-6 text-white/90" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-white mb-1.5">{feature.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-2xl px-8 py-12 sm:px-14 sm:py-16 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4 drop-shadow-lg">
                Begin your journey today.
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                Not religion for its own sake &mdash; a path toward truth. Explore the Bible, understand the context, and apply it to your daily life.
              </p>

              <button
                onClick={onEnter}
                className="group inline-flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 hover:border-white/50 rounded-full pl-8 pr-6 py-4 shadow-xl transition-all hover:scale-105"
              >
                <span className="text-white font-bold text-base sm:text-lg tracking-wide">Get Started</span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 group-hover:bg-white/30 transition-all">
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-sm">
                  Always free. Always ad-free. Truth, shared freely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="The Disciple Company" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-white/60 text-sm font-semibold">The Disciple Company</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://thedisciplecompany.org" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">
              Download App
            </a>
            <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors" onClick={onEnter}>
              Privacy Policy
            </Link>
            <a
              href="https://www.patreon.com/cw/Disciple929/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
