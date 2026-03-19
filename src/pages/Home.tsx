import { useState } from 'react';
import { BookSelector } from '../components/BookSelector';
import { BookDisplay } from '../components/BookDisplay';
import { books } from '../data/books';

export function Home() {
  const [selectedBook, setSelectedBook] = useState(books[0]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">
      <div className="mb-6 flex flex-col items-center print:hidden">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Books of the Bible</h2>
        <BookSelector
          books={books}
          selectedBook={selectedBook}
          onSelectBook={setSelectedBook}
        />
      </div>
      <BookDisplay book={selectedBook} />
    </main>
  );
}
