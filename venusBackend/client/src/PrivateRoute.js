import React, { Component } from 'react'
import { Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Admin from 'layouts/Admin'
// import Dashboard from './Dashboard'

class PrivateRoute extends Component {
    render() {
        const { isAuth } = this.props
        console.log(this.props)
        return isAuth?(
            <>
                <Route path="/admin" render={(props) => <Admin {...props} />} />
                {/* <Route path="/user/details/:id" exact  render={(props) => <Details {...props} />} />
                <Route path="/user/details/:id/edit"  render={(props) => <Edit {...props} />} /> */}
            </>
        ):(
            <Redirect to="/login" />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.loginReducer.isAuth
    }
}
export default connect(mapStateToProps)(PrivateRoute)