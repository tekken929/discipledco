import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Message {
  message: string;
  scripture: string;
}

interface CollectedBubble extends Message {
  id: number;
  color: string;
}

const encouragingMessages: Message[] = [
  {
    message: "You are here for a reason",
    scripture: "Jeremiah 29:11"
  },
  {
    message: "You are not a mistake",
    scripture: "Psalm 139:14"
  },
  {
    message: "You have a purpose",
    scripture: "Ephesians 2:10"
  },
  {
    message: "Jesus loves you",
    scripture: "John 3:16"
  },
  {
    message: "It's ok to start today",
    scripture: "Lamentations 3:22-23"
  },
  {
    message: "You are wonderfully made",
    scripture: "Psalm 139:13"
  },
  {
    message: "God has plans for you",
    scripture: "Proverbs 3:5-6"
  },
  {
    message: "You are deeply loved",
    scripture: "Romans 8:38-39"
  },
  {
    message: "Your story matters",
    scripture: "2 Corinthians 5:17"
  },
  {
    message: "Hope is available",
    scripture: "Romans 15:13"
  }
];

const colors = [
  'from-blue-400 to-blue-500',
  'from-rose-400 to-rose-500',
  'from-emerald-400 to-emerald-500',
  'from-amber-400 to-amber-500',
  'from-cyan-400 to-cyan-500',
  'from-fuchsia-400 to-fuchsia-500',
  'from-lime-400 to-lime-500',
  'from-sky-400 to-sky-500'
];

interface FloatingBubblesProps {
  enabled: boolean;
}

export default function FloatingBubbles({ enabled }: FloatingBubblesProps) {
  const [currentBubble, setCurrentBubble] = useState<CollectedBubble | null>(null);
  const [collectedBubbles, setCollectedBubbles] = useState<CollectedBubble[]>([]);
  const [availableMessages, setAvailableMessages] = useState<Message[]>([...encouragingMessages]);
  const [bubbleY, setBubbleY] = useState(200);

  const getRandomLeftPosition = () => {
    const minY = 200;
    const maxY = window.innerHeight - 300;
    return Math.random() * (maxY - minY) + minY;
  };

  const createBubble = () => {
    if (availableMessages.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const message = availableMessages[randomIndex];

    const bubble: CollectedBubble = {
      id: Date.now(),
      message: message.message,
      scripture: message.scripture,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setCurrentBubble(bubble);
    setBubbleY(getRandomLeftPosition());
  };

  const collectBubble = () => {
    if (!currentBubble) return;

    setCollectedBubbles(prev => [...prev, currentBubble]);
    setAvailableMessages(prev =>
      prev.filter(m => m.message !== currentBubble.message)
    );
    setCurrentBubble(null);

    setTimeout(() => {
      if (enabled && availableMessages.length > 1) {
        createBubble();
      }
    }, 2000);
  };

  useEffect(() => {
    if (enabled && !currentBubble && availableMessages.length > 0) {
      const timer = setTimeout(createBubble, 2000);
      return () => clearTimeout(timer);
    }
  }, [enabled, currentBubble, availableMessages]);

  useEffect(() => {
    if (!enabled) {
      setCurrentBubble(null);
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Floating Bubble in Left Margin */}
      {currentBubble && (
        <div
          className="fixed z-50 pointer-events-none left-8 hidden xl:block"
          style={{
            top: `${bubbleY}px`,
          }}
        >
          <div className="relative animate-float pointer-events-auto">
            <div
              className={`relative bg-gradient-to-br ${currentBubble.color} backdrop-blur-sm rounded-full p-6 shadow-xl w-[180px] h-[180px] flex flex-col items-center justify-center text-center`}
            >
              <button
                onClick={collectBubble}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Collect bubble"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>

              <p className="text-white font-bold text-sm mb-2 leading-tight">
                {currentBubble.message}
              </p>
              <p className="text-white/90 text-xs italic">
                {currentBubble.scripture}
              </p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full pointer-events-none" />
          </div>
        </div>
      )}

      {/* Collected Bubbles - Permanent Display */}
      {collectedBubbles.length > 0 && (
        <div className="fixed left-4 top-32 z-40 hidden xl:block max-w-[200px]">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3 text-center">
              Your Messages
            </h3>
            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
              {collectedBubbles.map((bubble) => (
                <div
                  key={bubble.id}
                  className={`bg-gradient-to-br ${bubble.color} rounded-xl p-3 shadow-md`}
                >
                  <p className="text-white font-semibold text-xs mb-1 leading-tight">
                    {bubble.message}
                  </p>
                  <p className="text-white/90 text-[10px] italic">
                    {bubble.scripture}
                  </p>
                </div>
              ))}
            </div>
            {availableMessages.length === 0 && (
              <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                All messages collected!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
