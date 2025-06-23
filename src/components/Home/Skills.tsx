import styled from "styled-components";
import { Container } from "../../styles/GlobalStyles";
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaVuejs, FaBootstrap, FaNodeJs, FaDocker, FaAws } from "react-icons/fa";
import { BiLogoTypescript, BiLogoFlask, BiLogoPostgresql } from "react-icons/bi";
import { SiFastapi, SiStreamlit, SiOcaml, SiKubernetes, SiDeepgram } from "react-icons/si";
import { PiFileSqlFill } from "react-icons/pi";
import { TbBrandOpenai } from "react-icons/tb";
import { RiSupabaseFill } from "react-icons/ri";

import SpinningCircle from "../CircularLogos";


const InnerContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 70px;
    padding: 60px;
    overflow-y: hidden;
    overflow-x: hidden;
    height: auto;
    width: auto;
`;

export default function Skills() {

  const size = 30;
  
  const outerPLIcons = [
    <FaPython id="py" size={size} />,
    <BiLogoTypescript id="ts" size={size} />,
    <FaJava id="java" size={size} />,
    <PiFileSqlFill id="sql" size={size} />
  ];
  
  const innerPLIcons = [
    <FaHtml5 id="html" size={size} />,
    <FaCss3Alt id="css" size={size} />,
    <SiOcaml id="ocaml" size={25} />
  ];

  const outerFWTIcons = [
    <FaReact id="react" size={size} />,
    <FaVuejs id="vue" size={size} />,
    <SiFastapi id="fapi" size={size} />,
    <FaNodeJs id="node" size={size} />
  ];

  const innerFWTIcons = [
    <FaBootstrap id="bs" size={size} />,
    <BiLogoFlask id="fla" size={size}/>, 
    <SiStreamlit id="st" size={size} />,
    <BiLogoPostgresql id="pts" size={size} />
  ];

  const outerINFIcons = [
    <FaDocker id="dock" size={size} />,
    <FaAws id="aws" size={size} />,
    <SiKubernetes id="kub" size={size} />
  ];

  const innerINFICons = [
    <TbBrandOpenai id="ai" size={size} />,
    <SiDeepgram id="deep" size={25} />,
    <RiSupabaseFill id="supa" size={size} />
  ];

  
  return (
    <Container style={{justifyContent: "center", height: "100%"}}>
      <InnerContainer className="circle-container">
        <SpinningCircle
          outerIcons={outerPLIcons}
          innerIcons={innerPLIcons}
          iconSize={size}
          color="var(--primary-blue)"
          size={230}
        />
        <SpinningCircle
          outerIcons={outerFWTIcons}
          innerIcons={innerFWTIcons}
          reverse={true}
          iconSize={size}
          color="var(--primary-purple)"
          size={230}
        />
        <SpinningCircle 
          outerIcons={outerINFIcons}
          innerIcons={innerINFICons}
          iconSize={size}
          color="var(--primary-teal)"
          size={230}
        />
      </InnerContainer>
    </Container>
  )
}
