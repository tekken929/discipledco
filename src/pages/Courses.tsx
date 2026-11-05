import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Library,
  GraduationCap,
  Scroll,
  Clock,
  BookOpen,
} from 'lucide-react';
import { courseOverview } from '../data/courseData';
import { bibleHistoryOverview, bibleHistoryEras } from '../data/bibleHistoryData';

export function Courses() {
  const earlyChurch = bibleHistoryEras.find(e => e.id === 'early-church');
  const availableHistoryModules = earlyChurch?.modules.filter(m => m.complete).length ?? 0;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-medium mb-6">
          <Compass className="w-4 h-4" />
          Study Series
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight max-w-4xl mx-auto">
          Foundation Course
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Choose a study path. Begin with the foundations of the faith, or explore the history
          that shaped the church across the centuries.
        </p>
      </section>

      {/* Two tiles */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Foundation Course tile */}
        <Link
          to="/courses/foundation"
          className="group rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50 to-stone-50 dark:from-emerald-900/15 dark:to-stone-900/10 p-7 md:p-9 hover:shadow-xl transition-all hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </span>
            <div>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-0.5">
                Start Here
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                The Foundation
              </h2>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
            {courseOverview.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 mb-6">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {courseOverview.totalModules} modules
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              {courseOverview.totalLessons} lessons
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-3 transition-all">
            Enter the Foundation
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Bible History tile */}
        <Link
          to="/bible-history"
          className="group rounded-2xl border-2 border-amber-200 dark:border-amber-800/60 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/15 dark:to-stone-900/10 p-7 md:p-9 hover:shadow-xl transition-all hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <Scroll className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </span>
            <div>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-0.5">
                Study Series
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                {bibleHistoryOverview.title}
              </h2>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
            {bibleHistoryOverview.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 mb-6">
            <span className="inline-flex items-center gap-1.5">
              <Library className="w-3.5 h-3.5" />
              {bibleHistoryOverview.totalEras} era{bibleHistoryOverview.totalEras !== 1 ? 's' : ''}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {bibleHistoryOverview.totalModules} modules
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {availableHistoryModules} ready now
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 group-hover:gap-3 transition-all">
            Explore Bible History
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </section>

      {/* Mini description row */}
      <section className="grid md:grid-cols-2 gap-6 text-sm">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <span className="font-bold text-gray-900 dark:text-white">The Foundation</span> is the
            place to start if you are new to the Bible or want a clear, structured path through
            what Scripture teaches and how to live it.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <span className="font-bold text-gray-900 dark:text-white">Bible History</span> goes
            deeper into the people, documents, and decisions that shaped the church — beginning
            with the Early Church and the Didache, and expanding era by era.
          </p>
        </div>
      </section>
    </main>
  );
}
