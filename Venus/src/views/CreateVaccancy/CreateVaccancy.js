import React, { useState, useEffect } from 'react'



// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography"

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';
import ApplicantList from 'components/ApplicantsList/ApplicantsList';
import VacancyComponent from 'components/Vacancy/Vacancy';

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
export default function CreateVaccancy() {
    const [state, setState] = useState({
        position: "",
        numOfPosition: "",
        experience: "",
        expDOJ: "",
        jobDescription: "",
        shortlistData: [],
        numOfSelectedCandidates: ""
    })
    const [data, setData] = useState([])
    const [openCandidateList, setOpenCandidateList] = useState(false)
    const [vacancy, setVacancy] = useState(false)
    const [onSelection, setOnSelection] = useState(false)
    const [open, setOpen] = useState(false);

    const handleChange = (input) => ({ target: { value } }) => {
        setState({
            ...state,
            [input]: value
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCandidateList = () => {
        setOpenCandidateList(false);
    };
    const handleShortlistedData = (selectedData) => {
        setState({ ...state, shortlistData: selectedData, numOfSelectedCandidates: data.length })
    }
    const handleSubmitShortlisted = () => {

        if (state.shortlistData) {
            setOnSelection(true)
            handleCandidateList()

        } else {
            console.log("not  selected")
            alert("No Candidates Selected")
        }
    }
    const handleSubmit = async () => {
        setData([...data, state])
        setVacancy(true)
        setOpen(false)
        
        return await axios
            .post(`http://localhost:5000/jobOpenings`, state)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const classes = useStyles();


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <label htmlFor="upload-button">
                    <Button color="primary" onClick={handleClickOpen}>
                        <AddIcon /> Create Openings
                    </Button>
                </label>
            </GridItem>

            {/* Dialog for position openings */}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter Vacancy Details</DialogTitle>
                <DialogContent>

                    <GridItem xs={12} sm={12} md={12}>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Position"
                                    id="position"

                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: state.position,
                                        onChange: handleChange("position"),

                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Number of Position"
                                    id="numOfPosition"

                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: state.numOfPosition,
                                        onChange: handleChange("numOfPosition"),

                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Minimum Exp. Required"
                                    id="experience"

                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: state.experience,
                                        onChange: handleChange("experience")
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <FormControl fullWidth required margin="normal">
                                    <InputLabel htmlFor="">Expected Date of Joining</InputLabel>
                                    <Select
                                        id="expDOJ"
                                        value={state.expDOJ}
                                        onChange={handleChange("expDOJ")}
                                    >
                                        <MenuItem value={"Immediate"}>Immediate</MenuItem>
                                        <MenuItem value={"Within 15 days"}>Within 15 days</MenuItem>
                                        <MenuItem value={"Within 30 days"}>Within 30 days</MenuItem>
                                        <MenuItem value={"Within 2 months"}>Within 2 months</MenuItem>
                                    </Select>
                                </FormControl>
                            </GridItem>
                        </GridContainer>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <InputLabel style={{ color: "#AAAAAA", marginTop: "25px" }}>Job Description</InputLabel>
                                <CustomInput
                                    labelText="Enter job description here"
                                    id="jobDescription"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        multiline: true,
                                        rows: 5,
                                        value: state.jobDescription,
                                        onChange: handleChange("jobDescription")
                                    }}
                                />
                            </GridItem>
                        </GridContainer>

                        <CardFooter>
                            <Button color="primary" onClick={() => setOpenCandidateList(true)}>{
                                onSelection
                                    ? `${state.shortlistData.length} Candidates Shortlisted`
                                    : `Click here to Shortlist Candidates`
                            }</Button>
                        </CardFooter>
                    </GridItem>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for shortlisting candidates */}

            <Dialog
                open={openCandidateList}
                onClose={handleCandidateList}
                aria-labelledby="form-dialog-title"
                maxWidth={"lg"}
            >
                <DialogTitle id="form-dialog-title">Select Candidates</DialogTitle>
                <DialogContent>
                    <ApplicantList url={"http://localhost:5000/getProfile"} params="" data={handleShortlistedData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCandidateList} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitShortlisted} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            {vacancy
                ? (<GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h2" align="center">
                       Successfull!
                    </Typography>
                    <Typography component="p" align="center" style={{ marginTop: 40 }}>
                        Please check the List of Openings.
                    </Typography>
                </GridItem>)
                : ""}

        </GridContainer>
    )
}
