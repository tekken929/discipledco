import { useState, useRef } from 'react';
import {
  BookOpen, Calendar, Cross, Star, ScrollText,
  ChevronDown, ChevronUp, Clock, Sparkles, Globe, Heart,
} from 'lucide-react';
import { timelineEvents, timelineSections } from '../data/timeline';
import type { BibleRef, TimelineEvent } from '../types/timeline';
import { BibleVersePopup } from '../components/BibleVersePopup';

type CategoryId = 'creation' | 'jewish' | 'catholic' | 'protestant' | 'modern';

interface CategoryStyle {
  badge: string;
  card: string;
  title: string;
  text: string;
  icon: string;
  gradient: string;
  tabActive: string;
  tabIdle: string;
}

const categoryStyles: Record<CategoryId, CategoryStyle> = {
  creation: {
    badge: 'bg-amber-500 text-white',
    card: 'border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10',
    title: 'text-amber-900 dark:text-amber-100',
    text: 'text-amber-800 dark:text-amber-200',
    icon: 'text-amber-600 dark:text-amber-400',
    gradient: 'from-amber-500 to-yellow-600',
    tabActive: 'bg-amber-500 text-white border-amber-500',
    tabIdle: 'text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20',
  },
  jewish: {
    badge: 'bg-blue-600 text-white',
    card: 'border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10',
    title: 'text-blue-900 dark:text-blue-100',
    text: 'text-blue-800 dark:text-blue-200',
    icon: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-600 to-indigo-600',
    tabActive: 'bg-blue-600 text-white border-blue-600',
    tabIdle: 'text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20',
  },
  catholic: {
    badge: 'bg-red-600 text-white',
    card: 'border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10',
    title: 'text-red-900 dark:text-red-100',
    text: 'text-red-800 dark:text-red-200',
    icon: 'text-red-600 dark:text-red-400',
    gradient: 'from-red-600 to-rose-700',
    tabActive: 'bg-red-600 text-white border-red-600',
    tabIdle: 'text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20',
  },
  protestant: {
    badge: 'bg-green-600 text-white',
    card: 'border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10',
    title: 'text-green-900 dark:text-green-100',
    text: 'text-green-800 dark:text-green-200',
    icon: 'text-green-600 dark:text-green-400',
    gradient: 'from-green-600 to-emerald-700',
    tabActive: 'bg-green-600 text-white border-green-600',
    tabIdle: 'text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20',
  },
  modern: {
    badge: 'bg-teal-600 text-white',
    card: 'border-teal-200 dark:border-teal-700 bg-teal-50/50 dark:bg-teal-900/10',
    title: 'text-teal-900 dark:text-teal-100',
    text: 'text-teal-800 dark:text-teal-200',
    icon: 'text-teal-600 dark:text-teal-400',
    gradient: 'from-teal-600 to-cyan-700',
    tabActive: 'bg-teal-600 text-white border-teal-600',
    tabIdle: 'text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20',
  },
};

const categoryIcons: Record<CategoryId, React.ReactNode> = {
  creation: <Star className="w-5 h-5" />,
  jewish: <BookOpen className="w-5 h-5" />,
  catholic: <Cross className="w-5 h-5" />,
  protestant: <Cross className="w-5 h-5" />,
  modern: <Calendar className="w-5 h-5" />,
};

