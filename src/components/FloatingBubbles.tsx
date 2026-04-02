import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBubbles } from '../context/BubblesContext';

interface Message {
  message: string;
  scripture: string;
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
  const location = useLocation();
  const { collectedMessages, addCollectedMessage } = useBubbles();
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message & { color: string } | null>(null);

  useEffect(() => {
    if (!enabled) {
      setShowBubble(false);
      return;
    }

    const collectedMessageTexts = collectedMessages.map(m => m.message);
    const availableMessages = encouragingMessages.filter(
      m => !collectedMessageTexts.includes(m.message)
    );

    if (availableMessages.length === 0) {
      return;
    }

    const randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setCurrentMessage({
      ...randomMessage,
      color: randomColor
    });

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [enabled, location.pathname, collectedMessages]);

  const handleBubbleClick = () => {
    if (!currentMessage) return;

    addCollectedMessage({
      id: Date.now(),
      message: currentMessage.message,
      scripture: currentMessage.scripture,
      color: currentMessage.color
    });

    setShowBubble(false);
  };

  if (!enabled || !showBubble || !currentMessage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative animate-float">
        <button
          onClick={handleBubbleClick}
          className={`relative bg-gradient-to-br ${currentMessage.color} backdrop-blur-sm rounded-full p-8 shadow-2xl w-[240px] h-[240px] flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer`}
        >
          <p className="text-white font-bold text-lg mb-3 leading-tight">
            {currentMessage.message}
          </p>
          <p className="text-white/90 text-sm italic">
            {currentMessage.scripture}
          </p>

          <div className="absolute bottom-4 text-white/70 text-xs">
            Click to collect
          </div>
        </button>

        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
