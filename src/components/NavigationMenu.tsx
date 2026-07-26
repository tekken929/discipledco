import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Moon, Sun, Music, Mic, BookText, UserCheck, Radio, Sparkles, Lightbulb, Calendar, HelpCircle, Wind, GraduationCap, Image, Lock, Clock } from 'lucide-react';
import { ColorTheme } from '../context/DarkModeContext';
import { useNavbarScroll } from '../hooks/useScrollAnimation';
import { useBubbles } from '../context/BubblesContext';

interface NavigationMenuProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavLink {
  to: string;
  icon: React.ElementType;
  title: string;
  external?: boolean;
  comingSoon?: boolean;
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
      { to: '/courses', icon: GraduationCap, title: 'Foundation Course' },
      { to: '/timeline', icon: Clock, title: 'Historical Timeline' },
    ],
  },
  {
    heading: 'Learn & Explore',
    links: [
      { to: '/religions', icon: FolderOpen, title: 'Religions Explained' },
      { to: '/bible-versions', icon: BookOpen, title: 'Bible Versions' },
      { to: '/bible-lookup', icon: Lightbulb, title: 'Verse Lookup' },
      { to: '/preaching', icon: Mic, title: 'Preaching & Wisdom' },
      { to: '/topics', icon: MessageCircle, title: 'Biblical Topics' },
      { to: '/bible-authors', icon: Users, title: 'Bible Authors' },
    ],
  },
  {
    heading: 'In Development',
    links: [
      { to: '/prayer', icon: Wind, title: 'Daily Prayer' },
      { to: '/stories', icon: Book, title: 'Bible Stories' },
      { to: '/bible-studies', icon: BookOpen, title: 'Bible Studies' },
      { to: '/christian-holidays', icon: Calendar, title: 'Holiday Origins' },
      { to: '/resurrection', icon: BookOpen, title: 'The Resurrection' },
      { to: '/music', icon: Music, title: 'Music Player', comingSoon: true },
      { to: '/faqs', icon: HelpCircle, title: 'FAQs', comingSoon: true },
      { to: '#', icon: Image, title: 'Media Library', comingSoon: true },
    ],
  },
  {
    heading: 'More Resources',
    links: [
      { to: '/guidance', icon: BookOpen, title: 'Guidance & Q&A' },
      { to: '/church-mentors', icon: UserCheck, title: 'Church Mentors' },
      { to: '/hallowed', icon: Sparkles, title: 'Hallowed Music' },
      { to: '/podcasts', icon: Radio, title: 'Podcasts' },
      { to: '/books', icon: BookText, title: 'Books Library' },
      { to: '/easter', icon: Sparkles, title: 'Easter Special' },
      { to: '/verse-of-the-day', icon: BookOpen, title: 'Verse of the Day' },
      { to: 'https://modern-bcp-prayer-ex-mhio.bolt.host', icon: BookOpen, title: 'Common Prayer', external: true },
    ],
  },
];

export function NavigationMenu({ darkMode, toggleDarkMode }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useNavbarScroll(100);
  const { bubblesEnabled, toggleBubbles } = useBubbles();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const renderLink = (link: NavLink) => {
    const Icon = link.icon;
    const isActive = !link.external && !link.comingSoon && location.pathname === link.to;

    if (link.comingSoon) {
      return (
        <div
          key={link.title}
          className="flex items-center justify-between px-4 py-2.5 opacity-45 cursor-not-allowed select-none"
        >
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-500">
            <Icon className="w-4 h-4" />
            <span className="font-medium text-sm">{link.title}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wide">
            <Lock className="w-2.5 h-2.5" /> Soon
          </div>
        </div>
      );
    }

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
