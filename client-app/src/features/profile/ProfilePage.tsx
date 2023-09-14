import { Segment } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../app/layout/Loading";

export default observer(function ProfilePage() {
    const { username } = useParams();
    const { profilestore } = useStore();

    useEffect(() => {
        if (username)
            profilestore.GetProfile(username)
    }, []);

    if (profilestore.loading) return <LoadingComp inverted={true} message={"Loading Profile..."} />

    return (
        <Segment>
            {profilestore.profileData &&
                <>
                    <ProfileHeader profileData={profilestore.profileData} />
                    <ProfileContent profileData={profilestore.profileData} />
                </>
            }
        </Segment>
    )
})