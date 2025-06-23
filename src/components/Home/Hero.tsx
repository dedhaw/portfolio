import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled, { keyframes } from "styled-components";
import { scrollToSection } from "../../utils/ScrollToSection";
import '../../styles/hero.css';

const HeroContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    width: 100vw;
    background-color: var(--off-white);
    text-align: center;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
`;

const HeroText = styled.h1`
    font-size: 70px;
    margin-top: -150px !important;
    margin-bottom: 0 !important;

    @media (max-width: 480px) {
      font-size: 45px;
    }
    @media (max-width: 400px) {
      font-size: 35px;
    }
`;

const typing = keyframes`
 from { width: 0 }
 to { width: 100% }
`;

const blink = keyframes`
 0%, 100% { border-color: var(--dark-gray) }
 50% { border-color: transparent }
`;

const cursorPause = keyframes`
 0%, 15%, 85%, 100% { border-color: var(--dark-gray) }
 20%, 80% { border-color: transparent }
`;

const SubText = styled.p`
 color: var(--accent-color);
 position: relative;
 text-align: center;
 margin-top: 10px;
 display: flex;
 justify-content: center;
 align-items: center;

 .text-container {
   display: inline-block;
   overflow: hidden;
   white-space: nowrap;
   border-right: 2px solid var(--dark-gray);
   animation: ${blink} 0.75s step-end infinite;
 }
 
 .text-container.pause {
   animation: ${cursorPause} 2.5s step-end forwards;
 }
 
 .typing-text {
   overflow: hidden;
   white-space: nowrap;
   animation: ${typing} 2s steps(20, end);
   animation-fill-mode: forwards;
 }
`;

const HeroSubText = styled.p`
    color: var(--accent-color);
    position: absolute;
    bottom: 10%;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
`;


const Dot = styled.span<{$delay: number}>`
  display: inline-block;
  opacity: 0;
  transform: translateY(0);
  animation: ${props => `dotAnimation ${props.$delay}s forwards`};
  
  @keyframes dotAnimation {
      0% {
          opacity: 0;
          transform: translateY(10px);
      }
      50% {
          opacity: 1;
          transform: translateY(-5px);
      }
      100% {
          opacity: 1;
          transform: translateY(0);
      }
  }
`;

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isPaused, setIsPaused] = useState(false);

  const textArray = ["ai", "software"];

  useEffect(() => {
  const handleTyping = () => {
    const currentText = textArray[textIndex];
    const shouldDelete = isDeleting ? text.length - 1 : text.length + 1;
    
    setText(currentText.substring(0, shouldDelete));
    
    if (!isDeleting && text === currentText) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2500);
      setTypingSpeed(100);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      setTypingSpeed(150);
    }
  };
  
  const timer = setTimeout(handleTyping, typingSpeed);
  return () => clearTimeout(timer);
}, [text, isDeleting, textIndex, typingSpeed, textArray]);

  return (
    <HeroContainer>
        <InnerContainer>
          <div className="non-select">
            <HeroText className={"header-centered"}>Hello
            <Dot style={{ color :'var(--primary-blue)' }} $delay={1.5}>.</Dot>
            <Dot style={{ color :'var(--primary-purple)' }} $delay={2}>.</Dot>
            <Dot style={{ color :'var(--primary-teal)' }} $delay={2.5}>.</Dot>
            {" "}I'm Dev
            </HeroText>
            <SubText>
              <span style={{ display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
                <span className={`text-container ${isPaused ? 'pause' : ''}`}>{text}</span>
                <span style={{marginLeft: "3px"}}>engineer</span>
              </span>
            </SubText>
          </div>
          <HeroSubText onClick={() => {scrollToSection("about")}}>learn more about me<br /><IoIosArrowDown /></HeroSubText>
        </InnerContainer>
    </HeroContainer>
  )
}
