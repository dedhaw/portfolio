import { Animate } from "../utils/HighlightContext";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

interface SkillProps {
    id: string;
    logo: any;
    description: string;
}

export default function Skill({
    id,
    logo,
    description
}: SkillProps) {
  return (
    <Animate trigger={id}>
        <Container>
            {logo}
            <p>{description}</p>
        </Container>
    </Animate>
  )
}
