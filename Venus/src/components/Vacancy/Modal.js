import React from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Axios from 'axios';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Vacancy Details</DialogTitle>
        <DialogContent>
          
          <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Position"
                                        id="position"
                                        
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        // inputProps={{
                                        //     value: state.position,
                                        //     onChange: handleChange("position")
                                        //   }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Number of Position"
                                        id="numOfPosition"
                                        
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        // inputProps={{
                                        //     value: state.numOfPosition,
                                        //     onChange: handleChange("numOfPosition")
                                        //   }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Minimum Exp. Required"
                                        id="experience"
                                        
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        // inputProps={{
                                        //     value: state.experience,
                                        //     onChange: handleChange("experience")
                                        //   }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>
                                    <FormControl fullWidth required margin="normal">
                                        <InputLabel htmlFor="">Expected Date of Joining</InputLabel>
                                        <Select 
                                            id ="expDOJ" 
                                            // value={state.expDOJ} 
                                            // onChange={handleChange("expDOJ")}
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
                                            // value: state.jobDescription,
                                            // onChange: handleChange("jobDescription")
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


