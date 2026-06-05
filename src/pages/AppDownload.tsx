import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Star, Users, CheckCircle, ArrowRight,
  BookMarked, Sun, Target, Heart, Zap, Globe
} from 'lucide-react';

// ============================================================
// APP CONFIG — Edit app name, taglines, and store link here
// ============================================================
const APP_CONFIG = {
  name: 'The Disciple Co.',
  tagline: 'A simple path to deeper faith.',
  subtitle: 'Grow closer to God every day with Bible studies, prayer tools, Scripture reading plans, and discipleship resources designed for real life.',
  appStoreLink: '#', // TODO: Replace with your App Store URL
  version: '1.0',
  copyright: 'RYAN COLBY. 2026',
  supportUrl: 'https://thediscipleco.org',
};

// ============================================================
// SCREENSHOTS — Edit screenshot paths and captions here
// ============================================================
const SCREENSHOTS = [
  {
    src: '/images/Screenshot_2026-06-04_at_09.28.01.png',
    caption: 'Home Screen',
    description: 'Daily verse, challenges, and quick access to Bible & Prayer',
  },
  {
    src: '/images/Screenshot_2026-06-04_at_09.29.32.png',
    caption: 'Bible Reading',
    description: 'Clean, verse-by-verse reading with multiple translations',
  },
  {
    src: '/images/Screenshot_2026-06-04_at_09.28.54.png',
    caption: '30-Day Challenge',
    description: 'Structured reading plans with daily study guides',
  },
];

// ============================================================
// FEATURES — Edit feature cards here
// ============================================================
const FEATURES = [
  {
    icon: BookOpen,
    title: 'Bible App & Studies',
    description: 'Explore guided studies designed to help you understand Scripture in its historical context while discovering how it applies to your daily life.',
    color: 'blue',
  },
  {
    icon: BookMarked,
    title: 'Reading Plans',
    description: 'Follow structured Bible reading plans that help you stay consistent and develop a deeper understanding of God\'s Word.',
    color: 'amber',
  },
  {
    icon: Target,
    title: 'Biblical Foundations',
    description: 'Study core Christian doctrines, biblical themes, and foundational truths in an easy-to-understand format.',
    color: 'emerald',
  },
  {
    icon: Sun,
    title: 'Daily Encouragement',
    description: 'Receive Scripture, devotionals, and biblical wisdom designed to keep your focus on Christ throughout the day.',
    color: 'orange',
  },
];

// ============================================================
// AUDIENCE — Edit the "Perfect For" bullets here
// ============================================================
const AUDIENCE = [
  { icon: Star, label: 'New believers' },
  { icon: BookOpen, label: 'Mature Christians seeking deeper study' },
  { icon: Heart, label: 'Families and homeschoolers' },
  { icon: Users, label: 'Small groups and discipleship groups' },
  { icon: Sun, label: 'Daily devotion and prayer routines' },
  { icon: Globe, label: 'Anyone wanting to grow closer to God' },
];

// ============================================================
// RATINGS — Edit social proof numbers here
// ============================================================
const STATS = [
  { value: '66', label: 'Bible Books' },
  { value: '31K+', label: 'KJV Verses' },
  { value: '30', label: 'Day Challenge' },
  { value: '100%', label: 'Free' },
];

const featureColorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/30', icon: 'text-blue-600 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-900/50' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/30', icon: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-900/50' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', icon: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-900/50' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', icon: 'text-orange-600 dark:text-orange-400', border: 'border-orange-100 dark:border-orange-900/50' },
};

// App Store SVG badge component
function AppStoreBadge({ href, className = '' }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] font-medium text-white/70 leading-none mb-0.5">Download on the</p>
        <p className="text-base font-bold leading-none">App Store</p>
      </div>
    </a>
  );
}

