import { BookDisplay } from '../components/BookDisplay';
import { ReturnToHome } from '../components/ReturnToHome';
import { Book } from '../types/book';
import { books } from '../data/books';
import { useState } from 'react';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';
import { BookOpen, ChevronDown, Users, MousePointerClick } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  selectedBook: Book;
}

export function Home({ selectedBook: initialBook }: HomeProps) {
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: selectorRef, isVisible: selectorVisible } = useScrollAnimation();
  const { ref: authorsRef, isVisible: authorsVisible } = useScrollAnimation();
  const parallaxOffset = useParallax(0.3);

  const oldTestamentBooks = books.filter(b => b.testament === 'Old Testament');
  const newTestamentBooks = books.filter(b => b.testament === 'New Testament');

  const handleBookSelect = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <ReturnToHome />

      {/* SECTION DIVIDER */}
      <div className="section-divider print:hidden" />

      {/* BOOK SELECTOR SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">
        <div
          id="book-selector"
          ref={selectorRef}
          className={`mb-12 theme-card rounded-2xl p-8 md:p-12 shadow-xl print:hidden transition-all duration-500 card-cinematic ${
            selectorVisible ? 'fade-in visible' : 'fade-in'
          }`}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-gray-700 dark:text-gray-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Bible Overview
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The Bible is a sacred collection of 66 books written over 1,500 years by more than 40 different authors, all inspired by God. Divided into the Old and New Testaments, these ancient texts contain history, poetry, prophecy, and teachings that reveal God's plan for humanity and His love for all people.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Old Testament Dropdown */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Old Testament</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                The Old Testament contains 39 books covering creation, law, history, poetry, and prophecy. It reveals God's covenant with Israel and His promises of a coming Messiah.
              </p>
              <div className="relative">
                <select
                  value={selectedBook.testament === 'Old Testament' ? selectedBook.id : ''}
                  onChange={(e) => handleBookSelect(e.target.value)}
                  className="appearance-none w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors"
                >
                  <option value="">Select a book...</option>
                  {oldTestamentBooks.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.order}. {book.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300 pointer-events-none" />
              </div>
            </div>

            {/* New Testament Dropdown */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">New Testament</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                The New Testament contains 27 books including the Gospels, Acts, letters to early churches, and Revelation. It tells of Jesus Christ's life, death, and resurrection.
              </p>
              <div className="relative">
                <select
                  value={selectedBook.testament === 'New Testament' ? selectedBook.id : ''}
                  onChange={(e) => handleBookSelect(e.target.value)}
                  className="appearance-none w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors"
                >
                  <option value="">Select a book...</option>
                  {newTestamentBooks.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.order}. {book.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Bible Authors & Evidence - Clickable Bubble */}
        <Link
          to="/bible-authors"
          ref={authorsRef}
          className={`block mb-12 theme-card rounded-2xl p-6 shadow-2xl print:hidden transition-all duration-500 card-cinematic hover:scale-105 hover:shadow-3xl group cursor-pointer border-4 border-blue-500/30 hover:border-blue-500 ${
            authorsVisible ? 'fade-in visible' : 'fade-in'
          }`}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Users className="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <MousePointerClick className="w-5 h-5 text-blue-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Bible Authors & Evidence
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Discover the ~40 authors who wrote Scripture over 1,500 years. Click to explore detailed timelines and historical evidence.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold text-sm group-hover:bg-blue-700 dark:group-hover:bg-blue-600 transition-colors shadow-lg whitespace-nowrap">
              <span>Explore</span>
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <div className="spacing-section">
          <BookDisplay book={selectedBook} />
        </div>
      </main>
    </>
  );
}
