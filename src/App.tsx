import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, BookOpen, MessageCircle, FolderOpen, Book, Music, Palette, Sparkles, Mic, BookText, UserCheck, Radio, Calendar, Lightbulb, GraduationCap, HelpCircle, Image, Wind, Globe, RefreshCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDarkMode, ColorTheme } from './context/DarkModeContext';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
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
    ],
  },
  {
    heading: 'Gain Knowledge',
    links: [
      { to: '/religions', label: 'What is Religion', icon: FolderOpen },
      { to: '/bible-versions', label: 'Bible Versions', icon: BookText },
      { to: '/bible-lookup', label: 'Lookup Any Verse', icon: Lightbulb },
      { to: '/preaching', label: 'Wisdom', icon: Mic },
      { to: '/bible-studies', label: 'Bible Studies', icon: BookOpen, comingSoon: true },
    ],
  },
  {
    heading: 'Being Developed',
    links: [
      { to: '/prayer', label: 'Daily Prayer', icon: Wind },
      { to: '/christian-holidays', label: 'Holiday Origins', icon: Calendar },
      { to: '/music', label: 'Music Jukebox', icon: Music, comingSoon: true },
      { to: '/faqs', label: 'FAQs', icon: HelpCircle, comingSoon: true },
      { to: '#', label: 'Media', icon: Image, comingSoon: true },
    ],
  },
  {
    heading: 'Misc',
    links: [
      { to: '/topics', label: 'Everyday Topics', icon: MessageCircle },
      { to: '/stories', label: 'Popular Stories', icon: Book },
      { to: '/guidance', label: 'Guidance', icon: BookOpen },
      { to: '/church-mentors', label: 'Mentors', icon: UserCheck },
      { to: '/hallowed', label: 'Hallowed Band', icon: Sparkles },
      { to: '/podcasts', label: 'Podcasts', icon: Radio },
      { to: '/books', label: 'Books', icon: BookText },
      { to: '/easter', label: 'Easter', icon: Sparkles },
      { to: '/resurrection', label: 'Resurrection', icon: BookOpen },
      { to: '/verse-of-the-day', label: 'Verse of the Day', icon: Image },
      { to: '/bible-authors', label: 'Bible Authors', icon: BookOpen },
      { to: 'https://modern-bcp-prayer-ex-mhio.bolt.host', label: 'Common Prayer', icon: BookOpen, external: true },
    ],
  },
];

function TopNav() {
  const { darkMode, toggleDarkMode, colorTheme, setColorTheme } = useDarkMode();
  const location = useLocation();
  const isScrolled = useNavbarScroll(60);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    setSettingsOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
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
        <div className="flex items-center justify-between h-14">

          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <img
              src="/images/Untitled_design_(34)_Large.jpeg"
              alt="The Disciple Co."
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight">The Disciple Co.</span>
            </div>
          </Link>


          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* Refresh / check for update */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 p-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
              aria-label="Check for updates"
              title="Check for updates"
            >
              <RefreshCw className={`w-4 h-4 flex-shrink-0 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            {/* Website link */}
            <a
              href="https://thediscipleco.org"
              className="flex items-center gap-1.5 p-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Website</span>
            </a>

            {/* App Store download */}
            <Link
              to="/app"
              className="flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-2.5 py-1.5 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="hidden sm:inline">Download</span>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Settings */}
            <div ref={settingsRef} className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center gap-1.5 p-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Settings"
              >
                <Palette className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Theme</span>
              </button>
              {settingsOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 theme-card rounded-xl shadow-xl border overflow-hidden z-[200]">
                  <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color Theme</p>
                  </div>
                  <div className="p-2 space-y-0.5">
                    {([
                      { id: 'subtle',     label: 'Parchment',   dot1: 'bg-stone-200 border border-stone-300',  dot2: 'bg-amber-600' },
                      { id: 'happy',      label: 'Warm Amber',  dot1: 'bg-amber-400',                          dot2: 'bg-orange-500' },
                      { id: 'ocean',      label: 'Ocean',       dot1: 'bg-sky-200 border border-sky-300',       dot2: 'bg-sky-600' },
                      { id: 'dusk',       label: 'Dusk',        dot1: 'bg-rose-100 border border-rose-200',     dot2: 'bg-rose-700' },
                      { id: 'blackwhite', label: 'Ink',         dot1: 'bg-white border border-gray-400',        dot2: 'bg-gray-900 border border-gray-600' },
                    ] as { id: ColorTheme; label: string; dot1: string; dot2: string }[]).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setColorTheme(t.id); setSettingsOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                          colorTheme === t.id ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex gap-1 flex-shrink-0">
                          <div className={`w-4 h-4 rounded-full ${t.dot1}`} />
                          <div className={`w-4 h-4 rounded-full ${t.dot2}`} />
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{t.label}</span>
                        {colorTheme === t.id && <span className="ml-auto text-xs font-bold text-blue-500">Active</span>}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={toggleDarkMode}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      <span className="font-semibold">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Menu button with all links */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => { setMenuOpen(!menuOpen); setSettingsOpen(false); }}
                className="flex items-center gap-1.5 p-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="All pages menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
    <div className="min-h-screen theme-background transition-colors flex flex-col">
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
      <MusicPlayerProvider>
        <AppContent />
      </MusicPlayerProvider>
    </Router>
  );
}

export default App;
