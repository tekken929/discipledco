import {
  BookOpen, MessageCircle, Church, Book, Music, Calendar,
  Mic, BookText, Radio, Lightbulb, Sparkles, ArrowRight,
  HelpCircle, Users, Shield, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../components/Modal';

const featuredSections = [
  {
    to: '/topics',
    icon: MessageCircle,
    title: 'Everyday Topics',
    description: 'Biblical wisdom on marriage, relationships, sin, grace, and more.',
    color: 'teal',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-800',
    iconBg: 'bg-teal-100 dark:bg-teal-900',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'text-teal-600 dark:text-teal-400',
  },
  {
    to: '/stories',
    icon: Book,
    title: 'Popular Stories',
    description: 'The greatest stories of Scripture — retold with context and meaning.',
    color: 'orange',
    bgLight: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    iconBg: 'bg-orange-100 dark:bg-orange-900',
    iconColor: 'text-orange-600 dark:text-orange-400',
    accent: 'text-orange-600 dark:text-orange-400',
  },
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
    to: '/hallowed',
    icon: Sparkles,
    title: 'Hallowed Band',
    description: 'Original Christian music from the Hallowed Band — Spirit-filled worship.',
    color: 'blue',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accent: 'text-blue-600 dark:text-blue-400',
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
];

const quickLinks = [
  { to: '/bible', icon: BookOpen, label: 'Bible Overview' },
  { to: '/guidance', icon: Lightbulb, label: 'Guidance' },
  { to: '/bible-versions', icon: BookOpen, label: 'Bible Versions' },
  { to: '/christian-holidays', icon: Calendar, label: 'Holiday Origins' },
  { to: '/books', icon: BookText, label: 'Books' },
  { to: '/podcasts', icon: Radio, label: 'Podcasts' },
  { to: '/easter', icon: Sparkles, label: 'Easter' },
  { to: '/resurrection', icon: Heart, label: 'Resurrection' },
  { to: '/faqs', icon: HelpCircle, label: 'FAQs' },
  { to: '/timeline', icon: Calendar, label: 'Timeline' },
  { to: '/church-mentors', icon: Users, label: 'Mentors' },
];

const beliefs = [
  { icon: Shield, text: 'Sola Scriptura — Scripture alone as the ultimate authority' },
  { icon: Heart, text: 'One God: Father, Son, and Holy Spirit' },
  { icon: BookOpen, text: 'Jesus Christ is the only way to God' },
  { icon: Lightbulb, text: 'Truth is revealed, not subjective' },
];

export function Welcome() {
  const [showWhoMadeThis, setShowWhoMadeThis] = useState(false);

  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Generated background art */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="rg1" cx="20%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="1" />
                <stop offset="100%" stopColor="#0a0f1e" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="rg2" cx="80%" cy="70%" r="50%">
                <stop offset="0%" stopColor="#1a4060" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rg3" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.12" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <filter id="blur2">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <filter id="starBlur">
                <feGaussianBlur stdDeviation="0.4" />
              </filter>
            </defs>

            {/* Deep night sky base */}
            <rect width="100%" height="100%" fill="url(#rg1)" />
            <rect width="100%" height="100%" fill="url(#rg2)" />
            <rect width="100%" height="100%" fill="url(#rg3)" />

            {/* Subtle cloud wisps */}
            <ellipse cx="20%" cy="55%" rx="30%" ry="12%" fill="#1e3a5f" opacity="0.25" filter="url(#blur2)" />
            <ellipse cx="75%" cy="65%" rx="25%" ry="10%" fill="#1a4060" opacity="0.2" filter="url(#blur2)" />
            <ellipse cx="50%" cy="80%" rx="40%" ry="15%" fill="#0f2240" opacity="0.4" filter="url(#blur2)" />

            {/* Stars - scattered small dots */}
            {[
              [8,5],[15,12],[22,8],[30,15],[38,6],[45,11],[52,4],[60,9],[68,14],[75,7],[82,12],[90,5],[95,10],
              [5,20],[12,25],[19,18],[26,28],[33,22],[40,17],[48,26],[55,20],[63,24],[70,19],[78,27],[85,21],[92,16],
              [3,38],[10,42],[17,35],[24,40],[31,33],[36,45],[43,37],[50,43],[57,36],[65,41],[72,34],[80,44],[88,38],[95,32],
              [7,58],[14,62],[20,55],[28,65],[35,60],[42,56],[50,63],[58,58],[66,64],[73,57],[81,61],[89,55],[94,60],
              [4,72],[11,78],[18,70],[25,75],[32,68],[39,74],[47,79],[54,72],[61,76],[69,71],[76,77],[83,73],[91,68],
              [6,88],[13,92],[21,85],[29,90],[37,87],[44,93],[51,88],[59,91],[67,86],[74,92],[82,88],[90,84],[96,90]
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={i % 5 === 0 ? "1.2" : i % 3 === 0 ? "0.9" : "0.5"}
                fill="white"
                opacity={i % 4 === 0 ? "0.8" : i % 3 === 0 ? "0.5" : "0.3"}
                filter="url(#starBlur)"
              />
            ))}

            {/* Bright star cluster center */}
            <circle cx="50%" cy="36%" r="2.5" fill="white" opacity="0.9" filter="url(#starBlur)" />
            <circle cx="47%" cy="32%" r="1.5" fill="white" opacity="0.6" filter="url(#starBlur)" />
            <circle cx="53%" cy="33%" r="1.2" fill="white" opacity="0.5" filter="url(#starBlur)" />

            {/* Horizon light bar */}
            <rect x="0" y="88%" width="100%" height="12%" fill="url(#rg1)" opacity="0.8" />
            <ellipse cx="50%" cy="92%" rx="50%" ry="6%" fill="#1a3a5f" opacity="0.6" filter="url(#blur2)" />

            {/* Subtle vignette */}
            <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
              <stop offset="60%" stopColor="transparent" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#vignette)" />
          </svg>
        </div>

        {/* Bottom fade to page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-gray-950 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl opacity-30 blur-xl scale-110 bg-amber-400" />
                <img
                  src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
                  alt="The Disciple Co."
                  className="relative w-24 h-24 rounded-2xl object-cover shadow-2xl ring-2 ring-white/20"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
              The Disciple Co.
            </h1>

            <p className="text-lg md:text-xl text-white/75 mb-4 leading-relaxed font-light italic drop-shadow-lg">
              "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
            </p>
            <p className="text-sm text-white/55 mb-10 font-semibold tracking-wide">— Luke 9:23</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/bible"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl hover:shadow-amber-500/30 hover:shadow-2xl transition-all hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                Start with a Bible Overview
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://bible-verse-search-a-5z3m.bolt.host/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all hover:scale-105"
              >
                <Lightbulb className="w-5 h-5" />
                Lookup any Verse
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Explore the Faith</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Start with what matters most to you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.to}
                to={section.to}
                className={`group flex flex-col gap-4 p-6 rounded-2xl border-2 ${section.bgLight} ${section.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
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
              </Link>
            );
          })}
        </div>
      </section>

      {/* VERSE BANNER */}
      <section className="theme-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-3xl md:text-4xl font-bold text-white leading-relaxed mb-4">
            "The Lord saw how great the wickedness of the human race had become on the earth, and that every inclination of the thoughts of the human heart was only evil all the time."
          </p>
          <p className="text-white/80 font-semibold text-lg">— Genesis 6:5 (NIV)</p>
        </div>
      </section>

      {/* QUICK LINKS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">More to Discover</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Every section is here to help you find truth.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 theme-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center"
              >
                <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-tight">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* BELIEFS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="theme-card border-2 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What We Believe</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                This isn't necessarily about religion — it's about truth. Not religion for the sake of religion. Not arguments for the sake of winning. Just a path toward truth.
              </p>
              <button
                onClick={() => setShowWhoMadeThis(true)}
                className="inline-flex items-center gap-2 theme-primary-button text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <HelpCircle className="w-4 h-4" />
                Our Story
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

      {/* WHO MADE THIS MODAL */}
      <Modal
        isOpen={showWhoMadeThis}
        onClose={() => setShowWhoMadeThis(false)}
        title="Who made this page?"
      >
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div className="p-4 theme-card border-2 rounded-lg">
            <p className="text-lg">
              <span className="font-bold text-gray-900 dark:text-white">This isn't necessarily about religion—it's about truth.</span>
            </p>
          </div>

          <p className="text-base">
            Sometimes we don't fit neatly into a single denomination. Sometimes labels are too much. I feel like sometimes that is the wrong thing to search for, especially if you are just beginning.
          </p>

          <p className="text-base">
            I fall somewhere between Catholic, Orthodox, and Protestant traditions—respecting the depth of history, structure, and tradition they carry, while holding firmly to Scripture as the ultimate authority. People are forever sinners, including the people who make Church decisions. I respect deeply the traditions of the Catholic Church and how these traditions can be turned into habits. I also realize that it is hard to fully support something, if part of it is broken or mis-represented.
          </p>

          <div className="p-4 theme-card border-2 rounded-lg space-y-2">
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe in 'Sola Scriptura'</span></p>
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe truth is not subjective—it is revealed.</span></p>
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe in one God, existing as Father, Son, and Holy Spirit.</span></p>
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe that Jesus Christ is the only way to God—not one option among many, but the way.</span></p>
          </div>

          <p className="text-base">
            <span className="font-bold text-gray-900 dark:text-white">My foundation is the Scripture.</span>
          </p>

          <p className="text-base">
            If we can help anyone walk through life's biggest questions without pressure, without confusion, and without relying on blind Church traditions or personal opinions, then we have succeeded.
          </p>

          <div className="p-4 theme-card border-2 rounded-lg space-y-1">
            <p className="text-base font-semibold text-gray-900 dark:text-white">Not religion for the sake of religion.</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">Not arguments for the sake of winning.</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">Just a path toward truth.</p>
          </div>

          <p className="text-base">
            I am simply a man, a sinner just like you, trying to spread understanding and bring clarity to what religions are and how the bible is the undisputed champion in life.
          </p>

          <p className="text-base italic">
            I started this website while trying to answer my own questions about faith, the Church and God in my own life. I realized quickly that I needed to share factual information (as I know it), and give it to others. My goal is to represent what being a Christian means in full truth as I know it from the teachings of the Holy Bible.
          </p>
        </div>
      </Modal>
    </div>
  );
}
