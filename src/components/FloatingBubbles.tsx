import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBubbles } from '../context/BubblesContext';

interface Message {
  message: string;
  scripture: string;
  fullVerse: string;
}

const encouragingMessages: Message[] = [
  {
    message: "You are here for a reason",
    scripture: "Jeremiah 29:11",
    fullVerse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
  },
  {
    message: "You are not a mistake",
    scripture: "Psalm 139:14",
    fullVerse: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well."
  },
  {
    message: "You have a purpose",
    scripture: "Ephesians 2:10",
    fullVerse: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."
  },
  {
    message: "Jesus loves you",
    scripture: "John 3:16",
    fullVerse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
  },
  {
    message: "It's ok to start today",
    scripture: "Lamentations 3:22-23",
    fullVerse: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness."
  },
  {
    message: "You are wonderfully made",
    scripture: "Psalm 139:13",
    fullVerse: "For you created my inmost being; you knit me together in my mother's womb."
  },
  {
    message: "God has plans for you",
    scripture: "Proverbs 3:5-6",
    fullVerse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
  },
  {
    message: "You are deeply loved",
    scripture: "Romans 8:38-39",
    fullVerse: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
  },
  {
    message: "Your story matters",
    scripture: "2 Corinthians 5:17",
    fullVerse: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"
  },
  {
    message: "Hope is available",
    scripture: "Romans 15:13",
    fullVerse: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."
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
  const { collectedMessages, addCollectedMessage, resetMessages } = useBubbles();
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message & { color: string } | null>(null);
  const [shownOnPage, setShownOnPage] = useState<string | null>(null);

  useEffect(() => {
    // Reset messages and bubbles when navigating to home page
    if (location.pathname === '/' || location.pathname === '/home') {
      resetMessages();
      setShownOnPage(null);
      setShowBubble(false);
    }
  }, [location.pathname, resetMessages]);

  useEffect(() => {
    if (!enabled) {
      setShowBubble(false);
      return;
    }

    // Don't show bubble if already shown on this page
    if (shownOnPage === location.pathname) {
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
      setShownOnPage(location.pathname);
    }, 1500);

    return () => clearTimeout(timer);
  }, [enabled, location.pathname, collectedMessages, shownOnPage]);

  const handleBubbleClick = () => {
    if (!currentMessage) return;

    addCollectedMessage({
      id: Date.now(),
      message: currentMessage.message,
      scripture: currentMessage.scripture,
      fullVerse: currentMessage.fullVerse,
      color: currentMessage.color
    });

    setShowBubble(false);
  };

  if (!enabled || !showBubble || !currentMessage) return null;

  return (
    <div className="fixed top-32 right-4 z-10 animate-in slide-in-from-right duration-500 pointer-events-none">
      <div className="relative pointer-events-auto">
        <button
          onClick={handleBubbleClick}
          className={`relative bg-gradient-to-br ${currentMessage.color} backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-[280px] flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer border-4 border-white/30`}
        >
          <p className="text-white font-bold text-lg mb-3 leading-tight">
            {currentMessage.message}
          </p>
          <p className="text-white/90 text-sm italic mb-4">
            {currentMessage.scripture}
          </p>

          <div className="text-white/90 text-xs font-semibold bg-white/20 px-4 py-2 rounded-full">
            Click to collect
          </div>
        </button>
      </div>
    </div>
  );
}
