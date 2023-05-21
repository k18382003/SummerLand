import React from 'react';
import { Button, Comment, Form } from 'semantic-ui-react'

export default function ArticleCommentReply() {
    return (
        <Comment.Group >
            <Comment>
                <Comment.Content>
                    <Form reply >
                        <Form.TextArea className='formShadow'/>
                            <Button
                                content='Add Reply'
                                labelPosition='left'
                                icon='edit'
                                secondary
                            />
                    </Form>
                </Comment.Content>
            </Comment>
        </Comment.Group>
    )
}