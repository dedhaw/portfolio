import styled from "styled-components";
import { FaReact, FaPython, FaAws, FaDocker } from "react-icons/fa";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { SiFastapi } from "react-icons/si";
import { PiFileSqlFill } from "react-icons/pi";
// import { RiSupabaseFill } from "react-icons/ri";

const Container = styled.div`
  margin: var(--spacing-xl) auto !important;
  padding: 5px;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  justify-content: center;
  overflow-x: hidden;
  align-items: center;
`;

const Header = styled.h3 <{$isLeft: boolean}>`
  margin-bottom: 0;
  color: var(--accent-yellow);
  padding: 5px;
`;

const InnerContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

const TextContainer = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & svg {
    font-size: 20px;
  }
`;

const SGContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export default function MyStack() {
  return (
    <Container>
      <InnerContainer>
        <Header $isLeft={true}>Frontend</Header>
        <SGContainer>
          <TextContainer><FaReact /><p>React</p></TextContainer>
          <TextContainer><BiLogoTypescript /><p>Typescript/Javascript</p></TextContainer>
        </SGContainer>
      </InnerContainer>
      
      <InnerContainer>
        <SGContainer>
          <TextContainer><SiFastapi /><p>FastAPI</p></TextContainer>
          <TextContainer><FaPython /><p>Python</p></TextContainer>
          </SGContainer>
          <Header $isLeft={false}>Backend</Header>
      </InnerContainer>

      <InnerContainer>
        <Header $isLeft={true}>Database</Header>
        <SGContainer>
          <TextContainer><BiLogoPostgresql size={25} /><p>PostgresSQL</p></TextContainer>
          <TextContainer><PiFileSqlFill /><p>SQL</p></TextContainer>
        </SGContainer>
      </InnerContainer>

      <InnerContainer>
        <SGContainer>
          <TextContainer><FaAws /><p>AWS</p></TextContainer>
          <TextContainer><FaDocker /><p>Docker</p></TextContainer>
          </SGContainer>
          <Header $isLeft={false}>Infrastructure</Header>
      </InnerContainer>
    </Container>
  )
}
