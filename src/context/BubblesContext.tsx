import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CollectedMessage {
  id: number;
  message: string;
  scripture: string;
  fullVerse: string;
  color: string;
}

interface BubblesContextType {
  bubblesEnabled: boolean;
  toggleBubbles: () => void;
  collectedMessages: CollectedMessage[];
  addCollectedMessage: (message: CollectedMessage) => void;
  resetMessages: () => void;
}

const BubblesContext = createContext<BubblesContextType | undefined>(undefined);

export function BubblesProvider({ children }: { children: ReactNode }) {
  const [bubblesEnabled, setBubblesEnabled] = useState(() => {
    const saved = localStorage.getItem('bubblesEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [collectedMessages, setCollectedMessages] = useState<CollectedMessage[]>(() => {
    const saved = localStorage.getItem('collectedMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bubblesEnabled', JSON.stringify(bubblesEnabled));
  }, [bubblesEnabled]);

  useEffect(() => {
    localStorage.setItem('collectedMessages', JSON.stringify(collectedMessages));
  }, [collectedMessages]);

  const toggleBubbles = () => {
    setBubblesEnabled((prev: boolean) => !prev);
  };

  const addCollectedMessage = (message: CollectedMessage) => {
    setCollectedMessages(prev => [...prev, message]);
  };

  const resetMessages = () => {
    setCollectedMessages([]);
    localStorage.removeItem('collectedMessages');
  };

  return (
    <BubblesContext.Provider value={{ bubblesEnabled, toggleBubbles, collectedMessages, addCollectedMessage, resetMessages }}>
      {children}
    </BubblesContext.Provider>
  );
}

export function useBubbles() {
  const context = useContext(BubblesContext);
  if (context === undefined) {
    throw new Error('useBubbles must be used within a BubblesProvider');
  }
  return context;
}
