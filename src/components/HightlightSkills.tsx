import { useHighlight, Animate } from '../utils/HighlightContext';
import styled from 'styled-components';
import Skill from './SkillDescription';
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaVuejs, FaBootstrap, FaNodeJs, FaDocker, FaAws } from "react-icons/fa";
import { BiLogoTypescript, BiLogoFlask, BiLogoPostgresql } from "react-icons/bi";
import { SiFastapi, SiStreamlit, SiOcaml, SiKubernetes, SiDeepgram } from "react-icons/si";
import { PiFileSqlFill } from "react-icons/pi";
import { TbBrandOpenai } from "react-icons/tb";
import { RiSupabaseFill } from "react-icons/ri";

const HighlightContainer = styled.div`
  padding: 20px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const skillDescriptions: Record<string, React.ReactNode> = {
  // Programming Languages
  'py': <Skill id='py' logo={<FaPython size={45} />} description='Versatile programming language for backend development, data science, and AI' />,
  'ts': <Skill id='ts' logo={<BiLogoTypescript size={45} />} description='Typed superset of JavaScript for robust, scalable development' />,
  'java': <Skill id='java' logo={<FaJava size={45} />} description='Object-oriented programming language for enterprise applications' />,
  'sql': <Skill id='sql' logo={<PiFileSqlFill size={45} />} description='Structured Query Language for database management and queries' />,
  'html': <Skill id='html' logo={<FaHtml5 size={45} />} description='HyperText Markup Language for structuring web content' />,
  'css': <Skill id='css' logo={<FaCss3Alt size={45} />} description='Cascading Style Sheets for styling and layout of web pages' />,
  'ocaml': <Skill id='ocaml' logo={<SiOcaml size={45} />} description='Functional programming language with strong type system' />,
  
  // Frameworks & Tools
  'react': <Skill id='react' logo={<FaReact size={45} />} description='JavaScript library for building interactive user interfaces'/>,
  'vue': <Skill id='vue' logo={<FaVuejs size={45} />} description='Progressive JavaScript framework for building web applications' />,
  'fapi': <Skill id='fapi' logo={<SiFastapi size={45} />} description='Modern Python web framework for building high-performance APIs' />,
  'node': <Skill id='node' logo={<FaNodeJs size={45}/>} description='JavaScript runtime for server-side development'/>,
  'bs': <Skill id='bs' logo={<FaBootstrap size={45} />} description='CSS framework for responsive web design' />,
  'fla': <Skill id='fla' logo={<SiFastapi size={45} />} description='Lightweight Python web framework for rapid development' />,
  'st': <Skill id='st' logo={<SiStreamlit size={45} />} description='Python framework for building data science web applications' />,
  'pts': <Skill id='pts' logo={<BiLogoPostgresql size={45} />} description='Advanced open-source relational database system' />,
  
  // Infrastructure & Cloud
  'dock': <Skill id='dock' logo={<FaDocker size={45} />} description='Containerization platform for application deployment'/>,
  'aws': <Skill id='aws' logo={<FaAws size={45} />} description='Cloud computing platform and services' />,
  'kub': <Skill id='kub' logo={<SiKubernetes size={45} />} description='Container orchestration platform for scalable deployments' />,
  'ai': <Skill id='ai' logo={<TbBrandOpenai size={45} />} description='AI platform providing language models and machine learning APIs' />,
  'deep': <Skill id='deep' logo={<SiDeepgram size={45} />} description='Voice AI platform for speech recognition and analysis' />,
  'supa': <Skill id='supa' logo={<RiSupabaseFill size={45} />} description='Open-source Firebase alternative with real-time database' />
};

export default function Highlight() {
  const { highlighted } = useHighlight();
  
  return (
    <HighlightContainer className='highlight-container'>
        {highlighted && skillDescriptions[highlighted] 
          ? skillDescriptions[highlighted]
          : <Animate trigger={"null"} animation='opacity 0.2s ease-in'>
              <h3>Hover over a skill icon to see its description</h3>
            </Animate>
        }
    </HighlightContainer>
  );
}