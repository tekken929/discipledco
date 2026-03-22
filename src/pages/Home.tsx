import { BookDisplay } from '../components/BookDisplay';
import { BookSelector } from '../components/BookSelector';
import { Book } from '../types/book';
import { books } from '../data/books';
import { useState } from 'react';

interface HomeProps {
  selectedBook: Book;
}

export function Home({ selectedBook: initialBook }: HomeProps) {
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 theme-card rounded-xl p-4 shadow-md print:hidden transition-colors">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Books of the Bible</label>
        <BookSelector
          books={books}
          selectedBook={selectedBook}
          onSelectBook={handleBookSelect}
        />
      </div>
      <BookDisplay book={selectedBook} />
    </main>
  );
}
