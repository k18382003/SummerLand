import { Card, Grid, Header, Icon, Input, Menu, Tab } from "semantic-ui-react";
import ProfileCards from "./ProfileCards";
import { useStore } from "../../app/stores/store";
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from "react";

export default observer(function ProfileFollow() {
    const { profilestore } = useStore();
    const { profileData, lstFollowingLoading, FollowProfiles, activeTitles } = profilestore;
    const [searchwords, setSearchwords] = useState("");
    const [templist, setTemplist] = useState(FollowProfiles);

    const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        setSearchwords(e.currentTarget.value);
        setTemplist(FollowProfiles.filter(x => x.userName.toLowerCase().includes(e.currentTarget.value.toLowerCase())))
    }

    useEffect(() => {
        setTemplist(FollowProfiles);
    }, [FollowProfiles])

    return (
        <Tab.Pane loading={lstFollowingLoading}>
            <Grid stackable>
                <Grid.Column width={8}>
                    <Header floated="left" ><Icon name="users" />{profileData?.displayName}'s {activeTitles}</Header>
                </Grid.Column>
                <Grid.Column width={8}>
                    <div className="ui right floated header">
                        <Menu.Item className='ui right aligned category search item'>
                            <Menu.Item className='ui icon input'>
                                <Input
                                    size="mini"
                                    className='prompt'
                                    type='text'
                                    value={searchwords}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='Type to search...'
                                />
                            </Menu.Item>
                        </Menu.Item>
                    </div>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group stackable itemsPerRow={6}>
                        {FollowProfiles.length > 0 && 
                            (templist).map((profile) => (
                            <ProfileCards key={profile.userName} profileData={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})