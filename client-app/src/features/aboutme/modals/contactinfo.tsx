import { Link } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

export default function ContactInfo() {
    return (
        <Segment raised>
            <Header as="h3">
                <Icon name="mail" />
                <Header.Content>
                    Email Me:
                    <HeaderSubHeader as={Link} to='mailto:k18382003@gmail.com'>
                        k18382003@gmail.com
                    </HeaderSubHeader>
                </Header.Content>
            </Header>
            <Header as="h3">
                <Icon name="linkedin" />
                <Header.Content>
                    Linked Me:
                    <HeaderSubHeader as={Link} to='https://www.linkedin.com/in/lipintengsummer/'>
                        lipintengsummer
                    </HeaderSubHeader>
                </Header.Content>
            </Header>
            <Header as="h3">
                <Icon name="instagram" />
                <Header.Content>
                    Follow Me:
                    <HeaderSubHeader as={Link} to='https://www.instagram.com/k18382003/'>
                        k18382003
                    </HeaderSubHeader>
                </Header.Content>
            </Header>
        </Segment>
    )
}