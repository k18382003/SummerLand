import { Card } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { observer } from "mobx-react-lite";
import CardImageBackground from '../../images/user.png';

interface Props {
    profileData: Profile;
}

export default observer(function ProfileCards({ profileData }: Props) {
    return (
        <>
            <Card>
                {profileData.image ?
                    <Card.Content as={Link} to={`/profile/${profileData.userName}`} className="CardImage" style={{ backgroundImage: `url(${profileData.image})` }} />
                    :
                    <Card.Content as={Link} to={`/profile/${profileData.userName}`} className="CardImage" style={{ backgroundImage: `url(${CardImageBackground})` }} />
                }
                <Card.Content>
                    <Card.Header style={{ textAlign: "center" }} as={Link} to={`/profile/${profileData.userName}`}>{profileData.displayName}</Card.Header>
                </Card.Content>
                <FollowButton profile={profileData} />
            </Card>
        </>
    )
})