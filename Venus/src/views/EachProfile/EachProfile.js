import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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

export default function EachProfile(props) {
    const classes = useStyles();
    const { data } = props
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={4}>
                                    <CustomInput
                                        labelText="First Name"
                                        id="firstName"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[0]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={6} sm={6} md={4}>
                                    <CustomInput
                                        labelText="Last Name"
                                        id="lastName"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[1]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <CustomInput
                                        labelText="Email address"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[2]
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={4}>
                                    <CustomInput
                                        labelText="Gender"
                                        id="gender"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[3]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <CustomInput
                                        labelText="Date of Birth"
                                        id="dob"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[4]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <CustomInput
                                        labelText="City"
                                        id="city"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[5]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Contact no."
                                        id="phone"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[6]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Qualification"
                                        id="qualification"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[7]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Specialization"
                                        id="specialization"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[8]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Institute"
                                        id="institute"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[9]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="passingYear"
                                        id="passingYear"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[10]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="type"
                                        id="type"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[11]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Designation"
                                        id="designation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[12]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Organization"
                                        id="organization"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[13]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="workExpFrom"
                                        id="workExpFrom"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[14]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="workExpFrom"
                                        id="workExpFrom"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[14]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="workExpTill"
                                        id="workExpTill"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[15]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="noticePeriod"
                                        id="noticePeriod"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[16]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="currentSalary"
                                        id="currentSalary"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[17]
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Status"
                                        id="status"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: data[18]
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                        <CardFooter>
                            <Button color="primary">Update Profile</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card >
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Verify Details</h4>
                        </CardHeader>
                        <CardBody >
                            <GridItem xs={12} sm={12} md={12}>
                                <FormControl fullWidth required margin="normal">
                                    <InputLabel htmlFor="">Status</InputLabel>
                                    <Select
                                        id="status"
                                    >
                                        <MenuItem value={"Interested"}>Interested</MenuItem>
                                        <MenuItem value={"Not Interested"}>Not Interested</MenuItem>
                                        <MenuItem value={"Call Back"}>Call Back</MenuItem>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Enter the details here"
                                    id="Caller Notes"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        multiline: true,
                                        rows: 5
                                    }}
                                />
                            </GridItem>
                            <Button color="primary" round block>
                                Submit
                            </Button>
                            <GridItem xs={12} sm={12} md={12} style={{background: 'rgb(220,220,220)', borderRadius: 10}}>
                                {/* <OutlinedTimeline /> */}
                                <Timeline2/>
                            </GridItem>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
