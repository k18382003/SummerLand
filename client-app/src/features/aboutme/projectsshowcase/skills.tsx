import { useState } from "react";

interface Props {
    fullSkill: string
}

const Skills = ({ fullSkill }: Props) => {
    const [skills, setSkills] = useState<string | undefined>();

    return (
        <p onMouseEnter={() => setSkills(fullSkill)}
            onMouseLeave={() => setSkills(undefined)}>
            Skills: {skills || fullSkill?.slice(0, 40) + "...(hover to see more)"}
        </p>
    )
}

export default Skills;