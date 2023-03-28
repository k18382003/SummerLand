import { format as pathFormat }  from 'path';
import React from 'react'
import { Button, Item, Label, List, Segment } from 'semantic-ui-react';
import { Article } from '../../../app/models/article'
import { format } from 'date-fns'
import moment from 'moment';

interface Props {
    articles : Article[];
    selectArticle : (id: string) => void;
}

export default function ArticleList({articles, selectArticle}: Props){
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
                                <Button onClick={() => selectArticle(article.artID)} floated='right' content='View' color='black'></Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>              
                ))}
            </Item.Group>
        </Segment>
    )
}