import { Card, Divider, Header, Image, List, Segment } from 'semantic-ui-react';

export default function Skills(){
    return(
        <Segment raised>
            <Header as='h2'>Skills</Header>
            <Divider />
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Image floated='left' src={require('../../images/language.png')} avatar></Image>
                        <Card.Header>Programming Languages</Card.Header>
                        <br/>
                        <Card.Description>
                            <List bulleted>
                               <List.Item>HTML5 - 2 years</List.Item> 
                               <List.Item>CSS - 2 years</List.Item> 
                               <List.Item>Microsoft SQL Server - 2 years</List.Item> 
                               <List.Item>Oracle - 2 years</List.Item> 
                               <List.Item>Visual Basic - 2 years</List.Item> 
                               <List.Item>JavaScript - 1 year</List.Item> 
                               <List.Item>Python - 1 year</List.Item> 
                            </ List>
                        </Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Image floated='left' src={require('../../images/framework.png')} avatar></Image>
                        <Card.Header>Frameworks and Libraries</Card.Header>
                        <br/>
                        <Card.Description>
                            <List bulleted>
                               <List.Item>.Net - 2 years</List.Item> 
                               <List.Item>Bootstrap - 0.5 year</List.Item> 
                               <List.Item>React.js - 0.5 year</List.Item> 
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Image floated='left' src={require('../../images/IDE.png')} avatar></Image>
                        <Card.Header>IDE & Source Control</Card.Header>
                        <br/>
                        <Card.Description>
                            <List bulleted>
                               <List.Item>Visual Studio - 2.5 years</List.Item> 
                               <List.Item>Visual Studio Code - 2 years</List.Item> 
                               <List.Item>SQL Server Management Studio - 2 years</List.Item> 
                               <List.Item>Git - 1 year</List.Item> 
                               <List.Item>TFS - 1 year</List.Item> 
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
            <div className="credits">
                <a href="https://www.flaticon.com/free-icons/integrated-development-environment" title="integrated development environment icons">icons created by Flat Icons - Flaticon</a>
            </div>
        </Segment>
    )
}