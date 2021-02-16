import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import purple from '@material-ui/core/colors/purple';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";

import scss from './register.module.scss';
import { userSignUpRequest } from 'redux/Authentication/Actions/RegisterAction'
import Success from 'components/Multi-Step-Form/Success';
// import logoImage from '../../../assets/images/portal-logo.png';


const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/)
const theme = createMuiTheme({
    palette: {
        primary: purple,
    },

});
const styles = {
    background: {
        background: theme.palette.secondary.main,
        width: '100%',
        height: '100%',
    },
    'primary-card': {
        background: theme.palette.primary.light,
    },
    number: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        },
        "& input[type=number]" : {
            "-moz-appearance": "textfield"
          }
      },
    input: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
      }

};
const useStyles = makeStyles(styles);

const Register = (props) => {

    // Flip container to column on mobile screens.
    const panelDirection = props.width === 'xs' ? 'column' : 'row';
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        phone: "",
        role: ""
    })
    const [stateError, setStateError] = useState({
        ...state
    })

    const [isError, setIsError] = useState(false)
    const isEmpty =
        state.firstName.length > 0 &&
        state.lastName.length > 0 &&
        state.emailId.length > 0 &&
        state.password.length > 0 &&
        state.phone.length > 0 &&
        state.role.length > 0;
    const handleChange = (input) => ({ target: { value } }) => {
        setState({
            ...state,
            [input]: value
        })
        // Handle errors
        const formErrors = { ...stateError }


        switch (input) {
            case "firstName":
                formErrors.firstName = value.length > 0 && value.length < 3
                    ? "Minimum 3 characaters required"
                    : ""
                break
            case "lastName":
                formErrors.lastName = value.length > 0 && value.length < 3
                    ? "Minimum 3 characaters required"
                    : ""
                break
            case "emailId":
                formErrors.emailId = emailRegex.test(value) ? "" : "Invalid email address"
                break
            case "password":
                formErrors.password = value.length > 0 && value.length < 6 ? "Minimum 6 characaters required" : ""
                break
            case "phone":
                formErrors.phone = phoneRegex.test(value)
                    ? ""
                    : "Please enter a valid phone number. i.e: xxxxxxxxxx"
                break
            case "role":
                formErrors.role = value === "" ? "Select any one role" : ""
                break
            default:
                break
        }
        console.log(formErrors)
        // set error hook
        Object.values(formErrors).forEach(error => {
                error.length > 0 ? setIsError(true) : setIsError(false)
            }
        )

        // set errors hook
        setStateError({
            ...formErrors
        })
    }
    const handleRegister = () => {
        props.userSignUpRequest(state)
            .then(setState({
                firstName: "",
                lastName: "",
                emailId: "",
                password: "",
                phone:"",
                role: ""
            }))

    }
    const classes = useStyles();
    
    return (
        <>
            <div style={{ height: "100vh" }}>
                <Grid
                    container
                    direction="row"
                    spacing={0}
                    justify="center"
                    alignItems="center"
                // className={classes.background}
                >
                    <Grid item sm={10} xs={12} className={scss.panel}>
                        <Grid direction={panelDirection} container spacing={0}>

                            <Grid
                                item
                                sm={12}
                                xs={12}
                            >
                                <Card className={scss.card}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            Register
                                                </Typography>
                                        <Grid container>
                                            <Grid container spacing={3}>
                                                <Grid item sm={6} xs={12} >
                                                    <TextField
                                                        label="Firstname"
                                                        fullWidth
                                                        margin="normal"
                                                        required
                                                        variant="outlined"
                                                        value={state.firstName}
                                                        onChange={handleChange('firstName')}
                                                        error={stateError.firstName !== ""}
                                                        helperText={
                                                            stateError.firstName !== "" ? `${stateError.firstName}` : ""
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12} >
                                                    <TextField
                                                        label="Lastname"
                                                        fullWidth
                                                        margin="normal"
                                                        required
                                                        variant="outlined"
                                                        value={state.lastName}
                                                        onChange={handleChange('lastName')}
                                                        error={stateError.lastName !== ""}
                                                        helperText={
                                                            stateError.lastName !== "" ? `${stateError.lastName}` : ""
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={3}>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        label="Email Address"
                                                        fullWidth
                                                        margin="normal"
                                                        required
                                                        variant="outlined"
                                                        type='email'
                                                        value={state.emailId}
                                                        onChange={handleChange('emailId')}
                                                        error={stateError.emailId !== ""}
                                                        helperText={
                                                            stateError.emailId !== "" ? `${stateError.emailId}` : ""
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12} >
                                                    <TextField
                                                        label="Password"
                                                        fullWidth
                                                        margin="normal"
                                                        required
                                                        variant="outlined"
                                                        type="password"
                                                        value={state.password}
                                                        onChange={handleChange('password')}
                                                        error={stateError.password !== ""}
                                                        helperText={
                                                            stateError.password !== "" ? `${stateError.password}` : ""
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={3}>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        id= "phone"
                                                        className={classes.number}
                                                        label="Phone"
                                                        fullWidth
                                                        margin="normal"
                                                        required
                                                        variant="outlined"
                                                        type='Number'
                                                        value={state.phone}
                                                        onChange={handleChange('phone')}
                                                        error={stateError.phone !== ""}
                                                        helperText={
                                                            stateError.phone !== "" ? `${stateError.phone}` : ""
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12} >
                                                    <TextField
                                                        id="select"
                                                        label="Role"
                                                        value={state.role}
                                                        onChange={handleChange("role")}
                                                        fullWidth
                                                        margin="normal"
                                                        select
                                                        required
                                                        variant="outlined"
                                                        error={stateError.role !== ""}
                                                        helperText={
                                                            stateError.role !== "" ? `${stateError.role}` : ""
                                                        }
                                                    >
                                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                                        <MenuItem value={"HR Manager"}>HR Manager</MenuItem>
                                                        <MenuItem value={"HR"}>HR</MenuItem>
                                                    </TextField >
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            color="primary"
                                            variant="contained"
                                            onClick={handleRegister}
                                            disabled={!isEmpty || isError}
                                        >
                                            Register
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

Register.propTypes = {
    width: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        signedUp: state.registerReducer.signedUp
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userSignUpRequest: (userInfo) => dispatch(userSignUpRequest(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Register))

