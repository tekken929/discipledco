import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Palette, Moon, Sun, Music, Mic, BookText, UserCheck, Radio, Sparkles, Lightbulb, Calendar, Clock, HelpCircle } from 'lucide-react';
import { ColorTheme } from '../context/DarkModeContext';
import { useNavbarScroll } from '../hooks/useScrollAnimation';
import { useBubbles } from '../context/BubblesContext';

interface NavigationMenuProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  colorTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

interface NavLink {
  to: string;
  icon: React.ElementType;
  title: string;
  external?: boolean;
}

interface NavSection {
  heading: string;
  links: NavLink[];
}

const sections: NavSection[] = [
  {
    heading: 'Bible',
    links: [
      { to: '/bible', icon: BookOpen, title: 'Bible Overview' },
      { to: '/bible-versions', icon: BookOpen, title: 'Bible Versions' },
      { to: 'https://bible-verse-search-a-5z3m.bolt.host/', icon: Lightbulb, title: 'Lookup any Verse', external: true },
    ],
  },
  {
    heading: 'Religion',
    links: [
      { to: '/religions', icon: FolderOpen, title: 'What is Religion' },
      { to: '/topics', icon: MessageCircle, title: 'Everyday Topics' },
      { to: '/stories', icon: Book, title: 'Popular Stories' },
      { to: '/guidance', icon: BookOpen, title: 'Guidance' },
      { to: '/church-mentors', icon: UserCheck, title: 'Mentors' },
    ],
  },
  {
    heading: 'Music',
    links: [
      { to: '/music', icon: Music, title: 'Music Jukebox' },
      { to: '/hallowed', icon: Sparkles, title: 'Hallowed Band' },
      { to: '/podcasts', icon: Radio, title: 'Podcasts' },
      { to: '/preaching', icon: Mic, title: 'Wisdom' },
    ],
  },
  {
    heading: 'Information',
    links: [
      { to: '/timeline', icon: Clock, title: 'Timeline' },
      { to: '/christian-holidays', icon: Calendar, title: 'Holiday Origins' },
      { to: '/easter', icon: Sparkles, title: 'Easter' },
      { to: '/resurrection', icon: BookOpen, title: 'Resurrection' },
      { to: '/books', icon: BookText, title: 'Books' },
      { to: '/faqs', icon: HelpCircle, title: 'FAQs' },
    ],
  },
];

export function NavigationMenu({ darkMode, toggleDarkMode, colorTheme, onThemeChange }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const location = useLocation();
  const isScrolled = useNavbarScroll(100);
  const { bubblesEnabled, toggleBubbles } = useBubbles();

  useEffect(() => {
    setIsOpen(false);
    setShowThemeMenu(false);
  }, [location.pathname]);

  const renderLink = (link: NavLink) => {
    const Icon = link.icon;
    const isActive = !link.external && location.pathname === link.to;

    if (link.external) {
      return (
        <a
          key={link.to}
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-2.5 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white hover:pl-6"
        >
          <Icon className="w-4 h-4" />
          <span className="font-medium text-sm">{link.title}</span>
        </a>
      );
    }

    return (
      <Link
        key={link.to}
        to={link.to}
        onClick={() => setIsOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 transition-all duration-300 ${
          isActive
            ? 'theme-primary-button text-white nav-link-active'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white hover:pl-6'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="font-medium text-sm">{link.title}</span>
      </Link>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`btn-cinematic flex items-center justify-center gap-2 theme-card border-2 text-gray-900 dark:text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg ${
          isScrolled ? 'shadow-xl' : ''
        }`}
        aria-label="Navigation menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        <span className="hidden sm:inline">Menu</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 theme-card rounded-lg shadow-2xl border-2 overflow-hidden z-50 max-h-[85vh] overflow-y-auto">

          {sections.map((section, i) => (
            <div key={section.heading} className={i > 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''}>
              <div className="px-4 pt-3 pb-1">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{section.heading}</p>
              </div>
              <nav className="pb-2">
                {section.links.map(renderLink)}
              </nav>
            </div>
          ))}

          <div className="border-t border-gray-200 dark:border-gray-700 py-2">
            <div className="px-4 pt-2 pb-1">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Settings</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowThemeMenu(!showThemeMenu);
              }}
              className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4" />
                <span className="font-medium text-sm">Theme</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{colorTheme}</span>
            </button>

            {showThemeMenu && (
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 space-y-1">
                <button
                  onClick={() => { onThemeChange('subtle'); setShowThemeMenu(false); }}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${colorTheme === 'subtle' ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
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
                  onClick={() => { onThemeChange('happy'); setShowThemeMenu(false); }}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${colorTheme === 'happy' ? 'bg-amber-200 dark:bg-orange-900' : 'hover:bg-amber-50 dark:hover:bg-orange-950'}`}
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
                  onClick={() => { onThemeChange('blackwhite'); setShowThemeMenu(false); }}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${colorTheme === 'blackwhite' ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-900'}`}
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
              onClick={toggleDarkMode}
              className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="font-medium text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
            </button>

            <button
              onClick={toggleBubbles}
              className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium text-sm">Floating Bubbles</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${bubblesEnabled ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                {bubblesEnabled ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
