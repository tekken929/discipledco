import { BookDisplay } from '../components/BookDisplay';
import { BookSelector } from '../components/BookSelector';
import { Book } from '../types/book';
import { books } from '../data/books';
import { useState } from 'react';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';
import { BookOpen, Sparkles } from 'lucide-react';

interface HomeProps {
  selectedBook: Book;
}

export function Home({ selectedBook: initialBook }: HomeProps) {
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: selectorRef, isVisible: selectorVisible } = useScrollAnimation();
  const parallaxOffset = useParallax(0.3);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* CINEMATIC HERO SECTION */}
      <section ref={heroRef} className="cinematic-hero print:hidden">
        <div className="cinematic-hero-bg" style={{ transform: `translateY(${parallaxOffset}px)` }} />
        <div className="cinematic-hero-overlay" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className={`fade-in ${heroVisible ? 'visible' : ''}`}>
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-16 h-16 text-white opacity-90" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 hero-title-glow">
              Journey Through Scripture
            </h1>
          </div>

          <div className={`fade-in fade-in-delayed ${heroVisible ? 'visible' : ''}`}>
            <p className="text-xl md:text-2xl text-white/90 mb-8 mx-auto leading-relaxed">
              Explore the timeless wisdom and profound stories that have shaped faith for millennia
            </p>
          </div>

          <div className={`fade-in fade-in-delayed-2 ${heroVisible ? 'visible' : ''}`}>
            <button
              onClick={() => document.getElementById('book-selector')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-cinematic inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full text-lg font-semibold border-2 border-white/30"
            >
              <Sparkles className="w-5 h-5" />
              Begin Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="section-divider print:hidden" />

      {/* BOOK SELECTOR SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">
        <div
          id="book-selector"
          ref={selectorRef}
          className={`mb-12 flex flex-col sm:flex-row items-center justify-center gap-3 theme-card rounded-xl p-6 shadow-lg print:hidden transition-all duration-500 card-cinematic ${
            selectorVisible ? 'fade-in visible' : 'fade-in'
          }`}
        >
          <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Books of the Bible
          </label>
          <BookSelector
            books={books}
            selectedBook={selectedBook}
            onSelectBook={handleBookSelect}
          />
        </div>

        <div className="spacing-section">
          <BookDisplay book={selectedBook} />
        </div>
      </main>
    </>
  );
}
