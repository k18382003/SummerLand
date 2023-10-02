import { observer } from "mobx-react-lite";
import { useState } from "react";
// import Calendar from "react-calendar";
import { Button, Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ArtilcFilters() {
    const { articlestore: { preditcate, setPredicate } } = useStore();
    const [searchwords, setSearchwords] = useState("");

    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached content='Filters'></Header>
                <Menu.Menu position='right'>
                    <div className='ui right aligned category search item'>
                        <div className='ui transparent icon input'>
                            <input
                                className='prompt'
                                type='text'
                                value={ searchwords }
                                onChange={(e) => setSearchwords(e.target.value)}
                                style={{ padding: '5%', lineHeight: '24px' }}
                                placeholder='Search by topics, titles or authors...'
                                onKeyDown={(e) => {
                                    if (e.key.toLowerCase() === "enter")
                                        setPredicate('searchkeywords', searchwords)
                                }}
                            />
                            <Button
                                className="tertiary"
                                basic
                                icon='search'
                                onClick={() => setPredicate('searchkeywords', searchwords)}
                            />
                        </div>
                    </div>
                </Menu.Menu>
                <Menu.Item
                    content='All Articles'
                    active={preditcate.has('all')}
                    onClick={() => setPredicate('all', true)}
                />
                <Menu.Item
                    content="My articles"
                    active={preditcate.has('myarticles')}
                    onClick={() => setPredicate('myarticles', true)}
                />
                <Menu.Item
                    content="Favorite articles"
                    active={preditcate.has('myfavorites')}
                    onClick={() => setPredicate('myfavorites', true)}
                />
                <Menu.Item
                    content="Top 5 popular articles"
                    active={preditcate.has('topfive')}
                    onClick={() => setPredicate('topfive', true)}
                />
            </Menu>
            {/* <Header /> */}
            {/* <Calendar locale="en-GB" /> */}
        </>
    )
})