import styled from "styled-components";
import { FaMapPin } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareGithub } from "react-icons/fa6";

import { Container } from "../styles/GlobalStyles";
import useCurrentMode from "../hooks/useCurrentMode";

const InnerContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;
    border: 2px solid var(--primary-purple);
    padding: 0 10px;
    border-radius: 25px;
`;

const SubContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const HeadShot = styled.img`
    width: 300px;
    height: auto;
    margin: auto !important;
`

export default function AboutTab() {
    const isDarkMode = useCurrentMode();

  return (
    <Container className="container">
        <HeadShot src={isDarkMode ? "/DMheadshot.jpg" : "/headshot.jpg"} alt="" />
        <br />
        <InnerContainer>
            <SubContainer>
                <FaMapPin color="#7B61FF" size={"30px"} />
                <p>Kirkland, Washington</p>
            </SubContainer>
            <SubContainer>
            <IoLogoLinkedin color="#7B61FF" size={"30px"} />
            <FaSquareGithub color="#7B61FF" size={"30px"} />
            </SubContainer>
        </InnerContainer>
    </Container>
  )
}
