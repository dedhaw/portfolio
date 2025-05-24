import styled from "styled-components";
import { Container } from "../styles/GlobalStyles";
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaVuejs, FaBootstrap, FaNodeJs, FaDocker, FaAws } from "react-icons/fa";
import { BiLogoTypescript, BiLogoFlask, BiLogoPostgresql } from "react-icons/bi";
import { SiFastapi, SiStreamlit, SiOcaml, SiKubernetes, SiDeepgram } from "react-icons/si";
import { PiFileSqlFill } from "react-icons/pi";
import { TbBrandOpenai } from "react-icons/tb";
import { RiSupabaseFill } from "react-icons/ri";

import SpinningCircle from "./CircularLogos";


const InnerContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 70px;
    padding: 30px;
    overflow-y: hidden;
    overflow-x: hidden;
    height: auto;
    width: auto;
`;

export default function Skills() {
  const size = 30;
  
  const outerPLIcons = [
    <FaPython size={size} />,
    <BiLogoTypescript size={size} />,
    <FaJava size={size} />,
    <PiFileSqlFill size={size} />
  ];
  
  const innerPLIcons = [
    <FaHtml5 size={size} />,
    <FaCss3Alt size={size} />,
    <SiOcaml size={25} />
  ];

  const outerFWTIcons = [
    <FaReact size={size} />,
    <FaVuejs size={size} />,
    <SiFastapi size={size} />,
    <FaNodeJs size={size} />
  ];

  const innerFWTIcons = [
    <FaBootstrap size={size} />,
    <BiLogoFlask size={size}/>, 
    <SiStreamlit size={size} />,
    <BiLogoPostgresql size={size} />
  ];

  const outerINFIcons = [
    <FaDocker size={size} />,
    <FaAws size={size} />,
    <SiKubernetes size={size} />
  ];

  const innerINFICons = [
    <TbBrandOpenai size={size} />,
    <SiDeepgram size={25} />,
    <RiSupabaseFill size={size} />
  ];

  
  return (
    <Container style={{justifyContent: "center", height: "100%"}}>
      <InnerContainer>
        <SpinningCircle
          outerIcons={outerPLIcons}
          innerIcons={innerPLIcons}
          iconSize={50}
          color="var(--primary-blue)"
          size={230}
        />
        <SpinningCircle
          outerIcons={outerFWTIcons}
          innerIcons={innerFWTIcons}
          reverse={true}
          iconSize={50}
          color="var(--primary-purple)"
          size={230}
        />
        <SpinningCircle 
          outerIcons={outerINFIcons}
          innerIcons={innerINFICons}
          iconSize={50}
          color="var(--primary-teal)"
          size={230}
        />
      </InnerContainer>
    </Container>
  )
}
