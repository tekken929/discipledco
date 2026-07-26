import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Users, Clock, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { courseModules, courseOverview } from '../data/courseData';
import { ReturnToHome } from '../components/ReturnToHome';

const moduleDescriptions: Record<number, string> = {
  1: 'What the Bible actually is, why it can be trusted, and how the whole thing holds together.',
  2: 'The approach that makes the Bible make sense — and why most people get stuck.',
  3: 'A clear path that builds momentum instead of confusion from the first page.',
  4: 'The nature, character, and attributes of God — and why it matters for daily life.',
  5: 'Who Jesus claimed to be, what the evidence shows, and why everything hinges on Him.',
  6: 'What salvation actually means — and what it is not.',
  7: 'Moving from belief to daily practice — discipline, temptation, and long-term growth.',
  8: 'The themes that run through all of Scripture: grace, faith, purpose, identity, and more.',
};

export function Courses() {
  return (
    <>
      <ReturnToHome />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Hero */}
        <section className="text-center mb-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-medium mb-6">
            <Compass className="w-4 h-4" />
            Start Here
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight max-w-4xl mx-auto">
            {courseOverview.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            {courseOverview.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Link
              to="/courses/module/module-1"
              className="inline-flex items-center gap-2 px-8 py-3.5 theme-primary-button rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start the Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/bible"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Explore the Bible Overview
            </Link>
          </div>

          <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500 inline-block" />
              {courseOverview.totalModules} Modules
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500 inline-block" />
              {courseOverview.totalLessons} Lessons
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500 inline-block" />
              Go at your own pace
            </span>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-900/10 p-7 md:p-9">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
                <Users className="w-4 h-4" />
                Who This Is For
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
                Anyone who wants clarity, not just content.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This course was built for people who are tired of feeling confused or scattered when it comes to Scripture. It does not require any background. It does not assume you already know the answers. It starts from the beginning and builds forward.
              </p>
            </div>

            <div className="space-y-3">
              {[
                'People who are new to reading the Bible and do not know where to start',
                'Believers who feel scattered or overwhelmed and want real structure',
                'People who want to understand truth clearly enough to actually live it',
                'Anyone who has tried before, got stuck, and wants a better approach this time',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="rounded-2xl border-2 border-sky-200 dark:border-sky-800/60 bg-sky-50/40 dark:bg-sky-900/10 p-7 md:p-9">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-3">
              <Clock className="w-4 h-4" />
              How This Works
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Three steps. One clear path.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Start with the foundation',
                body: 'Begin with Module 1 and move through each lesson in order. Each one builds on what came before.'
              },
              {
                step: '02',
                title: 'Move through each module',
                body: 'There is no rush. Read slowly. Sit with the lessons. Let them settle before moving forward.'
              },
              {
                step: '03',
                title: 'Go deeper through topics',
                body: 'Module 8 connects into our Topics section, where you can explore key themes with Scripture.'
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="text-center px-2">
                <span className="text-4xl font-bold text-sky-200 dark:text-sky-800/60 block mb-3">{step}</span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ready to Start CTA */}
        <section className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10 p-7 md:p-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            Ready to Start
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Begin with Module 1
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed">
            It will take you through what the Bible actually is — and by the end of it, you will have a foundation that everything else builds on.
          </p>
          <Link
            to="/courses/module/module-1"
            className="inline-flex items-center gap-2 px-8 py-3.5 theme-primary-button rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Begin Module 1
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        {/* Module grid */}
        <section className="rounded-2xl border-2 border-stone-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/20 p-7 md:p-9">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">The Course</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Eight modules, designed to be read in order.</p>

          <div className="grid md:grid-cols-2 gap-4">
            {courseModules.map((module) => (
              <Link
                key={module.id}
                to={`/courses/module/${module.id}`}
                className="group theme-card border-2 rounded-xl p-5 hover:shadow-lg transition-all hover:border-gray-400 dark:hover:border-gray-500"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest min-w-[3rem]">
                      {String(module.number).padStart(2, '0')}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {module.title}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed ml-14 mb-3">
                  {moduleDescriptions[module.number]}
                </p>

                <div className="ml-14 flex items-center gap-3">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
