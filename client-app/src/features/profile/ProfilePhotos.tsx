import { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Icon, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import UploadPhotoWidget from '../../app/common/photoWidget/UploadPhotoWidget';
import { Photos } from '../../app/models/photos';

interface Props {
    profileData: Profile;
}

export default observer(function ProfilePhotos({ profileData }: Props) {
    const { profilestore: { isCurrentUser, uploadingPhoto,
        UploadPhoto, setMain, setMainLoading, deleteLoading, DeletePhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    const handleUpload = (file: Blob) => {
        UploadPhoto(file).then(() => setAddPhotoMode(false))
    }

    const handleSetMain = (image: Photos, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        setMain(image);
    }

    const handleDelete = (image: Photos, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        DeletePhoto(image);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" ><Icon name="images" />Photos</Header>
                    {isCurrentUser && (
                        <Button floated="right" color='black' content={!addPhotoMode ? "Add" : "Cancel"}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <UploadPhotoWidget handleUpload={handleUpload} uploading={uploadingPhoto} />
                    ) :
                        <Card.Group itemsPerRow={5}>
                            {profileData.photos?.map(photo => {
                                return (
                                    <>
                                        <Card key={photo.photoId}>
                                            <Image src={photo.url} />
                                            <Button.Group fluid widths={2}>
                                                <Button
                                                    basic
                                                    color='green'
                                                    content='setMain'
                                                    name={photo.photoId}
                                                    disabled={photo.isMain}
                                                    loading={target === photo.photoId && setMainLoading}
                                                    onClick={(e) => handleSetMain(photo, e)
                                                    }
                                                />
                                                <Button
                                                    basic
                                                    color='red'
                                                    icon='trash'
                                                    name={photo.photoId}
                                                    disabled={photo.isMain}
                                                    loading={target === photo.photoId && deleteLoading}
                                                    onClick={(e) => handleDelete(photo, e)}
                                                />
                                            </Button.Group>
                                        </Card>
                                    </>
                                )
                            })}
                        </Card.Group>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})