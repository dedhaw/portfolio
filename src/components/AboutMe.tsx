import styled from "styled-components";
import MacOS from "./MacOS";
import { WindowProvider } from "../utils/WindowContext";
import AboutTab from "./Contact";
import Skills from "./Skills";
import { AltSection, MacOSContainer } from "../styles/GlobalStyles";

const Container = styled.div`
    margin: var(--spacing-xl);
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
    return (
    <>
        <Container>
            <ParagraphText>I'm a student at the <HighLightText>University of Washignton</HighLightText> studying <HighLightText>Informatics</HighLightText>. I have experience as a <HighLightText>Software</HighLightText> and <HighLightText>AI</HighLightText> Engineer. My background extends to <HighLightText>Infrastructure</HighLightText>.</ParagraphText>
            <p style={{textAlign: "center"}}>Check out what I've been up too</p>
            <ButtonContainer>
                <Button className="btn btn-primary" >Work Experience</Button>
                <Button className="btn btn-secondary">Education</Button>
            </ButtonContainer>
        </Container>
    </>
    )
}

export default function AboutMe() {
  return (
    <AltSection id="mac-os-boundary">
        <WindowProvider>
            <MacOSContainer>
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

                    backgroundColor="light-gray"
                    width={370}
                    height={345}
                    startingXPosition={20}
                    startingYPosition={519}
                />
            </MacOSContainer>
        </WindowProvider>
    </AltSection>
  );
};