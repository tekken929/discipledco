import {
  CheckCircle, Star, ArrowRight, BookOpen, Heart, Zap, Users,
  Target, Globe, Flame, Shield, Dumbbell, Brain, Trophy, Swords,
} from 'lucide-react';

const DC_CONFIG = {
  name: 'The Disciple Code',
  website: 'https://thedisciplecode.com',
  appStoreLink: '#',
  googlePlayLink: '#',
};

const DC_STATS = [
  { value: '', label: 'Faith & Fitness' },
  { value: '', label: 'Daily Discipline' },
  { value: '', label: 'Real Life Code' },
  { value: '100%', label: 'Free' },
];

const DC_FEATURES = [
  {
    icon: Flame,
    headline: 'Faith Fueled by Fire',
    sub: 'A code for those who refuse to settle for spiritual mediocrity.',
    body: 'The Disciple Code is built for believers who want more — more depth, more discipline, more impact. Rooted in Scripture, this is a lifestyle code for everyday warriors who want to follow Jesus with everything they have.',
    accent: 'text-orange-600 dark:text-orange-400',
    badge: 'text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/40',
    label: 'The Code',
  },
  {
    icon: Dumbbell,
    headline: 'Fitness Meets Faith',
    sub: 'Your body is a temple — train it like one.',
    body: 'Physical discipline and spiritual discipline go hand in hand. The Disciple Code connects your pursuit of physical strength with your pursuit of godly character, helping you build a life of consistency, endurance, and purpose.',
    accent: 'text-red-600 dark:text-red-400',
    badge: 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40',
    label: 'Fitness',
  },
  {
    icon: Brain,
    headline: 'Mindset & Lifestyle',
    sub: 'Transform your thinking, transform your life.',
    body: 'Renewing your mind is not optional — it is commanded. The Disciple Code digs into the mental and lifestyle habits that separate those who drift from those who dominate. Real talk, real truth, real results.',
    accent: 'text-amber-600 dark:text-amber-400',
    badge: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40',
    label: 'Mindset',
  },
  {
    icon: Shield,
    headline: 'Defend Your Identity in Christ',
    sub: 'Know who you are and refuse to be moved.',
    body: 'The world will try to define you. The Disciple Code equips you with Scripture, truth, and a battle-tested identity rooted in who God says you are — so you can stand firm when everything around you shakes.',
    accent: 'text-sky-600 dark:text-sky-400',
    badge: 'text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40',
    label: 'Identity',
  },
];

const DC_AUDIENCE = [
  { icon: Target, label: 'Men who want more from their faith' },
  { icon: Dumbbell, label: 'Athletes and fitness-minded believers' },
  { icon: Brain, label: 'Anyone who wants a stronger mindset' },
  { icon: Shield, label: 'Those battling complacency and drift' },
  { icon: Users, label: 'Small groups and accountability partners' },
  { icon: Heart, label: 'Believers who want to live out their faith' },
];

