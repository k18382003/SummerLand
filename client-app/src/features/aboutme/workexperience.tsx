import { Checkbox, Divider, Grid, Header, List, Segment } from "semantic-ui-react";
import { CSSProperties, useState } from 'react';

interface MyCustomCSS extends CSSProperties {
    '--accent-color': string;
}

export default function Workexperience() {
    const [listOrder, setOrder] = useState('close');
    const [close, setClose] = useState(true);
    const [individual, setIndividual] = useState(false);

    return (
        <>
            <Segment raised>
                <Checkbox style={{ float: "right" }} label='Collapse All' checked={close} onChange={() => { setClose(preState => !preState); setIndividual(false) }} toggle></Checkbox>
                <Header as='h2'>Work Experience</Header>
                <Divider />
                <br />
                <Grid textAlign="center" columns={3}>
                    <List bulleted className="timeline_ul">
                        <List.Item className="timeline_li" style={{ '--accent-color': '#41513A' } as MyCustomCSS}>
                            <div className="date">Dec 2023 - Present</div>
                            <div className="title jobtitle">
                                <a className="descr_link" onClick={() => { setOrder("0"); setIndividual(true); setClose(false) }}>Customer Service Representative</a>
                            </div>
                            {(() => {
                                if (listOrder == "0" && individual || (!individual && !close)) {
                                    return (
                                        <>
                                            <div className="title">Customer Service Representative - PT</div>
                                            <div className="add" >Vancouver BC, Canada</div>
                                            <div className="descr">
                                                <List>
                                                    <List.Item>Providing comprehensive customer service to test takers via email
                                                        and telephone. (approximately 30 emails, 20 phone calls per day)</List.Item>
                                                    <List.Item>Processing customer requests (i.e., registrations, transfers, and
                                                        cancellations) in a timely manner. (i.e., Response time within 24H)</List.Item>
                                                    <List.Item>Tracking customer requests and providing input for improving
                                                        customer service. (i.e., effectively clearly, and concisely with the
                                                        team for any escalated issues)</List.Item>
                                                </List>
                                            </div>
                                        </>
                                    )
                                }
                            })()}
                        </List.Item>
                        <List.Item className="timeline_li" style={{ '--accent-color': '#41516C' } as MyCustomCSS}>
                            <div className="date">Dec 2020 - Mar 2023</div>
                            <div className="title jobtitle">
                                <a className="descr_link" onClick={() => { setOrder("1"); setIndividual(true); setClose(false) }}>Backend Developer</a>
                            </div>
                            {(() => {
                                if (listOrder == "1" && individual || (!individual && !close)) {
                                    return (
                                        <>
                                            <div className="title">Digihua Intelligent Systems Co., Ltd</div>
                                            <div className="add" >Taichung, Taiwan</div>
                                            <div className="descr">
                                                <List>
                                                    <List.Item>Develop, modify, and maintain a current software product.</List.Item>
                                                    <List.Item>Effective team collaborator with strong communication and problem-solving abilities. (i.e., Daily collaboration with System Analyst and System Designer on new feature requirements,
                                                        resolving 3-5 issues or implementing 1 feature on average)</List.Item>
                                                    <List.Item>Offering technical assistance. (i.e., Assist front-line consultants
                                                        through phone calls if they report any issues with the product)</List.Item>
                                                    <List.Item>Attain the position of Intermediate Software Developer in just 6 months. And, Receive Best Developer Award on February 9, 2022</List.Item>
                                                </List>
                                            </div>
                                        </>
                                    )
                                }
                            })()}
                        </List.Item>
                        <List.Item className="timeline_li" style={{ '--accent-color': '#FBCA3E' } as MyCustomCSS}>
                            <div className="date">October 2018 to May 2020</div>
                            <div className="title jobtitle"><a className="descr_link" onClick={() => { setOrder("2"); setIndividual(true); setClose(false) }}>Registra</a>
                            </div>
                            {(() => {
                                if (listOrder == "2" && individual || !individual && !close) {
                                    return (
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
                                    )
                                }
                            })()}
                        </List.Item>
                        <List.Item className="timeline_li" style={{ '--accent-color': '#E24A68' } as MyCustomCSS}>
                            <div className="date">May 2016 to March 2018</div>
                            <div className="title jobtitle"><a className="descr_link" onClick={() => { setOrder("3"); setIndividual(true); setClose(false) }}>English Teacher</a></div>
                            {(() => {
                                if (listOrder == "3" && individual || (!individual && !close)) {
                                    return (
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
                                    )
                                }
                            })()}
                        </List.Item>
                        <List.Item className="timeline_li" style={{ '--accent-color': '#1B5F8C' } as MyCustomCSS}>
                            <div className="date">September 2015 to May 2016</div>
                            <div className="title jobtitle"><a className="descr_link" onClick={() => { setOrder("4"); setIndividual(true); setClose(false) }}>Project Manager Assistant</a></div>
                            {(() => {
                                if (listOrder == "4" && individual || (!individual && !close)) {
                                    return (
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
                                    )
                                }
                            })()}
                        </List.Item>
                        <List.Item className="timeline_li" style={{ '--accent-color': '#4CADAD' } as MyCustomCSS}>
                            <div className="date">January 2013 to June 2015</div>
                            <div className="title jobtitle"><a className="descr_link" onClick={() => { setOrder("5"); setIndividual(true); setClose(false) }}>Woking Holiday</a></div>
                            {(() => {
                                if (listOrder == "5" && individual || (!individual && !close)) {
                                    return (
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
                                    )
                                }
                            })()}
                        </List.Item>
                        <List.Item className="timeline_li" style={{ '--accent-color': '#455d' } as MyCustomCSS}>
                            <div className="date">April 2012 to December 2012</div>
                            <div className="title jobtitle"><a className="descr_link" onClick={() => { setOrder("6"); setIndividual(true); setClose(false) }}>Sales Representative</a></div>
                            {(() => {
                                if (listOrder == "6" && individual || !individual && !close) {
                                    return (
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
                                    )
                                }
                            })()}
                        </List.Item>
                    </List>
                </Grid>
                <div className="credits">
                    <a target="_blank" href="https://www.freepik.com/free-vector/infographic-template-with-yearly-info_1252895.htm">inspired by freepik</a>
                </div>
            </Segment>
        </>
    )
}