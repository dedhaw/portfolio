import { useState, useRef, useEffect, useContext, ReactNode } from 'react';
import styled from 'styled-components';
import { WindowContext } from '../utils/WindowContext';

const MacOSWindow = styled.div<{ $isDragging: boolean; $isActive: boolean, $isDisplayed: boolean, $isAnimating: boolean; }>`
 position: relative;
 width: 600px;
 height: 400px;
 background-color: var(--white);
 border-radius: var(--radius-md);
 overflow: hidden;
 margin: 0 auto;
 transition: ${props => props.$isAnimating ? 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'box-shadow 0.2s ease'};
 z-index: ${props => props.$isActive ? 2 : 1};
 ${props => props.$isDragging ? 'cursor: grabbing; box-shadow: var(--shadow-lg), 0 0 0 2px var(--primary-blue) !important;' : ''}
 box-shadow: var(--shadow-lg);
 display: ${props => props.$isDisplayed ? "block" : "none"};

 &:hover {
   box-shadow: var(--shadow-lg), 0 0 0 1px var(--primary-teal);
 }
`;

const TitleBar = styled.div<{ $isActive: boolean }>`
 display: flex;
 align-items: center;
 height: 38px;
 padding: 0 12px;
 background-color: ${props => props.$isActive ? 
   'var(--off-grey)' : 
   'var(--dark-grey)'};
 user-select: none;
`;

const ControlsContainer = styled.div`
 display: flex;
 gap: 8px;
 margin-right: 12px;
`;

const ControlButton = styled.div<{ $color: string; $borderColor: string }>`
 width: 13px;
 height: 13px;
 border-radius: 50%;
 background-color: ${props => `var(--macos-${props.$color})`};
 position: relative;
 
 &:hover::after {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   border-radius: 50%;
   border: 2px solid ${props => `var(--macos-${props.$borderColor})`};
   box-sizing: border-box;
   cursor: default;
 }
`;

const Title = styled.div`
 flex: 1;
 text-align: center;
 font-family: var(--body-font);
 font-size: 13px;
 color: var(--dark-gray);
 font-weight: 500;
`;

const Content = styled.div<{ $backgroundColor: string }>`
 height: calc(100% - 38px);
 width: 100%;
 background-color: var(--${props => props.$backgroundColor});
 overflow: overlay;
 scrollbar-width: none;

 &::-webkit-scrollbar {
   width: 0px;
 }

 &:hover {
   scrollbar-width: thin;
   
   &::-webkit-scrollbar {
     width: 8px;
   }
   
   &::-webkit-scrollbar-thumb {
     background: var(--gray-400);
     border-radius: 4px;
   }
 }
`;

const ResizeHandle = styled.div<{ $position: string }>`
 position: absolute;
 ${props => {
   switch (props.$position) {
     case 'top-left':
       return 'top: 0; left: 0; cursor: nwse-resize;';
     case 'top-right':
       return 'top: 0; right: 0; cursor: nesw-resize;';
     case 'bottom-left':
       return 'bottom: 0; left: 0; cursor: nesw-resize;';
     case 'bottom-right':
       return 'bottom: 0; right: 0; cursor: nwse-resize;';
     case 'top':
       return 'top: 0; left: 10px; right: 10px; height: 6px; cursor: ns-resize;';
     case 'right':
       return 'top: 10px; right: 0; bottom: 10px; width: 6px; cursor: ew-resize;';
     case 'bottom':
       return 'bottom: 0; left: 10px; right: 10px; height: 6px; cursor: ns-resize;';
     case 'left':
       return 'top: 10px; left: 0; bottom: 10px; width: 6px; cursor: ew-resize;';
     default:
       return '';
   }
 }}
 z-index: 10;
 ${props => {
   if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(props.$position)) {
     return 'width: 10px; height: 10px;';
   }
   return '';
 }}
`;

interface MacOSProps {
   id: string;
   title?: string;
   content?: ReactNode;
   backgroundColor?: string;
   width?: number;
   height?: number;
   startingXPosition?: number | null;
   startingYPosition?: number | null;
}

// base dimensions
const DESIGN_WIDTH = 1600;
const DESIGN_HEIGHT = 900;

