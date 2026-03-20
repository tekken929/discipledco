import { Link } from 'react-router-dom';
import { BookOpen, Users, FolderOpen, Facebook, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    {
      to: '/bible-versions',
      icon: BookOpen,
      title: 'Bible Versions',
      description: 'Which one should I use?'
    },
    {
      to: '/religions',
      icon: FolderOpen,
      title: 'Religions',
      description: 'How the early Churches split into different groups'
    },
    {
      to: '/topics',
      icon: MessageCircle,
      title: 'Biblical Topics',
      description: 'Guidance on marriage, sin, relationships & more'
    },
    {
      to: '/faqs',
      icon: Users,
      title: 'FAQs',
      description: 'Some of your common questions answered.'
    }
  ];

  return (
    <footer className="theme-card border-t border-gray-200 dark:border-gray-700 mt-12 print:hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {footerLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="theme-card border-2 rounded-xl p-4 hover:shadow-lg transition-all group hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="theme-primary-button p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{link.title}</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{link.description}</div>
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
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            © 2026 Discipled Co. | Clear, structured overviews of the Bible and how to break free from this world.
          </p>
        </div>
      </div>
    </footer>
  );
}
