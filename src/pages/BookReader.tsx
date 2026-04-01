import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useDarkMode } from '../context/DarkModeContext';
import { ContentFormatter } from '../components/ContentFormatter';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_image_url: string;
  total_pages: number;
  category: string;
}

interface BookPage {
  id: string;
  book_id: string;
  page_number: number;
  content: string;
}

export default function BookReader() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [book, setBook] = useState<Book | null>(null);
  const [pages, setPages] = useState<BookPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookId) {
      loadBook();
      loadPages();
    }
  }, [bookId]);

  const loadBook = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .maybeSingle();

    if (error) {
      console.error('Error loading book:', error);
    } else if (data) {
      setBook(data);
    }
    setLoading(false);
  };

  const loadPages = async () => {
    const { data, error } = await supabase
      .from('book_pages')
      .select('*')
      .eq('book_id', bookId)
      .order('page_number', { ascending: true });

    if (error) {
      console.error('Error loading pages:', error);
    } else if (data) {
      setPages(data);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 2 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      setTimeout(() => {
        setCurrentPage(currentPage + 2);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 600);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setTimeout(() => {
        setCurrentPage(currentPage - 2);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 600);
    }
  };

  const leftPage = pages[currentPage];
  const rightPage = pages[currentPage + 1];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-amber-50'}`}>
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 animate-pulse" />
          <span className="text-xl">Loading book...</span>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-amber-50'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <button
            onClick={() => navigate('/books')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100'} py-8 px-4`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{book.title}</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>by {book.author}</p>
        </div>
        <button
          onClick={() => navigate('/books')}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-white hover:bg-gray-100 text-gray-900'
          }`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Book Container */}
      <div className="max-w-7xl mx-auto perspective-1000" style={{ perspective: '2000px' }}>
        <div className="relative flex justify-center items-center min-h-[600px]">
          {/* Open Book */}
          <div
            className={`relative flex shadow-2xl ${isFlipping ? 'select-none' : ''}`}
            style={{
              transform: 'rotateX(2deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Left Page */}
            <div
              className={`w-[400px] h-[600px] p-8 ${
                isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
              } border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} transition-transform duration-600 overflow-hidden`}
              style={{
                transformOrigin: 'right center',
                transform: flipDirection === 'prev' ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                boxShadow: '-5px 5px 20px rgba(0,0,0,0.2)',
              }}
            >
              {leftPage ? (
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <ContentFormatter content={leftPage.content} className="text-sm" />
                  </div>
                  <div className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {leftPage.page_number}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    {book.cover_image_url ? (
                      <img src={book.cover_image_url} alt={book.title} className="max-w-full max-h-96 mx-auto mb-4 object-contain" />
                    ) : (
                      <BookOpen className="w-24 h-24 mx-auto mb-4 opacity-20" />
                    )}
                    <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                    <p className="text-lg opacity-70">{book.author}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Page */}
            <div
              className={`w-[400px] h-[600px] p-8 ${
                isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
              } transition-transform duration-600 overflow-hidden`}
              style={{
                transformOrigin: 'left center',
                transform: flipDirection === 'next' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                boxShadow: '5px 5px 20px rgba(0,0,0,0.2)',
              }}
            >
              {rightPage ? (
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <ContentFormatter content={rightPage.content} className="text-sm" />
                  </div>
                  <div className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {rightPage.page_number}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center opacity-50">
                  <p className="text-lg">End of book</p>
                </div>
              )}
            </div>

            {/* Book Spine Shadow */}
            <div
              className="absolute top-0 left-1/2 w-8 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none"
              style={{ transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-8 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isFlipping}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentPage === 0 || isFlipping
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Page {currentPage + 1}-{Math.min(currentPage + 2, pages.length)} of {pages.length}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= pages.length - 2 || isFlipping}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentPage >= pages.length - 2 || isFlipping
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
