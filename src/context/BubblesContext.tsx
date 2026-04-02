import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BubblesContextType {
  bubblesEnabled: boolean;
  toggleBubbles: () => void;
}

const BubblesContext = createContext<BubblesContextType | undefined>(undefined);

export function BubblesProvider({ children }: { children: ReactNode }) {
  const [bubblesEnabled, setBubblesEnabled] = useState(() => {
    const saved = localStorage.getItem('bubblesEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('bubblesEnabled', JSON.stringify(bubblesEnabled));
  }, [bubblesEnabled]);

  const toggleBubbles = () => {
    setBubblesEnabled((prev: boolean) => !prev);
  };

  return (
    <BubblesContext.Provider value={{ bubblesEnabled, toggleBubbles }}>
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
