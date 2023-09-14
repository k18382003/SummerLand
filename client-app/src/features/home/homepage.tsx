import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import Login from "../user/login";
import Register from "../user/register";

export default observer(function HomePage(){
    const {accountstore, modalstore} = useStore();
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' className='homepagetitle'>
                     Summer TechLand
                </Header>
                {accountstore.isLoggedIn ? 
                    <>
                        <Header as='h3' className='homepagemsg' content="Welcome to Summer's Tech Land"/>
                        <Button as={Link} to='/article' color='teal'>Read articles</Button>                   
                    </>
                    :
                    <>
                        <Button onClick={()=>modalstore.openModal(<Login />, 'mini')} color='teal'>Log In</Button>
                        <Button onClick={()=>modalstore.openModal(<Register />, 'mini')} color='teal'>Register</Button>
                    </>
                }
            <Button as={Link} to='/about-me' color='teal'>About Summer</Button>
            </Container>
        </Segment>
    )
})