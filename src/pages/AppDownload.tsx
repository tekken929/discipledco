import { Link } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight, BookOpen, BookMarked, Heart, Zap, Users, Target, Sun } from 'lucide-react';

const APP_CONFIG = {
  name: 'The Disciple Co.',
  appStoreLink: '#',
  googlePlayLink: '#',
  version: '1.0',
  copyright: 'RYAN COLBY. 2026',
  supportUrl: 'https://thediscipleco.org',
};

const OTHER_APPS = [
  {
    id: 'discipleco',
    name: 'The Disciple Co.',
    tagline: 'Bible · Discipleship · Prayer',
    icon: '/images/Untitled_design_(34)_Large.jpeg',
    href: null,
    active: true,
  },
  {
    id: 'gbj',
    name: 'The Great Bible Journey',
    tagline: 'Bible Adventures for Kids',
    icon: '/images/iconbj.png',
    href: 'https://thegreatbiblejourney.com',
    active: false,
  },
];

const FEATURES = [
  {
    src: '/images/dcad1.png',
    headline: 'Learn the Bible With Confidence',
    sub: 'Verse by verse studies, theology, and biblical truth.',
    body: 'Start from the beginning or dive into any book. Guided studies break down each passage in plain language so you understand what you are reading, why it matters, and how it connects to the rest of Scripture.',
    accent: 'text-amber-600 dark:text-amber-400',
    badge: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40',
    label: 'Bible Studies',
  },
  {
    src: '/images/dcad2.png',
    headline: 'Explore Biblical History in Context',
    sub: 'Understand key events and the people who shaped Scripture.',
    body: 'From Moses and the Exodus to Paul and the early church — explore who wrote the Bible, when, and why. Detailed author profiles and historical context you will not find in a standard Bible app.',
    accent: 'text-blue-600 dark:text-blue-400',
    badge: 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40',
    label: 'Bible History',
  },
  {
    src: '/images/dcad3.png',
    headline: 'Follow Scripture Verse by Verse',
    sub: 'Read in your preferred translation with powerful tools built in.',
    body: 'ESV, KJV, NIV, and more — switch translations instantly. Clean verse-by-verse reading with chapter navigation, favorites, search, and customizable themes designed for extended reading sessions.',
    accent: 'text-teal-600 dark:text-teal-400',
    badge: 'text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/40',
    label: 'Scripture Reading',
  },
  {
    src: '/images/dcad4.png',
    headline: 'Study, Reflect, And Grow',
    sub: 'Daily studies designed to help you apply God\'s Word to your life.',
    body: 'The 30-Day Challenge takes you through the Gospel of John one day at a time. Each day includes a passage, context, and reflection questions designed to move Scripture from your head to your heart.',
    accent: 'text-emerald-600 dark:text-emerald-400',
    badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40',
    label: '30-Day Challenge',
  },
  {
    src: '/images/dcad5.png',
    headline: 'Grow Closer To Christ',
    sub: 'Turn knowledge into daily discipleship.',
    body: 'From Creation to modern day — a complete Biblical timeline, prayer tools, and a growing library of discipleship resources. Everything in one place, built to help you live what you believe.',
    accent: 'text-stone-600 dark:text-stone-400',
    badge: 'text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/40',
    label: 'Discipleship',
  },
];

const STATS = [
  { value: '66', label: 'Bible Books' },
  { value: '31K+', label: 'KJV Verses' },
  { value: '30', label: 'Day Challenge' },
  { value: '100%', label: 'Free' },
];

const AUDIENCE = [
  { icon: Star, label: 'New believers starting their journey' },
  { icon: BookOpen, label: 'Mature Christians seeking deeper study' },
  { icon: Heart, label: 'Families and homeschoolers' },
  { icon: Users, label: 'Small groups and discipleship teams' },
  { icon: Target, label: 'Daily devotion and prayer routines' },
  { icon: Sun, label: 'Anyone wanting to grow closer to God' },
];

function AppStoreBadge({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl">
      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] font-medium text-white/70 leading-none mb-0.5">Download on the</p>
        <p className="text-base font-bold leading-none">App Store</p>
      </div>
    </a>
  );
}

function GooglePlayBadge({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl">
      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.18 23.76c.38.21.82.22 1.24 0L14.69 12 4.42.24c-.42-.22-.86-.2-1.24 0C2.55.59 2.25 1.19 2.25 2v19.76c0 .81.3 1.41.93 1.76zM16.34 13.65l2.54-2.54-2.54-2.54-2.54 2.54 2.54 2.54zM5.17 21.96L14.04 13l-8.87-8.96v17.92zM21.05 10.5l-2.32-1.35-2.82 2.83 2.82 2.82 2.32-1.35c.65-.38 1.07-.98 1.07-1.47s-.42-1.09-1.07-1.48z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] font-medium text-white/70 leading-none mb-0.5">Get it on</p>
        <p className="text-base font-bold leading-none">Google Play</p>
      </div>
    </a>
  );
}

