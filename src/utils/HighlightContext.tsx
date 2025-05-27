import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HighlightContextType {
  highlighted: string | null;
  setHighlighted: (skill: string | null) => void;
}

const HighlightContext = createContext<HighlightContextType | undefined>(undefined);

export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (context === undefined) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
};

interface HighlightProviderProps {
  children: ReactNode;
}

export const HighlightProvider: React.FC<HighlightProviderProps> = ({ children }) => {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  return (
    <HighlightContext.Provider value={{ highlighted, setHighlighted }}>
      {children}
    </HighlightContext.Provider>
  );
};