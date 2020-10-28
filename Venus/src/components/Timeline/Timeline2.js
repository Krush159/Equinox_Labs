import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Button from "components/CustomButtons/Button.js";

export default function Timeline2(props) {
    const [data, setData] = useState([])

    // useEffect(() => {
        async function fetchData(){
            await Axios.get('http://localhost:5000/getProfile/candidates/' + props.dataID)
            .then(res => setData([...res.data.callerUpdate]))
            .catch(err => console.log(err))
        }
        fetchData()
    // }, [data])

    return (
        data ? (
            <VerticalTimeline layout={"1-column-left"}>
                {data.map(item =>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // contentStyle={{ background: 'rgb(230,230,250)', color: 'black',  }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(218,112,214)' }}
                        date={item.timeStamp}
                        iconStyle={{ background: 'rgb(218,112,214)', color: 'rgb(139,0,139)', }}
                        style={{ padding: '2px 0px' }}

                    >
                        <Button color="primary" round outline className="vertical-timeline-element-title">{item.status}</Button>
                        <h6 className="vertical-timeline-element-subtitle">{item.comment}</h6>
                        <h6><small>{item.caller}</small></h6>
                    </VerticalTimelineElement>
                )}
            </VerticalTimeline>)


            : <></>)

    {/* <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2010 - 2011"
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

            >
                <h3 className="vertical-timeline-element-title">Art Director</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2008 - 2010"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

            >
                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                <p>
                    User Experience, Visual Design
    </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2006 - 2008"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

            >
                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    User Experience, Visual Design
    </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="April 2013"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}

            >
                <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                <p>
                    Strategy, Social Media
    </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="November 2012"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}

            >
                <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                <p>
                    Creative Direction, User Experience, Visual Design
    </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2002 - 2006"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}

            >
                <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                <p>
                    Creative Direction, Visual Design
    </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}

            /> */}
    // </VerticalTimeline>

}