export function AppDownload() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/images/Untitled_design_(34)_Large.jpeg" alt="The Disciple Co."
              className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-bold text-gray-900 dark:text-white text-sm hidden sm:block">The Disciple Co.</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:block">
              Website
            </Link>
            <a href={APP_CONFIG.appStoreLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download
            </a>
          </div>
        </div>
      </header>

      {/* ── APP SELECTOR ── */}
      <div className="bg-[#0d1a2e] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Apps by DiscipleCo
            </span>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {OTHER_APPS.map((app) => {
                const inner = (
                  <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all ${
                    app.active
                      ? 'bg-white/10 border-amber-400/50 shadow-sm shadow-amber-500/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-400/40 cursor-pointer'
                  }`}>
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-9 h-9 rounded-xl object-cover flex-shrink-0 ring-1 ring-white/15"
                    />
                    <div>
                      <p className="text-xs font-bold leading-tight text-white">{app.name}</p>
                      <p className="text-[10px] text-white/40 leading-tight">{app.tagline}</p>
                    </div>
                    {app.active && (
                      <span className="ml-1 text-[9px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        Viewing
                      </span>
                    )}
                    {!app.active && (
                      <ArrowRight className="w-3 h-3 text-white/30 flex-shrink-0 ml-0.5" />
                    )}
                  </div>
                );

                return app.href ? (
                  <a key={app.id} href={app.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={app.id}>{inner}</div>
                );
              })}
            </div>
            <div className="w-full max-w-xs h-px bg-white/10 mt-1" />
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#0d1a2e] to-[#1a2a40] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* App identity */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-4 mb-6">
              <img src="/images/Untitled_design_(34)_Large.jpeg" alt="The Disciple Co. App"
                className="w-20 h-20 rounded-[22px] shadow-2xl ring-2 ring-white/10 object-cover" />
              <div className="text-left">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">iOS · Android</p>
                <h1 className="text-xl font-bold text-white leading-tight">The Disciple Co.</h1>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                  <span className="text-white/35 text-[10px] ml-1.5">Available Now</span>
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight max-w-3xl">
              A Simple Path to<br />
              <span className="text-amber-400">Deeper Faith.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
              Grow closer to God every day with Bible studies, Scripture reading plans, prayer tools, and discipleship resources designed for real life.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <AppStoreBadge href={APP_CONFIG.appStoreLink} />
              <GooglePlayBadge href={APP_CONFIG.googlePlayLink} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-white/40 text-xs">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" />100% Free</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" />No Ads</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" />No Account Required</span>
            </div>
          </div>

          {/* Banner showcase image */}
          <div className="max-w-5xl mx-auto">
            <img
              src="/images/dcadappads1.png"
              alt="The Disciple Co. App Features"
              className="w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
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

      {/* ── FEATURE SECTIONS ── alternating layout, one per dcad image */}
      <section id="features" className="py-4 bg-white dark:bg-gray-950">
        {FEATURES.map((feature, i) => {
          const isEven = i % 2 === 1;
          return (
            <div
              key={feature.headline}
              className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
            >
              {/* Screenshot */}
              <div className="w-full lg:w-[45%] flex justify-center flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-60 blur-xl" />
                  <img
                    src={feature.src}
                    alt={feature.headline}
                    className="relative w-full max-w-[340px] rounded-3xl shadow-2xl ring-1 ring-black/10 dark:ring-white/5"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center lg:text-left">
                <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${feature.badge}`}>
                  {feature.label}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {feature.headline}
                </h2>
                <p className={`text-lg font-semibold ${feature.accent} mb-4 leading-snug`}>
                  {feature.sub}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-8 max-w-lg mx-auto lg:mx-0">
                  {feature.body}
                </p>
                <a href={APP_CONFIG.appStoreLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:opacity-70 transition-opacity group">
                  Download the App
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── DIFFERENTIATOR ── */}
      <section className="py-24 bg-[#0d1a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%"><defs><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-8 h-8 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            What Makes Disciple Co. Different?
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-xl font-semibold text-white/80 leading-relaxed mb-5">
              Disciple Co. is built on a simple belief:
            </p>
            <p className="text-2xl md:text-3xl font-bold text-amber-400 leading-snug">
              The Bible is not just meant to be read. It is meant to be understood, believed, and lived.
            </p>
          </div>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">
            Rather than focusing on trends, opinions, or endless content — Disciple Co. focuses on helping believers engage directly with Scripture and build a stronger foundation in God's Word.
          </p>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-3">Who It's For</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                Perfect for anyone on the journey.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base">
                Whether you are brand new to the Bible or have been studying Scripture for years, Disciple Co. provides practical tools to help you grow in your relationship with God.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <AppStoreBadge href={APP_CONFIG.appStoreLink} />
                <GooglePlayBadge href={APP_CONFIG.googlePlayLink} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AUDIENCE.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm">
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

      {/* ── MISSION ── */}
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

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#0d1a2e] via-[#162236] to-[#0d1a2e] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/images/Untitled_design_(34)_Large.jpeg" alt="The Disciple Co."
            className="w-24 h-24 rounded-[24px] object-cover shadow-2xl ring-2 ring-white/10 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Begin building a stronger foundation<br className="hidden md:block" /> in God's Word.
          </h2>
          <p className="text-white/55 text-lg mb-10 leading-relaxed">
            Download The Disciple Co. today — free, no account needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AppStoreBadge href={APP_CONFIG.appStoreLink} />
            <GooglePlayBadge href={APP_CONFIG.googlePlayLink} />
          </div>
          <p className="text-white/25 text-xs mt-8">
            Free · iOS &amp; Android · Version {APP_CONFIG.version} · {APP_CONFIG.copyright}
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
