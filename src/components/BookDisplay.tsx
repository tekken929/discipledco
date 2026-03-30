import { useState } from 'react';
import { Book } from '../types/book';
import { BookOpen, Calendar, Clock, User, BookMarked, Download, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const handlePrint = () => {
    window.print();
  };

  const toggleSection = (sectionNumber: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionNumber)) {
      newExpanded.delete(sectionNumber);
    } else {
      newExpanded.add(sectionNumber);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="max-w-6xl mx-auto theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">{book.name}</h1>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 theme-primary-button text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg flex-shrink-0"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{book.type}</div>
          </div>
        </div>

        {/* Detail Bubbles - Three Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4 border border-purple-200 dark:border-purple-700 col-span-2 md:col-span-1">
            <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">Written</div>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{book.written}</div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-xl p-4 border border-teal-200 dark:border-teal-700 col-span-2 md:col-span-1">
            <div className="text-sm font-medium text-teal-700 dark:text-teal-300 mb-1">Time Period</div>
            <div className="text-3xl font-bold text-teal-900 dark:text-teal-100">{book.timePeriod}</div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900 dark:to-rose-800 rounded-xl p-4 border border-rose-200 dark:border-rose-700 col-span-2 md:col-span-1">
            <div className="text-sm font-medium text-rose-700 dark:text-rose-300 mb-1">Author</div>
            <div className="text-3xl font-bold text-rose-900 dark:text-rose-100">{book.author}</div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Overview
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {book.overview.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {book.imageUrl && (
            <div className="md:w-1/3 flex-shrink-0">
              <img
                src={book.imageUrl}
                alt={`${book.name} manuscript`}
                className="rounded-lg shadow-lg w-full h-auto object-cover border-2 border-gray-200 dark:border-gray-600"
                style={{ maxHeight: '500px' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Content</h2>

        <div className="grid gap-4">
          {book.structure.map((section) => {
            const isExpanded = expandedSections.has(section.number);
            return (
              <div
                key={section.number}
                className="bg-white dark:bg-gray-700 rounded-xl border-2 shadow-sm hover:shadow-md transition-all overflow-hidden"
                style={{ borderColor: sectionColors[section.number - 1] }}
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: sectionColors[section.number - 1] }}
                />
                <button
                  onClick={() => toggleSection(section.number)}
                  className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: sectionColors[section.number - 1] }}
                      >
                        {section.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                          <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-sm font-semibold">
                            Ch. {section.chapterRange}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="pl-16">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{section.summary}</p>
                      <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 border-l-4" style={{ borderColor: sectionColors[section.number - 1] }}>
                        <p className="text-sm italic text-gray-700 dark:text-gray-200 mb-1">"{section.keyVerse}"</p>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">— {section.verseReference}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
