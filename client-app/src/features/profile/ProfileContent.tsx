import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFollow from "./ProfileFollowers";
import { useStore } from "../../app/stores/store";
import ProfileArticleList from "./ProfileArticleList";
import ProfileAcout from "./ProfileAbout";


interface Props {
    profileData: Profile;
}

export default function ProfileContent({ profileData }: Props) {

    const { profilestore } = useStore();

    const panes = [
        {
            menuItem: 'About',
            render: () => <ProfileAcout />,
        },
        {
            menuItem: 'Followers',
            render: () => <ProfileFollow />,
        },
        {
            menuItem: 'Followings',
            render: () => <ProfileFollow />
        },
        {
            menuItem: 'Articles',
            render: () => <ProfileArticleList profile={profileData} />,
        },
        {
            menuItem: 'Photos',
            render: () => <ProfilePhotos profileData={profileData} />,
        },
    ]

    return (
        <Tab            
            menu={{ fluid: true, secondary: true, pointing: true, stackable:true}}
            panes={panes}
            onTabChange={(_, data) => profilestore.setActiveTab(data.activeIndex as number)}
        />
    )
}