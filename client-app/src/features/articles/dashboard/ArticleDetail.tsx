import React, { useEffect, useState } from 'react'
import { Button, Divider, Header, Item, ItemContent, Segment } from 'semantic-ui-react';
import { Article } from '../../../app/models/article'

interface Props{
    articles: Article;
    cancelSelectArticle : () => void;
    openForm: (id? : string) => void;
}

export default function ArticlesDetail({articles, cancelSelectArticle, openForm} : Props)
{
    const [isloaded, isLoaded] = useState(false);
    
    const handleContentLoaded = (content : string) => {
        var elems = document.getElementById("textContent");
        elems!.innerHTML = content;
    };
    
    // set the element innerHTML after the DOM is mounted
    useEffect(() => {
        handleContentLoaded(articles.content);
        isLoaded(true)
    }, [isloaded]);
    
    // When the DOM is still mounting, don't set the content to the element
    // But after first load, need to refresh every article content
    if (isloaded)
        handleContentLoaded(articles.content);
    
    return (
        <Segment raised clearing>
            <Item.Group>
                <Header as='h2' floated='left' >
                    {articles.title}
                </Header>
                <Divider clearing />
                <ItemContent>
                    {/* <div className='ql-editor' dangerouslySetInnerHTML={{ __html: articles.content }}></div> */}
                    <ItemContent id="textContent" className='ql-editor'></ItemContent> 
                    <Item.Extra>
                        <Button floated='right' onClick={() => cancelSelectArticle()} color='grey'  content='Cancel'></Button>         
                        <Button floated='right' onClick={() => openForm(articles.artID)} color='black' content='Edit'></Button>
                    </Item.Extra>
                </ItemContent>
            </Item.Group>
        </Segment>
    )
    
}