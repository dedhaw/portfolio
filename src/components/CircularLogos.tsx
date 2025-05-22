import { useState, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

interface RotatingCircleProps {
  $clockwise: boolean;
  $duration: number;
  $paused: boolean;
}

interface IconProps {
  $size: number;
  $x: number;
  $y: number;
  $angle: number;
  $duration: number;
  $clockwise: boolean;
  $paused: boolean;
}

interface SpinningCircleProps {
  outerIcons?: ReactNode[];
  innerIcons?: ReactNode[];
  size?: number;
  iconSize?: number;
  rotationSpeed?: number;
  hoverPause?: boolean;
}

const CircleContainer = styled.div<{$size: number}>`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
`;

const CircleOutline = styled.div<{$index: number}>`
  position: absolute;
  width: ${props => props.$index === 0 ? '100%' : '70%'};
  height: ${props => props.$index === 0 ? '100%' : '70%'};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px dashed var(--gray-300, #d1d5db);
  pointer-events: none;
`;

const counterRotateCCW = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const counterRotateCW = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const RotatingCircle = styled.div<RotatingCircleProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${props => props.$clockwise ? counterRotateCW : counterRotateCCW} ${props => props.$duration}s linear infinite;
  animation-play-state: ${props => props.$paused ? 'paused' : 'running'};
`;

const Icon = styled.div<IconProps>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${props => props.$clockwise ? counterRotateCW : counterRotateCCW} ${props => props.$duration}s linear infinite;
  animation-play-state: ${props => props.$paused ? 'paused' : 'running'};

  & > * {
    transition: transform 0.2s ease;
  }
  
  &:hover > * {
    transform: scale(1.25);
  }
`;

export default function SpinningCircle({ 
  outerIcons = [], 
  innerIcons = [],
  size = 300, 
  iconSize = 40, 
  rotationSpeed = 40,
  hoverPause = true 
}: SpinningCircleProps) {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  const outerDuration = (rotationSpeed * 720) / 1000;
  const innerDuration = (rotationSpeed * 514.3) / 1000;
  
  const center = size / 2;
  
  const outerRadius = size / 2;
  const innerRadius = size * 0.35;
  
  const handleMouseEnter = () => {
    if (hoverPause) setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    if (hoverPause) setIsPaused(false);
  };
  
  return (
    <CircleContainer 
      $size={size}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CircleOutline $index={0} />
      <CircleOutline $index={1} />
      
      <RotatingCircle 
        $clockwise={true}
        $duration={outerDuration} 
        $paused={isPaused}
      >
        {outerIcons.map((icon, index) => {
          const angle = (index * (360 / outerIcons.length));
          const radians = (angle * Math.PI) / 180;
          
          const x = center + Math.cos(radians) * outerRadius - iconSize / 2;
          const y = center + Math.sin(radians) * outerRadius - iconSize / 2;
          
          return (
            <Icon
              key={`outer-${index}`}
              $size={iconSize}
              $x={x}
              $y={y}
              $duration={outerDuration}
              $angle={angle}
              $clockwise={false}
              $paused={isPaused}
            >
              {icon}
            </Icon>
          );
        })}
      </RotatingCircle>
      
      <RotatingCircle 
        $clockwise={false}
        $duration={innerDuration}
        $paused={isPaused}
      >
        {innerIcons.map((icon, index) => {
          const angle = (index * (360 / innerIcons.length));
          const radians = (angle * Math.PI) / 180;
          
          const x = center + Math.cos(radians) * innerRadius - iconSize / 2;
          const y = center + Math.sin(radians) * innerRadius - iconSize / 2;
          
          return (
            <Icon
              key={`inner-${index}`}
              $size={iconSize}
              $x={x}
              $y={y}
              $duration={innerDuration}
              $angle={-angle}
              $clockwise={true}
              $paused={isPaused}
            >
              {icon}
            </Icon>
          );
        })}
      </RotatingCircle>
    </CircleContainer>
  );
};