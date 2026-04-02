import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BubbleMessage {
  id: number;
  message: string;
  scripture: string;
  position: { x: number; y: number };
  color: string;
}

const encouragingMessages = [
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
  'from-blue-400/80 to-blue-500/80',
  'from-purple-400/80 to-purple-500/80',
  'from-pink-400/80 to-pink-500/80',
  'from-green-400/80 to-green-500/80',
  'from-yellow-400/80 to-yellow-500/80',
  'from-orange-400/80 to-orange-500/80',
  'from-teal-400/80 to-teal-500/80',
  'from-cyan-400/80 to-cyan-500/80'
];

interface FloatingBubblesProps {
  enabled: boolean;
}

export default function FloatingBubbles({ enabled }: FloatingBubblesProps) {
  const [currentBubble, setCurrentBubble] = useState<BubbleMessage | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const getRandomPosition = () => {
    const padding = 150;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;

    return {
      x: Math.random() * (maxX - padding) + padding,
      y: Math.random() * (maxY - padding) + padding
    };
  };

  const createBubble = () => {
    const message = encouragingMessages[messageIndex];
    const bubble: BubbleMessage = {
      id: Date.now(),
      message: message.message,
      scripture: message.scripture,
      position: getRandomPosition(),
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setCurrentBubble(bubble);
    setMessageIndex((prev) => (prev + 1) % encouragingMessages.length);
  };

  const closeBubble = () => {
    setCurrentBubble(null);
    setTimeout(() => {
      if (enabled) {
        createBubble();
      }
    }, 3000);
  };

  useEffect(() => {
    if (enabled && !currentBubble) {
      const timer = setTimeout(createBubble, 2000);
      return () => clearTimeout(timer);
    }
  }, [enabled, currentBubble]);

  useEffect(() => {
    if (!enabled) {
      setCurrentBubble(null);
    }
  }, [enabled]);

  if (!enabled || !currentBubble) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${currentBubble.position.x}px`,
        top: `${currentBubble.position.y}px`,
      }}
    >
      <div className="relative animate-float pointer-events-auto">
        <div
          className={`relative bg-gradient-to-br ${currentBubble.color} backdrop-blur-sm rounded-full p-6 shadow-lg max-w-[200px] text-center`}
        >
          <button
            onClick={closeBubble}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close bubble"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>

          <p className="text-white font-semibold text-sm mb-2">
            {currentBubble.message}
          </p>
          <p className="text-white/90 text-xs italic">
            {currentBubble.scripture}
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
