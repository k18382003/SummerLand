import React, {useState} from 'react';
import { Button, Comment, Form } from 'semantic-ui-react'
import ArticleCommentReply from './ArticleCommentReply';


export default function ArticleComment(){
    const [reply, setReply] = useState(false);

    function handleClick() {
        if (reply == false)
            setReply(true);
        else
            setReply(false);
    }

    return (
        <Comment.Group>
            <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>
                    <Comment.Author>Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                        <div>1 day ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>
                            The hours, minutes and seconds stand as visible reminders that your
                            effort put them all there.
                        </p>
                        <p>
                            Preserve until your next run, when the watch lets you see how
                            Impermanent your efforts are.
                        </p>                    
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action onClick={() => handleClick()}>Reply</Comment.Action>
                    </Comment.Actions>
                    {reply && <ArticleCommentReply/>}
                </Comment.Content>
            </Comment>

            <Form reply>
                <Form.TextArea className='formShadow'/>
                <Button content='Add Comment' labelPosition='left' icon='edit' secondary />
            </Form>
            <br />
        </Comment.Group>
    )
}