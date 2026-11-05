import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  FileText,
  Download,
  ExternalLink,
  ScrollText,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { getHistoryModule } from '../data/bibleHistoryData';

export function BibleHistoryModule() {
  const { eraId, moduleId } = useParams<{ eraId: string; moduleId: string }>();
  const [showDocument, setShowDocument] = useState(false);

  const found = eraId && moduleId ? getHistoryModule(eraId, moduleId) : undefined;

  if (!found) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-6">Module not found.</p>
        <Link to="/bible-history" className="theme-accent font-semibold">
          Back to Bible History
        </Link>
      </div>
    );
  }

  const { era, module } = found;

  const moduleIndex = era.modules.findIndex(m => m.id === module.id);
  const prevModule = moduleIndex > 0 ? era.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex < era.modules.length - 1 ? era.modules[moduleIndex + 1] : null;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb back */}
      <Link
        to="/bible-history"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {era.title}
      </Link>

      {/* Module header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Module {module.number}
          </span>
          {module.complete ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              <Circle className="w-3.5 h-3.5" /> In progress
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {module.title}
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-4 leading-relaxed italic">
          {module.tagline}
        </p>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-6">
          <ScrollText className="w-4 h-4" />
          {module.dateRange}
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
          {module.description}
        </p>
      </header>

      <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />

      {/* Not-yet-complete notice */}
      {!module.complete && (
        <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-900/10 p-7 mb-10 text-center">
          <ScrollText className="w-8 h-8 text-amber-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            This module is still being written
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto">
            The study content for {module.title} is coming soon. The structure is in place —
            check back as we continue building out the {era.title} series.
          </p>
        </div>
      )}

      {/* Source document */}
      {module.documentUrl && (
        <div className="rounded-2xl border-2 border-stone-200 dark:border-gray-700 bg-stone-50/60 dark:bg-gray-900/20 p-6 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FileText className="w-7 h-7 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  The Source Document
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Read the original text alongside the study notes below.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowDocument(v => !v)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl theme-primary-button text-sm font-semibold shadow-sm hover:shadow-md transition-all"
              >
                {showDocument ? 'Hide document' : 'View document'}
                <ExternalLink className="w-4 h-4" />
              </button>
              <a
                href={module.documentUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>

          {showDocument && (
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <iframe
                src={module.documentUrl}
                title={module.title}
                className="w-full"
                style={{ height: '70vh' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Study sections */}
      {module.sections.length > 0 && (
        <article className="prose prose-stone dark:prose-invert max-w-none mb-12">
          <div className="space-y-10">
            {module.sections.map(section => (
              <section key={section.heading}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                  {section.heading}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-loose text-base">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      )}

      {/* Key points */}
      {module.keyPoints.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
            Key Points
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {module.keyPoints.map(point => (
              <div
                key={point.title}
                className="rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-700 p-5"
              >
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reflective prompt */}
      {module.reflectivePrompt && (
        <div className="rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-700 p-5 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Reflect
            </span>
          </div>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed italic">
            {module.reflectivePrompt}
          </p>
        </div>
      )}

      {/* Key takeaway */}
      {module.keyTakeaway && (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Key Takeaway
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
            {module.keyTakeaway}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch">
        {prevModule ? (
          <Link
            to={`/bible-history/${era.id}/${prevModule.id}`}
            className="flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group flex-1"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-0.5">
                Previous
              </p>
              <p className="font-bold text-sm">{prevModule.title}</p>
            </div>
          </Link>
        ) : (
          <Link
            to="/bible-history"
            className="flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group flex-1"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-0.5">
                Back to
              </p>
              <p className="font-bold text-sm">{era.title}</p>
            </div>
          </Link>
        )}

        {nextModule ? (
          <Link
            to={`/bible-history/${era.id}/${nextModule.id}`}
            className="flex items-center justify-between gap-3 px-6 py-4 rounded-xl theme-primary-button shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group flex-1"
          >
            <div className="text-right">
              <p className="text-xs text-white/70 font-medium uppercase tracking-wider mb-0.5">
                Next Module
              </p>
              <p className="font-bold text-sm text-white">{nextModule.title}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
          </Link>
        ) : (
          <Link
            to="/bible-history"
            className="flex items-center justify-between gap-3 px-6 py-4 rounded-xl theme-primary-button shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group flex-1"
          >
            <div className="text-right">
              <p className="text-xs text-white/70 font-medium uppercase tracking-wider mb-0.5">
                Continue
              </p>
              <p className="font-bold text-sm text-white">All Modules</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
          </Link>
        )}
      </div>
    </main>
  );
}
