import React, { useEffect, useState } from 'react'
import { Button, Divider, Header, Icon, Item, ItemContent, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComp from '../../../app/layout/Loading';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ArticleComment from './ArticleComment';


export default observer(function ArticlesDetail()
{   
    const {articlestore} = useStore();
    const {selectedarticle, LoadArticle, loadinginitial} = articlestore;
    
    const {id} = useParams();

    const handleContentLoaded = (content : string) => {
        var elems = document.getElementById("textContent");
        if(elems)
            elems!.innerHTML = content;
    };
    
    useEffect(() => {
        if(id) LoadArticle(id);
    }, [id, LoadArticle])

    // set the element innerHTML after the DOM is mounted
    useEffect(() => {
        if (selectedarticle)
        {
            handleContentLoaded(selectedarticle.content);
        }
    }, [selectedarticle]); // The use Effect will be only fired if the dependency is changed
  
    if (!selectedarticle || loadinginitial ) return <LoadingComp inverted={true} message={'Loading article...'} />

    return (
        <>
            <Segment raised clearing >
                <Item.Group>
                    <Header as='h2' floated='left' >
                        {selectedarticle.title}
                    </Header>
                    <Divider clearing />
                    <ItemContent>
                        {/* <div className='ql-editor' dangerouslySetInnerHTML={{ __html: selectedarticle.content }}></div> (This need to work with DOMPurify in case (XSS) attacks) */}
                        <ItemContent id="textContent" className='ql-editor'></ItemContent>                     
                        <Item.Extra>
                            <Button as='div' labelPosition='right'>
                                <Button color='red' icon>
                                    <Icon name='heart' />
                                    Like
                                </Button>
                                <Label as='a' basic pointing='left'>
                                    0
                                </Label>
                            </Button>
                            <Button floated='right' as={Link} to="/articles" color='grey'  content='Cancel'></Button>         
                            <Button as={Link} to={`/manage/${selectedarticle.artID}`} floated='right' color='black' content='Edit'></Button>
                        </Item.Extra>
                    </ItemContent>
                </Item.Group>
            </Segment>
            <ArticleComment />
        </>
    )

})