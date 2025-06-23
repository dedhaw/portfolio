import { useState, useRef, useEffect } from 'react';
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

const TimelineContainer = styled.div<{ $height: number; $isMobile: boolean }>`
  height: ${props => props.$isMobile ? 'auto' : `${props.$height}px`};
  min-height: ${props => props.$isMobile ? '100vh' : 'auto'};
  width: 100%;
`;

const TimelineWrapper = styled.div<{ $isMobile: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  ${props => props.$isMobile && `
    display: flex;
    padding: 40px 20px;
    gap: 40px;
  `}
`;

const TimelineTrack = styled.div<{ $isMobile: boolean }>`
  ${props => props.$isMobile ? `
    position: relative;
    width: 60px;
    flex-shrink: 0;
  ` : `
    position: relative;
    width: 100%;
    height: 100%;
  `}
`;

const MainTimeline = styled.div<{ $isMobile: boolean; $top?: number }>`
  position: absolute;
  ${props => props.$isMobile ? `
    left: 30px;
    top: 0;
    bottom: 0;
    width: 6px;
    background: linear-gradient(180deg, var(--primary-blue), var(--primary-purple), var(--primary-teal));
  ` : `
    width: 100%;
    height: 6px;
    top: ${props.$top}px;
    background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple), var(--primary-teal));
  `}
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    border-radius: 3px;
    filter: blur(4px);
    opacity: 0.6;
  }
`;

const TickContainer = styled.div<{ 
  $position: number; 
  $isMobile: boolean;
  $top?: number;
}>`
  position: absolute;
  ${props => props.$isMobile ? `
    top: ${props.$position}%;
    left: 30px;
    transform: translateX(-50%);
  ` : `
    left: ${props.$position}%;
    top: ${props.$top || 0}px;
    transform: translateX(-50%);
  `}
  transition: all 0.3s ease;
`;

const TickLine = styled.div<{ 
  $height: number; 
  $marginTop: number; 
  $isSpecial: boolean; 
  $isHovered: boolean;
  $isMobile: boolean;
}>`
  ${props => props.$isMobile ? `
    height: ${props.$isSpecial ? '2px' : '1px'};
    width: ${props.$height}px;
    margin-left: -${props.$height/2}px;
  ` : `
    width: ${props.$isSpecial ? '2px' : '1px'};
    height: ${props.$height}px;
    margin-top: ${props.$marginTop}px;
  `}
  background-color: ${props => props.$isHovered ? 'var(--primary-blue)' : 'var(--dark-gray)'};
  border-radius: 1px;
  transition: all 0.3s ease;
  transform: ${props => props.$isHovered ? 'scale(1.2)' : 'scale(1)'};
  box-shadow: ${props => props.$isHovered ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'};
`;

const YearLabel = styled.div<{ 
  $isMobile: boolean;
  $isHovered: boolean; 
  $top?: number;
}>`
  position: absolute;
  ${props => props.$isMobile ? `
    left: -45px;
    top: 50%;
    transform: translateY(-50%);
  ` : `
    top: ${props.$top || -40}px;
    left: 50%;
    transform: translateX(-50%);
  `}
  background-color: var(--white);
  color: ${props => props.$isHovered ? 'var(--primary-blue)' : 'var(--dark-gray)'};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: ${props => props.$isHovered ? '16px' : '14px'};
  font-weight: bold;
  border: 2px solid ${props => props.$isHovered ? 'var(--primary-blue)' : 'var(--light-gray)'};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 10;
  white-space: nowrap;
`;

const JobsContainer = styled.div<{ $isMobile: boolean }>`
  ${props => props.$isMobile ? `
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  ` : `
    position: relative;
    width: 100%;
    height: 100%;
  `}
`;

export default function InteractiveTimeline ({
  items,
  height = 600,
  className = '',
  alternating = false
}: InteractiveTimelineProps) {
  const [hoveredTick, setHoveredTick] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [aspectRatio, setAspectRatio] = useState(1.33);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setAspectRatio(windowWidth / windowHeight);
  }, [windowWidth, windowHeight]);

  const isMobile = aspectRatio < 0.75;

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
    if (timelineRef.current && !isMobile) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
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

  if (isMobile) {
    return (
      <TimelineContainer className={className} $height={height} $isMobile={true}>
        <TimelineWrapper $isMobile={true}>
          <TimelineTrack $isMobile={true}>
            <MainTimeline $isMobile={true} />
            
            {ticks.map((tick, index) => {
              const isHovered = hoveredTick === index;
              const tickSize = getTickHeight(tick, isHovered);
              const isSpecial = tick.isEnd || tick.isYearly;
              
              return (
                <TickContainer
                  key={index}
                  $position={tick.position}
                  $isMobile={true}
                >
                  <TickLine 
                    $height={tickSize}
                    $marginTop={0}
                    $isMobile={true}
                    $isSpecial={isSpecial}
                    $isHovered={isHovered}
                  />
                  
                  {(tick.isYearly || tick.isEnd) && (
                    <YearLabel 
                      $isMobile={true}
                      $isHovered={isHovered}
                    >
                      {tick.date.getFullYear()}
                    </YearLabel>
                  )}
                </TickContainer>
              );
            })}
          </TimelineTrack>

          <JobsContainer $isMobile={true}>
            <JobCard 
              jobStacks={jobStacks}
              timelineY={0}
              alternating={false}
              isMobile={true}
              timelineHeight={height}
            />
          </JobsContainer>
        </TimelineWrapper>
      </TimelineContainer>
    );
  }

  return (
    <TimelineContainer className={className} $height={height} $isMobile={false}>
      <TimelineWrapper 
        ref={timelineRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        $isMobile={false}
      >
        <MainTimeline $isMobile={false} $top={timelineY} />
        
        {ticks.map((tick, index) => {
          const isHovered = hoveredTick === index;
          const tickHeight = getTickHeight(tick, isHovered);
          const isSpecial = tick.isEnd || tick.isYearly;
          const goesUp = isSpecial ? false : (index % 2 === 0);
          const marginTop = isSpecial ? -tickHeight/2 : (goesUp ? -tickHeight : 3);
          
          return (
            <TickContainer
              key={index}
              $position={tick.position}
              $isMobile={false}
              $top={timelineY}
            >
              <TickLine 
                $height={tickHeight}
                $marginTop={marginTop}
                $isMobile={false}
                $isSpecial={isSpecial}
                $isHovered={isHovered}
              />
              
              {(tick.isYearly || tick.isEnd) && (
                <YearLabel 
                  $isMobile={false}
                  $isHovered={isHovered}
                  $top={-tickHeight/2 - 30}
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
          isMobile={false}
        />
      </TimelineWrapper>
    </TimelineContainer>
  );
};