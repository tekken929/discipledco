import { useState } from 'react';
import { Upload, X, FileText, BookOpen, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useDarkMode } from '../context/DarkModeContext';

interface BookUploadProps {
  onClose: () => void;
  onUploadComplete: () => void;
}

export function BookUpload({ onClose, onUploadComplete }: BookUploadProps) {
  const { isDarkMode } = useDarkMode();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'General',
    coverImageUrl: ''
  });

  const parseTextFile = async (file: File): Promise<string[]> => {
    const text = await file.text();
    const pages: string[] = [];

    let content = text;

    if (text.includes('[PAGE]')) {
      const parts = text.split('[PAGE]').filter(p => p.trim());
      pages.push(...parts);
    } else if (text.includes('---PAGE---')) {
      const parts = text.split('---PAGE---').filter(p => p.trim());
      pages.push(...parts);
    } else if (text.includes('\f')) {
      const parts = text.split('\f').filter(p => p.trim());
      pages.push(...parts);
    } else {
      const paragraphs = text.split(/\n\n+/);
      let currentPage = '';
      let wordCount = 0;
      const wordsPerPage = 400;

      for (const paragraph of paragraphs) {
        const words = paragraph.trim().split(/\s+/);

        if (wordCount + words.length > wordsPerPage && currentPage) {
          pages.push(currentPage.trim());
          currentPage = paragraph + '\n\n';
          wordCount = words.length;
        } else {
          currentPage += paragraph + '\n\n';
          wordCount += words.length;
        }
      }

      if (currentPage.trim()) {
        pages.push(currentPage.trim());
      }
    }

    return pages.filter(p => p.trim().length > 0);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setProgress('Analyzing file...');

    try {
      if (!file.name.endsWith('.txt')) {
        setError('Only .txt files are supported');
        setProgress('');
        return;
      }

      const pages = await parseTextFile(file);

      if (pages.length === 0) {
        setError('No content found in file');
        setProgress('');
        return;
      }

      setPreviewPages(pages);
      setShowPreview(true);
      setProgress(`Ready to upload ${pages.length} pages`);

      if (!bookData.title) {
        setBookData(prev => ({
          ...prev,
          title: file.name.replace('.txt', '').replace(/[-_]/g, ' ')
        }));
      }

    } catch (err) {
      console.error('Parse error:', err);
      setError('Failed to parse file');
      setProgress('');
    }
  };

  const handleUpload = async () => {
    if (previewPages.length === 0) {
      setError('No pages to upload');
      return;
    }

    if (!bookData.title.trim()) {
      setError('Please enter a book title');
      return;
    }

    setUploading(true);
    setError('');
    setProgress('Creating book...');

    try {
      const { data: bookRecord, error: bookError } = await supabase
        .from('books')
        .insert({
          title: bookData.title.trim(),
          author: bookData.author.trim() || 'Unknown Author',
          description: bookData.description.trim() || '',
          cover_image_url: bookData.coverImageUrl.trim() || '',
          total_pages: previewPages.length,
          category: bookData.category,
          order_index: 0
        })
        .select()
        .single();

      if (bookError) throw bookError;

      setProgress('Uploading pages...');

      const pageRecords = previewPages.map((content, index) => ({
        book_id: bookRecord.id,
        page_number: index + 1,
        content: content.trim()
      }));

      const batchSize = 100;
      for (let i = 0; i < pageRecords.length; i += batchSize) {
        const batch = pageRecords.slice(i, i + batchSize);
        const percentage = Math.round(((i + batch.length) / pageRecords.length) * 100);
        setProgress(`Uploading pages... ${percentage}%`);

        const { error: pagesError } = await supabase
          .from('book_pages')
          .insert(batch);

        if (pagesError) throw pagesError;
      }

      setProgress('Upload complete!');
      setTimeout(() => {
        onUploadComplete();
        onClose();
      }, 1000);

    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload book');
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between sticky top-0 z-10 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Book</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={uploading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Messages */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center gap-2">
              <X className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {progress && (
            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-700 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <span>{progress}</span>
            </div>
          )}

          {/* Book Details Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Book Title *
                </label>
                <input
                  type="text"
                  value={bookData.title}
                  onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-amber-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                  } focus:outline-none`}
                  placeholder="Enter book title"
                  disabled={uploading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Author
                </label>
                <input
                  type="text"
                  value={bookData.author}
                  onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-amber-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                  } focus:outline-none`}
                  placeholder="Author name"
                  disabled={uploading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={bookData.description}
                onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-amber-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                } focus:outline-none resize-none`}
                placeholder="Brief description of the book"
                disabled={uploading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={bookData.category}
                  onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-amber-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                  } focus:outline-none`}
                  disabled={uploading}
                >
                  <option value="General">General</option>
                  <option value="Old Testament">Old Testament</option>
                  <option value="New Testament">New Testament</option>
                  <option value="Study Guide">Study Guide</option>
                  <option value="Devotional">Devotional</option>
                  <option value="Theology">Theology</option>
                  <option value="Biography">Biography</option>
                  <option value="Commentary">Commentary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={bookData.coverImageUrl}
                  onChange={(e) => setBookData({ ...bookData, coverImageUrl: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-amber-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                  } focus:outline-none`}
                  placeholder="https://..."
                  disabled={uploading}
                />
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          {!showPreview ? (
            <div className={`border-2 border-dashed rounded-2xl p-12 transition-colors ${
              isDarkMode
                ? 'border-gray-600 hover:border-amber-500 bg-gray-700/30'
                : 'border-gray-300 hover:border-amber-500 bg-amber-50/30'
            }`}>
              <label className="flex flex-col items-center cursor-pointer">
                <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                  <FileText className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Choose a text file
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
                  Drag and drop or click to browse
                </span>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                />
                {!uploading && (
                  <span className="px-8 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-semibold">
                    Select File
                  </span>
                )}
              </label>
            </div>
          ) : (
            <div className={`border-2 rounded-2xl p-6 ${
              isDarkMode ? 'border-green-700 bg-green-900/20' : 'border-green-300 bg-green-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">File ready to upload</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{previewPages.length} pages detected</p>
                  </div>
                </div>
                {!uploading && (
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      setPreviewPages([]);
                      setProgress('');
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Change file
                  </button>
                )}
              </div>

              {previewPages.length > 0 && (
                <div className={`mt-4 p-4 rounded-xl text-sm ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <p className="font-semibold mb-2 text-gray-900 dark:text-white">First page preview:</p>
                  <div className={`max-h-32 overflow-y-auto text-gray-700 dark:text-gray-300 ${
                    isDarkMode ? 'scrollbar-thin scrollbar-thumb-gray-600' : ''
                  }`}>
                    {previewPages[0].substring(0, 300)}...
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className={`rounded-xl p-4 text-sm ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <p className="font-semibold mb-2 text-gray-900 dark:text-white">Formatting Tips:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">[PAGE]</code> separates pages</li>
                <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded"># Title</code> creates headings</li>
                <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">**bold**</code> for bold text</li>
              </ul>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">*italic*</code> for italic text</li>
                <li>• Empty lines create paragraphs</li>
                <li>• Auto-splits at ~400 words/page</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={uploading}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors ${
                uploading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading || !showPreview || !bookData.title.trim()}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                uploading || !showPreview || !bookData.title.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
