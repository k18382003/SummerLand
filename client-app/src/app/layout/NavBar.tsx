import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Dropdown, Icon, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import Login from '../../features/user/login';
import Register from '../../features/user/register';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import { router } from '../route/Routes';


export default observer(function NavBar() {
    const [isOpen, setIsopen] = useState(false);
    const { accountstore: { isLoggedIn, logout, currentUser }, modalstore } = useStore();

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    return (
        <>
            <div className='ui grid'>
                <div className='computer tablet only row'>
                    <div className='column'>
                        <div className="ui fixed inverted menu">
                            <div className="ui container">
                                <a href="/" className="brand header item">
                                    SummerTechLand
                                </a>
                                <a href="/about-me" className="item">
                                    About Summer
                                </a>
                                {/* Only for development mode */}
                                {/* <a href="/error" className="item">
                                    Error test
                                </a> */}
                                {
                                    isLoggedIn ? (
                                        <>
                                            <a href="/article" className="ui simple dropdown item">
                                                Articles
                                            </a>
                                            <a href="/writearticle" className="item">
                                                Write Article
                                            </a>
                                            <div className="right menu">
                                                <Image src={currentUser?.image || require('../../images/user.png')} avatar style={{ top: 10, right: 10 }} />
                                                <Dropdown item text={currentUser?.displayName} >
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => router.navigate(`/profile/${currentUser?.userName}`)}>My profile</Dropdown.Item>
                                                        <Dropdown.Item onClick={logout} >Log out</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="ui medium buttons right menu">
                                            <button className="ui secondary button" onClick={() => modalstore.openModal(<Register />, "mini")}>Register</button>
                                            <div className="or" />
                                            <button className="ui secondary button" onClick={() => modalstore.openModal(<Login />, "mini")}>Log In</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobile only row">
                    <div className="column">
                        <div className={`menu_header ${isOpen == true ? 'menu_header_hide' : ''}`}>
                            <button type="button" className="toggle menu_btn" id="toggle" onClick={ToggleSidebar} >
                                <span className={`${isOpen == true ? 'toggle' : ''}`}></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sidebar ${isOpen == true ? 'sidebarshow' : ''}`} id="sidebar" >
                <a style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={ToggleSidebar} ><Icon inverted color='black' link name='close' size='big' /></a>
                <ul>
                    <li>
                        <a href="/" className="brand header item">
                            SummerTechLand
                        </a>
                    </li>
                    <li>
                        <a href="/about-me" className="item">
                            About Me
                        </a>
                    </li>
                    <li>
                        {/* Only for development mode */}
                        {/* <a href="/error" className="item">
                                    Error test
                                </a> */}
                    </li>
                    {
                        isLoggedIn ?
                            (
                                <>
                                    <li>
                                        <a href="/article" className="ui simple dropdown item">
                                            Articles
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/writearticle" className="item">
                                            Write Article
                                        </a>
                                    </li>
                                    <Segment>
                                        <Image src={currentUser?.image || require('../../images/user.png')} avatar floated='left' />
                                        <Dropdown item text={currentUser?.displayName} fluid style={{ fontWeight: 'bold' }}>
                                            <Dropdown.Menu style={{ right: 0 }}>
                                                <Dropdown.Item as={Link} to={`/profile/${currentUser?.userName}`}>My profile</Dropdown.Item>
                                                <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Segment>
                                </>
                            )
                            :
                            (
                                <div className="ui large buttons right menu">
                                    <button className="ui secondary button" onClick={() => modalstore.openModal(<Register />, "mini")}>Register</button>
                                    <div className="or" />
                                    <button className="ui secondary button" onClick={() => modalstore.openModal(<Login />, "mini")}>Log In</button>
                                </div>
                            )
                    }
                </ul>
            </div>
            <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
        </>
    )
})
