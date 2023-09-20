import { Card, Grid, Header, Icon, Tab } from "semantic-ui-react";
import ProfileCards from "./ProfileCards";
import { useStore } from "../../app/stores/store";
import { observer } from 'mobx-react-lite';

export default observer(function ProfileFollow() {

    const { profilestore } = useStore();
    const { profileData, lstFollowingLoading, FollowProfiles, activeTitles } = profilestore;

    return (
        <Tab.Pane loading={lstFollowingLoading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" ><Icon name="users" />{profileData?.displayName}'s {activeTitles}</Header>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={6}>
                        {FollowProfiles.length > 0 && FollowProfiles.map((profile) => (
                            <ProfileCards key={profile.userName} profileData={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})