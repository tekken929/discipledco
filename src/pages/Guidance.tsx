import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ReturnToHome } from '../components/ReturnToHome';

interface ScriptureReference {
  book: string;
  chapter: number;
  verse: number;
  version: string;
  text: string;
}

interface GuidanceQA {
  id: string;
  question: string;
  answer: string;
  scripture_references: ScriptureReference[];
  category: string;
}

export default function Guidance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<GuidanceQA[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 2);

      const { data, error } = await supabase
        .from('guidance_qa')
        .select('*')
        .or(searchTerms.map(term => `keywords.cs.{${term}}`).join(','));

      if (error) throw error;

      setResults(data || []);
    } catch (error) {
      console.error('Error searching guidance:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ReturnToHome />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-full p-6 shadow-2xl">
                <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Biblical Guidance
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 font-light">
            What do you need guidance on?
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <Search className="w-6 h-6 text-gray-400 ml-6" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything... (e.g., How do I find peace?)"
                  className="flex-1 px-6 py-5 text-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="m-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {hasSearched && (
          <div className="relative z-10 w-full max-w-4xl mt-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Searching the Scriptures...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {result.question}
                      </h3>
                    </div>

                    {result.category && (
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                        {result.category}
                      </span>
                    )}

                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
                      {result.answer}
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        Scripture References:
                      </h4>
                      {result.scripture_references.map((ref, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4 border-l-4 border-blue-600"
                        >
                          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                            {ref.book} {ref.chapter}:{ref.verse} ({ref.version})
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                            "{ref.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                  No guidance found for "{searchQuery}"
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Try different keywords or check back later as we add more guidance.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
