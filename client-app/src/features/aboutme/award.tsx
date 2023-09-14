import { Divider, Grid, GridColumn, GridRow, Header, Image, List, ListItem, Segment } from "semantic-ui-react";

export default function Award(){
    return(
        <>
            <Segment raised >
                <Header as='h2'>Award</Header>
                <Divider />
                <Grid className="ui gird">
                    <GridRow className='computer tablet only row' columns={2}>
                        <GridColumn width={10} verticalAlign="middle" style={{left:20}}>
                            <Header as='h3'>Best Developer </Header>
                            <List bulleted>
                                <List.Item>
                                    Company : Digihua Intelligent Systems Co., Ltd 
                                </List.Item>
                                <List.Item>
                                    Department : Product Development Department 
                                </List.Item>
                                <ListItem>
                                    Position: Backend Developer 
                                </ListItem>
                                <List.Item>
                                    Date : Feb. 9, 2022
                                </List.Item>
                            </List>
                        </GridColumn>
                        <GridColumn width={6}>
                            <Image src={require('../../images/AwardCombine.png')} size='large' />
                        </GridColumn>
                    </GridRow>
                    <GridRow className='mobile only row' columns={1}>
                        <GridColumn verticalAlign="middle" style={{left:20}}>
                            <Header as='h3'>Best Developer </Header>
                            <List bulleted>
                                <List.Item>
                                    Company : Digihua Intelligent Systems Co., Ltd 
                                </List.Item>
                                <List.Item>
                                    Department : Product Development Department 
                                </List.Item>
                                <ListItem>
                                    Position: Backend Developer 
                                </ListItem>
                                <List.Item>
                                    Date : Feb. 9, 2022
                                </List.Item>
                            </List>
                        </GridColumn>
                        <GridColumn>
                            <Image src={require('../../images/AwardCombine.png')} size='large' />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Segment>
        </>
    )
}