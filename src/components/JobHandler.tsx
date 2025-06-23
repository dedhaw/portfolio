import Job from './JobDescription';

import React, { useEffect } from 'react';
import { useHighlight } from '../utils/HighlightContext';
import styled from 'styled-components';

export const JobCardContainer = styled.div`
    margin: var(--spacing-xl);
    text-align: center;
    transition: all 1s ease;
`;

const RinnieDes = [
    "Leading the development of a software platform, www.rinnie.ai, that streamlines real estate agent workflows by automating form generation, routing, and document management", 
    "Improved agent efficiency by reducing a 20 minute process to 1, enabling faster transactions and increased focus on client interactions", 
    "Leading an early-stage startup, with the platform currently being used by 25 independent agents, who provide ongoing feedback during the trial phase to refine and optimize the product", 
    "Built a Fullstack application using React front end, Python/Fast API back end and PostgreSQL Database on Supabase as the technology stack",
    "Application is hosted on AWS cloud infrastructure, configuring the serverless infrastructure using Route53, CloudFront, Amplify (frontend hosting), Cognito (user management and authentication), API Gateway and Lambda"
]

const RealStarDes = [
    "Collaborated closely with the CTO to develop a Fullstack AI-powered customer relationship manager application and other solutions which are currently being used by over 145 clients",
    "Developed and integrated the AI CRM using Python and FastAPI, with Deepgram for voice-to-text processing and the Open AI  API for generating intelligent responses and storing client information",
    "Built tools on AWS cloud infrastructure, configuring the serverless infrastructure using Route53, CloudFront, Amplify (frontend hosting), Cognito (user management and authentication), API Gateway and Lambda (backend hosting)",
    "Optimized the end-to-end pipeline, improving the system's overall deployment and performance by 20%"
]

const VirtuellyDes = [
    "Implemented a Fullstack AI Data Visualization Tool utilizing a Streamlit frontend as a chatbot, SQLAlchemy to create a temporary in-memory database preloaded with training data and OpenAI API to generate SQL queries",
    "This tool was used internally by for HR department to use natural language to sort through CSV files"
]

export const jobs: Record<string, React.ReactNode> = {
  'mufg': <Job id='mufg' companyName="MUFG" jobTitle='AI Engineer Intern' startDate='June 2025' endDate='incoming' location='Sydney, Australia' description={["Incoming as a AI engineer"]} />,
  'rinnie': <Job id='rinnie' companyName="Rinnie AI" jobTitle='Founder & Lead Developer' startDate='September 2024' endDate='May 2025' location='Kirkland, Washington' description={RinnieDes} websiteLink='https://rinnie.ai' />,
  'rsai': <Job id='rsai' companyName='Realstar AI' jobTitle='Software Engineer Intern' startDate='June 2024' endDate='September 2024' location='Bellevue, Washington' description={RealStarDes} />,
  'vit': <Job id='vit' companyName='Virtuelly' jobTitle='Software Developer Engineer Intern' startDate='January 2024' endDate='May 2024' location='Bellevue, Washington' description={VirtuellyDes} />
};

export default function JobHandler() {
    const { highlighted } = useHighlight();

    useEffect(() => {
        if (highlighted && jobs[highlighted]) {
            const macosWindow = document.getElementById('jobs');
            if (macosWindow) {            
                const allDivs = macosWindow.querySelectorAll('div');
                allDivs.forEach(div => {
                    if (div.scrollHeight > div.clientHeight) {
                        div.scrollTop = 0;
                    }
                });
            }
        }
    }, [highlighted]);

    return (
        <>
        <JobCardContainer>
            {highlighted ? (
                React.cloneElement(jobs[highlighted] as React.ReactElement, {
                    key: highlighted
                })
            ) : (<h3>Hover to learn more!</h3>)}
        </JobCardContainer>
        </>
    )
}
