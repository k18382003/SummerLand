import { Segment } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../app/layout/Loading";
import GuestMessage from "../../app/common/authorization/guestMessage";

export default observer(function ProfilePage() {
    const { username } = useParams();
    const { profilestore, accountstore } = useStore();

    useEffect(() => {
        profilestore.loading = true;
        if (username)
            profilestore.GetProfile(username)
        return (() => {
            profilestore.loading = false;
            profilestore.acvtiveTab = 0;
        })
    }, [username, profilestore]);

    if (profilestore.loading) return <LoadingComp inverted={true} message={"Loading Profile..."} />

    return (
        <>
            {accountstore.currentUser && accountstore.currentUser.userName == "guest" && username == "guest" ?
                <GuestMessage functionName="creat profile" />
                :
                <Segment>
                    {profilestore.profileData &&
                        <>
                            <ProfileHeader profileData={profilestore.profileData} />
                            <ProfileContent profileData={profilestore.profileData} />
                        </>
                    }
                </Segment>
            }
        </>
    )
})