import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Article } from '../../../app/models/article';
import { Button, Item, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface Props {
    article : Article;   
}

export default observer(function ArticleItems({article, } : Props){
    const {articlestore} = useStore();
    const {loading, DeleteArticle} = articlestore

    const [deletebtn, setDeleteBtn] = useState('');

    function handleDelete(e : SyntheticEvent<HTMLButtonElement>, id:string)
    {
        setDeleteBtn(e.currentTarget.name);
        DeleteArticle(id);
    }
    
    return (
        <Item key={article.artID}> 
            <Item.Content>
                <Item.Header as='a'>{article.title}</Item.Header>
                <Item.Meta><span className='date'>{moment(article.createDate).format("MMM DD YYYY")}</span></Item.Meta>
                <Label>{article.category}</Label>
                <Item.Extra>
                    <Button 
                    name = {article.artID}
                    loading={loading && deletebtn === article.artID} 
                    onClick={(e) => handleDelete(e, article.artID)} 
                    floated='right' 
                    content='Delete' 
                    color='red' 
                    size='tiny'>                              
                    </Button>
                    <Button as={Link} to={`/articles/${article.artID}`} floated='right' content='View' color='black' size='tiny'></Button>
                </Item.Extra>
            </Item.Content>
        </Item> 
    )
})