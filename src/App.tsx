import { useState } from 'react';
import { BookSelector } from './components/BookSelector';
import { BookDisplay } from './components/BookDisplay';
import { books } from './data/books';
import { Download, BookText, Moon, Sun } from 'lucide-react';
import { useDarkMode } from './context/DarkModeContext';

function App() {
  const [selectedBook, setSelectedBook] = useState(books[0]);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md print:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl">
                <BookText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discipled Co.</h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Visual Overview Charts</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <BookSelector
                books={books}
                selectedBook={selectedBook}
                onSelectBook={setSelectedBook}
              />

              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">
        <BookDisplay book={selectedBook} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 print:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          <p>© 2026 Discipled Co. Clear, structured overviews of every book of the Bible.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
