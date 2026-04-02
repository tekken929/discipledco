import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, BookOpen, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
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
  const [fontSize, setFontSize] = useState(16);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (bookId) {
      loadBook();
      loadPages();
    }
  }, [bookId]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, pages.length, isFlipping, isFullscreen]);

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
      }, 400);
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
      }, 400);
    }
  };

  const increaseFontSize = () => setFontSize(Math.min(fontSize + 2, 24));
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 2, 12));

  const leftPage = pages[currentPage];
  const rightPage = pages[currentPage + 1];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50'}`}>
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 animate-pulse text-amber-600" />
          <span className="text-xl font-medium">Loading book...</span>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <button
            onClick={() => navigate('/books')}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold transition-colors"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50'
    } py-8 px-4`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {book.title}
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              by {book.author}
            </p>
          </div>
          <button
            onClick={() => navigate('/books')}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900 shadow-md'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 justify-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'
          }`}>
            <button
              onClick={decreaseFontSize}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title="Decrease font size"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium px-2">{fontSize}px</span>
            <button
              onClick={increaseFontSize}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title="Increase font size"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-100 shadow-md'
            }`}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Container */}
      <div className="max-w-7xl mx-auto">
        <div className="relative flex justify-center items-center min-h-[650px]">
          {/* Open Book with 3D effect */}
          <div
            className={`relative flex shadow-2xl rounded-lg overflow-hidden ${isFlipping ? 'select-none' : ''}`}
            style={{
              transform: 'perspective(2000px) rotateX(2deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Left Page */}
            <div
              className={`w-[450px] h-[650px] p-10 ${
                isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gradient-to-br from-white to-amber-50/30 text-gray-900'
              } border-r-2 ${isDarkMode ? 'border-gray-700' : 'border-amber-200'} transition-all duration-400`}
              style={{
                transformOrigin: 'right center',
                transform: flipDirection === 'prev' ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                boxShadow: isDarkMode
                  ? '-8px 0 20px rgba(0,0,0,0.5)'
                  : '-8px 0 25px rgba(180,83,9,0.15)',
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              {leftPage ? (
                <div className="h-full flex flex-col">
                  <div
                    className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-transparent pr-2"
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                  >
                    <ContentFormatter content={leftPage.content} className="" />
                  </div>
                  <div className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-sans`}>
                    {leftPage.page_number}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    {book.cover_image_url ? (
                      <img
                        src={book.cover_image_url}
                        alt={book.title}
                        className="max-w-[300px] max-h-[400px] mx-auto mb-6 object-contain rounded-lg shadow-lg"
                      />
                    ) : (
                      <BookOpen className="w-32 h-32 mx-auto mb-6 opacity-20 text-amber-600" />
                    )}
                    <h2 className="text-2xl font-bold mb-3">{book.title}</h2>
                    <p className="text-lg opacity-70">{book.author}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Page */}
            <div
              className={`w-[450px] h-[650px] p-10 ${
                isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gradient-to-bl from-white to-amber-50/30 text-gray-900'
              } transition-all duration-400`}
              style={{
                transformOrigin: 'left center',
                transform: flipDirection === 'next' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                boxShadow: isDarkMode
                  ? '8px 0 20px rgba(0,0,0,0.5)'
                  : '8px 0 25px rgba(180,83,9,0.15)',
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              {rightPage ? (
                <div className="h-full flex flex-col">
                  <div
                    className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-transparent pr-2"
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                  >
                    <ContentFormatter content={rightPage.content} className="" />
                  </div>
                  <div className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-sans`}>
                    {rightPage.page_number}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center opacity-50">
                  <div className="text-center">
                    <BookOpen className="w-20 h-20 mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-medium">End of preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Book Spine Shadow */}
            <div
              className="absolute top-0 left-1/2 w-6 h-full bg-gradient-to-r from-black/30 via-black/10 to-black/30 pointer-events-none"
              style={{ transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-8 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isFlipping}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              currentPage === 0 || isFlipping
                ? 'opacity-40 cursor-not-allowed bg-gray-400'
                : isDarkMode
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xl hover:shadow-2xl'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xl hover:shadow-2xl'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
            Previous
          </button>

          <div className={`text-lg font-semibold px-6 py-3 rounded-xl ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 shadow-md'
          }`}>
            {currentPage + 1}-{Math.min(currentPage + 2, pages.length)} of {pages.length}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= pages.length - 2 || isFlipping}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              currentPage >= pages.length - 2 || isFlipping
                ? 'opacity-40 cursor-not-allowed bg-gray-400'
                : isDarkMode
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xl hover:shadow-2xl'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xl hover:shadow-2xl'
            }`}
          >
            Next
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className={`text-center mt-6 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>Use arrow keys to navigate • Press ESC to exit fullscreen</p>
        </div>
      </div>
    </div>
  );
}
