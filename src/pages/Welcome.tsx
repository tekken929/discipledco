import {
  BookOpen, Church, Music, Calendar,
  Mic, Lightbulb, ArrowRight,
  HelpCircle, Shield, Heart,
  Map, Route, GraduationCap, Star,
  Wind, Image, HelpCircle as FAQ, Lock, Users, MessageCircle, Book, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { WelcomeHero } from '../components/WelcomeHero';
import { BibleRoadmap } from '../components/BibleRoadmap';


// Subtle religious line-art watermarks — positioned absolute in tile background
const CrossWatermark = ({ accentClass }: { accentClass: string }) => (
  <svg className={`absolute bottom-3 right-3 w-20 h-24 opacity-[0.07] dark:opacity-[0.06] pointer-events-none select-none ${accentClass}`}
    viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
    <line x1="30" y1="4" x2="30" y2="76" />
    <line x1="6" y1="22" x2="54" y2="22" />
  </svg>
);

const BookWatermark = ({ accentClass }: { accentClass: string }) => (
  <svg className={`absolute bottom-3 right-2 w-24 h-20 opacity-[0.07] dark:opacity-[0.06] pointer-events-none select-none ${accentClass}`}
    viewBox="0 0 80 70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40,6 L8,14 L8,60 L40,52 Z" />
    <path d="M40,6 L72,14 L72,60 L40,52 Z" />
    <line x1="40" y1="6" x2="40" y2="52" />
    <line x1="16" y1="28" x2="36" y2="24" />
    <line x1="16" y1="38" x2="36" y2="34" />
    <line x1="44" y1="24" x2="64" y2="28" />
    <line x1="44" y1="34" x2="60" y2="38" />
  </svg>
);

const ScrollWatermark = ({ accentClass }: { accentClass: string }) => (
  <svg className={`absolute bottom-3 right-3 w-20 h-24 opacity-[0.07] dark:opacity-[0.06] pointer-events-none select-none ${accentClass}`}
    viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14,14 C8,14 6,19 6,23 L6,57 C6,61 8,66 14,66 L46,66 C52,66 54,61 54,57 L54,23 C54,19 52,14 46,14 Z" />
    <path d="M14,14 C8,14 6,9 6,5 C6,1 10,0 14,2 C18,4 16,14 14,14 Z" />
    <path d="M14,66 C8,66 6,71 6,75 C6,79 10,80 14,78 C18,76 16,66 14,66 Z" />
    <line x1="16" y1="30" x2="44" y2="30" />
    <line x1="16" y1="40" x2="44" y2="40" />
    <line x1="16" y1="50" x2="36" y2="50" />
  </svg>
);

type WatermarkType = 'cross' | 'book' | 'scroll';

const featuredSections: {
  to: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgLight: string;
  border: string;
  iconBg: string;
  iconColor: string;
  accent: string;
  watermark: WatermarkType;
  watermarkAccent: string;
}[] = [
  {
    to: '/religions',
    icon: Church,
    title: 'Religions Explained',
    description: 'How Christianity developed and how different denominations emerged.',
    color: 'red',
    bgLight: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    iconBg: 'bg-red-100 dark:bg-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
    accent: 'text-red-600 dark:text-red-400',
    watermark: 'cross',
    watermarkAccent: 'text-red-600 dark:text-red-400',
  },
  {
    to: '/bible-versions',
    icon: BookOpen,
    title: 'Which Bible Version Should I Use?',
    description: 'Understand the differences between Bible translations and which to use.',
    color: 'amber',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconBg: 'bg-amber-100 dark:bg-amber-900',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'text-amber-600 dark:text-amber-400',
    watermark: 'book',
    watermarkAccent: 'text-amber-600 dark:text-amber-400',
  },
  {
    to: '/bible-lookup',
    icon: Lightbulb,
    title: 'Verse Lookup',
    description: 'Search the World English Bible by book and chapter — read any passage instantly.',
    color: 'teal',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-800',
    iconBg: 'bg-teal-100 dark:bg-teal-900',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'text-teal-600 dark:text-teal-400',
    watermark: 'book',
    watermarkAccent: 'text-teal-600 dark:text-teal-400',
  },
  {
    to: '/preaching',
    icon: Mic,
    title: 'Preaching & Wisdom',
    description: 'Powerful preaching and biblical teachings to strengthen your faith.',
    color: 'green',
    bgLight: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    iconBg: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
    accent: 'text-green-600 dark:text-green-400',
    watermark: 'cross',
    watermarkAccent: 'text-green-600 dark:text-green-400',
  },
  {
    to: '/topics',
    icon: MessageCircle,
    title: 'Biblical Topics',
    description: 'In-depth biblical guidance on topics that matter — grace, sin, love, fear, faith, and more.',
    color: 'emerald',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accent: 'text-emerald-600 dark:text-emerald-400',
    watermark: 'cross',
    watermarkAccent: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    to: '/bible-authors',
    icon: Users,
    title: 'Bible Authors',
    description: 'Who wrote Scripture, when they wrote it, and why their accounts can be trusted — with manuscript and archaeological evidence.',
    color: 'blue',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accent: 'text-blue-600 dark:text-blue-400',
    watermark: 'scroll',
    watermarkAccent: 'text-blue-600 dark:text-blue-400',
  },
];


const beliefs = [
  { icon: Shield, text: 'Scripture (the Bible) alone has everything we need and is the ultimate authority.' },
  { icon: Heart, text: 'One God: Father, Son, and Holy Spirit' },
  { icon: BookOpen, text: 'Jesus Christ is the only way to God' },
  { icon: Lightbulb, text: 'Truth is revealed, not subjective' },
];

export function Welcome() {
  const [showWhoMadeThis, setShowWhoMadeThis] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);


  return (
    <div className="min-h-screen">

      {/* HERO SECTION — full width */}
      <section className="relative overflow-hidden">
        <WelcomeHero />
      </section>

      {/* 4-TILE NAVIGATION ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2 hero-heading-accent">Everything you need, now.</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">Your starting points — pick any path and begin today.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Bible Overview */}
          <Link
            to="/bible"
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-stone-200 dark:border-gray-700 hover:border-stone-300 dark:hover:border-gray-600 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-[10px] font-bold text-stone-400 dark:text-gray-500 uppercase tracking-widest">Self-Guided</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">Bible Overview</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Browse all 66 books with summaries and context.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all mt-auto">
              Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Bible Reading Roadmap */}
          <button
            onClick={() => setIsRoadmapModalOpen(true)}
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-stone-200 dark:border-gray-700 hover:border-stone-300 dark:hover:border-gray-600 hover:shadow-md transition-all hover:-translate-y-0.5 text-left cursor-pointer w-full"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                <Route className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[10px] font-bold text-stone-400 dark:text-gray-500 uppercase tracking-widest">Step by Step</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">Bible Reading Roadmap</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Where to start, what to read next, and why order matters.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all mt-auto">
              Open roadmap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          {/* Foundation Course */}
          <Link
            to="/courses"
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-stone-200 dark:border-gray-700 hover:border-stone-300 dark:hover:border-gray-600 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-[10px] font-bold text-stone-400 dark:text-gray-500 uppercase tracking-widest">8 Modules</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">The Foundation Course</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">A guided discipleship path covering what the Bible is.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 group-hover:gap-2 transition-all mt-auto">
              Start course <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Historical Timeline */}
          <Link
            to="/timeline"
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-stone-200 dark:border-gray-700 hover:border-stone-300 dark:hover:border-gray-600 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/40 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-stone-400 dark:text-gray-500 uppercase tracking-widest">Creation → Today</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">Historical Timeline</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Key events from Creation through modern day across all traditions.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:gap-2 transition-all mt-auto">
              View timeline <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

        </div>
      </section>

      {/* FEATURED SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
        {/* Section divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px hero-divider-line" />
          <div className="flex items-center justify-center w-8 h-8 rounded-full theme-card border hero-divider-badge shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 h-px hero-divider-line" />
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2 hero-heading-accent">Learn & Explore</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">Pick your topic below to learn more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredSections.map((section) => {
            const Icon = section.icon;
            const cardClass = `group relative flex flex-col gap-4 p-6 rounded-2xl border overflow-hidden ${section.bgLight} ${section.border} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`;
            const Watermark = section.watermark === 'cross'
              ? <CrossWatermark accentClass={section.watermarkAccent} />
              : section.watermark === 'book'
              ? <BookWatermark accentClass={section.watermarkAccent} />
              : <ScrollWatermark accentClass={section.watermarkAccent} />;
            const cardContent = (
              <>
                {Watermark}
                <div className="relative flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${section.iconBg}`}>
                    <Icon className={`w-6 h-6 ${section.iconColor}`} />
                  </div>
                  <ArrowRight className={`w-5 h-5 ${section.accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200`} />
                </div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{section.description}</p>
                </div>
                <span className={`relative text-sm font-semibold ${section.accent} flex items-center gap-1 mt-auto`}>
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </>
            );
            if ((section as any).external) {
              return (
                <a key={section.to} href={section.to} target="_blank" rel="noopener noreferrer" className={cardClass}>
                  {cardContent}
                </a>
              );
            }
            return (
              <Link key={section.to} to={section.to} className={cardClass}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      {/* VERSE BANNER */}
      <section className="theme-primary-bg hero-verse-banner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-2xl md:text-2xl font-bold text-white leading-relaxed mb-4">
            "The Lord saw how great the wickedness of the human race had become on the earth, and that every inclination of the thoughts of the human heart was only evil all the time."
          </p>
          <p className="text-white/80 font-semibold text-lg">— Genesis 6:5 (NIV)</p>
        </div>
      </section>

      {/* BELIEFS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2 hero-heading-accent">What We Believe</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">Not religion for its own sake — a path toward truth.</p>
        </div>
        <div className="theme-card border rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                This isn't necessarily about religion — it's about truth. Not religion for the sake of religion. Not arguments for the sake of winning. Just a path toward truth. We are called to not just read the bible, but to understand the context, interpret it to the best of our ability, and apply it to our daily lives.
              </p>
              <button
                onClick={() => setShowWhoMadeThis(true)}
                className="inline-flex items-center gap-2 theme-primary-button text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <HelpCircle className="w-4 h-4" />
                Who Made This?
              </button>
            </div>
            <div className="space-y-4">
              {beliefs.map((belief, i) => {
                const Icon = belief.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <div className="p-1.5 rounded-lg theme-primary-bg flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-snug">{belief.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BEING DEVELOPED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px hero-divider-line" />
          <div className="flex items-center justify-center w-8 h-8 rounded-full theme-card border hero-divider-badge shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 h-px hero-divider-line" />
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2 hero-heading-accent">In Development</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">More features coming soon — live features are available now.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          {/* Daily Prayer — PREVIEW */}
          <Link
            to="/prayer"
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20 hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center flex-shrink-0">
                <Wind className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <span className="text-[10px] font-bold bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 px-2 py-0.5 rounded-full uppercase tracking-wide">Preview</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">Daily Prayer</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Morning, evening & night prayers from the Book of Common Prayer.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:gap-2 transition-all mt-auto">
              Open prayers <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Bible Stories — Coming Soon */}
          <div className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 opacity-60 cursor-not-allowed select-none">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Book className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                <Lock className="w-2.5 h-2.5" /> Soon
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-400 dark:text-gray-500 mb-1 leading-snug">Bible Stories</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Engaging stories and accounts that bring biblical truths to life.</p>
            </div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-auto">In development</span>
          </div>

          {/* Bible Studies — Coming Soon */}
          <div className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 opacity-60 cursor-not-allowed select-none">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                <Lock className="w-2.5 h-2.5" /> Soon
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-400 dark:text-gray-500 mb-1 leading-snug">Bible Studies</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Ten in-depth study series for the beginner Christian — from who God is to living it out daily.</p>
            </div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-auto">In development</span>
          </div>

          {/* Holiday Origins — PREVIEW */}
          <Link
            to="/christian-holidays"
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wide">Preview</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">Holiday Origins</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">The history and meaning behind Christian holidays and traditions.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all mt-auto">
              Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Resurrection — PREVIEW */}
          <Link
            to="/resurrection"
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20 hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <span className="text-[10px] font-bold bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-700 px-2 py-0.5 rounded-full uppercase tracking-wide">Preview</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">The Resurrection</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Historical and biblical evidence for the resurrection of Jesus Christ.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:gap-2 transition-all mt-auto">
              Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Music Player — Coming Soon */}
          <div className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 opacity-60 cursor-not-allowed select-none">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Music className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                <Lock className="w-2.5 h-2.5" /> Soon
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-400 dark:text-gray-500 mb-1 leading-snug">Music Player</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Original songs and worship music to accompany your journey.</p>
            </div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-auto">In development</span>
          </div>

          {/* FAQs — Coming Soon */}
          <div className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 opacity-60 cursor-not-allowed select-none">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <FAQ className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                <Lock className="w-2.5 h-2.5" /> Soon
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-400 dark:text-gray-500 mb-1 leading-snug">FAQs</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Answers to the most common questions about faith and the Bible.</p>
            </div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-auto">In development</span>
          </div>

          {/* Media Library — Coming Soon */}
          <div className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 opacity-60 cursor-not-allowed select-none">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Image className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                <Lock className="w-2.5 h-2.5" /> Soon
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-400 dark:text-gray-500 mb-1 leading-snug">Media Library</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Videos, images, and visual resources to deepen your understanding.</p>
            </div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-auto">In development</span>
          </div>

        </div>
      </section>

      {/* ROADMAP MODAL */}
      <Modal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
        title="Bible Reading Roadmap"
      >
        <BibleRoadmap defaultOpen />
      </Modal>

      {/* WHO MADE THIS MODAL */}
      <Modal
        isOpen={showWhoMadeThis}
        onClose={() => setShowWhoMadeThis(false)}
        title="Who made this page?"
      >
        <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          <p>Sometimes we don't fit neatly into a single denomination. Sometimes labels can become distracting. Especially for those just beginning their journey, I believe searching for a label may not be the right place to start.</p>
          <p>I fall somewhere between Catholic, Orthodox, and Protestant traditions—respecting the depth of history, structure, and tradition they carry while holding firmly to Scripture as the ultimate authority.</p>
          <p>People are sinners, including those who make decisions within the Church. I deeply respect the traditions of the Catholic Church and the ways these traditions can become meaningful habits that shape faith and daily life. At the same time, I recognize that it can be difficult to fully support something when parts of it seem broken or misrepresented.</p>
          <div className="p-4 theme-card border rounded-lg space-y-2">
            <p><span className="font-bold text-gray-900 dark:text-white">I believe in Sola Scriptura.</span></p>
            <p><span className="font-bold text-gray-900 dark:text-white">I believe truth is not subjective—it is revealed.</span></p>
            <p><span className="font-bold text-gray-900 dark:text-white">I believe in one God existing as Father, Son, and Holy Spirit.</span></p>
            <p><span className="font-bold text-gray-900 dark:text-white">I believe Jesus Christ is the only way to God—not one option among many, but the way.</span></p>
          </div>
          <p><span className="font-bold text-gray-900 dark:text-white">Scripture is my foundation.</span></p>
          <p>If we can help even one person navigate life's biggest questions without pressure, confusion, blind tradition, or personal opinion taking center stage, then we have succeeded.</p>
          <p>I am simply a man—a sinner like everyone else—trying to spread understanding and bring clarity to faith, religion, and why I believe the Bible remains the ultimate authority in life.</p>
          <p>I began this journey while trying to answer my own questions about faith, the Church, and God. I quickly realized that I wanted to share what I had learned and provide others with information as truthfully and accurately as I could.</p>
          <p>My goal is to represent what it means to be a Christian with honesty and faithfulness according to my understanding of the teachings of the Holy Bible.</p>

          {/* Support disclaimer + Patreon */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 italic">
              We will always keep this website ad-free. We believe this message should be freely shared with everyone, and you will never be asked to pay for the content within. If you would like to support the project, please consider donating through our Patreon below.
            </p>
            <a
              href="https://www.patreon.com/cw/Disciple929/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-orange-500 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">Support on Patreon</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">The Disciple Company — help us keep it free for everyone</p>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-500 dark:text-orange-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
