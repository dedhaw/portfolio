import styled from "styled-components";
import InteractiveTimeline, { TimelineItem } from "../components/Timeline";
import { WindowProvider } from "../utils/WindowContext";
import MacOS from "../components/MacOS";
import { HighlightProvider } from "../utils/HighlightContext";
import { OverlayMacOSContainer } from "../styles/GlobalStyles";

const Section = styled.section`
  height: 100vh
`;

const Container = styled.div`
  margin: var(--spacing-xl);
`;

export default function WorkExperience() {
  const items: TimelineItem[] = [
    {
      id: 'wtg',
      company: 'Wise Tech Global',
      logo: "/wtg.jpeg",
      position: 'Software Developer Intern',
      startDate: new Date('2020-05'),
      endDate: new Date('2020-08'),
      color: "#1e1765"
    },
    {
      id: 'vit', 
      company: 'Virtuelly',
      logo: "/virtuelly_logo.jpeg",
      position: 'Software Developer Engineer Intern',
      startDate: new Date('2023-12'),
      endDate: new Date('2024-03'),
      level: 0,
      color: "#ff2677"
    },
    {
      id: 'rsai',
      company: 'RealStar AI',
      logo: "/realstar.jpeg",
      position: 'Software Developer Engineer Intern',
      startDate: new Date('2024-06'),
      endDate: new Date('2024-09'),
      level: 0,
      color: "#00e9d3"
    },
    {
      id: 'rinnie',
      company: 'Rinnie AI',
      logo: "/5.png",
      position: 'Lead Developer',
      startDate: new Date('2024-08-15'),
      endDate: new Date('2025-05'),
      color: "#ff914b"
    },
    {
      id: 'mufg',
      company: 'MUFG',
      logo: "/mufg-logo.png",
      position: 'AI Engineer Intern',
      startDate: new Date('2025-06'),
      endDate: new Date('2025-09'),
      color: "#d13239",
      level: 1
    }
  ];

  return (
    <Section>
      <WindowProvider>
        <HighlightProvider>
          <OverlayMacOSContainer>
          <div style={{ position: 'relative' }}>
            <h1 className="header-centered">Work Experience</h1>
              <Container>
                <InteractiveTimeline
                  items={items}
                  alternating={true}
                />
              </Container>
          </div>
              <MacOS 
                  id="jobs"
                  title="in-depth on my experiences" 
                  width={550}
                  height={310}
                  startingXPosition={5}
                  startingYPosition={500}
              />
          </OverlayMacOSContainer>
        </HighlightProvider>
      </WindowProvider>
    </Section>
    
  )
}
