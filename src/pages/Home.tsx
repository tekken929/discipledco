import { BookDisplay } from '../components/BookDisplay';
import { Book } from '../types/book';

interface HomeProps {
  selectedBook: Book;
}

export function Home({ selectedBook }: HomeProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">
      <BookDisplay book={selectedBook} />
    </main>
  );
}
