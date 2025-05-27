import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';

const Container = styled.div`
    min-height: 100vh;
    padding: var(--spacing-xl);
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: var(--spacing-xl);
`;

const Subtitle = styled.p`
    font-size: 18px;
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
    max-width: 1400px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 0 16px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
    
    @media (min-width: 1025px) {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
`;

const ProjectsSection = styled.section`
    width: 100%;
`;

const projects = [
    {
        title: "Rinnie AI",
        description: "",
        backgroundImage: "/rinnieai.png",
        demoLink: "https://rinnie.ai",
        learnMoreLink: "https://github.com/dedhaw/rinnieAppAmplify"
    },
    {
        title: "E-commerace Platform",
        description: "",
        backgroundImage: "/algsnow.png",
        demoLink: "https://algsnow.com",
        learnMoreLink: "https://github.com/dedhaw/silver-train"
    },
    {
        title: "AI Voice Chatbot",
        description: "",
        learnMoreLink: "https://github.com/dedhaw/turbo-journey"
    },
];

export default function Projects () {
    return (
        <Container>
            <Header>
                <h1>My Projects</h1>
                <Subtitle>
                    A collection of projects I've built using various technologies and frameworks. 
                    Each project represents a unique challenge and learning experience.
                </Subtitle>
            </Header>
            
            <ProjectsSection>
                <ProjectsGrid>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            backgroundImage={project.backgroundImage}
                            demoLink={project.demoLink}
                            learnMoreLink={project.learnMoreLink}
                        />
                    ))}
                </ProjectsGrid>
            </ProjectsSection>
        </Container>
    );
}