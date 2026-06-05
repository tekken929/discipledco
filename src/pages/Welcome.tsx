import {
  BookOpen, Church, Music, Calendar,
  Mic, Lightbulb, ArrowRight,
  HelpCircle, Shield, Heart,
  Map, Route, GraduationCap, Clock, Star,
  Wind, Image, HelpCircle as FAQ, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { BibleRoadmap } from '../components/BibleRoadmap';
import { BibleVersePopup } from '../components/BibleVersePopup';
import { timelineEvents } from '../data/timeline';
import type { BibleRef } from '../types/timeline';

const featuredSections = [
  {
    to: '/religions',
    icon: Church,
    title: 'What is Religion',
    description: 'How Christianity developed and how different denominations emerged.',
    color: 'red',
    bgLight: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    iconBg: 'bg-red-100 dark:bg-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
    accent: 'text-red-600 dark:text-red-400',
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
  },
  {
    to: '/bible-lookup',
    icon: Lightbulb,
    title: 'Lookup Any Verse',
    description: 'Search the World English Bible by book and chapter — read any passage instantly.',
    color: 'teal',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-800',
    iconBg: 'bg-teal-100 dark:bg-teal-900',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'text-teal-600 dark:text-teal-400',
  },
  {
    to: '/preaching',
    icon: Mic,
    title: 'Wisdom',
    description: 'Powerful preaching and biblical teachings to strengthen your faith.',
    color: 'green',
    bgLight: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    iconBg: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
    accent: 'text-green-600 dark:text-green-400',
  },
  {
    to: '/music',
    icon: Music,
    title: 'Music Jukebox',
    description: 'Original songs and worship music to accompany your journey.',
    color: 'slate',
    bgLight: 'bg-slate-50 dark:bg-slate-800/50',
    border: 'border-slate-200 dark:border-slate-700',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    iconColor: 'text-slate-600 dark:text-slate-400',
    accent: 'text-slate-600 dark:text-slate-400',
  },
  {
    to: '/bible-studies',
    icon: BookOpen,
    title: 'Bible Studies',
    description: 'Ten in-depth study series for the beginner Christian — from who God is to living it out daily.',
    color: 'amber',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconBg: 'bg-amber-100 dark:bg-amber-900',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'text-amber-600 dark:text-amber-400',
  },
];


const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'creation':
      return { card: 'border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10', badge: 'bg-amber-500 text-white', icon: 'text-amber-600 dark:text-amber-400', title: 'text-amber-900 dark:text-amber-100', text: 'text-amber-800 dark:text-amber-200' };
    case 'jewish':
      return { card: 'border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10', badge: 'bg-blue-600 text-white', icon: 'text-blue-600 dark:text-blue-400', title: 'text-blue-900 dark:text-blue-100', text: 'text-blue-800 dark:text-blue-200' };
    case 'catholic':
      return { card: 'border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10', badge: 'bg-red-600 text-white', icon: 'text-red-600 dark:text-red-400', title: 'text-red-900 dark:text-red-100', text: 'text-red-800 dark:text-red-200' };
    case 'protestant':
      return { card: 'border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10', badge: 'bg-green-600 text-white', icon: 'text-green-600 dark:text-green-400', title: 'text-green-900 dark:text-green-100', text: 'text-green-800 dark:text-green-200' };
    case 'modern':
      return { card: 'border-teal-200 dark:border-teal-700 bg-teal-50/50 dark:bg-teal-900/10', badge: 'bg-teal-600 text-white', icon: 'text-teal-600 dark:text-teal-400', title: 'text-teal-900 dark:text-teal-100', text: 'text-teal-800 dark:text-teal-200' };
    default:
      return { card: 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/10', badge: 'bg-gray-600 text-white', icon: 'text-gray-600 dark:text-gray-400', title: 'text-gray-900 dark:text-white', text: 'text-gray-700 dark:text-gray-300' };
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'creation': return <Star className="w-4 h-4" />;
    default: return <Calendar className="w-4 h-4" />;
  }
};

const beliefs = [
  { icon: Shield, text: 'Scripture (the Bible) alone has everything we need and is the ultimate authority.' },
  { icon: Heart, text: 'One God: Father, Son, and Holy Spirit' },
  { icon: BookOpen, text: 'Jesus Christ is the only way to God' },
  { icon: Lightbulb, text: 'Truth is revealed, not subjective' },
];

