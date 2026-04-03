import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDarkMode, ColorTheme } from './context/DarkModeContext';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import { BubblesProvider, useBubbles } from './context/BubblesContext';
import { Footer } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu';
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
import { Music } from './pages/Music';
import { Preaching } from './pages/Preaching';
import { Books } from './pages/Books';
import BookReader from './pages/BookReader';
import { ChurchMentors } from './pages/ChurchMentors';
import { Podcasts } from './pages/Podcasts';
import { Timeline } from './pages/Timeline';
import { BibleAuthors } from './pages/BibleAuthors';
import { ChristianHolidays } from './pages/ChristianHolidays';
import { Resurrection } from './pages/Resurrection';
import { books } from './data/books';
import { Book } from './types/book';
import { useNavbarScroll } from './hooks/useScrollAnimation';
import './resurrection.css';

function AppContent() {
  const { darkMode, toggleDarkMode, colorTheme, setColorTheme } = useDarkMode();
  const { bubblesEnabled } = useBubbles();
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('onboardingCompleted') === 'true';
  });
  const isScrolled = useNavbarScroll(100);
  const isHomePage = location.pathname === '/' || location.pathname === '/bible';
  const isResurrectionPage = location.pathname === '/resurrection';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showThemeMenu) {
        setShowThemeMenu(false);
      }
    };

    if (showThemeMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showThemeMenu]);

  const handleThemeChange = (theme: ColorTheme) => {
    setColorTheme(theme);
    setShowThemeMenu(false);
  };

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
      {/* Grain Overlay */}
      {!isResurrectionPage && <div className="grain-overlay" />}

      {/* Header - Sticky with Cinematic Blur */}
      {!isResurrectionPage && <header className={`navbar-cinematic ${isScrolled ? 'scrolled' : ''} theme-card shadow-lg print:hidden transition-all sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
              <img
                src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
                alt="Cross Logo"
                className="w-12 h-12 rounded-xl object-cover shadow-md"
              />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">The Disciple Co.</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 italic">Luke 9:23, "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowThemeMenu(!showThemeMenu);
                  }}
                  className="btn-cinematic flex items-center justify-center gap-2 theme-card border-2 text-gray-900 dark:text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                  aria-label="Change color theme"
                >
                  <Palette className="w-5 h-5" />
                  <span>Theme</span>
                </button>

                {showThemeMenu && (
                  <div className="absolute right-0 mt-2 w-56 theme-card rounded-lg shadow-2xl border-2 overflow-hidden z-50">
                    <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Color Mood</p>
                    </div>
                    <button
                      onClick={() => handleThemeChange('subtle')}
                      className={`w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        colorTheme === 'subtle' ? 'bg-slate-100 dark:bg-slate-800' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-slate-400 to-blue-500 shadow-md"></div>
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-slate-600 shadow-md"></div>
                        </div>
                        <div>
                          <span className="text-gray-900 dark:text-white font-semibold">Subtle</span>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Professional & calm</p>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleThemeChange('happy')}
                      className={`w-full px-4 py-3 text-left hover:bg-amber-50 dark:hover:bg-orange-950 transition-colors ${
                        colorTheme === 'happy' ? 'bg-amber-50 dark:bg-orange-950' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md"></div>
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-teal-500 shadow-md"></div>
                        </div>
                        <div>
                          <span className="text-gray-900 dark:text-white font-semibold">Happy</span>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Warm & vibrant</p>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleThemeChange('blackwhite')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors ${
                        colorTheme === 'blackwhite' ? 'bg-gray-100 dark:bg-gray-900' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-400 shadow-md"></div>
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-white to-gray-300 border border-gray-400 shadow-md"></div>
                        </div>
                        <div>
                          <span className="text-gray-900 dark:text-white font-semibold">Black & White</span>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Classic monochrome</p>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={toggleDarkMode}
                className="btn-cinematic hidden lg:flex items-center justify-center gap-2 theme-card border-2 text-gray-900 dark:text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>

              <NavigationMenu
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                colorTheme={colorTheme}
                onThemeChange={handleThemeChange}
              />
            </div>
          </div>
        </div>
      </header>}

      {/* Collected Messages Dropdown - Sticky across all pages */}
      {!isResurrectionPage && <CollectedMessagesDropdown />}

      {/* Main Content */}
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
          <Route path="/music" element={<Music />} />
          <Route path="/preaching" element={<Preaching />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookReader />} />
          <Route path="/church-mentors" element={<ChurchMentors />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/bible-authors" element={<BibleAuthors />} />
          <Route path="/christian-holidays" element={<ChristianHolidays />} />
          <Route path="/resurrection" element={<Resurrection />} />
        </Routes>
      </div>

      {/* Footer */}
      {!isResurrectionPage && <Footer />}

      {/* Floating Music Player */}
      {!isResurrectionPage && <FloatingMusicPlayer />}

      {/* Floating Bubbles - On all pages */}
      {!isResurrectionPage && <FloatingBubbles enabled={bubblesEnabled} />}
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
