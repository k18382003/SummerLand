import { Link } from "react-router-dom";
import { Button, Card, Divider, Header, Image, Segment } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import CardContent from './CardContent.json';
import './card.css';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import Skills from "./skills";

export default function Projects() {
    const [data, setData] = useState<any>([]);
    type conentObj = {
        imgUrl: string,
        description: string,
        header: string,
        linkUrl: string,
        skills: string,
        github: string,
    }

    useEffect(() => {
        // Simulating fetching data from JSON file
        setData(CardContent);
    }, []);

    return (
        <Segment raised>
            <Header as='h2'>Projects</Header>
            <Divider />
            <Card.Group itemsPerRow={3} stackable>
                {data.map((card: conentObj, i: Key | null | undefined) => (
                    <Card key={i} color="teal" >
                        <Image src={'/' + card.imgUrl} className="card-image" />
                        <Card.Content>
                            <Card.Header>{card.header || 'Coming soon'}</Card.Header>
                            <Card.Description>
                                <Header as={"h5"} color="brown">{card.description}</Header>
                                <Skills fullSkill={card.skills} />
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button as={Link} to={card.github} fluid color="instagram">GitHub</Button>
                            <p></p>
                            <Button as={Link} to={card.linkUrl} fluid color="grey">Demo</Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Segment >
    )
}