import styled from 'styled-components';
import { TbArrowNarrowRight } from "react-icons/tb";

interface JobProps {
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string | 'incoming';
    location: string;
    description: string[];
    websiteLink?: string;
}

// const JobCardContainer = styled.div`
//     background: var(--white);
//     border-radius: 20px;
//     padding: 32px;
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
//     border: 1px solid var(--light-gray);
//     max-width: 600px;
//     transition: all 0.3s ease;

//     &:hover {
//         transform: translateY(-4px);
//         box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
//     }
// `;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    gap: 16px;
`;

const TitleSection = styled.div`
    flex: 1;
`;

const CompanyName = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: var(--dark-gray);
    margin: 0 0 8px 0;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 40px;
        height: 3px;
        background: var(--accent-yellow);
        border-radius: 2px;
    }
`;

const JobTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-purple);
    margin: 0;
`;

const MetaInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
`;

const DateRange = styled.div<{ $isIncoming?: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--dark-gray);
    
    &::before {
        content: '📅';
        font-size: 16px;
    }
`;

const IncomingBadge = styled.span`
    background: var(--accent-yellow);
    color: var(--dark-gray);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-left: 8px;
    animation: pulse 2s infinite;
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--medium-gray);
    
    &::before {
        content: '📍';
        font-size: 16px;
    }
`;

const DescriptionSection = styled.div`
    margin-bottom: 24px;
`;

const DescriptionTitle = styled.h4`
    font-size: 16px;
    font-weight: 600;
    color: var(--dark-gray);
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
        content: '';
        width: 4px;
        height: 16px;
        background: var(--accent-yellow);
        border-radius: 2px;
    }
`;

const BulletList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const BulletItem = styled.li`
    position: relative;
    padding-left: 24px;
    margin-bottom: 12px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--dark-gray);
    text-align: left;
    
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 6px;
        height: 6px;
        background: var(--accent-yellow);
        border-radius: 50%;
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const LearnMoreButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--accent-yellow);
    color: var(--dark-gray);
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    border: 2px solid var(--accent-yellow);
    
    &:hover {
        background: transparent;
        color: var(--accent-yellow);
        transform: translateX(4px);
    }
    
    svg {
        transition: transform 0.3s ease;
    }
    
    &:hover svg {
        transform: translate(2px, -2px);
    }
`;

export default function Job({
    companyName,
    jobTitle,
    startDate,
    endDate,
    location,
    description,
    websiteLink
}: JobProps) {
    return (
        <>
            <Header>
                <TitleSection>
                    <CompanyName>{companyName}</CompanyName>
                    <JobTitle>{jobTitle}</JobTitle>
                </TitleSection>
            </Header>

            <MetaInfo>
                <DateRange>
                    {startDate} - {endDate === 'incoming' ? 'Present' : endDate}
                    {endDate === 'incoming' && <IncomingBadge>Incoming</IncomingBadge>}
                </DateRange>
                <Location>
                    {location}
                </Location>
            </MetaInfo>

            <DescriptionSection>
                <DescriptionTitle>Key Responsibilities</DescriptionTitle>
                <BulletList>
                    {description.map((item, index) => (
                        <BulletItem key={index}>{item}</BulletItem>
                    ))}
                </BulletList>
            </DescriptionSection>

            {websiteLink && (
                <LearnMoreButton href={websiteLink} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <TbArrowNarrowRight size={16} />
                </LearnMoreButton>
            )}
        </>
    );
}