export function Welcome() {
  const [showWhoMadeThis, setShowWhoMadeThis] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [activeVersePopup, setActiveVersePopup] = useState<{ ref: BibleRef; badgeClass: string } | null>(null);

  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Generated background art */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Deep space base */}
              <radialGradient id="rg1" cx="25%" cy="25%" r="65%">
                <stop offset="0%" stopColor="#0d1b3e" stopOpacity="1" />
                <stop offset="100%" stopColor="#020408" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="rg2" cx="75%" cy="75%" r="55%">
                <stop offset="0%" stopColor="#0a1628" stopOpacity="0.9" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              {/* Nebula clouds */}
              <radialGradient id="nebula1" cx="30%" cy="40%" r="35%">
                <stop offset="0%" stopColor="#1a3d6e" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#0d2244" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nebula2" cx="70%" cy="30%" r="30%">
                <stop offset="0%" stopColor="#0e3d5c" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#061e2e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nebula3" cx="55%" cy="65%" r="40%">
                <stop offset="0%" stopColor="#2a1a4e" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#150d28" stopOpacity="0.15" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nebula4" cx="15%" cy="70%" r="28%">
                <stop offset="0%" stopColor="#0b3a3a" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nebula5" cx="85%" cy="55%" r="25%">
                <stop offset="0%" stopColor="#1e2a50" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              {/* Milky Way band */}
              <linearGradient id="milkyway" x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                <stop offset="30%" stopColor="#c8d4f0" stopOpacity="0.03" />
                <stop offset="50%" stopColor="#d4e0ff" stopOpacity="0.06" />
                <stop offset="70%" stopColor="#c8d4f0" stopOpacity="0.03" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
              <filter id="blur3">
                <feGaussianBlur stdDeviation="12" />
              </filter>
              <filter id="blur6">
                <feGaussianBlur stdDeviation="24" />
              </filter>
              <filter id="starBlur">
                <feGaussianBlur stdDeviation="0.3" />
              </filter>
              <filter id="brightStar">
                <feGaussianBlur stdDeviation="0.8" />
              </filter>
              <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
                <stop offset="55%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
              </radialGradient>
            </defs>

            {/* Base deep space */}
            <rect width="100%" height="100%" fill="url(#rg1)" />
            <rect width="100%" height="100%" fill="url(#rg2)" />

            {/* Nebula color clouds */}
            <rect width="100%" height="100%" fill="url(#nebula1)" />
            <rect width="100%" height="100%" fill="url(#nebula2)" />
            <rect width="100%" height="100%" fill="url(#nebula3)" />
            <rect width="100%" height="100%" fill="url(#nebula4)" />
            <rect width="100%" height="100%" fill="url(#nebula5)" />

            {/* Milky Way diffuse band */}
            <rect width="100%" height="100%" fill="url(#milkyway)" />
            <ellipse cx="50%" cy="48%" rx="55%" ry="18%" fill="#8090c0" opacity="0.025" filter="url(#blur6)" />
            <ellipse cx="45%" cy="52%" rx="40%" ry="12%" fill="#a0b0d8" opacity="0.02" filter="url(#blur6)" />

            {/* Subtle nebula wisps — blurred colored patches */}
            <ellipse cx="22%" cy="38%" rx="18%" ry="8%" fill="#2060a0" opacity="0.18" filter="url(#blur3)" />
            <ellipse cx="68%" cy="28%" rx="15%" ry="6%" fill="#1080a0" opacity="0.2" filter="url(#blur3)" />
            <ellipse cx="80%" cy="58%" rx="20%" ry="9%" fill="#300868" opacity="0.15" filter="url(#blur3)" />
            <ellipse cx="35%" cy="72%" rx="16%" ry="7%" fill="#083840" opacity="0.2" filter="url(#blur3)" />
            <ellipse cx="10%" cy="52%" rx="12%" ry="5%" fill="#0c4878" opacity="0.22" filter="url(#blur3)" />
            <ellipse cx="90%" cy="42%" rx="14%" ry="6%" fill="#082050" opacity="0.2" filter="url(#blur3)" />

            {/* Dense background star field — tiny dim dots */}
            {([
              [2,3],[6,7],[9,2],[13,5],[17,9],[21,3],[25,7],[29,4],[33,8],[37,2],[41,6],[45,3],[49,8],[53,5],[57,2],[61,7],[65,4],[69,9],[73,3],[77,6],[81,2],[85,8],[89,4],[93,7],[97,5],
              [1,15],[4,12],[8,18],[11,14],[15,11],[19,16],[23,13],[27,17],[31,12],[35,15],[39,11],[43,16],[47,13],[51,18],[55,14],[59,11],[63,17],[67,13],[71,16],[75,12],[79,17],[83,14],[87,11],[91,16],[95,13],[99,15],
              [3,27],[7,23],[10,29],[14,25],[18,22],[22,28],[26,24],[30,27],[34,23],[38,26],[42,22],[46,28],[50,25],[54,22],[58,27],[62,24],[66,29],[70,25],[74,23],[78,28],[82,24],[86,27],[90,23],[94,26],[98,22],
              [2,37],[5,34],[9,39],[12,35],[16,32],[20,38],[24,34],[28,37],[32,33],[36,36],[40,32],[44,38],[48,35],[52,32],[56,37],[60,34],[64,39],[68,35],[72,33],[76,38],[80,34],[84,37],[88,33],[92,36],[96,32],
              [1,47],[4,44],[8,49],[11,45],[15,42],[19,48],[23,44],[27,47],[31,43],[35,46],[39,42],[43,48],[47,45],[51,42],[55,47],[59,44],[63,49],[67,45],[71,43],[75,48],[79,44],[83,47],[87,43],[91,46],[95,42],
              [3,57],[6,54],[10,59],[13,55],[17,52],[21,58],[25,54],[29,57],[33,53],[37,56],[41,52],[45,58],[49,55],[53,52],[57,57],[61,54],[65,59],[69,55],[73,53],[77,58],[81,54],[85,57],[89,53],[93,56],[97,52],
              [2,67],[5,64],[9,69],[12,65],[16,62],[20,68],[24,64],[28,67],[32,63],[36,66],[40,62],[44,68],[48,65],[52,62],[56,67],[60,64],[64,69],[68,65],[72,63],[76,68],[80,64],[84,67],[88,63],[92,66],[96,62],
              [1,77],[4,74],[8,79],[11,75],[15,72],[19,78],[23,74],[27,77],[31,73],[35,76],[39,72],[43,78],[47,75],[51,72],[55,77],[59,74],[63,79],[67,75],[71,73],[75,78],[79,74],[83,77],[87,73],[91,76],[95,72],
              [3,87],[6,84],[10,89],[13,85],[17,82],[21,88],[25,84],[29,87],[33,83],[37,86],[41,82],[45,88],[49,85],[53,82],[57,87],[61,84],[65,89],[69,85],[73,83],[77,88],[81,84],[85,87],[89,83],[93,86],[97,82],
            ] as [number, number][]).map(([cx, cy], i) => (
              <circle key={`bg-${i}`} cx={`${cx}%`} cy={`${cy}%`} r="0.4" fill="white" opacity={i % 3 === 0 ? "0.25" : "0.15"} />
            ))}

            {/* Mid-layer stars — slightly brighter */}
            {([
              [8,5],[15,12],[22,8],[30,15],[38,6],[45,11],[52,4],[60,9],[68,14],[75,7],[82,12],[90,5],[95,10],
              [5,20],[12,25],[19,18],[26,28],[33,22],[40,17],[48,26],[55,20],[63,24],[70,19],[78,27],[85,21],[92,16],
              [3,38],[10,42],[17,35],[24,40],[31,33],[36,45],[43,37],[50,43],[57,36],[65,41],[72,34],[80,44],[88,38],[95,32],
              [7,58],[14,62],[20,55],[28,65],[35,60],[42,56],[50,63],[58,58],[66,64],[73,57],[81,61],[89,55],[94,60],
              [4,72],[11,78],[18,70],[25,75],[32,68],[39,74],[47,79],[54,72],[61,76],[69,71],[76,77],[83,73],[91,68],
              [6,88],[13,92],[21,85],[29,90],[37,87],[44,93],[51,88],[59,91],[67,86],[74,92],[82,88],[90,84],[96,90],
            ] as [number, number][]).map(([cx, cy], i) => (
              <circle
                key={`mid-${i}`}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={i % 5 === 0 ? "1.0" : i % 3 === 0 ? "0.7" : "0.45"}
                fill="white"
                opacity={i % 4 === 0 ? "0.85" : i % 3 === 0 ? "0.55" : "0.35"}
                filter="url(#starBlur)"
              />
            ))}

            {/* Foreground bright stars with glow */}
            {([
              [18,9,1.8,0.95],[42,23,1.5,0.8],[67,16,2.0,0.9],[84,31,1.6,0.85],[11,44,1.7,0.9],
              [56,38,1.4,0.75],[73,52,1.8,0.85],[29,61,1.5,0.8],[91,18,1.6,0.9],[6,76,1.7,0.85],
              [47,69,1.5,0.8],[78,83,1.6,0.85],[34,87,1.8,0.9],[62,7,1.4,0.75],[96,64,1.7,0.85],
            ] as [number, number, number, number][]).map(([cx, cy, r, op], i) => (
              <g key={`bright-${i}`}>
                <circle cx={`${cx}%`} cy={`${cy}%`} r={r * 3} fill="white" opacity={op * 0.08} filter="url(#brightStar)" />
                <circle cx={`${cx}%`} cy={`${cy}%`} r={r} fill="white" opacity={op} filter="url(#starBlur)" />
              </g>
            ))}

            {/* Iconic bright star cluster near center */}
            <circle cx="50%" cy="36%" r="3" fill="white" opacity="0.95" filter="url(#starBlur)" />
            <circle cx="50%" cy="36%" r="8" fill="white" opacity="0.06" filter="url(#brightStar)" />
            <circle cx="47%" cy="32%" r="1.8" fill="white" opacity="0.7" filter="url(#starBlur)" />
            <circle cx="53%" cy="33%" r="1.4" fill="white" opacity="0.6" filter="url(#starBlur)" />
            <circle cx="44%" cy="38%" r="1.2" fill="#b0ccff" opacity="0.7" filter="url(#starBlur)" />
            <circle cx="56%" cy="40%" r="1.0" fill="#ffd0a0" opacity="0.65" filter="url(#starBlur)" />

            {/* Tinted stars — blue and warm hints */}
            {([
              [20,14,"#a0c8ff",0.7],[55,28,"#ffc8a0",0.6],[78,44,"#c0d8ff",0.65],[36,58,"#a0e8d8",0.55],
              [8,33,"#b8d0ff",0.6],[64,71,"#ffd8b0",0.55],[91,26,"#a8ccff",0.65],[43,82,"#c8e0ff",0.5],
            ] as [number, number, string, number][]).map(([cx, cy, color, op], i) => (
              <circle key={`tinted-${i}`} cx={`${cx}%`} cy={`${cy}%`} r="0.9" fill={color} opacity={op} filter="url(#starBlur)" />
            ))}

            {/* Vignette */}
            <rect width="100%" height="100%" fill="url(#vignette)" />
          </svg>
        </div>

        {/* Bottom fade to page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 dark:from-gray-950 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">

          {/* App Download / Support — top right */}
          <div className="hidden sm:flex absolute top-6 right-4 sm:right-6 lg:right-8 flex-col items-end gap-3">
            <a
              href="https://www.patreon.com/cw/Disciple929/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Support on Patreon"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl px-4 py-3 shadow-xl transition-all hover:scale-105"
            >
              <img
                src="/images/Untitled_design_(34)_Large.jpeg"
                alt="The Disciple Co. App"
                className="w-12 h-12 rounded-xl object-cover shadow-md flex-shrink-0"
              />
              <div className="text-left">
                <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest leading-none mb-0.5">Support the Mission</p>
                <p className="text-white text-sm font-bold leading-tight">The Disciple Co.</p>
                <p className="text-white/60 text-xs">Support us on Patreon</p>
              </div>
            </a>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl opacity-40 blur-2xl scale-110 bg-amber-400" />
                <img
                  src="/images/Untitled_design_(34)_Large.jpeg"
                  alt="The Disciple Co."
                  className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl object-cover shadow-2xl ring-2 ring-white/20"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight tracking-wide drop-shadow-2xl">
              The Disciple Co.
            </h1>

            <p className="text-lg md:text-xl text-white/75 mb-4 leading-relaxed font-light italic drop-shadow-lg">
              "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
            </p>
            <p className="text-sm text-white/55 mb-10 font-semibold tracking-wide">— Luke 9:23</p>

            <div className="flex justify-center">
              <Link
                to="/bible"
                className="group text-left bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl px-6 py-5 hover:shadow-xl transition-all hover:-translate-y-1 backdrop-blur-sm max-w-2xl w-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center flex-shrink-0">
                    <Map className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Begin Your Journey</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  Start Here
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">Your guided entry point — browse all 66 books, understand the Bible's structure, and find where to begin.</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                  Bible Overview <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4-TILE NAVIGATION ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-3">Everything you need, now.</h2>
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

          {/* Complete Historical Timeline */}
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="group flex flex-col gap-3 p-5 rounded-2xl theme-card border border-stone-200 dark:border-gray-700 hover:border-stone-300 dark:hover:border-gray-600 hover:shadow-md transition-all hover:-translate-y-0.5 text-left cursor-pointer w-full"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <span className="text-[10px] font-bold text-stone-400 dark:text-gray-500 uppercase tracking-widest">{showTimeline ? 'Collapse' : 'Expand'}</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">Complete Historical Timeline</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">From Creation to modern day — key events in Biblical history.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:gap-2 transition-all mt-auto">
              {showTimeline ? 'Hide timeline' : 'View timeline'} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Timeline expandable content */}
        {showTimeline && (
          <div className="mt-4 space-y-4">
            {timelineEvents.map((event, index) => {
              const style = getCategoryStyle(event.category);
              return (
                <div key={event.id} className="relative">
                  {index !== timelineEvents.length - 1 && (
                    <div className="absolute left-7 top-20 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
                  )}
                  <div className={`theme-card border ${style.card} rounded-2xl shadow-sm hover:shadow-md transition-all p-6`}>
                    <div className="flex items-start gap-4">
                      <div className={`${style.badge} p-2.5 rounded-full shadow flex-shrink-0 mt-0.5`}>
                        {getCategoryIcon(event.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className={`text-xl font-bold ${style.title} leading-snug`}>{event.title}</h3>
                          <span className={`${style.badge} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap w-fit`}>{event.year}</span>
                        </div>
                        <p className={`text-sm ${style.text} mb-3 leading-relaxed`}>{event.description}</p>
                        <ul className="space-y-1.5">
                          {event.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <span className={`${style.icon} mt-0.5 font-bold`}>•</span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                        {event.bibleRefs && event.bibleRefs.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Read in Scripture</p>
                            <div className="flex flex-wrap gap-2">
                              {event.bibleRefs.map((ref, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveVersePopup({ ref, badgeClass: style.badge })}
                                  className={`inline-flex items-center gap-1.5 ${style.badge} opacity-90 hover:opacity-100 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
                                >
                                  <BookOpen className="w-3 h-3" />
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
                                <BookOpen className="w-3 h-3" />
                                {link.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FEATURED SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        {/* Section divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full theme-card border border-gray-200 dark:border-gray-700 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Explore More</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
        </div>
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-3">Gain knowledge</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">Pick your topic below to learn more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredSections.map((section) => {
            const Icon = section.icon;
            const cardClass = `group flex flex-col gap-4 p-6 rounded-2xl border ${section.bgLight} ${section.border} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`;
            const cardContent = (
              <>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${section.iconBg}`}>
                    <Icon className={`w-6 h-6 ${section.iconColor}`} />
                  </div>
                  <ArrowRight className={`w-5 h-5 ${section.accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{section.description}</p>
                </div>
                <span className={`text-sm font-semibold ${section.accent} flex items-center gap-1`}>
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
      <section className="theme-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-2xl md:text-2xl font-bold text-white leading-relaxed mb-4">
            "The Lord saw how great the wickedness of the human race had become on the earth, and that every inclination of the thoughts of the human heart was only evil all the time."
          </p>
          <p className="text-white/80 font-semibold text-lg">— Genesis 6:5 (NIV)</p>
        </div>
      </section>

      {/* BELIEFS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-3">What We Believe</h2>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-3">Being Developed</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">More features coming soon — live features are available now.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

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

          {/* Media Section — Coming Soon */}
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
              <h3 className="text-base font-bold text-gray-400 dark:text-gray-500 mb-1 leading-snug">Media Section</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Videos, images, and visual resources to deepen your understanding.</p>
            </div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-auto">In development</span>
          </div>

        </div>
      </section>

      {/* BIBLE VERSE POPUP */}
      {activeVersePopup && (
        <BibleVersePopup
          book={activeVersePopup.ref.book}
          chapter={activeVersePopup.ref.chapter}
          label={activeVersePopup.ref.label}
          categoryBadgeClass={activeVersePopup.badgeClass}
          onClose={() => setActiveVersePopup(null)}
        />
      )}

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
                <p className="text-xs text-gray-500 dark:text-gray-400">The Disciple Co. — help us keep it free for everyone</p>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-500 dark:text-orange-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
