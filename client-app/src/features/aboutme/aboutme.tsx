import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import Workexperience from "./workexperience";
import Skills from "./skills";
import Education from "./education";
import Award from "./award";
import Recommandation from "./recommandation";


export default function AboutMe(){
    return (
        <>
            <Segment raised>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src={require('../../images/GreetingPhoto.png')} size='small' /> 
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Header className="Greeting_1" as="h1" > Hi! I Am Summer Teng</Header>
                            <p className="Greeting_2" color="grey"> Software Developer </p>
                            <p className="intromsg">
                            Self-motivated developer with experience in a highly collaborative work environment. 
                            <br/> Passionate and hardworking with a penchant for developing software. 
                            <br/> seeking for a new opportunity to grow and shine.
                            <Button color="red" floated="right" >Contact me</Button>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Workexperience />
            <Skills />
            <Education />
            <Award />
            <Recommandation />
            <br />
        </>
    )
}