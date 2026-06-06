import { BookDisplay } from '../components/BookDisplay';
import { ReturnToHome } from '../components/ReturnToHome';
import { Modal } from '../components/Modal';
import { BibleRoadmap } from '../components/BibleRoadmap';
import { Book } from '../types/book';
import { books } from '../data/books';
import { timelineEvents } from '../data/timeline';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { BookOpen, ChevronDown, ArrowRight, Map, Route, GraduationCap, Clock, Star, ChevronUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  selectedBook: Book;
}


const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'creation':
      return {
        card: 'border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10',
        badge: 'bg-amber-500 text-white',
        icon: 'text-amber-600 dark:text-amber-400',
        title: 'text-amber-900 dark:text-amber-100',
        text: 'text-amber-800 dark:text-amber-200',
      };
    case 'jewish':
      return {
        card: 'border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10',
        badge: 'bg-blue-600 text-white',
        icon: 'text-blue-600 dark:text-blue-400',
        title: 'text-blue-900 dark:text-blue-100',
        text: 'text-blue-800 dark:text-blue-200',
      };
    case 'catholic':
      return {
        card: 'border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10',
        badge: 'bg-red-600 text-white',
        icon: 'text-red-600 dark:text-red-400',
        title: 'text-red-900 dark:text-red-100',
        text: 'text-red-800 dark:text-red-200',
      };
    case 'protestant':
      return {
        card: 'border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10',
        badge: 'bg-green-600 text-white',
        icon: 'text-green-600 dark:text-green-400',
        title: 'text-green-900 dark:text-green-100',
        text: 'text-green-800 dark:text-green-200',
      };
    case 'modern':
      return {
        card: 'border-teal-200 dark:border-teal-700 bg-teal-50/50 dark:bg-teal-900/10',
        badge: 'bg-teal-600 text-white',
        icon: 'text-teal-600 dark:text-teal-400',
        title: 'text-teal-900 dark:text-teal-100',
        text: 'text-teal-800 dark:text-teal-200',
      };
    default:
      return {
        card: 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/10',
        badge: 'bg-gray-600 text-white',
        icon: 'text-gray-600 dark:text-gray-400',
        title: 'text-gray-900 dark:text-white',
        text: 'text-gray-700 dark:text-gray-300',
      };
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'creation': return <Star className="w-4 h-4" />;
    default: return <Calendar className="w-4 h-4" />;
  }
};

export function Home({ selectedBook: initialBook }: HomeProps) {
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
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
      <ReturnToHome />

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
              Not because they do not care, but because no one ever showed them how to approach it. This page is not just a list of books. It is a guide to help you understand what you are reading, where to begin, and how it all connects.
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

        {/* Historical Timeline */}
        <section className="mb-12 print:hidden">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="group w-full text-left theme-card border-2 border-gray-200 dark:border-gray-700 hover:border-slate-400 dark:hover:border-slate-500 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Clock className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">Complete Historical Timeline</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">From Creation to modern day — key events in Jewish, Catholic, Orthodox, and Protestant history.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <span className="hidden sm:inline text-xs font-semibold text-gray-500 dark:text-gray-400">{showTimeline ? 'Hide' : 'Show'}</span>
                {showTimeline ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
          </button>

          {showTimeline && (
            <div className="mt-4 space-y-4">
              {timelineEvents.map((event, index) => {
                const style = getCategoryStyle(event.category);
                return (
                  <div key={event.id} className="relative">
                    {index !== timelineEvents.length - 1 && (
                      <div className="absolute left-7 top-20 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
                    )}
                    <div className={`theme-card border-2 ${style.card} rounded-2xl shadow-md hover:shadow-lg transition-all p-6`}>
                      <div className="flex items-start gap-4">
                        <div className={`${style.badge} p-2.5 rounded-full shadow flex-shrink-0 mt-0.5`}>
                          {getCategoryIcon(event.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className={`text-xl font-bold ${style.title} leading-snug`}>{event.title}</h3>
                            <span className={`${style.badge} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap w-fit`}>{event.year}</span>
                          </div>
                          <p className={`text-sm ${style.text} mb-3 leading-relaxed`}>{event.description}</p>
                          <ul className="space-y-1.5">
                            {event.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className={`${style.icon} mt-0.5 font-bold`}>•</span>
                                <span className="leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                          {event.relatedLinks && event.relatedLinks.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {event.relatedLinks.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 theme-card border px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:shadow transition-all"
                                >
                                  <BookOpen className="w-3 h-3" />
                                  {link.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
