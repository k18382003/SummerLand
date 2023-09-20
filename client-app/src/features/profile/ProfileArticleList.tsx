import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Icon, List, Segment, Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Profile } from "../../app/models/profile";

interface Props {
    profile: Profile
}

export default observer(function ProfileArticleList({ profile }: Props) {
    const { profilestore } = useStore();

    useEffect(() => {
        profilestore.ListArticles(profile.userName)
    }, [profilestore.ListArticles])

    return (
        <Tab.Pane loading={profilestore.lstArticlesLoading}>
            <List size='large'>
                {profilestore.lstArticles.length > 0 &&
                    profilestore.lstArticles.map((article) => {
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
    )
})