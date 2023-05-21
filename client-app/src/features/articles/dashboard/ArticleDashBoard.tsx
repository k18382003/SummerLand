import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import ArticleList from './ArticleLists';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComp from '../../../app/layout/Loading';
import ArtilcFilters from './ArticleFilters';


export default observer(function ArticleDashBoard(){
    
    const {articlestore} = useStore()
    const {List, articlesMap} = articlestore

    useEffect(() => {
        if (articlesMap.size === 0) List();
    }, [List])
  
    if (articlestore.loadinginitial) return <LoadingComp inverted={true} message={"Loading Articles..."}/>

    return(
        <Grid>
            <Grid.Column width="10">
                <ArticleList />
            </Grid.Column>
            <Grid.Column width="6">
                <ArtilcFilters />
            </Grid.Column>
        </Grid>
    )
})