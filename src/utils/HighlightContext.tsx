import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

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

const FadeContainer = styled.div<{ $visible: boolean, $animation: string}>`
  opacity: ${props => (props.$visible ? 1 : 0)};
  transition: ${ props => props.$animation };
`;

interface AnimateProps {
  trigger: any;
  children: ReactNode;
  animation?: string;
}

export function Animate ({ 
  trigger, children, animation = "opacity 0.6s ease-in"
}: AnimateProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = window.setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
        <FadeContainer $visible={visible} $animation={animation}>
            {children}
        </FadeContainer>
    );
};