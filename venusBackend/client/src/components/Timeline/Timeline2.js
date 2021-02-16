import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/core/styles";


const styles ={
    timelineCard: {
        
    }
}
const useStyles = makeStyles(styles);


export default function Timeline2(props) {
    const [data, setData] = useState([])
    const classes = useStyles();
    // useEffect(() => {
    async function fetchData() {
        await Axios.get('http://localhost:5000/getProfile/candidates/' + props.dataID)
            .then(res => setData([...res.data.callerUpdate]))
            .catch(err => console.log(err))
    }
    fetchData()
    // }, [data])
    console.log(data)
    return (
        data ? (
            <VerticalTimeline layout={"1-column-left"} className={classes.timelineCard}>
                {data.slice(0).reverse().map(item =>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // contentStyle={{ background: 'rgb(230,230,250)', color: 'black',  }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(218,112,214)' }}
                        date={item.timeStamp}
                        iconStyle={{ background: 'rgb(218,112,214)', color: 'rgb(139,0,139)' }}
                        style={{ padding: '2px 0px', margin: '1px', borderRadius: '10px'}}
                    >
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                                <b>{item.caller}</b>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} style={{textAlign:"right"}}>
                                <Chip label={item.status} />
                            </GridItem>
                        </GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <p style={{fontStyle:"italic"}}><small>{item.comment}</small></p>
                            </GridItem>
                    </VerticalTimelineElement>
                )}
            </VerticalTimeline>)
            : <><h6>No updataion yet</h6></>)
}
