import React, { useDeferredValue } from 'react'
import { Button, ButtonGroup, Container, Divider, Header, Item, ItemContent, Segment } from 'semantic-ui-react';
import { Article } from '../../../app/models/article'
import ArticleForm from './ArticleForm';

interface Props{
    articles: Article;
    cancelSelectArticle : () => void;
    openForm: (id? : string) => void;
}

export default function ArticlesDetail({articles, cancelSelectArticle, openForm} : Props)
{
    return (
        <Segment raised clearing>
            <Item.Group>
                <Header as='h2' floated='left'>
                    {articles.title}
                </Header>
                <Divider clearing />
                <ItemContent>
                    <pre>{articles.content}</pre>
                    <Item.Extra>
                        <Button floated='right' onClick={() => cancelSelectArticle()} color='grey'  content='Cancel'></Button>         
                        <Button floated='right' onClick={() => openForm(articles.artID)} color='black' content='Edit'></Button>
                    </Item.Extra>
                </ItemContent>
            </Item.Group>
        </Segment>
    )
}