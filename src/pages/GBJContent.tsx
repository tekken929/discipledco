import {
  CheckCircle, Star, ArrowRight, BookOpen, Heart, Zap, Users,
  Target, Globe, Sparkles, Trophy, Bookmark, Gamepad2, Map,
} from 'lucide-react';

const GBJ_CONFIG = {
  name: 'The Great Bible Journey',
  website: 'https://thegreatbiblejourney.com',
};

const GBJ_STATS = [
  { value: '29+', label: 'Bible Stories' },
  { value: '', label: 'Printable Lessons' },
  { value: '', label: 'Trackable Progress' },
  { value: '100%', label: 'Free' },
];

const GBJ_FEATURES = [
  {
    icon: BookOpen,
    headline: 'Bible Stories Come to Life',
    sub: 'Explore illustrated Bible stories from Genesis to Revelation.',
    body: 'Every story is written in engaging, age-appropriate language with beautiful illustrations that capture the imagination and bring Scripture to life for young readers.',
    accent: 'text-emerald-600 dark:text-emerald-400',
    badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40',
    label: 'Bible Stories',
  },
  {
    icon: Gamepad2,
    headline: 'Fun Activities & Games',
    sub: 'Interactive games, puzzles, coloring pages & more.',
    body: 'Hands-on activities reinforce every lesson. Kids can solve puzzles, color Bible scenes, and play interactive games that make learning Scripture fun and memorable.',
    accent: 'text-amber-600 dark:text-amber-400',
    badge: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40',
    label: 'Activities',
  },
  {
    icon: Trophy,
    headline: 'Bible Verses & Memory',
    sub: 'Memorize Scripture and earn badges along the way.',
    body: 'Each story comes with key Bible verses and memory challenges that encourage kids to hide God\'s Word in their hearts. Earn badges and track progress as you journey through the Bible.',
    accent: 'text-sky-600 dark:text-sky-400',
    badge: 'text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40',
    label: 'Bible Verses',
  },
  {
    icon: Bookmark,
    headline: 'Trackable Progress & Parent Dashboard',
    sub: 'Monitor your child\'s journey through the Bible.',
    body: 'Parents can track their child\'s progress, see which stories and lessons they\'ve completed, and celebrate milestones together. A simple dashboard makes it easy to stay involved in the adventure.',
    accent: 'text-rose-600 dark:text-rose-400',
    badge: 'text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40',
    label: 'Progress',
  },
];

const GBJ_AUDIENCE = [
  { icon: Heart, label: '100% Faith-Based & Family-Friendly' },
  { icon: Sparkles, label: 'Engaging, Educational & Fun' },
  { icon: Target, label: 'Encourages Kids to Grow in Their Faith' },
  { icon: Users, label: 'Perfect for Home, Homeschool or Church' },
  { icon: Zap, label: 'New Adventures Added Regularly' },
];

