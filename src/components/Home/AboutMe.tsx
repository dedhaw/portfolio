import styled from "styled-components";
import { useNavigate } from "react-router";

import MacOS from "../MacOS";
import { WindowProvider } from "../../utils/WindowContext";
import { HighlightProvider } from "../../utils/HighlightContext";
import AboutTab from "./Contact";
import Skills from "./Skills";
import Instructions from "./Instructions";
import { AltSection, MacOSContainer } from "../../styles/GlobalStyles";
import MyStack from "./MyStack";
import Highlight from "./HightlightSkills";
import { useEffect, useState } from "react";

const Container = styled.div`
    margin: var(--spacing-xl);
`;

const PhoneContainer = styled.div`
    background-color: var(--white);
`;

const SkillsContainer = styled.div`
    .circle-container {
        display: flex !important;
        flex-direction: column !important;
        gap: 30px !important;
        padding: 30px !important;
    }
`;

const HighlightContainer = styled.div`
    .highlight-container {
        padding: 5px !important;
    }
`;

const ButtonContainer = styled.div`
    gap: 50px;
    display: flex;
    margin: auto;
    width: auto;
    justify-content: center;
`;

const Button = styled.button`
    width: 200px;
`;

const ParagraphText = styled.h3`

`;

const HighLightText = styled.span`
    color: var(--accent-yellow);
`;

function Paragraph () {
    const navigate = useNavigate();

    return (
    <>
        <Container>
            <ParagraphText>I'm a student at the <HighLightText>University of Washignton</HighLightText> studying <HighLightText>Informatics</HighLightText>. I have experience as a <HighLightText>Software</HighLightText> and <HighLightText>AI</HighLightText> Engineer. My background extends to <HighLightText>Infrastructure</HighLightText>.</ParagraphText>
            <p style={{textAlign: "center"}}>Check out what I've been up too</p>
            <ButtonContainer>
                <Button className="btn btn-primary" onClick={() => navigate("/work-experience")}>Work Experience</Button>
                <Button className="btn btn-secondary" onClick={() => navigate("/projects")}>Projects</Button>
            </ButtonContainer>
        </Container>
    </>
    )
}

interface AboutMeProps {
    id?: string;
}

export default function AboutMe({id}: AboutMeProps) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [aspectRatio, setAspectRatio] = useState(1.33);

    const ipadBW = 1024
    const ipadBH = 1366
    
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
        console.log(aspectRatio);
    }, [windowWidth, windowHeight]);

  return (
    <>
    {aspectRatio > 0.65 && (
    <AltSection id={id}>
        <WindowProvider>
            <HighlightProvider>
                <MacOSContainer>
                    {aspectRatio >= 1.3 && (
                        <>
                            <MacOS 
                                id="about-me"
                                title="contact"
                                content={<AboutTab />} 
                                width={580}
                                height={500}
                                startingXPosition={20}
                                startingYPosition={2}
                            />
                            <MacOS 
                                id="paragraph"
                                title="about me"
                                content={<Paragraph />}
                                backgroundColor="light-gray"
                                width={380}
                                height={500}
                                startingXPosition={620}
                                startingYPosition={2}
                            />
                            <MacOS 
                                id="app-instructions"
                                title="app instructions"
                                content={<Instructions />}
                                backgroundColor="light-gray"
                                width={550}
                                height={209}
                                startingXPosition={1014}
                                startingYPosition={2}
                            />
                            <MacOS 
                                id="highlight"
                                title="highlighting skills"
                                content={<Highlight />}
                                width={550}
                                height={273}
                                startingXPosition={1014}
                                startingYPosition={225}
                            />
                            <MacOS 
                                id="skills"
                                title="skills and tools"
                                content={<Skills />}
                                width={1160}
                                height={347}
                                startingXPosition={405}
                                startingYPosition={519}
                            />
                            <MacOS 
                                id="stack"
                                title="my stack"
                                content={<MyStack />}
                                backgroundColor="light-gray"
                                width={370}
                                height={345}
                                startingXPosition={20}
                                startingYPosition={519}
                            />
                        </>
                    )}
                    {aspectRatio < 1.3 && (
                        <>
                            <MacOS 
                                id="about-me"
                                title="contact"
                                content={<AboutTab />} 
                                width={441}
                                height={520}
                                startingXPosition={20}
                                startingYPosition={2}
                                baseWidth={ipadBW}
                                baseHeight={ipadBH}
                            />
                            <MacOS 
                                id="paragraph"
                                title="about me"
                                content={<Paragraph />}
                                backgroundColor="light-gray"
                                width={441}
                                height={430}
                                startingXPosition={20}
                                startingYPosition={550}
                                baseWidth={ipadBW}
                                baseHeight={ipadBH}
                            />
                            <MacOS 
                                id="app-instructions"
                                title="app instructions"
                                content={<Instructions />}
                                backgroundColor="light-gray"
                                width={515}
                                height={300}
                                startingXPosition={485}
                                startingYPosition={400}
                                baseWidth={ipadBW}
                                baseHeight={ipadBH}
                            />
                            <MacOS 
                                id="highlight"
                                title="highlighting skills"
                                content={<Highlight />}
                                width={515}
                                height={250}
                                startingXPosition={485}
                                startingYPosition={725}
                                baseWidth={ipadBW}
                                baseHeight={ipadBH}
                            />
                            <MacOS 
                                id="skills"
                                title="skills and tools"
                                content={<Skills />}
                                width={980}
                                height={340}
                                startingXPosition={20}
                                startingYPosition={1000}
                                baseWidth={ipadBW}
                                baseHeight={ipadBH}
                            />
                            <MacOS 
                                id="stack"
                                title="my stack"
                                content={<MyStack />}
                                backgroundColor="light-gray"
                                width={515}
                                height={380}
                                startingXPosition={485}
                                startingYPosition={2}
                                baseWidth={ipadBW}
                                baseHeight={ipadBH}
                            />
                        </>
                    )}
                </MacOSContainer>
            </HighlightProvider>
        </WindowProvider>
    </AltSection>
    )}
    {aspectRatio <= 0.65 && (
        <PhoneContainer id={id}>
            <HighlightProvider>
                <AboutTab />
                <Paragraph />
                <h3 style={{textAlign: "center"}}>Here's my stack:</h3>
                <MyStack />
                <HighlightContainer>
                    <Highlight />
                </HighlightContainer>
                <SkillsContainer>
                    <Skills />
                </SkillsContainer>
            </HighlightProvider>
        </PhoneContainer>
    )}
    </>
  );
};