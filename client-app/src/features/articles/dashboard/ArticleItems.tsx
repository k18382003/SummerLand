import { Article } from '../../../app/models/article';
import { Button, Image, Item, Label, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface Props {
    article: Article;
}

export default observer(function ArticleItems({ article }: Props) {
    return (
        <Item key={article.artID}>
            <Item.Content>
                <Item.Header as='a'>{article.title}</Item.Header>
                <Item.Meta><span className='date'>{moment(article.createDate).format("MMM DD YYYY")}</span>
                </Item.Meta>
                <Item.Extra>
                    <Popup
                        content="Click to check author's profile"
                        key={article.artID}
                        header={article.authorName[0].toUpperCase().concat(article.authorName.slice(1))}
                        trigger={<a href={`/profile/${article.authorName}`}><img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={article.authorPhoto || 'https://react.semantic-ui.com/images/avatar/large/joe.jpg'} /></a>}
                        position='right center'
                        size='mini'
                        inverted
                    />
                    <br />
                    <Label>{article.category}</Label>
                    <Button as={Link} to={`/article/${article.artID}`} floated='right' content='View' color='black' size='tiny'></Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
})