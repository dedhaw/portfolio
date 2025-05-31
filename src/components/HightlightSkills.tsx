import { useHighlight } from '../utils/HighlightContext';
import styled from 'styled-components';

const HighlightContainer = styled.div`
  padding: 20px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SkillDescription = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
  color: var(--text-primary, #333);
`;

const skillDescriptions: Record<string, string> = {
  // Programming Languages
  'py': 'Python - Versatile programming language for backend development, data science, and AI',
  'ts': 'TypeScript - Typed superset of JavaScript for robust, scalable development',
  'java': 'Java - Object-oriented programming language for enterprise applications',
  'sql': 'SQL - Structured Query Language for database management and queries',
  'html': 'HTML - HyperText Markup Language for structuring web content',
  'css': 'CSS - Cascading Style Sheets for styling and layout of web pages',
  'ocaml': 'OCaml - Functional programming language with strong type system',
  
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
      <SkillDescription>
        {highlighted && skillDescriptions[highlighted] 
          ? skillDescriptions[highlighted]
          : 'Hover over a skill icon to see its description'
        }
      </SkillDescription>
    </HighlightContainer>
  );
}