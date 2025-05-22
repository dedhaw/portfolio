import styled from "styled-components";
import MacOS from "./MacOS";
import { WindowProvider } from "../utils/WindowContext";
import AboutTab from "./Contact";
import Skills from "./Skills";
import { AltSection, MacOSContainer } from "../styles/GlobalStyles";

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
                    id="skills"
                    title="skills"
                    content={<Skills />}
                    width={1550}
                    height={320}
                    startingXPosition={20}
                    startingYPosition={519}
                />
                <MacOS id="Test" 
                    content={<h1>TEST</h1>}
                    backgroundColor="light-gray"
                    width={380}
                    height={500}
                    startingXPosition={620}
                    startingYPosition={2}
                />
            </MacOSContainer>
        </WindowProvider>
    </AltSection>
  );
};