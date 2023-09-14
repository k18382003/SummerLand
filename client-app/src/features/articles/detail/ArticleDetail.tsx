import React, { useEffect } from 'react'
import { Button, ButtonGroup, Divider, Header, Icon, Item, ItemContent, Label, List, Popup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComp from '../../../app/layout/Loading';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ArticleComment from './ArticleComment';
import DeleteArticleMsg from '../modals/deleteArticleMsg';



export default observer(function ArticlesDetail() {
    const { modalstore } = useStore();
    const { articlestore, accountstore } = useStore();
    const { selectedarticle, LoadArticle, loadinginitial, UpdateFav, loading } = articlestore;
    const navigaete = useNavigate();

    const { id } = useParams();

    const handleContentLoaded = (content: string) => {
        var elems = document.getElementById("textContent");
        if (elems)
            elems!.innerHTML = content;
    };

    async function handleUpdFav(artID: string) {
        await UpdateFav();
        navigaete(`/articles/${artID}`);
    }

    useEffect(() => {
        if (id) LoadArticle(id);
    }, [id, LoadArticle])

    // set the element innerHTML after the DOM is mounted
    useEffect(() => {
        if (selectedarticle) {
            handleContentLoaded(selectedarticle.content);
        }
    }, [selectedarticle]); // The use Effect will be only fired if the dependency is changed


    if (!selectedarticle || loadinginitial) return <LoadingComp inverted={true} message={'Loading article...'} />

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
                            <Button loading={loading} icon onClick={() => handleUpdFav(selectedarticle.artID)}>
                                {selectedarticle.myFav && !loading ?
                                    <Icon name='heart' color='red' />
                                    :
                                    <Icon name='heart' />
                                }
                            </Button>
                            {selectedarticle.favoriteBy && selectedarticle.favoriteBy.length > 0 &&
                                <Popup
                                    className={selectedarticle.favoriteBy && selectedarticle.favoriteBy.length > 2 ? 'favList' : ''}
                                    trigger={<Label basic pointing='left'>{selectedarticle.favoriteBy?.length}</Label>}
                                    flowing
                                    hoverable
                                    size='large'
                                >
                                    <List divided>
                                        {selectedarticle.favoriteBy?.map((profile) => (
                                            <List.Item key={profile.userName}>
                                                <Label as='a' image horizontal>
                                                    <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                                    {profile.userName}
                                                </Label>
                                            </List.Item>
                                        ))}
                                    </List>
                                </Popup>
                            }
                            <Button floated='right' as={Link} to="/articles" color='black' content='Back to List'></Button>
                            {accountstore.currentUser?.userName == selectedarticle.authorName &&
                                <ButtonGroup floated='right'>
                                    <Button
                                        icon="delete"
                                        name={selectedarticle.artID}
                                        onClick={() => modalstore.openModal(<DeleteArticleMsg artID={selectedarticle.artID} />, "small")}
                                        floated='right'
                                        color='red' >
                                    </Button>
                                    <Button as={Link}
                                        to={`/manage/${selectedarticle.artID}`}
                                        floated='right'
                                        color='grey'
                                        icon='edit'>
                                    </Button>
                                </ButtonGroup>
                            }
                        </Item.Extra>
                    </ItemContent>
                </Item.Group>
            </Segment>
            <ArticleComment artId={selectedarticle.artID} />
        </>
    )

})

