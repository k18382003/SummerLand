import { Grid, Image, Segment, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";


interface Props {
    profileData: Profile;
}

export default function ProfileContent({ profileData }: Props) {
    const panes = [
        {
            menuItem: 'About',
            render: () => <Tab.Pane attached={false}>About Content</Tab.Pane>,
        },
        {
            menuItem: 'Followers',
            render: () => <Tab.Pane attached={false}>XXX</Tab.Pane>,
        },
        {
            menuItem: 'Followings',
            render: () => <Tab.Pane attached={false}>OOO</Tab.Pane>,
        },
        {
            menuItem: 'Articles',
            render: () => <Tab.Pane attached={false}>1, 2, 3</Tab.Pane>,
        },
        {
            menuItem: 'Photos',
            render: () => <ProfilePhotos profileData={profileData} />,
        },
    ]

    return (
        <Tab menu={{ fluid: true, secondary: true, pointing: true }} panes={panes} />
    )
}