export function AppDownload() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">

      {/* ============================================================
          MINIMAL HEADER — Edit nav items here
          ============================================================ */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/images/Untitled_design_(34)_Large.jpeg"
              alt="The Disciple Co."
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-bold text-gray-900 dark:text-white text-sm hidden sm:block">The Disciple Co.</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Website
            </Link>
            <a
              href={APP_CONFIG.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================
          HERO SECTION — Edit headline, subheadline, and CTA
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              {/* App icon + name */}
              <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <img
                  src="/images/Untitled_design_(34)_Large.jpeg"
                  alt="The Disciple Co. App"
                  className="w-20 h-20 rounded-[22px] shadow-2xl ring-2 ring-white/10 object-cover flex-shrink-0"
                />
                <div className="text-left">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">iOS App</p>
                  <h1 className="text-2xl font-bold text-white leading-tight">The Disciple Co.</h1>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-white/40 text-xs ml-1">Available on iOS</span>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                {APP_CONFIG.tagline}
              </h2>

              <p className="text-lg text-white/65 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {APP_CONFIG.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <AppStoreBadge href={APP_CONFIG.appStoreLink} className="text-base" />
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  See Features
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 mt-8 justify-center lg:justify-start">
                <span className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  100% Free
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  No Ads
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  No Account Required
                </span>
              </div>
            </div>

            {/* Right: Phone mockup with screenshots */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone frame */}
                <div className="relative w-[260px] mx-auto">
                  {/* Phone shell */}
                  <div className="relative rounded-[40px] overflow-hidden shadow-2xl ring-4 ring-white/10 bg-gray-900">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                    {/* Screenshot */}
                    <img
                      src={SCREENSHOTS[activeScreenshot].src}
                      alt={SCREENSHOTS[activeScreenshot].caption}
                      className="w-full h-[520px] object-cover object-top"
                    />
                    {/* Bottom bar */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                  </div>

                  {/* Screenshot thumbnail selector */}
                  <div className="flex justify-center gap-2 mt-5">
                    {SCREENSHOTS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenshot(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeScreenshot === i ? 'bg-amber-400 w-5' : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={s.caption}
                      />
                    ))}
                  </div>
                  <p className="text-center text-white/40 text-xs mt-2 font-medium">
                    {SCREENSHOTS[activeScreenshot].caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS BAR — Edit numbers here
          ============================================================ */}
      <section className="bg-amber-50 dark:bg-amber-950/20 border-y border-amber-100 dark:border-amber-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SCREENSHOTS SHOWCASE — Edit screenshot grid here
          ============================================================ */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">The App</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need, in your pocket.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              Designed for real daily use — clean, fast, and Scripture-centered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-end">
            {SCREENSHOTS.map((shot, i) => (
              <div
                key={i}
                className={`flex flex-col items-center ${i === 1 ? 'md:-translate-y-6' : ''}`}
              >
                {/* Phone frame */}
                <div className="relative w-full max-w-[220px] mx-auto">
                  <div className="rounded-[32px] overflow-hidden shadow-2xl ring-4 ring-gray-900/10 dark:ring-white/10 bg-gray-900">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-10" />
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="w-full h-[440px] object-cover object-top"
                    />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/25 rounded-full" />
                  </div>
                </div>
                <div className="text-center mt-5">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{shot.caption}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[180px] leading-relaxed">{shot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURES SECTION — Edit feature cards in FEATURES array above
          ============================================================ */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-3">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tools for every part of your walk.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              Not just a Bible app. A complete discipleship companion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const colors = featureColorMap[feature.color];
              return (
                <div
                  key={feature.title}
                  className={`${colors.bg} border ${colors.border} rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow`}
                >
                  <div className={`w-11 h-11 rounded-xl bg-white dark:bg-gray-900/50 flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          DIFFERENTIATOR SECTION — Edit the key message here
          ============================================================ */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-8 h-8 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            What Makes Disciple Co. Different?
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-xl md:text-2xl font-semibold text-white/90 leading-relaxed mb-6">
              Disciple Co. is built on a simple belief:
            </p>
            <p className="text-2xl md:text-3xl font-bold text-amber-400 leading-snug">
              The Bible is not just meant to be read. It is meant to be understood, believed, and lived.
            </p>
          </div>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Rather than focusing on trends, opinions, or endless content, Disciple Co. focuses on helping believers engage directly with Scripture and develop a stronger foundation in God's Word.
          </p>
        </div>
      </section>

      {/* ============================================================
          PERFECT FOR SECTION — Edit audience list in AUDIENCE array
          ============================================================ */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-3">Who It's For</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Perfect for anyone on the journey.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
                Whether you are brand new to the Bible or have been studying Scripture for years, Disciple provides practical tools to help you grow in your relationship with God.
              </p>
              <AppStoreBadge href={APP_CONFIG.appStoreLink} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AUDIENCE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-snug">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MISSION SECTION — Edit mission statement here
          ============================================================ */}
      <section className="py-20 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-100 dark:border-amber-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-10 h-10 text-amber-600 dark:text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Jesus commanded His followers to make disciples. Disciple Co. exists to help believers grow in faith, deepen their understanding of Scripture, strengthen their prayer life, and become lifelong followers of Christ.
          </p>
          <blockquote className="border-l-4 border-amber-400 pl-6 text-left max-w-xl mx-auto">
            <p className="text-xl font-semibold text-gray-900 dark:text-white italic leading-relaxed mb-2">
              "Your word is a lamp unto my feet, and a light unto my path."
            </p>
            <cite className="text-amber-600 dark:text-amber-400 font-bold text-sm not-italic">— Psalm 119:105</cite>
          </blockquote>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA SECTION — Edit final call-to-action here
          ============================================================ */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="/images/Untitled_design_(34)_Large.jpeg"
            alt="The Disciple Co."
            className="w-24 h-24 rounded-[24px] object-cover shadow-2xl ring-2 ring-white/10 mx-auto mb-8"
          />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Begin building a stronger foundation in God's Word.
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Download Disciple Co. today — one day at a time.
          </p>
          <AppStoreBadge href={APP_CONFIG.appStoreLink} className="text-base mx-auto" />
          <p className="text-white/30 text-xs mt-6">
            Free · iOS · Version {APP_CONFIG.version} · {APP_CONFIG.copyright}
          </p>
        </div>
      </section>

      {/* ============================================================
          FOOTER — Edit footer links here
          ============================================================ */}
      <footer className="bg-gray-950 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © {APP_CONFIG.copyright} ·{' '}
            <a href={APP_CONFIG.supportUrl} className="hover:text-gray-400 transition-colors">{APP_CONFIG.supportUrl}</a>
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Website</Link>
            <a href={APP_CONFIG.supportUrl} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Support</a>
            <a href={APP_CONFIG.appStoreLink} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">App Store</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
