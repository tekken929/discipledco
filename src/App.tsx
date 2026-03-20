import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Download, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDarkMode } from './context/DarkModeContext';
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
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handlePrint = () => {
    window.print();
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg print:hidden transition-colors sticky top-0 z-50">
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
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
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
