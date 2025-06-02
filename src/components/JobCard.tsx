import styled from 'styled-components';
import { TimelineItem } from './Timeline';
import { useHighlight } from '../utils/HighlightContext';
import { scrollToSection } from "../utils/ScrollToSection";

interface JobStack {
  item: TimelineItem;
  level: number;
  startPos: number;
  endPos: number;
}

interface JobCardProps {
  jobStacks: JobStack[];
  timelineY: number;
  alternating: boolean;
  isMobile: boolean;
  timelineHeight?: number;
}

const MobileCardWrapper = styled.div<{ $position: number }>`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MobilePeriodLine = styled.div<{ $top: number; $height: number; $color: string }>`
  position: absolute;
  left: -42px;
  top: 0;
  height: ${props => props.$height}px;
  width: 6px;
  background-color: ${props => props.$color};
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: scaleX(1.5);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const MobileConnector = styled.div`
  position: absolute;
  left: -15px;
  top: 43px;
  width: 15px;
  height: 2px;
  background-color: var(--primary-purple);
  opacity: 0.6;
`;

const PeriodLine = styled.div<{ 
  $left: number; 
  $width: number; 
  $top: number; 
  $color: string;
}>`
  position: absolute;
  left: ${props => props.$left}%;
  width: ${props => props.$width}%;
  top: ${props => props.$top}px;
  height: 6px;
  background-color: ${props => props.$color};
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: scaleY(1.5);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const ConnectionLine = styled.div<{ 
  $left: number; 
  $top: number; 
  $height: number; 
}>`
  position: absolute;
  left: ${props => props.$left}%;
  top: ${props => props.$top}px;
  width: 2px;
  height: ${props => props.$height}px;
  background-color: var(--primary-purple);
  opacity: 0.6;
  transform: translateX(-50%);
  border-radius: 1px;
`;

const CardContainer = styled.div<{ 
  $left?: number; 
  $top?: number;
}>`
  ${props => props.$left !== undefined && props.$top !== undefined ? `
    position: absolute;
    left: ${props.$left}%;
    top: ${props.$top}px;
    transform: translateX(-50%);
  ` : `
    position: relative;
    width: 100%;
  `}
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.$left !== undefined ? 'translateX(-50%) scale(1.05)' : 'scale(1.02)'};
    z-index: 20;
  }
`;

const Card = styled.div<{ $isMobile?: boolean }>`
  background-color: var(--white);
  border: 3px solid var(--primary-purple);
  border-radius: 16px;
  padding: ${props => props.$isMobile ? '12px' : '16px'};
  ${props => props.$isMobile ? `
    max-width: 220px;
  ` : `
    min-width: 240px;
  `}
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transition: all 0.3s ease;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const LogoBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-gray);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  & img {
    border-radius: 10px;
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
`;

const CompanyName = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: var(--dark-gray);
  margin-bottom: 4px;
`;

const Position = styled.div`
  color: var(--dark-gray);
  font-weight: 500;
  font-size: 13px;
  background-color: var(--light-gray);
  padding: 6px 10px;
  border-radius: 8px;
`;

export default function JobCard ({ jobStacks, timelineY, alternating, isMobile, timelineHeight }: JobCardProps) {
  const { setHighlighted } = useHighlight();
  
  const handleIconMouseEnter = (iconId: string) => {
    setHighlighted(iconId);
  };

  if (isMobile) {
    const sortedStacks = [...jobStacks].sort((a, b) => 
      a.item.startDate.getTime() - b.item.startDate.getTime()
    );

    return (
      <>
        {sortedStacks.map(({ item, startPos, endPos }) => {
          const containerHeight = timelineHeight ?? 600;
          const paddingOffset = 40;
          const visualHeight = containerHeight - paddingOffset;
          const topPx = (startPos / 100) * visualHeight + (paddingOffset / 2);
          const heightPx = ((endPos - startPos) / 100) * visualHeight;

          return (
            <MobileCardWrapper key={item.id} $position={topPx}>
              <MobilePeriodLine 
                  $top={0}
                  $height={Math.max(1, heightPx)}
                  $color={item.color}
                />
              <MobileConnector />
              
              <CardContainer
                onMouseEnter={() => handleIconMouseEnter(item.id)}
                onClick={() => scrollToSection(item.id)}
              >
                <Card $isMobile={true}>
                  <LogoContainer>
                    {item.logo && (
                      <LogoBox>
                        <img 
                          src={item.logo} 
                          alt={`${item.company} logo`} 
                          style={{width: '40px', height: '40px', objectFit: 'contain'}} 
                        />
                      </LogoBox>
                    )}
                    <div>
                      <CompanyName>{item.company}</CompanyName>
                    </div>
                  </LogoContainer>
                  
                  <Position>{item.position}</Position>
                </Card>
              </CardContainer>
            </MobileCardWrapper>
          );
        })}
      </>
    );
  }

  return (
    <>
      {jobStacks.map(({ item, level, startPos, endPos }, index) => {
        const lineY = timelineY + 30 + (level * 25);
        
        let cardY: number;
        let isAbove: boolean;
        
        if (alternating) {
          const actualLevel = item.level !== undefined ? item.level : level;
          
          isAbove = index % 2 === 0;
          
          if (isAbove) {
            cardY = timelineY - 195 - (actualLevel * 140);
          } else {
            cardY = timelineY + 100 + (actualLevel * 140);
          }
        } else {
          const actualLevel = item.level !== undefined ? item.level : level;
          isAbove = true;
          cardY = timelineY - 180 - (actualLevel * 140);
        }
        
        const centerPos = (startPos + endPos) / 2;
        
        let connectionHeight: number;
        let connectionTop: number;
        
        if (isAbove) {
          connectionHeight = timelineY - cardY - 100;
          connectionTop = cardY + 100;
        } else {
          connectionHeight = cardY - timelineY - 6;
          connectionTop = timelineY + 6;
        }
        
        return (
          <div key={item.id}>
            <PeriodLine 
              $left={startPos}
              $width={endPos - startPos}
              $top={lineY}
              $color={item.color}
            />
            
            <ConnectionLine
              $left={centerPos}
              $top={connectionTop}
              $height={connectionHeight}
            />
            
            <CardContainer 
              $left={centerPos}
              $top={cardY}
              onMouseEnter={() => handleIconMouseEnter(item.id)}
            >
              <Card>
                <LogoContainer>
                  {item.logo && (
                    <LogoBox>
                      <img src={item.logo} alt={`${item.company} logo`} style={{width: '40px', height: '40px', objectFit: 'contain'}} />
                    </LogoBox>
                  )}
                  <div>
                    <CompanyName>
                      {item.company}
                    </CompanyName>
                  </div>
                </LogoContainer>
                
                <Position>
                  {item.position}
                </Position>
              </Card>
            </CardContainer>
          </div>
        );
      })}
    </>
  );
};