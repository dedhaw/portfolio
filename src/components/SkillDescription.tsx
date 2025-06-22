import Animate from "../utils/HighlightFadeIn";

interface SkillProps {
    id: string;
    description: string;
}

export default function Skill({
    id,
    description
}: SkillProps) {
  return (
    <Animate trigger={id}>
        <p>{description}</p>
    </Animate>
  )
}
