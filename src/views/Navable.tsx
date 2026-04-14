import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--spacing-xl);
    line-height: 1.6;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 2px solid var(--primary-purple);
    color: var(--primary-purple);
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 32px;
    transition: all 0.3s ease;

    &:hover {
        background: var(--primary-purple);
        color: white;
        transform: translateX(-4px);
    }
`;

const Section = styled.section`
    margin-bottom: 40px;
`;

const Title = styled.h1`
    font-size: 48px;
    margin-bottom: 24px;
    text-align: center;
    color: var(--primary-purple);
`;

const Subtitle = styled.h2`
    font-size: 32px;
    margin-bottom: 16px;
    border-bottom: 2px solid var(--accent-yellow);
    display: inline-block;
`;

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-top: 24px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
    background: var(--off-white);
    padding: 24px;
    border-radius: 12px;
    border-left: 4px solid var(--primary-purple);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const List = styled.ul`
    padding-left: 20px;
    li {
        margin-bottom: 12px;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    max-height: 400px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 40px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default function Navable() {
    const navigate = useNavigate();

    return (
        <Container>
            <BackButton onClick={() => navigate('/projects')}>
                <FaArrowLeft /> Back to Projects
            </BackButton>
            
            <Title>Navable: Campus Accessibility Navigation</Title>
            
            <ImageContainer>
                <img src="/navable.png" alt="Navable Project Preview" />
            </ImageContainer>

            <Section>
                <Subtitle>Overview</Subtitle>
                <p>
                    Navable is a comprehensive navigation application designed specifically for the University of Washington campus. 
                    Our mission is to provide inclusive routing and campus guidance for students, faculty, and visitors of all 
                    mobility levels, ensuring that UW is accessible to everyone.
                </p>
            </Section>

            <Section>
                <Subtitle>Project Goals</Subtitle>
                <Card>
                    <List>
                        <li><strong>Inclusive Routing:</strong> Develop an algorithm that prioritizes accessible paths, including ramps and elevators.</li>
                        <li><strong>Real-time Obstacle Reporting:</strong> Allow users to report temporary barriers like construction or broken elevators.</li>
                        <li><strong>Campus Integration:</strong> Provide detailed indoor and outdoor maps of the UW Seattle campus.</li>
                        <li><strong>User-Centric Design:</strong> Ensure the interface is accessible to users with various disabilities.</li>
                    </List>
                </Card>
            </Section>

            <Section>
                <Subtitle>Our Process</Subtitle>
                <ContentGrid>
                    <Card>
                        <h3>Team Perspective</h3>
                        <p>As a team, we followed an iterative design and development process:</p>
                        <List>
                            <li><strong>Research:</strong> Conducted user interviews with students from the DO-IT program to understand specific accessibility challenges.</li>
                            <li><strong>Data Mapping:</strong> Manually audited and digitized over 50 campus paths that weren't accurately represented in standard mapping tools.</li>
                            <li><strong>Agile Execution:</strong> Adopted a weekly sprint cycle with stakeholder reviews to ensure the solution met real-world mobility needs.</li>
                        </List>
                    </Card>
                    <Card>
                        <h3>Individual Contributions</h3>
                        <p>I led the full-stack engineering effort, architecting both the client and server-side infrastructure:</p>
                        <List>
                            <li><strong>Cross-Platform Frontend:</strong> Engineered the mobile application using <strong>React Native</strong>, implementing custom navigation components and ensuring full compatibility with mobile screen readers and accessibility features.</li>
                            <li><strong>Performant Backend:</strong> Developed a robust REST API using <strong>Python and FastAPI</strong>, featuring asynchronous processing for real-time routing requests and barrier updates.</li>
                            <li><strong>System Architecture:</strong> Designed the end-to-end integration between the mobile client and the geospatial backend, optimizing pathfinding delivery for low-latency performance on campus networks.</li>
                        </List>
                    </Card>
                </ContentGrid>
            </Section>

            <Section>
                <Subtitle>Key Takeaways</Subtitle>
                <ContentGrid>
                    <Card>
                        <h3>Project Learnings</h3>
                        <List>
                            <li>Accessibility isn't a "feature"—it's a foundational requirement that impacts every architectural decision.</li>
                            <li>Real-world data is often "messy"; manual verification is crucial when safety and mobility are involved.</li>
                        </List>
                    </Card>
                    <Card>
                        <h3>Individual Growth</h3>
                        <List>
                            <li>Deepened my expertise in WCAG 2.1 standards and inclusive design patterns.</li>
                            <li>Gained experience navigating complex institutional data policies and API integrations.</li>
                        </List>
                    </Card>
                </ContentGrid>
            </Section>

            <Section>
                <Subtitle>Next Steps</Subtitle>
                <Card>
                    <List>
                        <li><strong>Cloud Infrastructure:</strong> Migrate and deploy the full-stack application to <strong>Microsoft Azure</strong>, leveraging App Services and Azure SQL for scalable, enterprise-grade reliability.</li>
                        <li><strong>Advanced Navigation Settings:</strong> Implement customizable user profiles to support specific mobility preferences, such as "maximum incline" filters or "avoid stairs" toggles.</li>
                        <li><strong>Campus Expansion:</strong> Scale the platform to include other regional branches and explore AR-based indoor navigation for complex building layouts.</li>
                    </List>
                </Card>
            </Section>
        </Container>
    );
}