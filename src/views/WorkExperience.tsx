import styled from "styled-components";
import InteractiveTimeline, { TimelineItem } from "../components/WorkExperience/Timeline";
import { WindowProvider } from "../utils/WindowContext";
import MacOS from "../components/MacOS";
import { HighlightProvider } from "../utils/HighlightContext";
import { OverlayMacOSContainer } from "../styles/GlobalStyles";
import JobHandler from "../components/WorkExperience/JobHandler";
import { useState, useEffect } from "react";
import { jobs, JobCardContainer } from "../components/WorkExperience/JobHandler";

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    min-height: 130vh;
  }
`;

const Container = styled.div`
  margin: var(--spacing-xl);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TimelineContainer = styled.div<{$isMobile: boolean}>`
  position: relative;
  margin: auto;
  width: ${props => props.$isMobile ? "100%" : "auto"};
  overflow-y: auto;
  overflow-x: hidden;
`;

export default function WorkExperience() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [aspectRatio, setAspectRatio] = useState(1.33);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setAspectRatio(windowWidth / windowHeight);
  }, [windowWidth, windowHeight]);



  const isMobile = aspectRatio < 0.75;

  const items: TimelineItem[] = [
    // {
    //   id: 'wtg',
    //   company: 'Wise Tech Global',
    //   logo: "/wtg.jpeg",
    //   position: 'Software Developer Intern',
    //   startDate: new Date('2020-05'),
    //   endDate: new Date('2020-08'),
    //   color: "#fff"
    // },
    {
      id: 'vit', 
      company: 'Virtuelly',
      logo: "/virtuelly_logo.jpeg",
      position: 'Software Developer Engineer Intern',
      startDate: new Date('2023-12'),
      endDate: new Date('2024-03'),
      color: "#ff2677"
    },
    {
      id: 'rsai',
      company: 'RealStar AI',
      logo: "/realstar.jpeg",
      position: 'Software Engineer Intern',
      startDate: new Date('2024-06'),
      endDate: new Date('2024-09'),
      color: "#00e9d3"
    },
    {
      id: 'rinnie',
      company: 'Rinnie AI',
      logo: "/5.png",
      position: 'Lead Developer',
      startDate: new Date('2024-08-15'),
      endDate: new Date('2025-05'),
      color: "#ff914b",
      level: 0
    },
    {
      id: 'mufg',
      company: 'MUFG',
      logo: "/mufg-logo.png",
      position: 'AI Engineer Intern',
      startDate: new Date('2025-06'),
      endDate: new Date('2025-09'),
      color: "#d13239",
    }
  ];

  return (
    <Section>
      <WindowProvider>
        <HighlightProvider>
          <OverlayMacOSContainer>
            <TimelineContainer $isMobile={isMobile}>
              <h1 className="header-centered">Work Experience</h1>
              <Container>
                <InteractiveTimeline
                  items={items}
                  alternating={true}
                />
              </Container>
            </TimelineContainer>
            
            {!isMobile && (
              <MacOS 
                id="jobs"
                title="in-depth on my experiences"
                content={<JobHandler />}
                width={440}
                height={310}
                startingXPosition={5}
                startingYPosition={500}
              />
            )}
            <br />
          </OverlayMacOSContainer>
        </HighlightProvider>
      </WindowProvider>

      {isMobile && (
              <div>
                <JobCardContainer>
                  {Object.entries(jobs).map(([key, jobComponent]) => (
                    <div key={key} id={key} style={{ marginBottom: '20px' }}>
                      {jobComponent}
                      <br />
                    </div>
                  ))}
                </JobCardContainer>
              </div>
            )}
    </Section>
  );
}