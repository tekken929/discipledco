import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, HelpCircle, Home } from 'lucide-react';

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navigationLinks = [
    {
      to: '/',
      icon: Home,
      title: 'Welcome'
    },
    {
      to: '/bible',
      icon: BookOpen,
      title: 'Bible Overview'
    },
    {
      to: '/bible-versions',
      icon: BookOpen,
      title: 'Bible Versions'
    },
    {
      to: '/topics',
      icon: MessageCircle,
      title: 'Biblical Topics'
    },
    {
      to: '/stories',
      icon: Book,
      title: 'Bible Stories'
    },
    {
      to: '/religions',
      icon: FolderOpen,
      title: 'Religions'
    },
    {
      to: '/faqs',
      icon: Users,
      title: 'FAQs'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 theme-card border-2 hover:opacity-80 text-gray-900 dark:text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
        aria-label="Navigation menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        <span className="hidden sm:inline">Menu</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 theme-card rounded-lg shadow-2xl border-2 overflow-hidden z-50">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Navigation</p>
          </div>
          <nav className="py-2">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r theme-primary text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
