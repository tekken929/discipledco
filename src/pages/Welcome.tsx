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
    to: '/bible',
    icon: BookOpen,
    title: 'Bible Overview',
    description: 'Explore all 66 books with chapter summaries, timelines, and key themes.',
    color: 'blue',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accent: 'text-blue-600 dark:text-blue-400',
  },
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
    to: '/guidance',
    icon: Lightbulb,
    title: 'Guidance',
    description: 'Search for biblical answers to life\'s most important questions.',
    color: 'green',
    bgLight: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    iconBg: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
    accent: 'text-green-600 dark:text-green-400',
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
];

const quickLinks = [
  { to: '/bible-versions', icon: BookOpen, label: 'Bible Versions' },
  { to: '/christian-holidays', icon: Calendar, label: 'Holiday Origins' },
  { to: '/preaching', icon: Mic, label: 'Wisdom' },
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
        <div className="theme-primary-bg absolute inset-0 opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 theme-primary-bg rounded-2xl opacity-20 blur-xl scale-110" />
                <img
                  src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
                  alt="The Disciple Co."
                  className="relative w-24 h-24 rounded-2xl object-cover shadow-xl"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              The Disciple Co.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-light italic">
              "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 font-medium">— Luke 9:23</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/bible"
                className="inline-flex items-center gap-2 theme-primary-button text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                Start with the Bible
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setShowWhoMadeThis(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base border-2 theme-card text-gray-700 dark:text-gray-200 hover:shadow-md transition-all hover:scale-105"
              >
                <HelpCircle className="w-5 h-5" />
                Who Made This?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 dark:border-gray-700" />
      </div>

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
