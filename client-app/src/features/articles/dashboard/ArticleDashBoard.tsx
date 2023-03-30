import React from 'react'
import { Grid } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Article } from '../../../app/models/article';
import ArticlesDetail from './ArticleDetail';
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleLists';

interface Props {
    articles: Article[];
    selectedArticle: Article | undefined;
    selectArticle : (id: string) => void;
    cancelSelectArticle : () => void;
    editMode : boolean;
    openForm : (id?: string) => void;
    closeForm : () => void;
    createOrEdit : (article : Article) => void; 
    deleteArticle : (id : string) => void;
    saveArticle: boolean;
}

export default function ArticleDashBoard({articles, selectedArticle, selectArticle, cancelSelectArticle,
editMode, openForm, closeForm, createOrEdit, deleteArticle, saveArticle} : Props){
    
    return(
        <Grid>
            <Grid.Column width="6">
                <ArticleList articles={articles} selectArticle={selectArticle} deleteArticle={deleteArticle} submit={saveArticle} />
            </Grid.Column>
            <Grid.Column width="10">
                {selectedArticle && !editMode &&
                <ArticlesDetail articles={selectedArticle} 
                cancelSelectArticle={cancelSelectArticle}
                openForm={openForm}/>
                }
                {editMode &&
                <ArticleForm article={selectedArticle} closeForm={closeForm} createOrEdit={createOrEdit} saveArticle={saveArticle}/>}
            </Grid.Column>
        </Grid>
    )
}