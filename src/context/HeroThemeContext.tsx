import { createContext, useContext, useState, type ReactNode } from 'react';

export type HeroTheme = 'dawn' | 'sanctuary' | 'aurora' | 'forest' | 'ember' | 'frost';

interface HeroThemeContextValue {
  heroTheme: HeroTheme;
  setHeroTheme: (t: HeroTheme) => void;
}

const HeroThemeContext = createContext<HeroThemeContextValue | undefined>(undefined);

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [heroTheme, setHeroTheme] = useState<HeroTheme>('forest');
  return (
    <HeroThemeContext.Provider value={{ heroTheme, setHeroTheme }}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme() {
  const ctx = useContext(HeroThemeContext);
  if (!ctx) throw new Error('useHeroTheme must be used within HeroThemeProvider');
  return ctx;
}
