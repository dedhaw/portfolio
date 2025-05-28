import styled from 'styled-components';
import { FaPlay } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";

interface ProjectCardProps {
    title: string;
    description: string;
    backgroundImage?: string;
    demoLink?: string;
    learnMoreLink?: string;
}

const CardContainer = styled.div<{ $backgroundImage?: string }>`
    position: relative;
    background: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'var(--white)'};
    background-size: cover;
    background-position: center;
    border: 3px solid var(--primary-purple);
    border-radius: 16px;
    padding: 24px;
    min-width: 300px;
    max-width: 400px;
    min-height: 400px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    transition: all 0.3s ease;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: ${props => props.$backgroundImage ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6));` : ""}
        opacity: 1;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    &:hover::before {
        opacity: 0.4;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.2);
    }
`;

const ContentSection = styled.div`
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom: 24px;
    transition: transform 0.3s ease;

    ${CardContainer}:hover & {
        transform: translateY(-60px);
    }
`;

const TextContent = styled.div`
    margin-top: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const Title = styled.h3<{ $hasBackground?: boolean }>`
    font-size: 22px;
    font-weight: 700;
    color: ${props => props.$hasBackground ? 'var(--white)' : 'var(--dark-gray)'};
    margin: 0 0 12px 0;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 50px;
        height: 3px;
        background: var(--accent-yellow);
        border-radius: 2px;
    }
`;

const Description = styled.p<{ $hasBackground?: boolean }>`
    font-size: 16px;
    line-height: 1.6;
    color: ${props => props.$hasBackground ? 'rgba(255,255,255,0.9)' : 'var(--dark-gray)'};
    margin: 0;
    margin-top: 16px;
`;

const ButtonContainer = styled.div`
    position: absolute;
    bottom: -60px;
    left: 24px;
    right: 24px;
    display: flex;
    gap: 12px;
    transition: all 0.3s ease;
    z-index: 3;

    ${CardContainer}:hover & {
        bottom: 24px;
    }
`;

const ActionButton = styled.a<{ $variant: 'demo' | 'learn' }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: ${props => 
        props.$variant === 'demo' 
            ? 'var(--accent-yellow)' 
            : 'transparent'
    };
    color: ${props => 
        props.$variant === 'demo' 
            ? 'var(--dark-gray)' 
            : 'var(--accent-yellow)'
    };
    border: 2px solid var(--accent-yellow);
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    flex: 1;
    justify-content: center;
    
    &:hover {
        background: ${props => 
            props.$variant === 'demo' 
                ? 'transparent' 
                : 'var(--accent-yellow)'
        };
        color: ${props => 
            props.$variant === 'demo' 
                ? 'var(--accent-yellow)' 
                : 'var(--dark-gray)'
        };
        transform: translateY(-2px);
    }
    
    svg {
        transition: transform 0.3s ease;
    }
    
    &:hover svg {
        transform: ${props => 
            props.$variant === 'demo' 
                ? 'scale(1.1)' 
                : 'translate(2px, -2px)'
        };
    }
`;

const Overlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    transition: all 0.3s ease;
    z-index: 1;
    opacity: 0;

    ${CardContainer}:hover & {
        opacity: 1;
    }
`;

export default function ProjectCard({
    title,
    description,
    backgroundImage,
    demoLink,
    learnMoreLink
}: ProjectCardProps) {
    const hasBackground = !!backgroundImage;
    const hasButtons = !!(demoLink || learnMoreLink);

    return (
        <CardContainer $backgroundImage={backgroundImage}>
            <ContentSection>
                <TextContent>
                    <Title $hasBackground={hasBackground}>{title}</Title>
                    <Description $hasBackground={hasBackground}>
                        {description}
                    </Description>
                </TextContent>
            </ContentSection>

            {hasButtons && <Overlay />}
            
            {hasButtons && (
                <ButtonContainer>
                    {demoLink && (
                        <ActionButton 
                            href={demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            $variant="demo"
                        >
                            <FaPlay size={16} />
                            Demo
                        </ActionButton>
                    )}
                    {learnMoreLink && (
                        <ActionButton 
                            href={learnMoreLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            $variant="learn"
                        >
                            Learn More
                            <LuExternalLink size={16} />
                        </ActionButton>
                    )}
                </ButtonContainer>
            )}
        </CardContainer>
    );
}