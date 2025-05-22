import React, { useState, createContext } from 'react';

export const WindowContext = createContext<{
  activeWindowId: string | null;
  setActiveWindow: (id: string) => void;
}>({
  activeWindowId: null,
  setActiveWindow: () => {},
});

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  
  const setActiveWindow = (id: string) => {
    setActiveWindowId(id);
  };
  
  return (
    <WindowContext.Provider value={{ 
      activeWindowId, 
      setActiveWindow, 
    }}>
      {children}
    </WindowContext.Provider>
  );
}; 