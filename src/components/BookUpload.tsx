import { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
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
    const pageDelimiters = ['[PAGE]', '---PAGE---', '\f'];

    let content = text;
    let foundDelimiter = false;

    for (const delimiter of pageDelimiters) {
      if (text.includes(delimiter)) {
        const parts = text.split(delimiter).filter(p => p.trim());
        pages.push(...parts);
        foundDelimiter = true;
        break;
      }
    }

    if (!foundDelimiter) {
      const wordsPerPage = 500;
      const words = text.split(/\s+/);

      for (let i = 0; i < words.length; i += wordsPerPage) {
        const pageWords = words.slice(i, i + wordsPerPage);
        pages.push(pageWords.join(' '));
      }
    }

    return pages;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setProgress('Reading file...');

    try {
      let pages: string[] = [];

      if (file.name.endsWith('.txt')) {
        pages = await parseTextFile(file);
      } else {
        setError('Only .txt files are supported at this time');
        setUploading(false);
        return;
      }

      if (pages.length === 0) {
        setError('No content found in file');
        setUploading(false);
        return;
      }

      setProgress(`Processing ${pages.length} pages...`);

      const bookTitle = bookData.title || file.name.replace('.txt', '');

      const { data: bookRecord, error: bookError } = await supabase
        .from('books')
        .insert({
          title: bookTitle,
          author: bookData.author || 'Unknown Author',
          description: bookData.description || '',
          cover_image_url: bookData.coverImageUrl || '',
          total_pages: pages.length,
          category: bookData.category,
          order_index: 0
        })
        .select()
        .single();

      if (bookError) throw bookError;

      setProgress('Uploading pages to database...');

      const pageRecords = pages.map((content, index) => ({
        book_id: bookRecord.id,
        page_number: index + 1,
        content: content.trim()
      }));

      const batchSize = 50;
      for (let i = 0; i < pageRecords.length; i += batchSize) {
        const batch = pageRecords.slice(i, i + batchSize);
        setProgress(`Uploading pages ${i + 1}-${Math.min(i + batchSize, pageRecords.length)} of ${pageRecords.length}...`);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Book</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={uploading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {progress && (
            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-700 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-lg">
              {progress}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Book Title</label>
              <input
                type="text"
                value={bookData.title}
                onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter book title (or leave blank to use filename)"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Author</label>
              <input
                type="text"
                value={bookData.author}
                onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter author name"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={bookData.description}
                onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Brief description of the book"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={bookData.category}
                onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                disabled={uploading}
              >
                <option value="General">General</option>
                <option value="Old Testament">Old Testament</option>
                <option value="New Testament">New Testament</option>
                <option value="Study Guide">Study Guide</option>
                <option value="Devotional">Devotional</option>
                <option value="Theology">Theology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image URL (optional)</label>
              <input
                type="text"
                value={bookData.coverImageUrl}
                onChange={(e) => setBookData({ ...bookData, coverImageUrl: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="https://example.com/cover.jpg"
                disabled={uploading}
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
            <label className="flex flex-col items-center cursor-pointer">
              <FileText className="w-16 h-16 mb-4 text-gray-400" />
              <span className="text-lg font-medium mb-2">
                {uploading ? 'Uploading...' : 'Choose a text file'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Supported format: .txt
              </span>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              {!uploading && (
                <span className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Select File
                </span>
              )}
            </label>
          </div>

          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="font-medium mb-2">File Format Guidelines:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Use [PAGE] or ---PAGE--- to separate pages manually</li>
              <li>Or the book will be auto-split into ~500 word pages</li>
              <li>Plain text format works best</li>
            </ul>
            <p className="font-medium mt-4 mb-2">Formatting Support:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li># Title - Creates a large heading</li>
              <li>## Subtitle - Creates a medium heading</li>
              <li>**bold text** - Makes text bold</li>
              <li>*italic text* - Makes text italic</li>
              <li>Empty line creates a paragraph break</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
