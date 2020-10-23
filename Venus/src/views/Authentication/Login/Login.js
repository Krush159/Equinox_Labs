import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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


import { withStyles } from '@material-ui/core/styles';
import scss from './login.module.scss';
import { userSignInRequest } from 'redux/Authentication/Actions/LoginAction'
import { loginSuccess } from 'redux/Authentication/Actions/LoginAction';

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



const Login = (props) => {


    // Flip container to column on mobile screens.
    const panelDirection = props.width === 'xs' ? 'column' : 'row';
    const [state, setState] = useState({
        emailId: "",
        password: ""
    })
    const [stateError, setStateError] = useState({
        ...state
    })
    const [isError, setIsError] = useState(false)

    const { isAuth } = props
    // useEffect(() => {
    //     console.log(isAuth)
    //     return () => {
    //         if (isAuth) {
    //             console.log("true")
    //             console.log(props)
    //             props.history.push('/admin/dashboard')
    //         }
    //     }
    // }, [])
    const isEmpty =
        state.emailId.length > 0 &&
        state.password.length > 0;
    const handleChange = (input) => ({ target: { value } }) => {
        setState({
            ...state,
            [input]: value
        })


        // Handle errors
        const formErrors = { ...stateError }

        switch (input) {
            case "emailId":
                formErrors.emailId = emailRegex.test(value) ? "" : "Invalid email address"
                break
            case "password":
                formErrors.password = value.length > 0 && value.length < 6 ? "Minimum 6 characaters required" : ""
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
    const handleSubmit = () => {
        console.log(state)
        props.userSignInRequest(state)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error)
                }
                else{
                    props.loginSuccess(res.data.payload)
                    localStorage.setItem("token", res.data.token)
                }
            })
    }
    const classes = useStyles();

    console.log(isAuth)
    return (
        isAuth?( <Redirect to="/admin" />)
        :<div style={{ height: "100vh" }}>
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
                                        Login
                                    </Typography>
                                    <Typography component="p" gutterBottom>
                                        Welcome to our admin panel. Please login using the form or register for a new account using the button below.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth href="/register" color="secondary" variant="contained">Create an account</Button>
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
                                    <Grid container >
                                        <Grid item xs={12}>
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
                                        <Grid item xs={12} >
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
                                </CardContent>
                                <CardActions className={scss['login-actions']}>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        onClick={handleSubmit}
                                        disabled={!isEmpty || isError}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                    >
                                        Forgot Password
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

Login.propTypes = {
    width: PropTypes.string.isRequired
};
const mapStateToProps = (reducerState) => {
    return {
        isAuth: reducerState.loginReducer.isAuth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userSignInRequest: (userInfo) => dispatch(userSignInRequest(userInfo)),
        loginSuccess: (payload) => dispatch(loginSuccess(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Login));