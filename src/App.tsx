import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, BookOpen, MessageCircle, FolderOpen, Book, Music, Palette, Sparkles, Mic, BookText, UserCheck, Radio, Calendar, Lightbulb } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDarkMode, ColorTheme } from './context/DarkModeContext';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import { BubblesProvider, useBubbles } from './context/BubblesContext';
import { Footer } from './components/Footer';
import { OnboardingQuestions } from './components/OnboardingQuestions';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import FloatingBubbles from './components/FloatingBubbles';
import CollectedMessagesDropdown from './components/CollectedMessagesDropdown';
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
      { to: '/bible-versions', label: 'Bible Versions', icon: BookOpen },
      { to: 'https://bible-verse-search-a-5z3m.bolt.host/', label: 'Lookup any Verse', icon: Lightbulb, external: true },
    ],
  },
  {
    heading: 'Religion',
    links: [
      { to: '/religions', label: 'What is Religion', icon: FolderOpen },
      { to: '/topics', label: 'Everyday Topics', icon: MessageCircle },
      { to: '/stories', label: 'Popular Stories', icon: Book },
      { to: '/guidance', label: 'Guidance', icon: Lightbulb },
      { to: '/church-mentors', label: 'Mentors', icon: UserCheck },
    ],
  },
  {
    heading: 'Music',
    links: [
      { to: '/music', label: 'Music Jukebox', icon: Music },
      { to: '/hallowed', label: 'Hallowed Band', icon: Sparkles },
      { to: '/podcasts', label: 'Podcasts', icon: Radio },
      { to: '/preaching', label: 'Wisdom', icon: Mic },
    ],
  },
  {
    heading: 'Information',
    links: [
      { to: '/timeline', label: 'Timeline', icon: BookOpen },
      { to: '/christian-holidays', label: 'Holiday Origins', icon: Calendar },
      { to: '/easter', label: 'Easter', icon: Sparkles },
      { to: '/resurrection', label: 'Resurrection', icon: BookOpen },
      { to: '/books', label: 'Books', icon: BookText },
      { to: '/faqs', label: 'FAQs', icon: BookOpen },
    ],
  },
];

function TopNav() {
  const { darkMode, toggleDarkMode, colorTheme, setColorTheme } = useDarkMode();
  const { bubblesEnabled, toggleBubbles } = useBubbles();
  const location = useLocation();
  const isScrolled = useNavbarScroll(60);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isResurrectionPage = location.pathname === '/resurrection';
  const isEasterPage = location.pathname === '/easter';
  const isHallowedPage = location.pathname === '/hallowed';
  const isMusicPage = location.pathname === '/music';

  useEffect(() => {
    setMobileOpen(false);
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

  if (isResurrectionPage || isEasterPage || isHallowedPage || isMusicPage) return null;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 print:hidden ${
      isScrolled
        ? 'theme-card shadow-lg border-b-2'
        : 'theme-card border-b-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <img
              src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
              alt="The Disciple Co."
              className="w-10 h-10 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">The Disciple Co.</span>
            </div>
          </Link>


          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Menu button with all links */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => { setMenuOpen(!menuOpen); setSettingsOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-2 theme-card"
                aria-label="All pages menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span className="hidden md:inline">Menu</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-60 theme-card rounded-xl shadow-2xl border-2 overflow-hidden z-50 max-h-[85vh] overflow-y-auto">
                  {menuSections.map((section, i) => (
                    <div key={section.heading} className={i > 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''}>
                      <div className="px-4 pt-3 pb-1 sticky top-0 theme-card">
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{section.heading}</p>
                      </div>
                      <nav className="pb-2">
                        {section.links.map((link) => {
                          const Icon = link.icon;
                          const isActive = !link.external && location.pathname === link.to;
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

            {/* Settings */}
            <div ref={settingsRef} className="relative hidden sm:block">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-2 theme-card"
                aria-label="Settings"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden md:inline">Theme</span>
              </button>
              {settingsOpen && (
                <div className="absolute right-0 top-full mt-1 w-60 theme-card rounded-xl shadow-2xl border-2 overflow-hidden z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color Mood</p>
                  </div>
                  {(['subtle', 'happy', 'blackwhite'] as ColorTheme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setColorTheme(t); setSettingsOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${
                        colorTheme === t ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex gap-1">
                        {t === 'subtle' && <><div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-400 to-blue-500" /><div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-slate-600" /></>}
                        {t === 'happy' && <><div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" /><div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-teal-500" /></>}
                        {t === 'blackwhite' && <><div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-400" /><div className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-gray-300 border border-gray-400" /></>}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white capitalize">
                        {t === 'blackwhite' ? 'Black & White' : t.charAt(0).toUpperCase() + t.slice(1)}
                      </span>
                      {colorTheme === t && <span className="ml-auto text-xs text-blue-500 font-bold">Active</span>}
                    </button>
                  ))}
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={toggleDarkMode}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      <span className="font-semibold">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <button
                      onClick={toggleBubbles}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="font-semibold">Floating Bubbles</span>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${bubblesEnabled ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                        {bubblesEnabled ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border-2 theme-card text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border-2 theme-card text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-gray-200 dark:border-gray-700 theme-card">
          <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {menuSections.flatMap((section) =>
              section.links.filter((l) => !l.external).map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'theme-primary-button text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })
            )}
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-2 theme-card"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={toggleBubbles}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-2 theme-card"
            >
              <Sparkles className="w-4 h-4" />
              Bubbles {bubblesEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function AppContent() {
  const { darkMode } = useDarkMode();
  const { bubblesEnabled } = useBubbles();
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState<BookType>(books[0]);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('onboardingCompleted') === 'true';
  });

  const isResurrectionPage = location.pathname === '/resurrection';
  const isEasterPage = location.pathname === '/easter';
  const isHallowedPage = location.pathname === '/hallowed';
  const isMusicPage = location.pathname === '/music';
  const isSpecialPage = isResurrectionPage || isEasterPage || isHallowedPage || isMusicPage;

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

  if (!hasCompletedOnboarding) {
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

      {!isSpecialPage && <CollectedMessagesDropdown />}

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
        </Routes>
      </div>

      {!isSpecialPage && <Footer />}
      {!isSpecialPage && <FloatingMusicPlayer />}
      {bubblesEnabled && !isSpecialPage && <FloatingBubbles />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <BubblesProvider>
        <MusicPlayerProvider>
          <AppContent />
        </MusicPlayerProvider>
      </BubblesProvider>
    </Router>
  );
}

export default App;
