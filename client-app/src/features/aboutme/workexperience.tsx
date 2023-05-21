import { Checkbox, Divider, Header, List, Segment } from "semantic-ui-react";
import React, {CSSProperties, useState}  from 'react';

interface MyCustomCSS extends CSSProperties  {
    '--accent-color': string;
  }

export default function Workexperience()
{
    const [listOrder, setOrder] = useState('open');

    const toggleDescription = () => {
        listOrder === 'open' ? setOrder('close') : setOrder('open');
    }

    return(
        <>
            <Segment raised>
                <Header as='h2'>Work Experience</Header>
                <Divider />
                <Checkbox style={{float:"right"}} label='Collapse All' checked={listOrder === "open"} onChange={() => toggleDescription()} toggle></Checkbox>
                <List bulleted className="timeline_ul">
                    <List.Item className="timeline_li" style = {{ '--accent-color':'#41516C'} as MyCustomCSS}> 
                        <div className="date">Dec 2020 - Mar 2023</div>
                        <div className="title jobtitle">
                            <a className="descr_link" onClick={() => {setOrder("1");}}>Backend Developer</a>
                        </div> 
                        { listOrder === ("1" || "open") && 
                            <>
                                <div className="title">Digihua Intelligent Systems Co., Ltd</div>
                                <div className="add" >Taichung, Taiwan</div>
                                <div className="descr">
                                    <List>
                                        <List.Item>Communicate with SA (Systems Analyst) and SD (System Designer) for the new function requirements</List.Item>
                                        <List.Item>Develop, modify and maintain current software product</List.Item>
                                        <List.Item>Provide tech support to the front line consultant if they report any issues of the product</List.Item>
                                    </List>
                                </div>                    
                            </>
                        }                        
                    </List.Item>
                    <List.Item className="timeline_li" style = {{ '--accent-color':'#FBCA3E'} as MyCustomCSS}> 
                        <div className="date">October 2018 to May 2020</div>
                        <div className="title jobtitle"><a className="descr_link" onClick={() => {setOrder("2");}}>Registra</a></div> 
                        {listOrder === ("2" || "open") &&
                            <>
                                <div className="title">ISS Language and Career College of BC Location</div>
                                <div className="add" >Vancouver, BC</div>
                                <div className="descr">
                                    <List>
                                        <List.Item>Introduce the programs to the potential students</List.Item>
                                        <List.Item>Helping students to arrange their courses</List.Item>
                                        <List.Item>Handling payments</List.Item>
                                        <List.Item>Confirms and produces a range of student 
                                            documents required by students, supervisors, and 
                                            teachers(e.g. verification of enrolment letters, 
                                            official transcripts, confirms enrolment and 
                                            attendance, etc)</List.Item>
                                        <List.Item>Develop marketing plans to attract more Chinese or Taiwanese students</List.Item>
                                    </List>
                                </div>
                            </>
                        }
                    </List.Item>
                    <List.Item className="timeline_li" style = {{ '--accent-color':'#E24A68'} as MyCustomCSS}> 
                    <div className="date">May 2016 to March 2018</div>
                        <div className="title jobtitle"><a className="descr_link" onClick={() => {setOrder("3");}}>English Teacher</a></div> 
                        {listOrder === ("3" || "open") &&
                            <>
                                <div className="title">Elite Institute (Language center)</div>
                                <div className="add" >Chiayi, Taiwan</div>
                                <div className="descr">
                                    <List>
                                        <List.Item>Create daily lesson plans for 4-5 classes</List.Item>
                                        <List.Item>Prepare teaching materials, props, and tests</List.Item>
                                        <List.Item>Promote special event activities to parents</List.Item>
                                    </List>
                                </div>
                            </>
                        }
                    </List.Item>
                    <List.Item className="timeline_li" style = {{ '--accent-color':'#1B5F8C'} as MyCustomCSS}> 
                    <div className="date">September 2015 to May 2016</div>
                        <div className="title jobtitle"><a className="descr_link" onClick={() => {setOrder("4");}}>Project Manager Assistant</a></div> 
                        {listOrder === ("4" || "open")&&
                            <>
                                <div className="title">Feng Tay Group (Manufactory of NIKE, Inc)</div>
                                <div className="add" >Yunlin, Taiwan</div>
                                <div className="descr">
                                    <List>
                                        <List.Item>Established work priorities, and ensure deadlines are met and procedures are followed</List.Item>
                                        <List.Item>Handled multiple operating budgets (Usually $9-13 per pair of shoes)</List.Item>
                                        <List.Item>Coordinate with technicians and related staff</List.Item>
                                    </List>
                                </div>
                            </>
                        }
                    </List.Item>
                    <List.Item className="timeline_li" style = {{ '--accent-color':'#4CADAD'} as MyCustomCSS}> 
                    <div className="date">January 2013 to June 2015</div>
                        <div className="title jobtitle"><a className="descr_link" onClick={() => {setOrder("5");}}>Woking Holiday</a></div> 
                        {listOrder === ("5" || "open") &&
                            <>
                                <div className="add" >Western Australia</div>
                                <div className="descr">
                                    <List>
                                        <List.Item>Toy Sales at Perth Royal Show</List.Item>
                                        <List.Item>Housekeeping in Grand Mercure Basildene Manor(AccorHotels Group)</List.Item>
                                        <List.Item>Staff cook in Gnarabar Bistro</List.Item>
                                    </List>
                                </div>
                            </>
                        }
                    </List.Item>
                    <List.Item className="timeline_li" style = {{ '--accent-color':'#455d'} as MyCustomCSS}> 
                    <div className="date">April 2012 to December 2012</div>
                        <div className="title jobtitle"><a className="descr_link" onClick={() => {setOrder("6");}}>Sales Representative</a></div> 
                        {listOrder === ("6" || "open") &&
                            <>
                                <div className="title">Wells English (Language center)</div>
                                <div className="add" >Chiayi, Taiwan</div>
                                <div className="descr">
                                    <List>
                                        <List.Item>Contact potential customers by phone (at least 100 calls per day)</List.Item>
                                        <List.Item>Sell products directly to individual customers (The best sale number:20,000 CAD per month)</List.Item>
                                        <List.Item>Dealt with complaints and arrange a refund</List.Item>
                                    </List>
                                </div>
                            </>
                        }
                    </List.Item>
                </List>
                <div className="credits">
                    <a target="_blank" href="https://www.freepik.com/free-vector/infographic-template-with-yearly-info_1252895.htm">inspired by</a>
                </div>
            </Segment>
        </>
    )
}