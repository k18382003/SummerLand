import  { useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react';
import ArticleList from './ArticleLists';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ArtilcFilters from './ArticleFilters';
import { PageParams } from '../../../app/models/pagination';
import InfiniteScroll, { } from 'react-infinite-scroller'
import ArticlePlaceholder from './ArticlePlaceholder';


export default observer(function ArticleDashBoard() {

    const { articlestore } = useStore()
    const { List, articlesMap, setPageParams, pagination } = articlestore
    const [Loadingnext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPageParams(new PageParams(pagination!.currentPage + 1));
        List().then(() => setLoadingNext(false));
    }


    useEffect(() => {
        if (articlesMap.size <= 1) List();
    }, [List, articlesMap.size])

    // if (articlestore.loadinginitial && !Loadingnext) return <LoadingComp inverted={true} message={"Loading Articles..."} />

    return (
        <>
            <Grid className='mobile only' stackable>
                <Grid.Column >
                    <ArtilcFilters />
                </Grid.Column>
                <Grid.Column>
                {(articlestore.loadinginitial && !Loadingnext) ?
                    <ArticlePlaceholder />
                    :
                    <>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!Loadingnext && !!pagination && pagination.currentPage !== pagination.totalPage}
                                initialLoad={false}
                            >
                                <ArticleList />
                            </InfiniteScroll>
                        <br />
                    </>
                }
                </Grid.Column>
                <Grid.Column >
                    <Loader active={Loadingnext} />
                    <br />
                </Grid.Column>
            </Grid>
            <Grid className='computer tablet only'>
                <Grid.Column width="10">
                {(articlestore.loadinginitial && !Loadingnext) ?
                    <ArticlePlaceholder />
                    :
                    <>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!Loadingnext && !!pagination && pagination.currentPage !== pagination.totalPage}
                                initialLoad={false}
                            >
                                <ArticleList />
                            </InfiniteScroll>
                    </>
                }
                </Grid.Column>
                <Grid.Column width="6">
                    <ArtilcFilters />
                </Grid.Column>
                <br />
                <Grid.Column width={10} >
                    <Loader active={Loadingnext} />
                    <br />
                </Grid.Column>
            </Grid>
        </>
    )
})