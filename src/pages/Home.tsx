import { BookDisplay } from '../components/BookDisplay';
import { Modal } from '../components/Modal';
import { BibleRoadmap } from '../components/BibleRoadmap';
import { Book } from '../types/book';
import { books } from '../data/books';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { BookOpen, ChevronDown, ArrowRight, Map, Route, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  selectedBook: Book;
}


export function Home({ selectedBook: initialBook }: HomeProps) {
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const { ref: selectorRef, isVisible: selectorVisible } = useScrollAnimation();

  const oldTestamentBooks = books.filter(b => b.testament === 'Old Testament');
  const newTestamentBooks = books.filter(b => b.testament === 'New Testament');

  const handleBookSelect = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      document.getElementById('book-selector')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>

      <div className="section-divider print:hidden" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">

        {/* START HERE intro */}
        <section className="mb-12 theme-card rounded-2xl p-8 md:p-12 shadow-xl print:hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest block mb-3">Start Here</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Most people open the Bible and do not know where to start.
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              Not because they do not care, but because no one ever showed them how to approach it. Our Reading Roadmap, will show you how to approach reading and what order we suggest to start in.  The Bible Overview will give you a summary of each book of the Bible, and our Foundation Course will give you an introductory summary class of everything Bible and Faith.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 — Bible Reading Roadmap */}
            <button
              onClick={() => setIsRoadmapModalOpen(true)}
              className="group relative text-left border-2 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer bg-sky-50/60 dark:bg-sky-950/30 overflow-hidden"
            >
              <span className="absolute top-1 right-3 text-8xl font-black text-sky-400/25 dark:text-sky-400/20 leading-none select-none pointer-events-none">1</span>
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-200 dark:group-hover:bg-sky-900/80 transition-colors">
                  <Route className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <span className="text-xs font-bold text-sky-500 dark:text-sky-400 uppercase tracking-widest">Step by Step</span>
              </div>
              <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                Bible Reading Roadmap
              </h3>
              <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                A clear path through Scripture — where to start, what to read next, and why order matters.
              </p>
              <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                Open the roadmap
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            {/* Step 2 — Bible Overview */}
            <button
              onClick={() => {
                document.getElementById('book-selector')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group relative text-left border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer bg-amber-50/60 dark:bg-amber-950/20 overflow-hidden"
            >
              <span className="absolute top-1 right-3 text-8xl font-black text-amber-400/30 dark:text-amber-400/20 leading-none select-none pointer-events-none">2</span>
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/80 transition-colors">
                  <Map className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest">Self-Guided</span>
              </div>
              <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                Bible Overview
              </h3>
              <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Browse all 66 books — Old and New Testament — with summaries and context for each one.
              </p>
              <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                Explore the books
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            {/* Step 3 — Foundation Course */}
            <Link
              to="/courses"
              className="group relative text-left border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 bg-emerald-50/60 dark:bg-emerald-950/20 overflow-hidden"
            >
              <span className="absolute top-1 right-3 text-8xl font-black text-emerald-400/25 dark:text-emerald-400/20 leading-none select-none pointer-events-none">3</span>
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/80 transition-colors">
                  <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">8 Modules</span>
              </div>
              <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                The Foundation Course
              </h3>
              <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                A guided discipleship path covering what the Bible is, who God is, salvation, and how to live it out.
              </p>
              <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                Start the course
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </section>

        {/* Book selector */}
        <div
          id="book-selector"
          ref={selectorRef}
          className={`mb-6 theme-card rounded-2xl p-8 md:p-12 shadow-xl print:hidden transition-all duration-500 card-cinematic border-2 border-amber-100 dark:border-amber-900/40 ${
            selectorVisible ? 'fade-in visible' : 'fade-in'
          }`}
        >
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Bible Overview
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The Bible is a sacred collection of 66 books written over 1,500 years by more than 40 different authors, all inspired by God. Divided into the Old and New Testaments, these ancient texts contain history, poetry, prophecy, and teachings that reveal God's plan for humanity and His love for all people.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Old Testament</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                The Old Testament contains 39 books covering creation, law, history, poetry, and prophecy. It reveals God's covenant with Israel and His promises of a coming Messiah.
              </p>
              <div className="relative">
                <select
                  value={selectedBook.testament === 'Old Testament' ? selectedBook.id : ''}
                  onChange={(e) => handleBookSelect(e.target.value)}
                  className="appearance-none w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer transition-colors"
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

            <div className="space-y-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/50">
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

        <div className="spacing-section">
          <BookDisplay book={selectedBook} />
        </div>

        {/* Go Deeper bridge */}
        <section className="mt-4 mb-8 print:hidden">
          <div className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-8 md:p-10">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">Go Deeper</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
              The themes show up everywhere once you start seeing them.
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">
              Once you begin reading, you will start to see key themes show up over and over again — grace, faith, sin, purpose, and spiritual warfare. These are not separate ideas. They are all connected. Explore them deeper in the Topics section.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/topics"
                className="inline-flex items-center gap-2 px-6 py-3 theme-primary-button rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                Explore Topics
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
              >
                Start the Full Course
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Modal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
        title="Bible Reading Roadmap"
      >
        <BibleRoadmap defaultOpen />
      </Modal>
    </>
  );
}
