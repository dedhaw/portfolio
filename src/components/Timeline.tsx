import { useState, useRef } from 'react';
import styled from 'styled-components';
import JobCard from './JobCard';

export interface TimelineItem {
  id: string;
  company: string;
  position: string;
  logo?: string;
  startDate: Date;
  endDate: Date;
  level?: number;
  color: string;
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  height?: number;
  className?: string;
  alternating?: boolean;
}

const TimelineContainer = styled.div<{ $height: number }>`
  height: ${props => props.$height}px;
`;

const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MainTimeline = styled.div<{ $top: number }>`
  position: absolute;
  width: 100%;
  height: 6px;
  top: ${props => props.$top}px;
  background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple), var(--primary-teal));
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple), var(--primary-teal));
    border-radius: 3px;
    filter: blur(4px);
    opacity: 0.6;
  }
`;

const TickContainer = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  left: ${props => props.$left}%;
  top: ${props => props.$top}px;
  transform: translateX(-50%);
  transition: all 0.3s ease;
`;

const TickLine = styled.div<{ 
  $height: number; 
  $marginTop: number; 
  $isSpecial: boolean; 
  $isHovered: boolean; 
}>`
  width: ${props => props.$isSpecial ? '2px' : '1px'};
  height: ${props => props.$height}px;
  background-color: ${props => props.$isHovered ? 'var(--primary-blue)' : 'var(--dark-gray)'};
  border-radius: 1px;
  margin-top: ${props => props.$marginTop}px;
  transition: all 0.3s ease;
  transform: ${props => props.$isHovered ? 'scale(1.2)' : 'scale(1)'};
  box-shadow: ${props => props.$isHovered ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'};
`;

const YearLabel = styled.div<{ 
  $top: number; 
  $isHovered: boolean; 
}>`
  position: absolute;
  top: ${props => props.$top}px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--white);
  color: ${props => props.$isHovered ? 'var(--primary-blue)' : 'var(--dark-gray)'};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: ${props => props.$isHovered ? '16px' : '14px'};
  font-weight: bold;
  border: 2px solid ${props => props.$isHovered ? 'var(--primary-blue)' : 'var(--light-gray)'};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 10;ß
  white-space: nowrap;
`;

export default function InteractiveTimeline ({
  items,
  height = 600,
  className = '',
  alternating = false
}: InteractiveTimelineProps) {
  const [hoveredTick, setHoveredTick] = useState<number | null>(null);
  const [mouseX, setMouseX] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const getDateRange = () => {
    if (items.length === 0) return { start: new Date(), end: new Date() };
    
    const allDates = items.flatMap(item => [item.startDate, item.endDate]);
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
    
    const totalRange = maxDate.getTime() - minDate.getTime();
    const padding = totalRange * 0.15;
    
    return {
      start: new Date(minDate.getTime() - padding),
      end: new Date(maxDate.getTime() + padding)
    };
  };

  const dateRange = getDateRange();
  const totalDuration = dateRange.end.getTime() - dateRange.start.getTime();
  const timelineY = height / 2;

  const generateTicks = () => {
    const ticks = [];
    const startYear = dateRange.start.getFullYear();
    const endYear = dateRange.end.getFullYear();
    
    ticks.push({
      position: 0,
      date: dateRange.start,
      isEnd: true,
      isYearly: false
    });
    
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        
        if (date >= dateRange.start && date <= dateRange.end) {
          const position = ((date.getTime() - dateRange.start.getTime()) / totalDuration) * 100;
          
          ticks.push({
            position,
            date,
            isEnd: false,
            isYearly: month === 0
          });
        }
      }
    }
    
    ticks.push({
      position: 100,
      date: dateRange.end,
      isEnd: true,
      isYearly: false
    });
    
    return ticks;
  };

  const ticks = generateTicks();

  const dateToPosition = (date: Date) => {
    const ratio = (date.getTime() - dateRange.start.getTime()) / totalDuration;
    return Math.max(0, Math.min(100, ratio * 100));
  };

  const calculateJobStacks = () => {
    const sortedItems = [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const stacks: { item: TimelineItem; level: number; startPos: number; endPos: number }[] = [];
    
    sortedItems.forEach(item => {
      const startPos = dateToPosition(item.startDate);
      const endPos = dateToPosition(item.endDate);
      
      let level = 0;
      let canPlace = false;
      
      while (!canPlace) {
        canPlace = true;
        
        for (const stack of stacks) {
          if (stack.level === level) {
            if (!(endPos <= stack.startPos || startPos >= stack.endPos)) {
              canPlace = false;
              break;
            }
          }
        }
        
        if (!canPlace) level++;
        else break;
      }
      
      stacks.push({ item, level, startPos, endPos });
    });
    
    return stacks;
  };

  const jobStacks = calculateJobStacks();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setMouseX(x);
      
      const percentage = (x / rect.width) * 100;
      const closestTick = ticks.reduce((closest, tick, index) => {
        const distance = Math.abs(tick.position - percentage);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Infinity });
      
      setHoveredTick(closestTick.distance < 3 ? closestTick.index : null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredTick(null);
  };

  const getTickHeight = (tick: any, isHovered: boolean) => {
    if (tick.isEnd) return isHovered ? 80 : 60;
    if (tick.isYearly) return isHovered ? 60 : 40;
    return isHovered ? 30 : 20;
  };

  return (
    <TimelineContainer className={className} $height={height}>
      <TimelineWrapper 
        ref={timelineRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <MainTimeline $top={timelineY} />

        {ticks.map((tick, index) => {
          const isHovered = hoveredTick === index;
          const tickHeight = getTickHeight(tick, isHovered);
          const isSpecial = tick.isEnd || tick.isYearly;
          const goesUp = isSpecial ? false : (index % 2 === 0);
          const marginTop = isSpecial ? -tickHeight/2 : (goesUp ? -tickHeight : 3);
          
          return (
            <TickContainer
              key={index}
              $left={tick.position}
              $top={timelineY + (isSpecial ? 0 : 3)}
            >
              <TickLine 
                $height={tickHeight}
                $marginTop={marginTop}
                $isSpecial={isSpecial}
                $isHovered={isHovered}
              />
              
              {(tick.isYearly || tick.isEnd) && (
                <YearLabel 
                  $top={-tickHeight/2 - 30}
                  $isHovered={isHovered}
                >
                  {tick.date.getFullYear()}
                </YearLabel>
              )}
            </TickContainer>
          );
        })}

        <JobCard 
          jobStacks={jobStacks}
          timelineY={timelineY}
          alternating={alternating}
        />
      </TimelineWrapper>
    </TimelineContainer>
  );
};