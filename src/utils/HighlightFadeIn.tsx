import { useState, useEffect, ReactNode } from 'react';
import styled from 'styled-components';

const FadeContainer = styled.div<{ $visible: boolean, $animation: string}>`
  opacity: ${props => (props.$visible ? 1 : 0)};
  transition: ${ props => props.$animation };
`;

interface AnimateProps {
  trigger: any;
  children: ReactNode;
  animation?: string;
}

export default function Animate ({ trigger, children, animation = "opacity 0.6s ease-in"}: AnimateProps) {
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