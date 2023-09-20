import { Divider, Grid, Header, Item, ItemGroup, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";

interface Props {
    profileData: Profile;
}

export default observer(function ProfileHeader({ profileData }: Props) {
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
                        <Statistic horizontal label='Follower' value={profileData.followers} color="red" />
                        <Divider />
                        <Statistic horizontal label='Following' value={profileData.followings} color="teal" />
                        <Divider />
                        <Statistic horizontal label='Articles' value={profileData.articles} color="blue" />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton profile={profileData} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
})