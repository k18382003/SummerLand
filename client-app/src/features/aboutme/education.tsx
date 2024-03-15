
import { Divider, Grid, Header, Segment } from "semantic-ui-react";

export default function Education() {

    return (
        <>
            <Segment raised>
                <Header as='h2'>Eduction</Header>
                <Divider />
                <Grid >
                    <Grid.Row >
                        <Grid.Column textAlign="center">
                            <Header as='h3'>Brainstation</Header>
                            <p className="edu_time">December 2023 ~ March 2024, Vancouver BC, Canada</p>
                            <p className="degree_course">Software Engineering BootCamp</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>
                        <Header as='h6' color="olive">▲▲Software Development Diploma▲▲</Header>
                    </Divider>
                    <Grid.Row >
                        <Grid.Column textAlign="center">
                            <Header as='h3'>Institute for Information Industry</Header>
                            <p className="edu_time">August 2020 ~ December 2020, Taichung City, Taiwan</p>
                            <p className="degree_course">Web Development BootCamp</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>
                        <Header as='h6' color="purple">▲▲Software Development Certification▲▲</Header>
                    </Divider>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Header as='h3'>ISS Language and Career College</Header>
                            <p className="edu_time">March 2018 ~ August 2019, Vancouver BC, Canada</p>
                            <p className="degree_course">International Business Management COOP program</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>
                        <Header as='h6' color="blue">▲▲Post-secondary Diploma▲▲</Header>
                    </Divider>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Header as='h3'>National Taiwan Sport University</Header>
                            <p className="edu_time"> September 2008 ~ June 2012, Taoyuan City, Taiwan</p>
                            <p className="degree_course">Bachelor Degree of Recreation and Leisure Industry Management</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>
                        <Header as='h6' color="teal">▲▲Bachelor Degree▲▲</Header>
                    </Divider>
                </Grid>
            </Segment>
        </>
    )
}