import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, BookOpen, MessageCircle, FolderOpen, Book, Music, Sparkles, Mic, BookText, UserCheck, Radio, Calendar, Lightbulb, GraduationCap, HelpCircle, Image, Wind, Globe, RefreshCw, Clock, Users, Home as HomeIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDarkMode } from './context/DarkModeContext';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import { HeroThemeProvider, useHeroTheme } from './context/HeroThemeContext';
import { Footer } from './components/Footer';
import { OnboardingQuestions } from './components/OnboardingQuestions';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { BibleVersions } from './pages/BibleVersions';
import { Religions } from './pages/Religions';
import { FAQs } from './pages/FAQs';
import { Topics } from './pages/Topics';
import { Stories } from './pages/Stories';
import { Music as MusicPage } from './pages/Music';
import { Preaching } from './pages/Preaching';
import { Books } from './pages/Books';
import BookReader from './pages/BookReader';
import { ChurchMentors } from './pages/ChurchMentors';
import { Podcasts } from './pages/Podcasts';
import { Timeline } from './pages/Timeline';
import { BibleAuthors } from './pages/BibleAuthors';
import { ChristianHolidays } from './pages/ChristianHolidays';
import { Resurrection } from './pages/Resurrection';
import { Easter } from './pages/Easter';
import { Hallowed } from './pages/Hallowed';
import Guidance from './pages/Guidance';
import { Courses } from './pages/Courses';
import { CourseModule } from './pages/CourseModule';
import { BibleLookup } from './pages/BibleLookup';
import { BibleStudies } from './pages/BibleStudies';
import { VerseOfTheDay } from './pages/VerseOfTheDay';
import { VersesOnSadness } from './pages/VersesOnSadness';
import Prayer from './pages/Prayer';
import { AppDownload } from './pages/AppDownload';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { books } from './data/books';
import { Book as BookType } from './types/book';
import { useNavbarScroll } from './hooks/useScrollAnimation';
import './resurrection.css';
import './hallowed.css';


interface MenuLink {
  to: string;
  label: string;
  icon: React.ElementType;
  external?: boolean;
  comingSoon?: boolean;
}

interface MenuSection {
  heading: string;
  links: MenuLink[];
}

const menuSections: MenuSection[] = [
  {
    heading: 'Bible',
    links: [
      { to: '/bible', label: 'Bible Overview', icon: BookOpen },
      { to: '/courses', label: 'Foundation Course', icon: GraduationCap },
      { to: '/timeline', label: 'Historical Timeline', icon: Clock },
    ],
  },
  {
    heading: 'Learn & Explore',
    links: [
      { to: '/religions', label: 'Religions Explained', icon: FolderOpen },
      { to: '/bible-versions', label: 'Bible Versions', icon: BookText },
      { to: '/bible-lookup', label: 'Verse Lookup', icon: Lightbulb },
      { to: '/preaching', label: 'Preaching & Wisdom', icon: Mic },
      { to: '/topics', label: 'Biblical Topics', icon: MessageCircle },
      { to: '/bible-authors', label: 'Bible Authors', icon: Users },
    ],
  },
  {
    heading: 'In Development',
    links: [
      { to: '/prayer', label: 'Daily Prayer', icon: Wind },
      { to: '/stories', label: 'Bible Stories', icon: Book, comingSoon: true },
      { to: '/bible-studies', label: 'Bible Studies', icon: BookOpen, comingSoon: true },
      { to: '/christian-holidays', label: 'Holiday Origins', icon: Calendar },
      { to: '/resurrection', label: 'The Resurrection', icon: BookOpen },
      { to: '/music', label: 'Music Player', icon: Music, comingSoon: true },
      { to: '/faqs', label: 'FAQs', icon: HelpCircle, comingSoon: true },
      { to: '#', label: 'Media Library', icon: Image, comingSoon: true },
    ],
  },
  {
    heading: 'More Resources',
    links: [
      { to: '/guidance', label: 'Guidance & Q&A', icon: BookOpen },
      { to: '/church-mentors', label: 'Church Mentors', icon: UserCheck },
      { to: '/hallowed', label: 'Hallowed Music', icon: Sparkles },
      { to: '/podcasts', label: 'Podcasts', icon: Radio },
      { to: '/books', label: 'Books Library', icon: BookText },
      { to: '/easter', label: 'Easter Special', icon: Sparkles },
      { to: '/verse-of-the-day', label: 'Verse of the Day', icon: Image },
      { to: 'https://modern-bcp-prayer-ex-mhio.bolt.host', label: 'Common Prayer', icon: BookOpen, external: true },
    ],
  },
];

