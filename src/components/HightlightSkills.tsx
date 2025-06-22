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
  'react': 'React - JavaScript library for building interactive user interfaces',
  'vue': 'Vue.js - Progressive JavaScript framework for building web applications',
  'fapi': 'FastAPI - Modern Python web framework for building high-performance APIs',
  'node': 'Node.js - JavaScript runtime for server-side development',
  'bs': 'Bootstrap - CSS framework for responsive web design',
  'fla': 'Flask - Lightweight Python web framework for rapid development',
  'st': 'Streamlit - Python framework for building data science web applications',
  'pts': 'PostgreSQL - Advanced open-source relational database system',
  
  // Infrastructure & Cloud
  'dock': 'Docker - Containerization platform for application deployment',
  'aws': 'Amazon Web Services - Cloud computing platform and services',
  'kub': 'Kubernetes - Container orchestration platform for scalable deployments',
  'ai': 'OpenAI - AI platform providing language models and machine learning APIs',
  'deep': 'Deepgram - Voice AI platform for speech recognition and analysis',
  'supa': 'Supabase - Open-source Firebase alternative with real-time database'
};

export default function Highlight() {
  const { highlighted } = useHighlight();
  
  return (
    <HighlightContainer className='highlight-container'>
        {highlighted && skillDescriptions[highlighted] 
          ? skillDescriptions[highlighted]
          : <Animate trigger={"null"}>
              <h3>Hover over a skill icon to see its description</h3>
            </Animate>
        }
    </HighlightContainer>
  );
}