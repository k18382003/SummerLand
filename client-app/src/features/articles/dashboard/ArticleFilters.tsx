import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ArtilcFilters(){
    return (
        <>
            <Menu vertical size="large" style={{width : '100%', marginTop: 25}}>
                <Header icon='filter' attached content='Filters'></Header>
                <Menu.Menu position='right'>
                    <div className='ui right aligned category search item'>
                    <div className='ui transparent icon input'>
                        <input
                        className='prompt'
                        type='text'
                        placeholder='Search by topics or titles...'
                        />
                        <i className='search link icon' />
                    </div>
                    <div className='results' />
                    </div>
                </Menu.Menu>
                <Menu.Item content='All Articles' />
                <Menu.Item content="My articles" />
                <Menu.Item content="Favorite articles" />
            </Menu>
            <Header />
            <Calendar locale="en-GB"/>
        </>
    )
}