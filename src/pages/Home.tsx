import { BookDisplay } from '../components/BookDisplay';
import { ReturnToHome } from '../components/ReturnToHome';
import { Modal } from '../components/Modal';
import { BibleRoadmap } from '../components/BibleRoadmap';
import { Book } from '../types/book';
import { books } from '../data/books';
import { useState } from 'react';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';
import { BookOpen, ChevronDown, Users, ScrollText, Calendar, ArrowRight, Map, Route, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  selectedBook: Book;
}

const roadmapSteps = [
  {
    number: 1,
    label: 'Start with Jesus',
    detail: 'Begin with the Gospel of John — written so you believe Jesus is the Son of God.',
  },
  {
    number: 2,
    label: 'See how it spread',
    detail: 'Read Acts to understand how the early church was born and grew after the resurrection.',
  },
  {
    number: 3,
    label: 'Learn how to live',
    detail: "Paul's letters — Romans, Ephesians, Galatians — explain salvation, grace, and daily faith.",
  },
  {
    number: 4,
    label: 'Go back to the beginning',
    detail: 'Now Genesis, Exodus, and the Psalms unlock depth you could not have seen before.',
  },
  {
    number: 5,
    label: 'Build daily wisdom',
    detail: 'Proverbs, Psalms, and the general letters give you rhythm, wisdom, and endurance.',
  },
];

