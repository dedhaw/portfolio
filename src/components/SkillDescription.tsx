import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    .skill {
        opacity: 0;
        transition: opacity 0.6s ease-in;
    }

    .skill.visible {
        opacity: 1;
    }
`;

interface SkillProps {
    id: string;
    description: string;
}

export default function Skill({
    id,
    description
}: SkillProps) {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        setVisible(false);
        const t = window.setTimeout(() => setVisible(true), 20);
        return () => window.clearTimeout(t);
    }, [id]);

  return (
    <Container>
        <div className={`skill${visible ? ' visible' : ''}`}>
            <p>{description}</p>
        </div>
    </Container>
  )
}
