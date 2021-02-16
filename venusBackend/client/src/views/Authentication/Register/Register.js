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
// import logoImage from '../../../assets/images/portal-logo.png';


const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
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
      case "role":
        formErrors.role = value === "" ? "Select any one role" : ""
        break
      default:
        break
    }

    // set error hook
    Object.values(formErrors).forEach(error =>
      error.length > 0 ? setIsError(true) : setIsError(false)
    )
    // set errors hook
    setStateError({
      ...formErrors
    })
  }
  const handleRegister = () => {
    props.userSignUpRequest(state)
    .then(res=> console.log(res))
    
  }
  const classes = useStyles();
  const {signedUp}= props
  return (
    <>
      {signedUp ? (
        <Redirect to="/login" />
      ) : (
          <div style={{ height: "100vh" }}>
            <Grid
              container
              direction="row"
              spacing={0}
              justify="center"
              alignItems="center"
              className={classes.background}
            >
              <Grid item sm={10} xs={12} className={scss.panel}>
                <Grid direction={panelDirection} container spacing={0}>
                  <Grid
                    item
                    sm={6}
                    xs={12}
                  >
                    <Card className={classNames(scss.card, classes['primary-card'])}>
                      <CardContent className={scss['signup-content']}>
                        <img src={"https://i.ibb.co/4PqT957/Venus-Logo.jpg"} className={scss['signup-logo']} alt="logo" />
                        <Typography variant="h5" component="h2" gutterBottom>
                          Register
                </Typography>
                        <Typography component="p" gutterBottom>
                          Welcome. It takes a couple of minutes to sign up for a free account. Just fill in your details to gain access the admin panel and view the dashboard. By creating an account, you agree to our Terms & Conditions and Privacy Policy.
                </Typography>
                      </CardContent>
                      <CardActions>
                        <Button fullWidth href="/login" color="secondary" variant="contained">I'm already registered</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={12}
                  >
                    <Card className={scss.card}>
                      <CardContent>
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
                          <Grid item xs={12} className={classes.margin}>
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
        )
      }
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
