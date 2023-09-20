import { useState } from 'react';
import { Button, Grid, Header, Icon, Segment, Tab } from "semantic-ui-react";
import { useStore } from '../../app/stores/store';
import { Field, FieldProps, Formik } from 'formik';
import * as yup from 'yup'
import { Form } from 'react-router-dom';
import { BioValue } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';

export default observer(function ProfileAcout() {

    const { profilestore: { isCurrentUser, profileData, EditBio, bioloading } } = useStore();
    const [editBioMode, setEditBioMode] = useState(false);

    const handleBioSubmit = async (bio: BioValue) => {
        await EditBio(bio);
        setEditBioMode(false);
    }


    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" ><Icon name="images" />About {profileData?.displayName}</Header>
                    {isCurrentUser && (
                        <Button floated="right" color='black' content={!editBioMode ? "Edit" : "Cancel"}
                            onClick={() => setEditBioMode(!editBioMode)}
                        />
                    )}
                </Grid.Column>
                {!editBioMode ?
                    <Grid.Column width={16}>
                        <Segment basic loading={bioloading} style={{ whiteSpace: "break-spaces" }}>
                            {profileData?.bio || "No Data"}
                        </Segment>
                    </Grid.Column>
                    :
                    <Grid.Column width={16}>
                        <Formik
                            onSubmit={(values) => handleBioSubmit(values)}
                            initialValues={{
                                displayName: profileData?.displayName as string
                                , bio: profileData?.bio as string
                            }}
                            validationSchema={yup.object({
                                bio: yup.string().trim().required("Content can't be empty")
                            })}
                        >
                            {({ isSubmitting, isValid, dirty, handleSubmit }) => (
                                <>
                                    <Form className='ui form' onSubmit={handleSubmit} >
                                        <Field name="bio">
                                            {(props: FieldProps) => (
                                                <div>
                                                    <textarea style={{ whiteSpace: "break-spaces"}}
                                                        placeholder='Say something about you!'
                                                        rows={3}
                                                        {...props.field}
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <br />
                                        <Button
                                            loading={isSubmitting}
                                            disabled={isSubmitting || !isValid || !dirty}
                                            content='Save'
                                            labelPosition='left'
                                            icon='edit'
                                            secondary
                                            type='submit'
                                            floated='right'
                                        />
                                    </Form>
                                </>
                            )}
                        </Formik>
                    </Grid.Column>
                }
            </Grid>
        </Tab.Pane>
    )
})