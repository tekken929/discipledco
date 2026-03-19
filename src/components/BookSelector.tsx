import { Book } from '../types/book';
import { ChevronDown } from 'lucide-react';

interface BookSelectorProps {
  books: Book[];
  selectedBook: Book;
  onSelectBook: (book: Book) => void;
}

export function BookSelector({ books, selectedBook, onSelectBook }: BookSelectorProps) {
  const oldTestament = books.filter(b => b.testament === 'Old Testament');
  const newTestament = books.filter(b => b.testament === 'New Testament');

  return (
    <div className="relative">
      <select
        value={selectedBook.id}
        onChange={(e) => {
          const book = books.find(b => b.id === e.target.value);
          if (book) onSelectBook(book);
        }}
        className="appearance-none w-full sm:w-64 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors"
      >
        <optgroup label="Old Testament">
          {oldTestament.map((book) => (
            <option key={book.id} value={book.id}>
              {book.order}. {book.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="New Testament">
          {newTestament.map((book) => (
            <option key={book.id} value={book.id}>
              {book.order}. {book.name}
            </option>
          ))}
        </optgroup>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300 pointer-events-none" />
    </div>
  );
}