function TopNav() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const isScrolled = useNavbarScroll(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.update()));
      }
    } catch (_) {
      // ignore errors, still reload
    }
    window.location.reload();
  };

  const isResurrectionPage = location.pathname === '/resurrection';
  const isEasterPage = location.pathname === '/easter';
  const isHallowedPage = location.pathname === '/hallowed';
  const isMusicPage = location.pathname === '/music';
  const isAppPage = location.pathname === '/app';

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (isResurrectionPage || isEasterPage || isHallowedPage || isMusicPage || location.pathname === '/app' || location.pathname === '/privacy') return null;

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-200 print:hidden theme-card border-b ${
      isScrolled ? 'shadow-sm' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-14">

          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
            >
              <img
                src="/images/Untitled_design_(34)_Large.jpeg"
                alt="The Disciple Company"
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg object-cover"
              />
              <div className="block">
                <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight leading-tight">The Disciple Company</span>
              </div>
            </Link>
          </div>


          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* Home */}
            <Link
              to="/"
              className={`flex items-center gap-1.5 rounded-full text-xs font-bold px-3 py-1.5 transition-colors flex-shrink-0 ${
                location.pathname === '/'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'border border-gray-300 dark:border-white/20 bg-transparent dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30'
              }`}
              aria-label="Home"
              title="Home"
            >
              <HomeIcon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Website link */}
            <a
              href="https://thediscipleco.org"
              className="flex items-center gap-1.5 rounded-full text-xs font-bold px-3 py-1.5 border border-gray-300 dark:border-white/20 bg-transparent dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-colors flex-shrink-0"
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Website</span>
            </a>

            {/* App Store download */}
            <a
              href="/app"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-full text-xs font-bold px-3 py-1.5 transition-colors flex-shrink-0 ${
                isAppPage
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'border border-gray-300 dark:border-white/20 bg-transparent dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30'
              }`}
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="hidden sm:inline">App</span>
            </a>

            {/* Dark / Light mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 rounded-full text-xs font-bold px-3 py-1.5 border border-gray-300 dark:border-white/20 bg-transparent dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-colors flex-shrink-0"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
              <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
            </button>

            {/* Refresh / check for update */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 rounded-full text-xs font-bold px-3 py-1.5 border border-gray-300 dark:border-white/20 bg-transparent dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Check for updates"
              title="Check for updates"
            >
              <RefreshCw className={`w-4 h-4 flex-shrink-0 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{refreshing ? 'Updating' : 'Refresh'}</span>
            </button>

            {/* Menu button with all links */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-1.5 rounded-full text-xs font-bold px-3 py-1.5 border border-gray-300 dark:border-white/20 bg-transparent dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-colors flex-shrink-0"
                aria-label="All pages menu"
              >
                {menuOpen ? <X className="w-4 h-4 flex-shrink-0" /> : <Menu className="w-4 h-4 flex-shrink-0" />}
                <span className="hidden sm:inline">Menu</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 theme-card rounded-xl shadow-xl border overflow-hidden z-[200] max-h-[85vh] overflow-y-auto">
                  {menuSections.map((section, i) => (
                    <div key={section.heading} className={i > 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''}>
                      <div className="px-4 pt-3 pb-1 sticky top-0 theme-card">
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{section.heading}</p>
                      </div>
                      <nav className="pb-2">
                      {section.links.map((link) => {
                          const Icon = link.icon;
                          const isActive = !link.external && !link.comingSoon && location.pathname === link.to;
                          if (link.comingSoon) {
                            return (
                              <div
                                key={link.label}
                                className="flex items-center justify-between px-4 py-2.5 opacity-45 cursor-not-allowed select-none"
                              >
                                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-500 text-sm font-medium">
                                  <Icon className="w-4 h-4 flex-shrink-0" />
                                  {link.label}
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wide">Soon</span>
                              </div>
                            );
                          }
                          if (link.external) {
                            return (
                              <a
                                key={link.label}
                                href={link.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:pl-6"
                              >
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                {link.label}
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={link.label}
                              to={link.to}
                              onClick={() => setMenuOpen(false)}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all ${
                                isActive
                                  ? 'theme-primary-button text-white'
                                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:pl-6'
                              }`}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              {link.label}
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </header>
  );
}

function AppContent() {
  const { darkMode } = useDarkMode();
  const { heroTheme } = useHeroTheme();
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState<BookType>(books[0]);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('onboardingCompleted') === 'true';
  });

  const isResurrectionPage = location.pathname === '/resurrection';
  const isEasterPage = location.pathname === '/easter';
  const isHallowedPage = location.pathname === '/hallowed';
  const isMusicPage = location.pathname === '/music';
  const isAppPage = location.pathname === '/app';
  const isPrivacyPage = location.pathname === '/privacy';
  const isSpecialPage = isResurrectionPage || isEasterPage || isHallowedPage || isMusicPage || isAppPage || isPrivacyPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setHasCompletedOnboarding(true);
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setHasCompletedOnboarding(true);
  };

  if (!hasCompletedOnboarding && !isAppPage && !isPrivacyPage) {
    return (
      <OnboardingQuestions
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  return (
    <div className="min-h-screen theme-background transition-colors flex flex-col" data-hero-theme={heroTheme}>
      {!isSpecialPage && <div className="grain-overlay" />}

      <TopNav />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/bible" element={<Home selectedBook={selectedBook} />} />
          <Route path="/bible-versions" element={<BibleVersions />} />
          <Route path="/religions" element={<Religions />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId" element={<Topics />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:storyId" element={<Stories />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/preaching" element={<Preaching />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookReader />} />
          <Route path="/church-mentors" element={<ChurchMentors />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/bible-authors" element={<BibleAuthors />} />
          <Route path="/christian-holidays" element={<ChristianHolidays />} />
          <Route path="/resurrection" element={<Resurrection />} />
          <Route path="/easter" element={<Easter />} />
          <Route path="/hallowed" element={<Hallowed />} />
          <Route path="/guidance" element={<Guidance />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/module/:moduleId" element={<CourseModule />} />
          <Route path="/bible-lookup" element={<BibleLookup />} />
          <Route path="/bible-studies" element={<BibleStudies />} />
          <Route path="/bible-studies/:studyId" element={<BibleStudies />} />
          <Route path="/verse-of-the-day" element={<VerseOfTheDay />} />
          <Route path="/verses-on-sadness" element={<VersesOnSadness />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/app" element={<AppDownload />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>

      {!isSpecialPage && <Footer />}
      {!isSpecialPage && <FloatingMusicPlayer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <HeroThemeProvider>
        <MusicPlayerProvider>
          <AppContent />
        </MusicPlayerProvider>
      </HeroThemeProvider>
    </Router>
  );
}

export default App;