function VisitWebsiteButton({ href, large = false }: { href: string; large?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl ${
        large ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm'
      }`}
    >
      <Globe className={large ? 'w-5 h-5' : 'w-4 h-4'} />
      Visit the Website
      <ArrowRight className={large ? 'w-5 h-5' : 'w-4 h-4'} />
    </a>
  );
}

export function DiscipleCodeContent() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#0f0d0b] to-[#1c1208] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dc-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/images/appicon5.png"
                alt="The Disciple Code"
                className="w-20 h-20 rounded-[22px] shadow-2xl ring-2 ring-white/10 object-cover"
              />
              <div className="text-left">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Fitness · Faith · Discipline
                </p>
                <h1 className="text-xl font-bold text-white leading-tight">
                  The Disciple Code
                </h1>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 text-orange-400 fill-orange-400" />
                  ))}
                  <span className="text-white/35 text-[10px] ml-1.5">Coming Soon</span>
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight max-w-3xl">
              Live the Code.<br />
              <span className="text-orange-400">Follow Christ.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
              Where fitness, lifestyle, discipline, and real life come together.
              The Disciple Code is for those who refuse to settle — for a deeper
              faith, a stronger body, and a life fully surrendered to Christ.
            </p>

            <div className="mb-6">
              <VisitWebsiteButton href={DC_CONFIG.website} large />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-white/40 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                Faith-Based
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                Built on Scripture
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                Real Life Application
              </span>
            </div>
          </div>

          {/* Logo centered showcase */}
          <div className="max-w-xs mx-auto">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-orange-600/15 blur-2xl" />
              <img
                src="/images/appicon5.png"
                alt="The Disciple Code"
                className="relative w-full rounded-3xl shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-orange-50 dark:bg-orange-950/20 border-y border-orange-100 dark:border-orange-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {DC_STATS.map((stat) => (
              <div key={stat.label}>
                {stat.value ? (
                  <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                ) : null}
                <p className={`font-bold text-gray-900 dark:text-white ${stat.value ? 'text-sm md:text-base mt-1' : 'text-2xl md:text-3xl'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="dc-features" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-3">
              The Code
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              A Life of Discipline Starts with a Decision
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              The Disciple Code is not a trend. It is a commitment — to faith, to fitness,
              to a life that reflects who God made you to be.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DC_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.headline}
                  className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.badge}`}>
                      <Icon className={`w-6 h-6 ${feature.accent}`} />
                    </div>
                    <div>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3 ${feature.badge}`}>
                        {feature.label}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        {feature.headline}
                      </h3>
                      <p className={`text-sm font-semibold ${feature.accent} mb-3 leading-snug`}>
                        {feature.sub}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-24 bg-[#0f0d0b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dc-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dc-dots)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Swords className="w-8 h-8 text-orange-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            What Is The Disciple Code?
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-xl font-semibold text-white/80 leading-relaxed mb-5">
              The Disciple Code is built on a single conviction:
            </p>
            <p className="text-2xl md:text-3xl font-bold text-orange-400 leading-snug">
              Following Jesus is not passive. It demands everything — your mind, your body, and your will.
            </p>
          </div>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">
            This is for those who are done going through the motions. The Disciple Code merges faith, fitness,
            and focused living into a practical daily code that any believer can follow and live out.
          </p>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-3">
                Who It's For
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                For the few who choose the hard path.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base">
                Whether you are a new believer or a seasoned follower of Christ, the Disciple Code
                meets you where you are and challenges you to go further — in faith, in fitness, and in life.
              </p>
              <VisitWebsiteButton href={DC_CONFIG.website} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DC_AUDIENCE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-snug">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 bg-orange-50 dark:bg-orange-950/20 border-y border-orange-100 dark:border-orange-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            The Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            The Disciple Code exists to equip believers with a practical framework for living out their
            faith — every single day. Not just on Sundays. Not just when it's convenient. But in the
            gym, in the home, in the workplace, and in every arena of life.
          </p>
          <blockquote className="border-l-4 border-orange-400 pl-6 text-left max-w-xl mx-auto">
            <p className="text-xl font-semibold text-gray-900 dark:text-white italic leading-relaxed mb-2">
              "I can do all things through Christ who strengthens me."
            </p>
            <cite className="text-orange-600 dark:text-orange-400 font-bold text-sm not-italic">
              — Philippians 4:13
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── PODCAST / CONTENT ── */}
      <section className="py-24 bg-[#0f0d0b] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Zap className="w-8 h-8 text-orange-400 mb-5" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-3">
                Content &amp; Community
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                The Podcast. The Community. The Code.
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-6">
                No filter. No fluff. Real conversations about faith, fitness, discipline, and what it
                actually looks like to follow Jesus in real life. The Disciple Code Podcast puts
                raw truth front and center.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Honest conversations about faith and real life',
                  'Practical steps to build daily discipline',
                  'Fitness principles grounded in Scripture',
                  'Community of like-minded believers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <VisitWebsiteButton href={DC_CONFIG.website} />
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-orange-600/10 blur-2xl" />
                <img
                  src="/images/appicon5.png"
                  alt="The Disciple Code"
                  className="relative w-full max-w-xs rounded-3xl shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#0f0d0b] via-[#1c1208] to-[#0f0d0b] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="/images/appicon5.png"
            alt="The Disciple Code"
            className="w-24 h-24 rounded-[24px] object-cover shadow-2xl ring-2 ring-white/10 mx-auto mb-8"
          />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Are you ready to live<br className="hidden md:block" /> The Disciple Code?
          </h2>
          <p className="text-white/55 text-lg mb-10 leading-relaxed">
            Visit the website, explore the content, and join a community of believers who refuse to settle.
          </p>
          <VisitWebsiteButton href={DC_CONFIG.website} large />
          <p className="text-white/25 text-xs mt-8">
            Faith · Fitness · Discipline · thedisciplecode.com
          </p>
        </div>
      </section>
    </>
  );
}
