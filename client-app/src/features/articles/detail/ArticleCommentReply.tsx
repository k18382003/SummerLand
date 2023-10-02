import { SyntheticEvent, useState } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react'
import { Comment as Com } from '../../../app/models/comment';

interface Props {
    parentComment: Com;
}


export default function ArticleCommentReply({ } : Props) {

    const [target, setTarget] = useState("");

    const handleClick = (event : SyntheticEvent<HTMLButtonElement>) => {
        setTarget(event.currentTarget.name);
    }

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
                                name={target}
                                onClick={(e)=> handleClick(e)}
                                secondary
                            />
                    </Form>
                </Comment.Content>
            </Comment>
        </Comment.Group>
    )
}