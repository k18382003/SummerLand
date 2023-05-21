import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ArticleItems from './ArticleItems';
import { Fragment, useEffect } from 'react';


export default function ArticleList(){
    const {articlestore} = useStore();
    const {groupArticles} = articlestore

    return(
        <>
            {groupArticles().map(([group, articles]) => (
                <Fragment key={group}>
                    <Header sub color='black'>
                        {group}
                    </Header>
                    <Segment raised>
                        <Item.Group divided>
                            {articles.map((article) => (
                                <ArticleItems key={article.artID} article={article} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>
    )
}