const keyDifferences = [
  {
    name: 'Judaism',
    icon: BookOpen,
    accent: 'blue',
    points: [
      { label: 'Messiah', text: 'Awaits the Messiah who has not yet come' },
      { label: 'Jesus', text: 'Does not accept Jesus as the Messiah or Son of God' },
      { label: 'Scripture', text: 'Follows the Torah and Talmud' },
      { label: 'Sabbath', text: 'Friday evening to Saturday evening' },
      { label: 'God', text: 'Strict monotheism, no belief in the Trinity' },
      { label: 'Salvation', text: 'Through following God\'s commandments (mitzvot)' },
    ],
  },
  {
    name: 'Catholicism',
    icon: Cross,
    accent: 'red',
    points: [
      { label: 'Jesus', text: 'Believes Jesus is the Messiah and Son of God' },
      { label: 'Authority', text: 'Pope is the supreme spiritual authority on earth' },
      { label: 'Sacraments', text: 'Seven sacraments (Baptism, Eucharist, Confirmation, Reconciliation, Anointing, Marriage, Holy Orders)' },
      { label: 'Saints', text: 'Veneration of Mary and the saints' },
      { label: 'Afterlife', text: 'Belief in heaven, hell, and purgatory' },
      { label: 'Sources', text: 'Both Tradition and Scripture are authoritative' },
    ],
  },
  {
    name: 'Protestantism',
    icon: Cross,
    accent: 'green',
    points: [
      { label: 'Jesus', text: 'Believes Jesus is the Messiah and Son of God' },
      { label: 'Authority', text: 'No pope; each denomination governs independently' },
      { label: 'Sacraments', text: 'Typically two (Baptism and Communion/Lord\'s Supper)' },
      { label: 'Saints', text: 'No veneration of Mary or saints; direct access to God' },
      { label: 'Afterlife', text: 'Belief in heaven and hell; no purgatory' },
      { label: 'Sources', text: 'Scripture alone (Sola Scriptura) as final authority' },
      { label: 'Salvation', text: 'By faith alone (Sola Fide) through grace alone' },
    ],
  },
];

