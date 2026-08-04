import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Heart, Sparkles, Cloud, Sun, Shield, ExternalLink } from 'lucide-react';
import { ReturnToHome } from '../components/ReturnToHome';
import { sadnessVerses, sadnessVerseCategories } from '../data/sadnessVerses';
import type { SadnessVerse } from '../data/sadnessVerses';

const categoryStyles: Record<SadnessVerse['category'], {
  badge: string; card: string; title: string; icon: React.ElementType; iconBg: string; iconColor: string; accent: string;
}> = {
  comfort: {
    badge: 'bg-rose-500 text-white',
    card: 'border-rose-200 dark:border-rose-800/50 bg-rose-50/50 dark:bg-rose-950/10',
    title: 'text-rose-900 dark:text-rose-100',
    icon: Heart,
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
    accent: 'text-rose-600 dark:text-rose-400',
  },
  hope: {
    badge: 'bg-amber-500 text-white',
    card: 'border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/10',
    title: 'text-amber-900 dark:text-amber-100',
    icon: Sun,
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'text-amber-600 dark:text-amber-400',
  },
  grief: {
    badge: 'bg-slate-600 text-white',
    card: 'border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/10',
    title: 'text-slate-900 dark:text-slate-100',
    icon: Cloud,
    iconBg: 'bg-slate-100 dark:bg-slate-800/40',
    iconColor: 'text-slate-600 dark:text-slate-400',
    accent: 'text-slate-600 dark:text-slate-400',
  },
  trust: {
    badge: 'bg-teal-600 text-white',
    card: 'border-teal-200 dark:border-teal-800/50 bg-teal-50/50 dark:bg-teal-950/10',
    title: 'text-teal-900 dark:text-teal-100',
    icon: Shield,
    iconBg: 'bg-teal-100 dark:bg-teal-900/40',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'text-teal-600 dark:text-teal-400',
  },
};

export function VersesOnSadness() {
  const [activeCategory, setActiveCategory] = useState<SadnessVerse['category'] | 'all'>('all');

  const filteredVerses = useMemo(() => {
    if (activeCategory === 'all') return sadnessVerses;
    return sadnessVerses.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sadnessVerses.length };
    for (const cat of sadnessVerseCategories) {
      counts[cat.id] = sadnessVerses.filter((v) => v.category === cat.id).length;
    }
    return counts;
  }, []);

  return (
    <>
      <ReturnToHome />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 spacing-section">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* HERO */}
        <div className="theme-card rounded-3xl shadow-xl p-8 md:p-12 mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-amber-200/20 dark:from-rose-800/10 dark:to-amber-800/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest">Comfort &amp; Hope</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Bible Verses for Sadness &amp; Sorrow
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              God's Word offers comfort and wisdom for anyone going through tough times. Whether you are dealing with loss, disappointment, depression, or just feeling down — these verses bring peace and remind us of God's love and care.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                {sadnessVerses.length} Verses
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                New Living Translation
              </span>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="sticky top-16 z-40 mb-8 -mx-4 px-4 py-3 theme-card/95 backdrop-blur-md border-y border-gray-200 dark:border-gray-700 scroll-mt-16">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              All ({categoryCounts.all})
            </button>
            {sadnessVerseCategories.map((cat) => {
              const style = categoryStyles[cat.id];
              const Icon = style.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all whitespace-nowrap ${
                    isActive
                      ? `${style.badge} border-transparent`
                      : `border-transparent ${style.accent} hover:bg-gray-100 dark:hover:bg-gray-700`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.title.split(' ')[0]} ({categoryCounts[cat.id]})
                </button>
              );
            })}
          </div>
        </div>

        {/* CATEGORY SECTION HEADERS */}
        {activeCategory === 'all' ? (
          <div className="space-y-12">
            {sadnessVerseCategories.map((cat) => {
              const style = categoryStyles[cat.id];
              const Icon = style.icon;
              const verses = sadnessVerses.filter((v) => v.category === cat.id);
              return (
                <section key={cat.id}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${style.iconColor}`} />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${style.title}`}>{cat.title}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {verses.map((verse) => (
                      <VerseCard key={verse.id} verse={verse} style={style} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVerses.map((verse) => (
              <VerseCard key={verse.id} verse={verse} style={categoryStyles[verse.category]} />
            ))}
          </div>
        )}

        {/* CLOSING ENCOURAGEMENT */}
        <div className="mt-16 theme-card rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center shadow-lg mx-auto mb-5">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            It is okay to be sad, even if you cannot explain it. Jesus himself experienced deep sorrow and sadness — it is part of being human. But for those who know God, we can experience sadness while also holding onto the hope that God loves us and cares for us. And one day, God will wipe away every tear, and sadness will no longer exist.
          </p>
        </div>
      </main>
    </>
  );
}

function VerseCard({ verse, style }: { verse: SadnessVerse; style: typeof categoryStyles[SadnessVerse['category']] }) {
  const Icon = style.icon;
  const lookupUrl = `/bible-lookup?book=${encodeURIComponent(verse.book)}&chapter=${verse.chapter}&verse=${verse.verseRange.split('-')[0]}&translation=nlt`;

  return (
    <div className={`theme-card border-2 ${style.card} rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group`}>
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${style.iconColor}`} />
            </div>
            <h3 className={`text-base font-bold ${style.title} leading-snug`}>{verse.reference}</h3>
          </div>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap pt-1">
            NLT
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-sm md:text-base">
          &ldquo;{verse.text}&rdquo;
        </p>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60">
          <Link
            to={lookupUrl}
            className={`inline-flex items-center gap-1.5 text-xs font-bold ${style.accent} hover:gap-2.5 transition-all`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Read in Bible Lookup
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>
        </div>
      </div>
    </div>
  );
}
