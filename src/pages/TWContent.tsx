import { CheckCircle, Sparkles, BookOpen, Heart, Target, Sun } from 'lucide-react';

const TW_HIGHLIGHTS = [
  { icon: BookOpen, label: 'Faith-Based Curriculum' },
  { icon: Sparkles, label: 'Learn, Discover & Grow' },
  { icon: Heart, label: 'Built for Children' },
  { icon: Target, label: 'Rooted in Biblical Truth' },
  { icon: Sun, label: 'A New Curriculum from The Disciple Company' },
];

export function TWContent() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#1a1030] to-[#2a1a45] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="tw-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tw-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-fuchsia-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/images/T&Wimage1_Medium.png"
                alt="Truth & Wonder Academy"
                className="w-20 h-20 rounded-[22px] shadow-2xl ring-2 ring-white/10 object-cover"
              />
              <div className="text-left">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Coming Soon
                </p>
                <h1 className="text-xl font-bold text-white leading-tight">
                  Truth & Wonder Academy
                </h1>
                <div className="flex items-center gap-0.5 mt-1">
                  <span className="text-fuchsia-300/70 text-[10px] ml-1.5">In Development</span>
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight max-w-3xl">
              Learn, Discover<br />
              <span className="text-fuchsia-400">& Grow</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
              A new curriculum from The Disciple Company, currently in development.
              Truth & Witness is an upcoming website/app designed to help children
              Learn, Discover & Grow with faith based education.
            </p>

            <div className="inline-flex items-center gap-2 bg-fuchsia-500/20 text-fuchsia-200 px-6 py-3 rounded-xl font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              Coming Soon — Stay Tuned
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-white/40 text-xs mt-6">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400" />
                Faith-Based Education
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400" />
                For Children
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400" />
                Website & App
              </span>
            </div>
          </div>

          {/* Main showcase image */}
          <div className="flex justify-center">
            <img
              src="/images/T&Wimage1_Medium.png"
              alt="Truth & Wonder Academy"
              className="max-w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </section>

      {/* ── CONTENT IMAGE SECTION ── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/images/t&w_content1_Medium.png"
                alt="Truth & Wonder Academy Content"
                className="w-full max-w-md rounded-2xl shadow-2xl ring-1 ring-black/10 dark:ring-white/5"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-widest block mb-3">
                What's Coming
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                A new curriculum from The Disciple Company
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-base">
                Truth & Witness is an upcoming website/app designed to help children
                Learn, Discover & Grow with faith based education. Stay tuned for more
                details as we get closer to launch.
              </p>
              <ul className="space-y-3">
                {TW_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/40 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-snug">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 bg-fuchsia-50 dark:bg-fuchsia-950/20 border-y border-fuchsia-100 dark:border-fuchsia-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-10 h-10 text-fuchsia-600 dark:text-fuchsia-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Truth & Wonder Academy exists to help children Learn, Discover & Grow with
            faith based education — building a foundation of faith that will last a
            lifetime.
          </p>
          <blockquote className="border-l-4 border-fuchsia-400 pl-6 text-left max-w-xl mx-auto">
            <p className="text-xl font-semibold text-gray-900 dark:text-white italic leading-relaxed mb-2">
              "Train up a child in the way he should go; even when he is old he will not
              depart from it."
            </p>
            <cite className="text-fuchsia-600 dark:text-fuchsia-400 font-bold text-sm not-italic">
              — Proverbs 22:6
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#1a1030] via-[#241640] to-[#1a1030] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-fuchsia-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="/images/T&Wimage1_Medium.png"
            alt="Truth & Wonder Academy"
            className="w-24 h-24 rounded-[24px] object-cover shadow-2xl ring-2 ring-white/10 mx-auto mb-8"
          />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Coming Soon
          </h2>
          <p className="text-white/55 text-lg mb-10 leading-relaxed">
            Truth & Wonder Academy is currently in development. Stay tuned for more
            details as we get closer to launch.
          </p>
          <div className="inline-flex items-center gap-2 bg-fuchsia-500/20 text-fuchsia-200 px-6 py-3 rounded-xl font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            In Development
          </div>
        </div>
      </section>
    </>
  );
}
