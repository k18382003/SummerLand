import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ServerError() {
    const {commondstore} = useStore()

    return(
        <Container>
            <Header as='h2'>Server Error</Header>
            <Header as='h4' color="red">{commondstore.error?.message}</Header>
            {commondstore.error?.detail && 
                <Segment>
                    <Header as='h5' color="teal">Stack Trace</Header>
                    <code>{commondstore.error.detail}</code>
                </Segment>
            }
        </Container>
    )
})