import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import { Button, Popup } from "semantic-ui-react";
import { store, useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";

interface Props {
    profile: Profile
}

export default observer(function FollowButton({ profile }: Props) {
    const { profilestore } = useStore();
    const { UpdateFollowing, followingLoading } = profilestore;
    const [target, setTarget] = useState("");

    if (store.accountstore.currentUser?.userName === profile.userName) return null;

    const handleClick = (e: SyntheticEvent<HTMLButtonElement>, username: string) => {
        e.preventDefault();
        setTarget(e.currentTarget.name);
        profile.following ? UpdateFollowing(username, true) : UpdateFollowing(username, false);
    }

    return (
        <Popup content='Click to follow or unfollow' trigger={
            <Button
                fluid
                toggle
                name={profile.userName}
                active={profile.following}
                loading={target === profile.userName && followingLoading}
                onClick={(e) => handleClick(e, profile.userName)}>
                {profile.following ? 'Following' : 'Not Follow'}
            </Button>} />
    )
})