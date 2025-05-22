import styled from "styled-components";
import { Container } from "../styles/GlobalStyles";
import { FaPython, FaJava } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";

import SpinningCircle from "./CircularLogos";

const InnerContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;
    padding: 0 10px;
`;

export default function Skills() {
  const size = 30;
  
  const icons = [
      <FaPython size={size} />,
      <BiLogoTypescript size={size} />,
      <FaJava size={size} />,
  ]

  
  return (
    <Container>
      <InnerContainer>
        <SpinningCircle
          outerIcons={icons}
          innerIcons={icons}
          iconSize={80}
          size={230}
        />
      </InnerContainer>
    </Container>
  )
}
