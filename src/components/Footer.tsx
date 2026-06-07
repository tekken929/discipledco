import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';
import { Modal } from './Modal';
import { useState } from 'react';
import { AdminPortal } from '../pages/AdminPortal';

const footerColumns = [
  {
    heading: 'Bible',
    links: [
      { to: '/bible', label: 'Bible Overview' },
      { to: '/bible-versions', label: 'Bible Versions' },
      { to: '/bible-lookup', label: 'Lookup a Verse' },
      { to: '/bible-studies', label: 'Bible Studies', comingSoon: true },
      { to: '/verse-of-the-day', label: 'Verse of the Day' },
      { to: '/courses', label: 'Foundation Course' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { to: '/religions', label: 'What is Religion' },
      { to: '/topics', label: 'Everyday Topics' },
      { to: '/stories', label: 'Popular Stories' },
      { to: '/preaching', label: 'Wisdom' },
      { to: '/guidance', label: 'Guidance', comingSoon: true },
      { to: '/church-mentors', label: 'Mentors', comingSoon: true },
    ],
  },
  {
    heading: 'Features',
    links: [
      { to: '/prayer', label: 'Daily Prayer' },
      { to: '/christian-holidays', label: 'Holiday Origins' },
      { to: '/music', label: 'Music Jukebox', comingSoon: true },
      { to: '/faqs', label: 'FAQs', comingSoon: true },
      { to: '#', label: 'Media', comingSoon: true },
    ],
  },
  {
    heading: 'More',
    links: [
      { to: '/hallowed', label: 'Hallowed Band' },
      { to: '/podcasts', label: 'Podcasts' },
      { to: '/books', label: 'Books' },
      { to: '/easter', label: 'Easter' },
      { to: '/resurrection', label: 'Resurrection' },
    ],
  },
];

export function Footer() {
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  return (
    <footer className="border-t border-stone-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-16 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img
                src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
                alt="The Disciple Co."
                className="w-7 h-7 rounded-md object-cover"
              />
              <span className="text-sm font-bold text-gray-900 dark:text-white">The Disciple Co.</span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              A path toward truth — not religion for religion's sake.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.patreon.com/cw/Disciple929/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                aria-label="Patreon"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerColumns.map(col => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.to + link.label}>
                    {link.comingSoon ? (
                      <span className="text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50 select-none">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2026 The Disciple Co. · How to break free from this world.
          </p>
          <button
            onClick={() => setShowAdminPortal(true)}
            className="text-xs text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-500 transition-colors"
          >
            admin
          </button>
        </div>
      </div>

      {showAdminPortal && (
        <AdminPortal onClose={() => setShowAdminPortal(false)} />
      )}
    </footer>
  );
}
