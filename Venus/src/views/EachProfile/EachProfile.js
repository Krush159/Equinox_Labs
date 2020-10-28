import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import OutlinedTimeline from "components/Timeline/Timeline";
import Timeline2 from "components/Timeline/Timeline2";
import Axios from "axios";
import { connect } from "react-redux";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);

function EachProfile(props) {
    const classes = useStyles();
    const { data } = props
    console.log(props)
    const [newData, setnewData] = useState([])
    const [updateData, setUpdateData] = useState({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        dob: data.dob,
        city: data.city,
        phone: data.phone,
        qualification: data.qualification,
        specialization: data.specialization,
        institute: data.institute,
        passingYear: data.passingYear,
        type: data.type,
        designation: data.designation,
        organization: data.organization,
        workExpFrom: data.workExpFrom,
        workExpTill: data.workExpTill,
        noticePeriod: data.noticePeriod,
        currentSalary: data.currentSalary,
    })
    const handleChange = (input) => ({ target: { value } }) => {
        setUpdateData({
            ...updateData,
            [input]: value
        })
    }
    const [callerObject, setCallerObject] = useState({
        status: "",
        comment: "",
        caller: props.currentUser.firstName + " " + props.currentUser.lastName + " " + "(" + props.currentUser.role + ")",
        timeStamp: new Date()
    })
    // useEffect(() => {
    //     Axios.get('http://localhost:5000/getProfile/' + props.data._id)
    //         .then(res => newData(res.data))
    //         .catch(err => console.log(err))
    // }, [callerObject, updateData])

    const handleStatus = (input) => ({ target: { value } }) => {
        setCallerObject({
            ...callerObject,
            [input]: value
        })

    }

    const handleUpdate = async () => {

        console.log("updatedData", updateData)
        await Axios.put("http://localhost:5000/getProfile/updateProfile/" + data._id, updateData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const handleCaller = async () => {
        await Axios.put("http://localhost:5000/getProfile/callerUpdate/" + data._id, callerObject)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card profile>
                        {/* <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar> */}
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.firstName}
                                        onChange={handleChange('firstName')}
                                        label="First Name"
                                        id="firstName"

                                    />
                                </GridItem>
                                <GridItem xs={6} sm={6} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.lastName}
                                        onChange={handleChange('lastName')}
                                        label="Last Name"
                                        id="lastName"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.email}
                                        onChange={handleChange('email')}
                                        label="Email address"
                                        id="email"

                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={4}>
                                    <TextField
                                        id="gender"
                                        label="Gender"
                                        fullWidth
                                        margin="normal"
                                        select
                                        value={updateData.gender}
                                        onChange={handleChange("gender")}
                                    >
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>

                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.dob}
                                        onChange={handleChange('dob')}
                                        label="Date of Birth"
                                        id="date"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.city}
                                        onChange={handleChange('city')}
                                        label="City"
                                        id="city"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.phone}
                                        onChange={handleChange('phone')}
                                        label="Contact no."
                                        id="phone"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.qualification}
                                        onChange={handleChange('qualification')}
                                        label="Qualification"
                                        id="qualification"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.specialization}
                                        onChange={handleChange('specialization')}
                                        label="Specialization"
                                        id="specialization"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.institute}
                                        onChange={handleChange('institute')}
                                        label="Institute"
                                        id="institute"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.passingYear}
                                        onChange={handleChange('passingYear')}
                                        label="passingYear"
                                        id="passingYear"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        id="type"
                                        label="Type"
                                        fullWidth
                                        select
                                        margin="normal"
                                        value={updateData.type}
                                        onChange={handleChange("type")}
                                    >
                                        <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
                                        <MenuItem value={"Part-Time"}>Part-Time</MenuItem>
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.designation}
                                        onChange={handleChange('designation')}
                                        label="Designation"
                                        id="designation"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.organization}
                                        onChange={handleChange('organization')}
                                        label="Organization"
                                        id="organization"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.workExpFrom}
                                        onChange={handleChange('workExpFrom')}
                                        label="workExpFrom"
                                        id="workExpFrom"

                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.workExpTill}
                                        onChange={handleChange('workExpTill')}
                                        label="workExpTill"
                                        id="workExpTill"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.noticePeriod}
                                        onChange={handleChange('noticePeriod')}
                                        label="noticePeriod"
                                        id="noticePeriod"

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                        autoComplete
                                        fullWidth={true}
                                        margin="normal"
                                        value={updateData.currentSalary}
                                        onChange={handleChange('currentSalary')}
                                        label="currentSalary"
                                        id="currentSalary"

                                    />
                                </GridItem>
                                <GridItem xs={12}>
                                    <Button color="primary" onClick={handleUpdate}>
                                        Update Profile
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card >
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Verify Details</h4>
                        </CardHeader>
                        <CardBody >
                            <GridItem xs={12} sm={12} md={12}>
                                <TextField
                                    id="status"
                                    label="status"
                                    value={callerObject.status}
                                    fullWidth
                                    margin="normal"
                                    select
                                    onChange={handleStatus("status")}
                                >
                                    <MenuItem value={"Call Back"}>Call Back</MenuItem>
                                    <MenuItem value={"Ringing"}>Ringing</MenuItem>
                                    <MenuItem value={"Not Reachable"}>Not Reachable</MenuItem>
                                    <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
                                    <MenuItem value={"Not Interested"}>Not Interested</MenuItem>
                                </TextField>

                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <TextField
                                    autoComplete
                                    fullWidth={true}
                                    margin="normal"
                                    value={callerObject.comment}
                                    onChange={handleStatus("comment")}
                                    label="Caller Notes"
                                    id="comment"
                                    inputProps={{
                                        multiline: true,
                                        rows: 5,
                                    }}
                                />
                            </GridItem>
                            <Button color="primary" round block onClick={handleCaller}>
                                Submit
                            </Button>
                            <GridItem xs={12} sm={12} md={12} style={{ background: 'rgb(220,220,220)', borderRadius: 10 }}>
                                <Timeline2 dataID={data._id} />
                            </GridItem>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.loginReducer.currentUser
    }
}
export default connect(mapStateToProps)(EachProfile)