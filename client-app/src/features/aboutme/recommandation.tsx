import { useState } from "react";
import { Card, Container, Divider, Header, Icon, Image, Modal, Segment, Button } from "semantic-ui-react";
import Recommand_1 from "./modals/recommand_1";
import Recommand_2 from "./modals/recommand_2";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import ModalContainer from "../../app/common/modal/modalContainer";
import Login from "../user/login";

export default observer(function Recommandation(){

    const {modalstore} = useStore();

    return(
        <>
            <Segment raised>
            <Header as='h2'>Recommandation</Header>
            <Divider />
            <Container fluid>
                <Card.Group itemsPerRow={3}>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='left'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Zhu Junda</Card.Header>
                            <Card.Meta>Dinghua Intelligent System Co., Ltd.</Card.Meta>
                            <Card.Description>
                            <strong>Product Development Manager</strong>
                            <p>Li-pin previously worked...</p>
                            </Card.Description>
                        </Card.Content>
                        <Button onClick={() => modalstore.openModal(<Recommand_1 />, "small", true)} fluid>Full Content</Button>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='left'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>XXX</Card.Header>
                            <Card.Meta>Dinghua Intelligent System Co., Ltd.</Card.Meta>
                            <Card.Description>
                            <strong>Product Development Manager</strong>
                            <p>Li-pin previously worked...</p>
                            </Card.Description>
                        </Card.Content>
                        <Button onClick={() => modalstore.openModal(<Recommand_2 />, "small", true)} fluid>Full Content</Button>
                    </Card>
                </Card.Group>
            </Container>
            </Segment>

        </>
    )
})