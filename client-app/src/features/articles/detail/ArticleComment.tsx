import { useEffect } from 'react';
import { Button, Comment, Divider, Grid, Header, Segment } from 'semantic-ui-react'
import { store, useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import moment from 'moment';
import { Comment as com } from '../../../app/models/comment';
import * as yup from 'yup'
import GuestMessage from '../../../app/common/authorization/guestMessage';

interface Props {
    artId: string;
}

export default observer(function ArticleComment({ artId }: Props) {
    const { commentstore, accountstore } = useStore();

    function handleClick(_comment: com) {
        commentstore.delteComment(_comment);
    }

    useEffect(() => {
        if (artId)
            commentstore.createHubConnection(artId);
        return (() => {
            commentstore.clearComments();
        })
    }, [commentstore, artId])


    return (
        <Grid columns={3}>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
                <Segment attached='top' inverted textAlign='center'>
                    <Header content="Leave a comment" />
                </Segment>
                <Segment attached clearing >
                    <Comment.Group >
                        {commentstore.comments.map((comment) => (
                            <Comment key={comment.id} style={{ maxWidth: "100% !important" }}>
                                <Comment.Avatar as={Link} to={`/profile/${comment.userName}`} src={comment.image || 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'} />
                                <Comment.Content>
                                    <Comment.Author as={Link} to={`/profile/${comment.userName}`}>{comment.displayName}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{moment(comment.createTime).format("MMM DD YYYY HH:mm:ss")}</div>
                                    </Comment.Metadata>
                                    <Comment.Text style={{ whiteSpace: 'break-spaces' }}>
                                        {comment.body}
                                    </Comment.Text>
                                    {/* <Comment.Actions>
                                        <Comment.Action
                                        as={Link}
                                        name={comment.userName + comment.id}
                                        onClick={(e: any) => handleClick(e, comment)}
                                        >Reply</Comment.Action>
                                        </Comment.Actions>
                                    {reply && target === comment.userName + comment.id && <ArticleCommentReply parentComment={comment} />} */}
                                    {store.accountstore.currentUser?.userName === comment.userName &&
                                        <Comment.Actions>
                                            <Comment.Action
                                                as={Link}
                                                name={comment.userName + comment.id}
                                                onClick={() => handleClick(comment)}
                                            >Delete</Comment.Action>
                                        </Comment.Actions>
                                    }
                                </Comment.Content>
                                <Divider />
                            </Comment>
                        ))}
                    </Comment.Group>
                    {accountstore.currentUser && accountstore.currentUser.userName == "guest" ?
                        <GuestMessage functionName={'leave a comment'} />
                        :
                        <Formik
                            onSubmit={(values: any, { resetForm }: any) => {
                                return commentstore.addComment(values).then(() => resetForm());
                            }}
                            initialValues={{ body: '' }}
                            validationSchema={yup.object({
                                body: yup.string().trim().required("Comment can't be empty")
                            })}
                        >
                            {({ isSubmitting, isValid, dirty }) => (
                                <>
                                    <Form className='ui form'>
                                        <Field name="body">
                                            {(props: FieldProps) => (
                                                <div style={{ position: "relative" }}>
                                                    <textarea
                                                        placeholder='Add comment'
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
                                            content='Add Comment'
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
                    }
                </Segment>
            </Grid.Column>
            <Grid.Column width={3} />
        </Grid>
    )
})