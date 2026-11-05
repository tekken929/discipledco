import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ScrollText,
  Clock,
  FileText,
  BookMarked,
  ArrowRight,
  Library,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { useState } from 'react';
import {
  bibleHistoryEras,
  bibleHistoryOverview,
} from '../data/bibleHistoryData';

export function BibleHistory() {
  const [activeEraId, setActiveEraId] = useState(bibleHistoryEras[0]?.id ?? '');
  const activeEra = bibleHistoryEras.find(e => e.id === activeEraId) ?? bibleHistoryEras[0];

  if (!activeEra) {
    return null;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hero */}
      <section className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-medium mb-6">
          <Library className="w-4 h-4" />
          Study Series
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight max-w-4xl mx-auto">
          {bibleHistoryOverview.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          {bibleHistoryOverview.subtitle}
        </p>

        <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500 inline-block" />
            {bibleHistoryOverview.totalEras} Era{bibleHistoryOverview.totalEras !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500 inline-block" />
            {bibleHistoryOverview.totalModules} Modules
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-400 dark:bg-stone-500 inline-block" />
            Growing over time
          </span>
        </div>
      </section>

      {/* Era intro card */}
      <section className="rounded-2xl border-2 border-amber-200 dark:border-amber-800/60 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/15 dark:to-stone-900/10 p-7 md:p-9">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
              <Clock className="w-4 h-4" />
              {activeEra.dateRange}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
              {activeEra.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {activeEra.description}
            </p>
          </div>
        </div>
      </section>

      {/* Era selector (for future eras) */}
      {bibleHistoryEras.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {bibleHistoryEras.map(era => (
            <button
              key={era.id}
              onClick={() => setActiveEraId(era.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                era.id === activeEraId
                  ? 'theme-primary-button text-white shadow-sm'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {era.title}
            </button>
          ))}
        </div>
      )}

      {/* Module list */}
      <section className="rounded-2xl border-2 border-stone-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/20 p-7 md:p-9">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Modules</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {activeEra.modules.filter(m => m.complete).length} of {activeEra.modules.length} complete
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Each module studies an original document from the period.
        </p>

        <div className="space-y-3">
          {activeEra.modules.map(module => (
            <Link
              key={module.id}
              to={`/bible-history/${activeEra.id}/${module.id}`}
              className="group flex items-start gap-5 theme-card border-2 rounded-xl p-5 hover:shadow-lg transition-all hover:border-gray-400 dark:hover:border-gray-500"
            >
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest min-w-[3rem] mt-1">
                {module.number}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                    {module.title}
                  </h3>
                  {module.complete ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      <Circle className="w-3.5 h-3.5" /> Coming soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                  {module.tagline}
                </p>
                {module.documentUrl && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                    <FileText className="w-3.5 h-3.5" />
                    {module.documentLabel ?? 'Source document'}
                  </span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Back to Biblical Foundations hub */}
      <section className="text-center">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Biblical Foundations
        </Link>
      </section>
    </main>
  );
}