export default function MacOS ({
   id,
   title="untitled app",
   content,
   backgroundColor="white",
   width=600,
   height=400,
   startingXPosition = null,
   startingYPosition = null,
}: MacOSProps) {
   const [position, setPosition] = useState({ 
       x: startingXPosition !== null ? startingXPosition : 0, 
       y: startingYPosition !== null ? startingYPosition : 0 
   });
   const [size, setSize] = useState({ width, height });
   const [isDragging, setIsDragging] = useState(false);
   const [isResizing, setIsResizing] = useState(false);
   const [resizeDirection, setResizeDirection] = useState('');
   const [offset, setOffset] = useState({ x: 0, y: 0 });
   const [startSize, setStartSize] = useState({ width, height });
   const [startPos, setStartPos] = useState({ x: 0, y: 0 });
   const [isDisplayed, setIsDisplayed] = useState(true);
   const [isAnimating, setIsAnimating] = useState(false);
   const windowRef = useRef<HTMLDivElement>(null);

   const { activeWindowId, setActiveWindow } = useContext(WindowContext);
   const isActive = activeWindowId === id;

   const getScaleFactor = () => {
     if (!windowRef.current?.parentElement) return 1;
     
     const parentRect = windowRef.current.parentElement.getBoundingClientRect();
     
     const scaleX = parentRect.width / DESIGN_WIDTH;
     const scaleY = parentRect.height / DESIGN_HEIGHT;
     
     return Math.min(scaleX, scaleY);
   };

   const getCenterOffset = () => {
     if (!windowRef.current?.parentElement) return { x: 0, y: 0 };
     
     const parentRect = windowRef.current.parentElement.getBoundingClientRect();
     const scaleFactor = getScaleFactor();
     const scaledDesignWidth = DESIGN_WIDTH * scaleFactor;
     const scaledDesignHeight = DESIGN_HEIGHT * scaleFactor;
     
     return {
       x: Math.max(0, (parentRect.width - scaledDesignWidth) / 2),
       y: Math.max(0, (parentRect.height - scaledDesignHeight) / 2)
     };
   };
 
   const handleWindowClick = () => {
     setActiveWindow(id);
   };
   
   const handleMouseDown = (e: React.MouseEvent) => {
     handleWindowClick();
     
     if ((e.target as HTMLElement).closest('.titleBar')) {
       setIsDragging(true);
       
       if (windowRef.current) {
         const rect = windowRef.current.getBoundingClientRect();
         setOffset({
           x: e.clientX - rect.left,
           y: e.clientY - rect.top
         });
       }
     }
   };
 
   const handleMouseMove = (e: MouseEvent) => {
     if (isDragging && windowRef.current) {
       const parentRect = windowRef.current.parentElement?.getBoundingClientRect();
       const windowRect = windowRef.current.getBoundingClientRect();
       
       if (parentRect) {
         const centerOffset = getCenterOffset();
         const newX = e.clientX - parentRect.left - offset.x - centerOffset.x;
         const newY = e.clientY - parentRect.top - offset.y - centerOffset.y;
         
         const maxX = parentRect.width - windowRect.width;
         const maxY = parentRect.height - windowRect.height;
         
         const boundedX = Math.max(-centerOffset.x, Math.min(newX, maxX - centerOffset.x));
         const boundedY = Math.max(-centerOffset.y, Math.min(newY, maxY - centerOffset.y));
         
         setPosition({ x: boundedX, y: boundedY });
       }
     }
   };
 
   const handleMouseUp = () => {
     setIsDragging(false);
   };
 
   const handleResizeStart = (e: React.MouseEvent, direction: string) => {
     e.preventDefault();
     e.stopPropagation();
     
     handleWindowClick();
     
     setIsResizing(true);
     setResizeDirection(direction);
     
     if (windowRef.current) {
       const rect = windowRef.current.getBoundingClientRect();
       setStartSize({ width: rect.width, height: rect.height });
       setStartPos({ x: position.x, y: position.y });
       setOffset({ x: e.clientX, y: e.clientY });
     }
   };
 
   const handleResize = (e: MouseEvent) => {
     if (isResizing && windowRef.current) {
       const deltaX = e.clientX - offset.x;
       const deltaY = e.clientY - offset.y;
       
       const scaleFactor = getScaleFactor();
       const minWidth = 300 * scaleFactor;
       const minHeight = 200 * scaleFactor;
       
       let newWidth = startSize.width;
       let newHeight = startSize.height;
       let newX = startPos.x;
       let newY = startPos.y;
       
       switch (resizeDirection) {
         case 'bottom-right':
           newWidth = Math.max(minWidth, startSize.width + deltaX);
           newHeight = Math.max(minHeight, startSize.height + deltaY);
           break;
         case 'bottom-left':
           newWidth = Math.max(minWidth, startSize.width - deltaX);
           newHeight = Math.max(minHeight, startSize.height + deltaY);
           newX = startPos.x + (startSize.width - newWidth);
           break;
         case 'top-right':
           newWidth = Math.max(minWidth, startSize.width + deltaX);
           newHeight = Math.max(minHeight, startSize.height - deltaY);
           newY = startPos.y + (startSize.height - newHeight);
           break;
         case 'top-left':
           newWidth = Math.max(minWidth, startSize.width - deltaX);
           newHeight = Math.max(minHeight, startSize.height - deltaY);
           newX = startPos.x + (startSize.width - newWidth);
           newY = startPos.y + (startSize.height - newHeight);
           break;
         case 'right':
           newWidth = Math.max(minWidth, startSize.width + deltaX);
           break;
         case 'left':
           newWidth = Math.max(minWidth, startSize.width - deltaX);
           newX = startPos.x + (startSize.width - newWidth);
           break;
         case 'bottom':
           newHeight = Math.max(minHeight, startSize.height + deltaY);
           break;
         case 'top':
           newHeight = Math.max(minHeight, startSize.height - deltaY);
           newY = startPos.y + (startSize.height - newHeight);
           break;
       }
       
       setSize({ width: newWidth, height: newHeight });
       setPosition({ x: newX, y: newY });
     }
   };

   const handleWheel = (e: React.WheelEvent) => {
      e.stopPropagation();
    };
 
   const handleResizeEnd = () => {
     setIsResizing(false);
   };

   const handleWindowReset = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    const scaleFactor = getScaleFactor();
    
    setPosition({ 
      x: startingXPosition !== null ? startingXPosition * scaleFactor : 0, 
      y: startingYPosition !== null ? startingYPosition * scaleFactor : 0 
    });
    setSize({ 
      width: width * scaleFactor, 
      height: height * scaleFactor 
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
   };

   const handleWindowEnlargement = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    const scaleFactor = getScaleFactor();

    setPosition({ x: 0, y: 0})
    setSize({
      width: DESIGN_WIDTH * scaleFactor,
      height: DESIGN_HEIGHT * scaleFactor
    })

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
   }
   
   useEffect(() => {
     if (isDragging) {
       window.addEventListener('mousemove', handleMouseMove);
       window.addEventListener('mouseup', handleMouseUp);
     } else if (isResizing) {
       window.addEventListener('mousemove', handleResize);
       window.addEventListener('mouseup', handleResizeEnd);
     }
     
     return () => {
       window.removeEventListener('mousemove', handleMouseMove);
       window.removeEventListener('mouseup', handleMouseUp);
       window.removeEventListener('mousemove', handleResize);
       window.removeEventListener('mouseup', handleResizeEnd);
     };
   }, [isDragging, isResizing]);
 
   useEffect(() => {
     const handleResize = () => {
       if (!isDragging && !isResizing) {
         const scaleFactor = getScaleFactor();
         
         const newWidth = width * scaleFactor;
         const newHeight = height * scaleFactor;
         
         let newX = startingXPosition !== null ? startingXPosition * scaleFactor : position.x;
         let newY = startingYPosition !== null ? startingYPosition * scaleFactor : position.y;
         
         setSize({ width: newWidth, height: newHeight });
         setPosition({ x: newX, y: newY });
       }
     };
     
     handleResize();
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
   }, []);

   const centerOffset = getCenterOffset();
   const finalPosition = {
     x: position.x + centerOffset.x,
     y: position.y + centerOffset.y
   };

   // TODO: Delete Late
   useEffect(() => {
       console.log("ID: " + id)
       console.log("pos: (" + position.x + " x " + position.y + ")")
       console.log("size: (" + size.width + " x " + size.height + ")")
       console.log()
   });
 
   return (
     <MacOSWindow
         id={id}
         ref={windowRef}
         style={{ 
             left: `${finalPosition.x}px`, 
             top: `${finalPosition.y}px`,
             position: 'absolute',
             width: `${size.width}px`,
             height: `${size.height}px`
         }}
         $isDragging={isDragging}
         $isActive={isActive}
         $isDisplayed={isDisplayed}
         $isAnimating={isAnimating}
         onClick={handleWindowClick}
         onMouseDown={handleMouseDown}
         onWheel={handleWheel}
     >
       <ResizeHandle 
         $position="top-left" 
         onMouseDown={(e) => handleResizeStart(e, 'top-left')} 
       />
       <ResizeHandle 
         $position="top-right" 
         onMouseDown={(e) => handleResizeStart(e, 'top-right')} 
       />
       <ResizeHandle 
         $position="bottom-left" 
         onMouseDown={(e) => handleResizeStart(e, 'bottom-left')} 
       />
       <ResizeHandle 
         $position="bottom-right" 
         onMouseDown={(e) => handleResizeStart(e, 'bottom-right')} 
       />
       <ResizeHandle 
         $position="top" 
         onMouseDown={(e) => handleResizeStart(e, 'top')} 
       />
       <ResizeHandle 
         $position="right" 
         onMouseDown={(e) => handleResizeStart(e, 'right')} 
       />
       <ResizeHandle 
         $position="bottom" 
         onMouseDown={(e) => handleResizeStart(e, 'bottom')} 
       />
       <ResizeHandle 
         $position="left" 
         onMouseDown={(e) => handleResizeStart(e, 'left')} 
       />
       
       <TitleBar className="titleBar" $isActive={isActive}>
         <ControlsContainer>
           <ControlButton $color="close" $borderColor="close-border" onClick={() => {setIsDisplayed(false)}}/>
           <ControlButton $color="minimize" $borderColor="minimize-border" onClick={handleWindowReset} />
           <ControlButton $color="maximize" $borderColor="maximize-border" onClick={handleWindowEnlargement} />
         </ControlsContainer>
         <Title>{title}</Title>
         <div style={{ width: '52px' }}></div>
       </TitleBar>
       <Content $backgroundColor={backgroundColor}>
         {content}
       </Content>
     </MacOSWindow>
   );
};