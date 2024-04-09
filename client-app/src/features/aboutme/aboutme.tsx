import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import Workexperience from "./workexperience";
import Skills from "./skills";
import Education from "./education";
import Award from "./award";
import Recommandation from "./recommandation";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import ContactInfo from "./modals/contactinfo";
import Greeting from "../../images/GreetingPhoto.png";
import Projects from "./projectsshowcase/projects";


export default observer(function AboutMe() {
    const { modalstore } = useStore();

    return (
        <>
            <Segment raised>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3} className='computer only row'>
                            <Image src={Greeting} size='small' />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Header className="Greeting_1" as="h1" > Hi! I Am Summer Teng</Header>
                            <p className="Greeting_2" color="grey"> Software Developer </p>
                            <p className="intromsg">
                                Self-motivated developer with experience in a highly collaborative work environment.
                                <br /> Passionate and hardworking with a penchant for developing software.
                                <br /> seeking for a new opportunity to grow and shine.
                                <Button
                                    color="red"
                                    floated="right"
                                    onClick={() => modalstore.openModal(<ContactInfo />, "mini")}
                                >Contact me</Button>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Workexperience />
            <Skills />
            <Education />
            <Award />
            <Projects />
            <Recommandation />
            <br />
        </>
    )
})