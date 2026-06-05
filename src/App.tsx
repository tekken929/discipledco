import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, BookOpen, MessageCircle, FolderOpen, Book, Music, Palette, Sparkles, Mic, BookText, UserCheck, Radio, Calendar, Lightbulb, GraduationCap, HelpCircle, Image, Wind } from 'lucide-react';
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
      { to: '/bible-studies', label: 'Bible Studies', icon: BookOpen },
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

  if (isResurrectionPage || isEasterPage || isHallowedPage || isMusicPage || location.pathname === '/app') return null;

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
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Settings */}
            <div ref={settingsRef} className="relative hidden sm:block">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Settings"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden md:inline">Theme</span>
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="All pages menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span className="hidden md:inline">Menu</span>
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 theme-card">
          <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {menuSections.flatMap((section) =>
              section.links.filter((l) => !l.external && !l.comingSoon).map((link) => {
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
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-2 flex-wrap">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-2 theme-card"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Light' : 'Dark'}
            </button>
            {([
              { id: 'subtle' as ColorTheme,     label: 'Parchment',  dot: 'bg-amber-600' },
              { id: 'happy' as ColorTheme,       label: 'Amber',      dot: 'bg-orange-500' },
              { id: 'ocean' as ColorTheme,       label: 'Ocean',      dot: 'bg-sky-600' },
              { id: 'dusk' as ColorTheme,        label: 'Dusk',       dot: 'bg-rose-700' },
              { id: 'blackwhite' as ColorTheme,  label: 'Ink',        dot: 'bg-gray-900 dark:bg-white' },
            ]).map((t) => (
              <button
                key={t.id}
                onClick={() => setColorTheme(t.id)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all border-2 ${
                  colorTheme === t.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                    : 'theme-card text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${t.dot}`} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
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
  const isSpecialPage = isResurrectionPage || isEasterPage || isHallowedPage || isMusicPage || isAppPage;

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
