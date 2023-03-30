import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Article } from '../../../app/models/article'
import moment from 'moment';

interface Props {
    articles : Article[];
    selectArticle : (id: string) => void;
    deleteArticle : (id : string) => void;
    submit : boolean;
}

export default function ArticleList({articles, selectArticle, deleteArticle, submit}: Props){
    
    const [setdeletebtn, setDeleteBtn] = useState('');

    function handleDelete(e : SyntheticEvent<HTMLButtonElement>, id:string)
    {
       setDeleteBtn(e.currentTarget.name);
       deleteArticle(id);
    }

    return(
        <Segment raised>
            <Item.Group divided>
                {articles.map((article) => (
                    <Item key={article.artID}> 
                        <Item.Content>
                            <Item.Header as='a'>{article.title}</Item.Header>
                            <Item.Meta><span className='date'>{moment(article.createDate).format("MMM DD YYYY")}</span></Item.Meta>
                            <Label>{article.category}</Label>
                            <Item.Extra>
                                <Button 
                                name = {article.artID}
                                loading={submit && setdeletebtn === article.artID} 
                                onClick={(e) => handleDelete(e, article.artID)} 
                                floated='right' 
                                content='Delete' 
                                color='red' 
                                size='tiny'>                              
                                </Button>
                                <Button onClick={() => selectArticle(article.artID)} floated='right' content='View' color='black' size='tiny'></Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>              
                ))}
            </Item.Group>
        </Segment>
    )
}