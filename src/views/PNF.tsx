import styled from "styled-components"
import useCurrentMode from "../hooks/useCurrentMode";

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/404bg.png");
  background-repeat: repeat;
  background-size: 300px;
  opacity: 0.2;
  z-index: 1;
`;

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const ErrorText = styled.h1`
  font-size: 60px;
  z-index: 2;
  position: relative;
  margin-top: -150px;
`;

export default function PageNotFound() {
  const isDarkMode = useCurrentMode();

  return (
    <Container>
        <BackgroundImage src={isDarkMode ? "/DM404bg.png" : "404bg.png"} />
        <ErrorText className='header-centered'>
            Page Not Found
        </ErrorText>
    </Container>
  )
}
