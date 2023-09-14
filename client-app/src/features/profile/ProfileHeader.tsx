import { useState } from "react";
import { Button, Divider, Grid, Header, Item, ItemGroup, Popup, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

interface Props {
    profileData: Profile;
}

export default observer(function ProfileHeader({ profileData }: Props) {
    const [following, SetFollow] = useState(true);
    const handleClick = () => {
        SetFollow((pre) => !pre);
    }

    return (
        <Segment>
            <Grid>
                <Grid.Column floated='left' width={5}>
                    <ItemGroup>
                        <Item>
                            <Item.Image avatar size="small" src={profileData.image || require('../../images/user.png')} />
                            <Item.Content verticalAlign="middle">
                                <Header as='h1'>{profileData.displayName}</Header>
                            </Item.Content>
                        </Item>
                    </ItemGroup>
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                    <Statistic.Group size='mini'>
                        <Statistic horizontal label='Follower' value='5' color="red" />
                        <Divider />
                        <Statistic horizontal label='Following' value='100' color="teal" />
                        <Divider />
                        <Statistic horizontal label='Articles' value='3' color="blue" />
                    </Statistic.Group>
                    <Divider />
                    <Popup content='Click to follow or unfollow' trigger={
                        <Button fluid toggle active={following} onClick={handleClick}>
                            {following ? 'Following' : 'Not Follow'}
                        </Button>} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
})