import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useBubbles } from '../context/BubblesContext';

export default function CollectedMessagesDropdown() {
  const { collectedMessages } = useBubbles();
  const [isOpen, setIsOpen] = useState(false);

  if (collectedMessages.length === 0) return null;

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 border-b-2 border-amber-200 dark:border-gray-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 flex items-center justify-between text-gray-800 dark:text-white hover:bg-amber-100/50 dark:hover:bg-gray-600/50 transition-colors rounded-lg px-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-yellow-400" />
            <span className="font-semibold text-sm">
              Your Encouraging Messages ({collectedMessages.length})
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {isOpen && (
          <div className="pb-4 px-4 space-y-3 max-h-[500px] overflow-y-auto animate-in slide-in-from-top duration-300">
            {collectedMessages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-gradient-to-br ${msg.color} rounded-lg p-4 shadow-md`}
              >
                <p className="text-white font-semibold text-sm mb-2 leading-tight">
                  {msg.message}
                </p>
                <p className="text-white/90 text-xs font-medium mb-1">
                  {msg.scripture}
                </p>
                <p className="text-white/95 text-xs italic leading-relaxed border-t border-white/20 pt-2 mt-2">
                  "{msg.fullVerse}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