export function Timeline() {
  const [activeTab, setActiveTab] = useState<CategoryId | 'all'>('all');
  const [activeVerse, setActiveVerse] = useState<{ ref: BibleRef; badgeClass: string } | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const tabSectionRef = useRef<HTMLDivElement>(null);

  const filteredEvents: TimelineEvent[] = activeTab === 'all'
    ? timelineEvents
    : timelineEvents.filter((e) => e.category === activeTab);

  const eventCounts: Record<string, number> = {
    all: timelineEvents.length,
    creation: timelineEvents.filter((e) => e.category === 'creation').length,
    jewish: timelineEvents.filter((e) => e.category === 'jewish').length,
    catholic: timelineEvents.filter((e) => e.category === 'catholic').length,
    protestant: timelineEvents.filter((e) => e.category === 'protestant').length,
    modern: timelineEvents.filter((e) => e.category === 'modern').length,
  };

  function toggleEvent(id: string) {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectTab(tab: CategoryId | 'all') {
    setActiveTab(tab);
    setTimeout(() => {
      tabSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 spacing-section">

        {/* HERO HEADER */}
        <div className="theme-card rounded-3xl shadow-xl p-8 md:p-12 mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-blue-200/20 dark:from-amber-700/10 dark:to-blue-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-blue-500 flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">Creation to Present Day</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              The Journey of Faith
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              A cinematic journey from creation through the development of Judaism, Christianity, Catholicism, and Protestantism. Explore the key events that shaped faith across millennia — click any Scripture reference to read it instantly.
            </p>
          </div>

          {/* Quick stats */}
          <div className="relative grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
            {timelineSections.map((section) => {
              const cat = section.category as CategoryId;
              const style = categoryStyles[cat];
              return (
                <button
                  key={section.id}
                  onClick={() => selectTab(cat)}
                  className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${style.card}`}
                >
                  <div className={`w-8 h-8 rounded-lg ${style.badge} flex items-center justify-center mb-2`}>
                    {categoryIcons[cat]}
                  </div>
                  <div className={`text-sm font-bold ${style.title} leading-snug`}>{section.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{eventCounts[cat]} events</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB BAR */}
        <div ref={tabSectionRef} className="sticky top-16 z-40 mb-8 -mx-4 px-4 py-3 theme-card/95 backdrop-blur-md border-y border-gray-200 dark:border-gray-700 scroll-mt-16">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => selectTab('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              All ({eventCounts.all})
            </button>
            {timelineSections.map((section) => {
              const cat = section.category as CategoryId;
              const style = categoryStyles[cat];
              const isActive = activeTab === cat;
              return (
                <button
                  key={section.id}
                  onClick={() => selectTab(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all whitespace-nowrap ${
                    isActive ? style.tabActive : `border-transparent ${style.tabIdle}`
                  }`}
                >
                  {categoryIcons[cat]}
                  {section.title.split(' ')[0]} ({eventCounts[cat]})
                </button>
              );
            })}
          </div>
        </div>

        {/* TIMELINE EVENTS */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const cat = event.category as CategoryId;
            const style = categoryStyles[cat];
            const isExpanded = expandedEvents.has(event.id);
            const hasDetails = event.details.length > 0 || (event.bibleRefs && event.bibleRefs.length > 0);

            return (
              <div key={event.id} className="relative">
                {/* Connector line */}
                {index !== filteredEvents.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
                )}
                <div className={`theme-card border-2 ${style.card} rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden`}>
                  <button
                    onClick={() => hasDetails && toggleEvent(event.id)}
                    className={`w-full text-left p-5 md:p-6 ${hasDetails ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${style.badge} p-2.5 rounded-full shadow flex-shrink-0 mt-0.5`}>
                        {categoryIcons[cat]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                          <h3 className={`text-lg md:text-xl font-bold ${style.title} leading-snug`}>{event.title}</h3>
                          <span className={`${style.badge} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap w-fit`}>
                            {event.year}
                          </span>
                        </div>
                        <p className={`text-sm ${style.text} leading-relaxed`}>{event.description}</p>
                        {hasDetails && (
                          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                            {isExpanded ? 'Show less' : 'Show details'}
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && hasDetails && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-20">
                      {event.details.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {event.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                              <span className={`mt-0.5 font-bold ${style.icon}`}>•</span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {event.bibleRefs && event.bibleRefs.length > 0 && (
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60">
                          <div className="flex items-center gap-1.5 mb-2.5">
                            <ScrollText className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Read in Scripture</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {event.bibleRefs.map((ref, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveVerse({ ref, badgeClass: style.badge })}
                                className={`${style.badge} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:shadow-md hover:-translate-y-0.5`}
                              >
                                <BookOpen className="w-3 h-3 flex-shrink-0" />
                                {ref.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {event.relatedLinks && event.relatedLinks.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {event.relatedLinks.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 theme-card border px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:shadow transition-all"
                            >
                              <Globe className="w-3 h-3" />
                              {link.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION DIVIDER */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center justify-center w-10 h-10 rounded-full theme-card border border-gray-200 dark:border-gray-700 shadow-sm">
            <Heart className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* KEY DIFFERENCES */}
        <div className="theme-card rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">Key Differences Today</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            How Judaism, Catholicism, and Protestantism differ in their core beliefs and practices.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {keyDifferences.map((group) => {
              const Icon = group.icon;
              const accentBg = group.accent === 'blue' ? 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30' : group.accent === 'red' ? 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30' : 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30';
              const accentBorder = group.accent === 'blue' ? 'border-blue-200 dark:border-blue-700' : group.accent === 'red' ? 'border-red-200 dark:border-red-700' : 'border-green-200 dark:border-green-700';
              const accentText = group.accent === 'blue' ? 'text-blue-900 dark:text-blue-100' : group.accent === 'red' ? 'text-red-900 dark:text-red-100' : 'text-green-900 dark:text-green-100';
              const bulletColor = group.accent === 'blue' ? 'text-blue-600' : group.accent === 'red' ? 'text-red-600' : 'text-green-600';
              return (
                <div key={group.name} className={`bg-gradient-to-br ${accentBg} rounded-2xl p-6 border ${accentBorder}`}>
                  <h3 className={`text-xl font-bold ${accentText} mb-4 flex items-center gap-2`}>
                    <Icon className="w-5 h-5" />
                    {group.name}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-800 dark:text-gray-200">
                        <span className={`${bulletColor} font-bold mt-0.5`}>•</span>
                        <span className="leading-relaxed"><strong>{pt.label}:</strong> {pt.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* BIBLE VERSE POPUP */}
      {activeVerse && (
        <BibleVersePopup
          book={activeVerse.ref.book}
          chapter={activeVerse.ref.chapter}
          label={activeVerse.ref.label}
          categoryBadgeClass={activeVerse.badgeClass}
          onClose={() => setActiveVerse(null)}
        />
      )}
    </>
  );
}