export function Home({ selectedBook: initialBook }: HomeProps) {
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
  const [isAuthorsModalOpen, setIsAuthorsModalOpen] = useState(false);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: selectorRef, isVisible: selectorVisible } = useScrollAnimation();
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

      <div className="section-divider print:hidden" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0">

        {/* Three path tiles */}
        <section className="mb-10 print:hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                document.getElementById('book-selector')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group text-left theme-card border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <Map className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Self-Guided</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                Tour of the Bible
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Browse all 66 books — Old and New Testament — with summaries and context for each one.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                Explore the books
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => {
                document.getElementById('reading-roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group text-left theme-card border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <Route className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Step by Step</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                Bible Reading Roadmap
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                A clear five-step path through Scripture — where to start, what to read next, and why order matters.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                See the roadmap
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <Link
              to="/courses"
              className="group text-left theme-card border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <GraduationCap className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">8 Modules</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                The Foundation Course
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                A guided discipleship path covering what the Bible is, who God is, salvation, and how to live it out.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                Start the course
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </section>

        {/* START HERE intro */}
        <section className="mb-12 theme-card rounded-2xl p-8 md:p-12 shadow-xl print:hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-4">Start Here</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
              Most people open the Bible and do not know where to start.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Not because they do not care, but because no one ever showed them how to approach it. This page is not just a list of books. It is a guide to help you understand what you are reading, where to begin, and how it all connects.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 theme-primary-button rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              Take the Full Course
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Quick Roadmap */}
        <section id="reading-roadmap" className="mb-12 print:hidden">
          <div className="theme-card rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">A Simple Reading Roadmap</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Follow these five steps in order and you will have a foundation before you know it.</p>

            <div className="space-y-4">
              {roadmapSteps.map((step, index) => (
                <div key={step.number} className="flex items-start gap-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-sm font-bold text-white dark:text-gray-900">
                      {step.number}
                    </div>
                    {index < roadmapSteps.length - 1 && (
                      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mt-2" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-bold text-gray-900 dark:text-white text-base">{step.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Approach */}
        <section className="mb-12 print:hidden">
          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How to Approach the Bible</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              Do not rush it. Read to understand, not to finish. Ask simple questions: What is happening? What does this mean? What does this change for me? The goal is not information. It is transformation over time.
            </p>
          </div>
        </section>

        {/* Book selector */}
        <div
          id="book-selector"
          ref={selectorRef}
          className={`mb-6 theme-card rounded-2xl p-8 md:p-12 shadow-xl print:hidden transition-all duration-500 card-cinematic ${
            selectorVisible ? 'fade-in visible' : 'fade-in'
          }`}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-2xl leading-relaxed">
            Below is the full structure of the Bible. As you follow the roadmap above, use this as your reference to understand where everything fits.
          </p>

          <div className="mb-8">
            <div className="flex items-start justify-between gap-6">
              <div className="text-center flex-1">
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

              <button
                onClick={() => setIsAuthorsModalOpen(true)}
                className="flex-shrink-0 theme-card border-2 border-blue-500 hover:border-blue-600 dark:border-blue-400 dark:hover:border-blue-500 rounded-xl p-4 hover:shadow-lg transition-all group hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2 w-32">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight">Bible Authors & Evidence</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Click to explore</p>
                </div>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

        <BibleRoadmap />

        <div className="spacing-section">
          <BookDisplay book={selectedBook} />
        </div>

        {/* Go Deeper bridge */}
        <section className="mt-16 mb-8 print:hidden">
          <div className="theme-card rounded-2xl border-2 p-8 md:p-10">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Go Deeper</p>
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Start the Full Course
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Modal
        isOpen={isAuthorsModalOpen}
        onClose={() => setIsAuthorsModalOpen(false)}
        title="Bible Authors & Evidence"
      >
        <div className="space-y-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The Bible was written over approximately 1,500 years by more than 40 different authors from diverse backgrounds—shepherds, kings, fishermen, prophets, and scholars—all inspired by God to record His message to humanity.
          </p>

          <div className="theme-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ScrollText className="w-8 h-8 text-gray-700 dark:text-gray-300" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Old Testament Timeline (c. 1500 BC → 400 BC)
              </h3>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Moses (c. 1500–1400 BC)</h4>
                </div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  Books: Genesis, Exodus, Leviticus, Numbers, Deuteronomy
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Led Israel out of Egypt and received God's Law on Mount Sinai. His writings lay the foundation for understanding God's character, human sin, covenant, and obedience.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-yellow-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">David (c. 1000 BC)</h4>
                </div>
                <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-1">Books: Many Psalms</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  King of Israel who wrote many Psalms expressing repentance, worship, struggle, and trust in God.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Solomon (c. 970–930 BC)</h4>
                </div>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
                  Books: Proverbs, Ecclesiastes, Song of Songs
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Known for wisdom. Wrote Proverbs (wisdom for daily life), Ecclesiastes (meaning without God), and Song of Songs.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Isaiah (c. 700 BC)</h4>
                </div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">Books: Isaiah</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Spoke to a rebellious nation, warning of judgment but pointing clearly to the coming Messiah with detailed prophecies about Jesus.
                </p>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                And many other prophets and historical writers (Jeremiah, Ezekiel, Daniel, Ezra, Nehemiah, and more)...
              </div>
            </div>
          </div>

          <div className="theme-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ScrollText className="w-8 h-8 text-gray-700 dark:text-gray-300" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                New Testament Timeline (c. AD 45 → 90)
              </h3>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Matthew (c. AD 50–70)</h4>
                </div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Books: Matthew</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Former tax collector and one of Jesus' 12 disciples. Presents Jesus as the promised Messiah and King.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Paul (c. AD 50–67)</h4>
                </div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                  Books: Romans, 1 & 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 & 2 Thessalonians, 1 & 2 Timothy, Titus, Philemon
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Former persecutor of Christians who encountered Jesus after the resurrection on the road to Damascus. His writings focus on salvation by grace through faith, renewal of the mind, and intentional Christian living.
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Peter (c. AD 60–65)</h4>
                </div>
                <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Books: 1 Peter, 2 Peter</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  One of Jesus' closest disciples. Writes with the perspective of someone who failed, was corrected, and transformed.
                </p>
              </div>

              <div className="border-l-4 border-gray-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">John (c. AD 90)</h4>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Books: John, 1 John, 2 John, 3 John, Revelation
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  One of Jesus' closest disciples. Focuses on the identity of Jesus as the Son of God and emphasizes belief, love, and eternal life.
                </p>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                Also Mark, Luke, James, Jude, and the author of Hebrews...
              </div>
            </div>
          </div>

          <div className="theme-card rounded-xl p-6 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-slate-950/30">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">The Big Picture</h3>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">~1,500 years</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Time Span</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">~40</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Authors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">66</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Books</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The Bible is God's timeless guide to all humans, revealing His character, boundless love, and plan for our lives. It offers profound wisdom for daily living, comfort in times of trouble, hope for the future, and the transformative power of grace.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
