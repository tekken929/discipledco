import { Book } from '../types/book';
import { BookOpen, Calendar, Clock, User, BookMarked } from 'lucide-react';

interface BookDisplayProps {
  book: Book;
}

const sectionColors = [
  '#2FA4A9', // Teal
  '#3B82F6', // Blue
  '#F59E0B', // Orange
  '#EF4444', // Red
  '#22C55E', // Green
  '#374151', // Dark Gray
];

export function BookDisplay({ book }: BookDisplayProps) {
  return (
    <div className="max-w-6xl mx-auto theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">{book.name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Book Order</div>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">#{book.order}</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-4 border border-green-200 dark:border-green-700">
            <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Chapters</div>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{book.chapters}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl p-4 border border-orange-200 dark:border-orange-700 col-span-2 md:col-span-1">
            <div className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-1">Type</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100">{book.type}</div>
          </div>
        </div>
      </div>

      {/* Overview and Metadata Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Overview Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Overview
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {book.overview.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Metadata Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Details</h2>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Written</div>
                <div className="text-gray-900 dark:text-white font-medium">{book.written}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Time Period</div>
                <div className="text-gray-900 dark:text-white font-medium">{book.timePeriod}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Author</div>
                <div className="text-gray-900 dark:text-white font-medium mb-2">{book.author}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{book.authorDescription}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-3">
              <BookMarked className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Version</div>
                <div className="text-gray-900 dark:text-white font-medium">{book.bibleVersion}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structure Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Structure</h2>

        <div className="grid gap-4">
          {book.structure.map((section) => (
            <div
              key={section.number}
              className="bg-white dark:bg-gray-700 rounded-xl border-2 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              style={{ borderColor: sectionColors[section.number - 1] }}
            >
              <div
                className="h-2"
                style={{ backgroundColor: sectionColors[section.number - 1] }}
              />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: sectionColors[section.number - 1] }}
                  >
                    {section.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                      <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-sm font-semibold">
                        Chapters {section.chapterRange}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{section.summary}</p>
                    <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 border-l-4" style={{ borderColor: sectionColors[section.number - 1] }}>
                      <p className="text-sm italic text-gray-700 dark:text-gray-200 mb-1">"{section.keyVerse}"</p>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">— {section.verseReference}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
