import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface BibleVerseModalProps {
  verseReference: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BibleVerseModal({ verseReference, isOpen, onClose }: BibleVerseModalProps) {
  const [verseContent, setVerseContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isOpen || !verseReference) return;

    const fetchVerse = async () => {
      setLoading(true);
      setError('');

      try {
        const encodedRef = encodeURIComponent(verseReference);
        const url = `https://www.biblegateway.com/passage/?search=${encodedRef}&version=ESV&interface=print`;

        const response = await fetch(url);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const passageContent = doc.querySelector('.passage-content');
        if (passageContent) {
          const verseText = passageContent.querySelector('.passage-text');
          if (verseText) {
            const footnotes = verseText.querySelectorAll('.footnote, .crossreference, .footnotes');
            footnotes.forEach(fn => fn.remove());

            const headings = verseText.querySelectorAll('h3, h4');
            headings.forEach(h => {
              h.className = 'text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white';
            });

            setVerseContent(verseText.innerHTML);
          } else {
            setError('Could not find verse content');
          }
        } else {
          setError('Could not load verse');
        }
      } catch (err) {
        setError('Failed to load verse. Please try again.');
        console.error('Error fetching verse:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, [isOpen, verseReference]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {verseReference}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading verse...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && verseContent && (
            <div
              className="prose dark:prose-invert max-w-none verse-content"
              dangerouslySetInnerHTML={{ __html: verseContent }}
            />
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Verse content from <a href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(verseReference)}&version=ESV`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">BibleGateway.com (ESV)</a>
          </p>
        </div>
      </div>
    </div>
  );
}
