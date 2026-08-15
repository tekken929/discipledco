import React, { useState } from 'react';
import { Search, BookOpen, Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface BibleResult {
  id: number;
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function Guidance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<BibleResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setLoading(true);
    setHasSearched(true);
    setVisibleCount(20);

    try {
      const { data, error } = await supabase
        .from('translations_bible')
        .select('id, book, chapter, verse, text')
        .eq('translation', 'nlt')
        .ilike('text', `%${query}%`)
        .order('book_order', { ascending: true })
        .order('chapter', { ascending: true })
        .order('verse', { ascending: true })
        .limit(500);

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error('Error searching Bible:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-amber-200 dark:bg-amber-500/30 text-inherit rounded px-0.5">{part}</mark>
      ) : (
        part
      )
    );
  };

  const visibleResults = results.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-full p-6 shadow-2xl">
                <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Biblical Guidance
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 font-light">
            Search the entire Bible for guidance
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <Search className="w-6 h-6 text-gray-400 ml-6" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search the Bible... (e.g., love, peace, forgiveness)"
                  className="flex-1 px-6 py-5 text-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="m-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>

          <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
            Searching the New Living Translation (NLT)
          </p>
        </div>

        {hasSearched && (
          <div className="relative z-10 w-full max-w-4xl mt-8">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
                <p className="mt-4 text-gray-600 dark:text-gray-300">Searching the Scriptures...</p>
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {results.length} {results.length === 1 ? 'verse' : 'verses'} found for "{searchQuery}"
                  </p>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    NLT
                  </span>
                </div>

                <div className="space-y-3">
                  {visibleResults.map((result) => (
                    <Link
                      key={result.id}
                      to={`/bible-lookup?book=${encodeURIComponent(result.book)}&chapter=${result.chapter}&verse=${result.verse}&translation=nlt`}
                      className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2">
                            {result.book} {result.chapter}:{result.verse}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {highlightMatch(result.text, searchQuery.trim())}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {visibleCount < results.length && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setVisibleCount((c) => c + 20)}
                      className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full font-semibold border border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Load more ({results.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                  No verses found for "{searchQuery}"
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Try a different word or phrase.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
