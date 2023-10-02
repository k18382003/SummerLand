import { Link } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";

export default function RequestPage() {
    return (
        <>
            <Header textAlign="center">We have sent you an email. Please confirm your email before login.</Header>
            <Header.Content textAlign="center">If you don't receive it. Please click button below. We will re-sent it to you.</Header.Content>
            <br />
            <Button
                as={Link}
                to='/resend-email'
                color='black'
                content='Resend Email Comfrimation'
                 />
        </>
    )
}