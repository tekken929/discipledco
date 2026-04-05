import { Link } from 'react-router-dom';
import { BookOpen, Users, FolderOpen, Facebook, Instagram, MessageCircle, Book, Music, Mic, BookText, UserCheck, Radio, Calendar, Lightbulb, Sparkles, Cross } from 'lucide-react';
import { Modal } from './Modal';
import { useState } from 'react';
import { AdminPortal } from '../pages/AdminPortal';

export function Footer() {
  const [showWhoMadeThis, setShowWhoMadeThis] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const footerLinks = [
    {
      to: '/bible',
      icon: BookOpen,
      title: 'Bible Overview',
      description: 'Book order, chapters, and summaries of all 66 books'
    },
    {
      to: '/topics',
      icon: MessageCircle,
      title: 'Everyday Topics',
      description: 'Guidance on marriage, sin, relationships & more'
    },
    {
      to: '/religions',
      icon: FolderOpen,
      title: 'What is Religion',
      description: 'How the early Churches split into denominations'
    },
    {
      to: '/bible-versions',
      icon: BookOpen,
      title: 'Versions of the Bible',
      description: 'Translation philosophy and which one to use'
    },
    {
      to: '/stories',
      icon: Book,
      title: 'Popular Stories',
      description: 'Popular stories from Scripture with summaries'
    },
    {
      to: '/music',
      icon: Music,
      title: 'Music Jukebox',
      description: 'Original songs from the Book of Psalms'
    },
    {
      to: '/christian-holidays',
      icon: Calendar,
      title: 'Holiday Origins',
      description: 'True origins of Easter, Christmas & more'
    },
    {
      to: '/preaching',
      icon: Mic,
      title: 'Wisdom',
      description: 'Powerful preaching and biblical teachings'
    },
    {
      to: '/books',
      icon: BookText,
      title: 'Books',
      description: 'Christian books and resources'
    },
    {
      to: '/church-mentors',
      icon: UserCheck,
      title: 'Mentors',
      description: 'Connect with spiritual mentors'
    },
    {
      to: '/podcasts',
      icon: Radio,
      title: 'Podcasts',
      description: 'Faith, theology, and Christian living'
    },
    {
      to: '/guidance',
      icon: Lightbulb,
      title: 'Guidance',
      description: 'Biblical answers to life questions'
    },
    {
      to: '/easter',
      icon: Sparkles,
      title: 'Easter',
      description: 'The biblical story of Easter'
    },
    {
      to: '/resurrection',
      icon: Cross,
      title: 'Resurrection',
      description: 'Jesus Christ and the resurrection'
    }
  ];

  return (
    <footer className="theme-card border-t border-gray-200 dark:border-gray-700 mt-12 print:hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {footerLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="theme-card border-2 rounded-xl p-6 hover:shadow-lg transition-all group hover:scale-105 flex flex-col h-full"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="theme-primary-button p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{link.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{link.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-card border-2 p-3 rounded-lg transition-all hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6 theme-accent" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-card border-2 p-3 rounded-lg transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 theme-accent" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-card border-2 p-3 rounded-lg transition-all hover:scale-110"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6 theme-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-card border-2 p-3 rounded-lg transition-all hover:scale-110"
              aria-label="Support on Patreon"
              title="Support on Patreon"
            >
              <svg className="w-6 h-6 theme-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
              </svg>
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              © 2026 The Disciple Co. | Clear, structured overviews of the Bible and how to break free from this world.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowAdminPortal(true)}
                className="underline hover:text-gray-900 dark:hover:text-white transition-colors text-xs text-gray-500 dark:text-gray-400"
              >
                admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAdminPortal && (
        <AdminPortal onClose={() => setShowAdminPortal(false)} />
      )}

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
    </footer>
  );
}
