import { useState } from 'react';
import { Button, Header, Segment } from "semantic-ui-react";
import axios from 'axios';
import ValidationError from './ValidationError';

export default function TestErrors() {
    const [Error, setError] = useState(null);

    function handleNotFound() {
        axios.get('/error/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get('/error/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get('/error/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get('/error/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get('/article/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post('/article', {}).catch(err => setError(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {Error &&
                <ValidationError errors={Error} />
            }
        </>
    )
}