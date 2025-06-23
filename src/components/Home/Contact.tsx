import styled from "styled-components";
import { FaMapPin } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareGithub } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";

import { Container } from "../../styles/GlobalStyles";
import useCurrentMode from "../../hooks/useCurrentMode";

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

const Link = styled.a<{$transitionColor: string}>`
    padding: 0;
    margin:0;
    line-height: 0;
    color: var(--primary-purple);
    transition: color 0.3s ease;

    & svg {
        color: var(--primary-purple);
        transition: color 0.3s ease;
    }

    :hover {
        color: ${props => props.$transitionColor};
    }
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
                <FaMapPin color={"var(--primary-purple)"} size={"30px"} />
                <p>Kirkland, Washington</p>
            </SubContainer>
            <SubContainer>
            <Link href="https://www.linkedin.com/in/dev-dhawan-60b713217/" target="_blank" $transitionColor="#0072b1"><IoLogoLinkedin size={"30px"} /></Link>
            <Link href="https://github.com/dedhaw" target="_blank" $transitionColor="#171515"><FaSquareGithub size={"30px"} /></Link>
            </SubContainer>
        </InnerContainer>
        <br />
        <button className="btn btn-accent" style={{ width: "300px", margin: "auto"}}>Grab my resume <IoMdDownload /></button>
    </Container>
  )
}