function VisitWebsiteButton({ href, large = false }: { href: string; large?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl ${
        large ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm'
      }`}
    >
      <Globe className={large ? 'w-5 h-5' : 'w-4 h-4'} />
      Visit the Website
      <ArrowRight className={large ? 'w-5 h-5' : 'w-4 h-4'} />
    </a>
  );
}

export function GBJContent() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#0a1f1c] to-[#133329] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="gbj-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gbj-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/images/iconbj.png"
                alt="The Great Bible Journey"
                className="w-20 h-20 rounded-[22px] shadow-2xl ring-2 ring-white/10 object-cover"
              />
              <div className="text-left">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Web · All Devices
                </p>
                <h1 className="text-xl font-bold text-white leading-tight">
                  The Great Bible Journey
                </h1>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  ))}
                  <span className="text-white/35 text-[10px] ml-1.5">Family-Friendly</span>
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight max-w-3xl">
              Explore God's<br />
              <span className="text-emerald-400">Amazing Story!</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
              Turn Bible stories into epic adventures! Journey through Scripture
              with interactive stories, fun activities, quizzes, and challenges
              designed for kids and families.
            </p>

            <div className="mb-6">
              <VisitWebsiteButton href={GBJ_CONFIG.website} large />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-white/40 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                No App Needed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                For All Ages
              </span>
            </div>
          </div>

          {/* Banner showcase image */}
          <div className="max-w-5xl mx-auto">
            <img
              src="/images/tgbj_sales1 copy.png"
              alt="The Great Bible Journey"
              className="w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-emerald-50 dark:bg-emerald-950/20 border-y border-emerald-100 dark:border-emerald-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {GBJ_STATS.map((stat) => (
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
      <section id="gbj-features" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-3">
              What's Inside
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Everything Kids Need to Explore the Bible
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              From Genesis to Revelation, The Great Bible Journey makes Scripture
              come alive through stories, games, and interactive challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {GBJ_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.headline}
                  className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.badge}`}
                    >
                      <Icon className={`w-6 h-6 ${feature.accent}`} />
                    </div>
                    <div>
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3 ${feature.badge}`}
                      >
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

      {/* ── ROADMAP SHOWCASE ── */}
      <section className="py-24 bg-[#0a1f1c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="gbj-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gbj-dots)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/images/tgbj_sales2 copy.png"
                alt="Bible Adventure Roadmap"
                className="w-full max-w-sm rounded-2xl shadow-2xl ring-1 ring-white/10"
              />
            </div>
            <div>
              <Map className="w-8 h-8 text-emerald-400 mb-5" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-3">
                Bible Adventure Roadmap
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                Turn Bible Stories Into Epic Adventures
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-6">
                Follow the Adventure Roadmap to journey through the Bible step by
                step. Each stop along the way unlocks new stories, activities, and
                challenges that keep kids engaged and excited to learn more.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Follow a guided path from Genesis to Revelation',
                  'Unlock new adventures as you complete each stage',
                  'Earn badges and track progress along the way',
                  'Perfect for home, homeschool, or church use',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <VisitWebsiteButton href={GBJ_CONFIG.website} />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY FAMILIES LOVE IT ── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-3">
                Why Families Love It
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                A trusted resource for faith-filled families.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base">
                The Great Bible Journey is designed to help kids discover the
                adventure of God's Word in a way that is engaging, educational, and
                rooted in biblical truth.
              </p>
              <VisitWebsiteButton href={GBJ_CONFIG.website} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GBJ_AUDIENCE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
      <section className="py-20 bg-emerald-50 dark:bg-emerald-950/20 border-y border-emerald-100 dark:border-emerald-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            The Great Bible Journey exists to help children discover the adventure
            of God's Word — building a foundation of faith that will last a lifetime,
            one story at a time.
          </p>
          <blockquote className="border-l-4 border-emerald-400 pl-6 text-left max-w-xl mx-auto">
            <p className="text-xl font-semibold text-gray-900 dark:text-white italic leading-relaxed mb-2">
              "Train up a child in the way he should go; even when he is old he will
              not depart from it."
            </p>
            <cite className="text-emerald-600 dark:text-emerald-400 font-bold text-sm not-italic">
              — Proverbs 22:6
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#0a1f1c] via-[#102e25] to-[#0a1f1c] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="/images/iconbj.png"
            alt="The Great Bible Journey"
            className="w-24 h-24 rounded-[24px] object-cover shadow-2xl ring-2 ring-white/10 mx-auto mb-8"
          />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Start your Bible adventure<br className="hidden md:block" /> today!
          </h2>
          <p className="text-white/55 text-lg mb-10 leading-relaxed">
            Visit The Great Bible Journey — free, no app needed, works on any device.
          </p>
          <VisitWebsiteButton href={GBJ_CONFIG.website} large />
          <p className="text-white/25 text-xs mt-8">
            Free · Web-based · Works on any device · {GBJ_CONFIG.name}
          </p>
        </div>
      </section>
    </>
  );
}


export { GBJContent }