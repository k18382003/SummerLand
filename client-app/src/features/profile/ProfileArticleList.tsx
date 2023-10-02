import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Icon, Input, List, Menu, Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Profile } from "../../app/models/profile";
import { SyntheticEvent } from 'react';

interface Props {
    profile: Profile
}

export default observer(function ProfileArticleList({ profile }: Props) {
    const { profilestore: { ListArticles, lstArticlesLoading, lstArticles } } = useStore();
    const [searchwords, setSearchwords] = useState("");
    const [templist, setTemplist] = useState(lstArticles);

    useEffect(() => {
        ListArticles(profile.userName)
    }, [profile.userName, ListArticles])

    useEffect(() => {
        setTemplist(lstArticles)
    }, [lstArticles])

    const handleTopFive = () => {
        setSearchwords("");
        setTemplist(lstArticles.sort((a, b) => {
            return b.favoriteBy?.length! - a.favoriteBy?.length!;
        }));
    }

    const handleDate = () => {
        setSearchwords("");
        setTemplist(lstArticles.sort((a, b) => {
            return Date.parse(b.createDate) - Date.parse(a.createDate);
        }));
    }

    const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        setSearchwords(e.currentTarget.value);
        setTemplist(lstArticles.filter(x => x.title.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            || x.category.toLowerCase().includes(e.currentTarget.value.toLowerCase())));
    }


    return (
        <>
            <Menu stackable>
                <Menu.Item
                    icon='filter'
                    content="Order by date"
                    onClick={() => handleDate()}
                />
                <Menu.Item
                    icon='filter'
                    content="Oder by popularity"
                    onClick={() => handleTopFive()}
                />
                <Menu.Menu >
                    <Menu.Item>
                        <Input
                            transparent
                            type='text'
                            value={searchwords}
                            onChange={(e) => handleChange(e)}
                        placeholder='Type to search...'
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Tab.Pane attached loading={lstArticlesLoading}>
                <List size='large'>
                    {lstArticles.length > 0 &&
                        (templist).map((article) => {
                            return (
                                <List.Item key={article.artID} as={Link} to={`/article/${article.artID}`}>
                                    <Icon name='newspaper' />
                                    <List.Content>
                                        <List.Header>{article.title}</List.Header>
                                        <List.Description>
                                            {article.category}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </Tab.Pane>
        </>
    )
})