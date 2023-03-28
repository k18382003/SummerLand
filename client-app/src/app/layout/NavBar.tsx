import React from 'react';


interface Props{
    openForm: () => void;
}

export default function NavBar({openForm}:Props){
    return (
        <div className="ui fixed inverted menu">
            <div className="ui container">
                <a href="#" className="header item">
                    SummerLand
                </a>
                <a href="#" className="item">
                    About Me
                </a>
                <div className="ui simple dropdown item">
                    Articles <i className="dropdown icon" />
                    <div className="menu">
                    <a className="item" href="#">
                        Link Item
                    </a>
                    <a className="item" href="#">
                        Link Item
                    </a>
                    <div className="divider" />
                    <div className="header">Header Item</div>
                    <div className="item">
                        <i className="dropdown icon" />
                        Sub Menu
                        <div className="menu">
                        <a className="item" href="#">
                            Link Item
                        </a>
                        <a className="item" href="#">
                            Link Item
                        </a>
                        </div>
                    </div>
                        <a className="item" href="#">
                            Link Item
                        </a>
                    </div>
                </div>
                <a onClick={openForm} href="#" className="item">
                    Write Article
                </a>
                <div className="ui large buttons right menu">
                    <button className="ui secondary button">Register</button>
                    <div className="or" />
                    <button className="ui secondary button">Sign Up</button>
                </div>
            </div>
        </div>
    )
}
