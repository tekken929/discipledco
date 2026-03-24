import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Home, Palette, Moon, Sun } from 'lucide-react';
import { ColorTheme } from '../context/DarkModeContext';

interface NavigationMenuProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  colorTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export function NavigationMenu({ darkMode, toggleDarkMode, colorTheme, onThemeChange }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setShowThemeMenu(false);
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
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'theme-primary-button text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-700 py-2">
            <div className="px-2">
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-2 mb-2">Settings</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowThemeMenu(!showThemeMenu);
              }}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5" />
                <span className="font-medium">Theme</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{colorTheme}</span>
            </button>

            {showThemeMenu && (
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 space-y-1">
                <button
                  onClick={() => {
                    onThemeChange('subtle');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${
                    colorTheme === 'subtle' ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-400 to-blue-500"></div>
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-slate-600"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Subtle</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onThemeChange('happy');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${
                    colorTheme === 'happy' ? 'bg-amber-200 dark:bg-orange-900' : 'hover:bg-amber-50 dark:hover:bg-orange-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-teal-500"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Happy</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onThemeChange('blackwhite');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${
                    colorTheme === 'blackwhite' ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-400"></div>
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-gray-300 border border-gray-400"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">B&W</span>
                  </div>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                toggleDarkMode();
              }}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
