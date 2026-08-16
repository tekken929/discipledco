import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ScrollText, Heart, Shield, Lightbulb } from 'lucide-react';
import devotionalsData from '../data/devotionals/devotionals.json';

interface Devotional {
  title: string;
  filename: string;
  content: string;
}

const devotionals: Devotional[] = devotionalsData as Devotional[];

const DEVOTIONAL_META: Record<string, { icon: typeof BookOpen; color: string; bg: string; border: string; description: string }> = {
  'The Table of Grace': {
    icon: ScrollText,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    border: 'border-amber-200 dark:border-amber-800',
    description: 'What Jesus changed about clean foods, dietary laws, and the New Covenant.',
  },
  'Prayer': {
    icon: Heart,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/40',
    border: 'border-rose-200 dark:border-rose-800',
    description: 'How to approach the throne of grace with confidence through our great High Priest.',
  },
  'Strongholds vs. Sins': {
    icon: Shield,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-900/40',
    border: 'border-sky-200 dark:border-sky-800',
    description: 'Breaking down the devil\u2019s strongholds with God\u2019s mighty weapons.',
  },
  'The Dark Room': {
    icon: Lightbulb,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-900/40',
    border: 'border-violet-200 dark:border-violet-800',
    description: 'How the enemy blinds minds and how the light of Christ breaks through.',
  },
};

export function Devotionals() {
  const [selected, setSelected] = useState<Devotional | null>(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button
            onClick={() => setSelected(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All devotionals
          </button>

          <article className="theme-card border rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300 text-base">
                {selected.content}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                By Colby Ryan Shenk, Disciple Company
              </p>
            </div>
          </article>

          <div className="mt-8 text-center">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to devotionals
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 mb-4">
            <BookOpen className="w-7 h-7 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-3">
            Daily Devotionals
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Short, Scripture-rich reflections to strengthen your walk with Christ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {devotionals.map((dev) => {
            const meta = DEVOTIONAL_META[dev.title] || {
              icon: BookOpen,
              color: 'text-gray-600 dark:text-gray-400',
              bg: 'bg-gray-100 dark:bg-gray-800',
              border: 'border-gray-200 dark:border-gray-700',
              description: '',
            };
            const Icon = meta.icon;

            return (
              <button
                key={dev.filename}
                onClick={() => setSelected(dev)}
                className={`group text-left p-6 rounded-2xl theme-card border-2 ${meta.border} hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${meta.color}`} />
                  </div>
                  <ArrowRight className={`w-4 h-4 ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  {dev.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {meta.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            By Colby Ryan Shenk, Disciple Company
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
