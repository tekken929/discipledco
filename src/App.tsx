import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Download, Moon, Sun, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDarkMode, ColorTheme } from './context/DarkModeContext';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BibleVersions } from './pages/BibleVersions';
import { Religions } from './pages/Religions';
import { FAQs } from './pages/FAQs';
import { Topics } from './pages/Topics';
import { BookSelector } from './components/BookSelector';
import { books } from './data/books';
import { Book } from './types/book';

function AppContent() {
  const { darkMode, toggleDarkMode, colorTheme, setColorTheme } = useDarkMode();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
  };

  const handleThemeChange = (theme: ColorTheme) => {
    setColorTheme(theme);
    setShowThemeMenu(false);
  };

  return (
    <div className="min-h-screen theme-background transition-colors flex flex-col">
      {/* Header */}
      <header className="theme-card shadow-lg print:hidden transition-colors sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="https://images.pexels.com/photos/6120234/pexels-photo-6120234.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Cross Logo"
                className="w-12 h-12 rounded-xl object-cover shadow-md"
              />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Discipled Co.</h1>
                <p className="text-gray-600 dark:text-gray-300 text-xs">Biblical Guidance & Study</p>
              </div>
            </Link>

            {isHomePage && (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Books of the Bible</label>
                <BookSelector
                  books={books}
                  selectedBook={selectedBook}
                  onSelectBook={handleBookSelect}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowThemeMenu(!showThemeMenu);
                  }}
                  className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                  aria-label="Change color theme"
                >
                  <Palette className="w-5 h-5" />
                </button>

                {showThemeMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    <button
                      onClick={() => handleThemeChange('subtle')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        colorTheme === 'subtle' ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                          <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white">Subtle</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleThemeChange('happy')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        colorTheme === 'happy' ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-4 h-4 rounded-full bg-amber-400"></div>
                          <div className="w-4 h-4 rounded-full bg-teal-400"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white">Happy</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleThemeChange('blackwhite')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        colorTheme === 'blackwhite' ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-4 h-4 rounded-full bg-black border border-gray-300"></div>
                          <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white">Black & White</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {isHomePage && (
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 theme-primary-button text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home selectedBook={selectedBook} />} />
          <Route path="/bible-versions" element={<BibleVersions />} />
          <Route path="/religions" element={<Religions />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId" element={<Topics />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
