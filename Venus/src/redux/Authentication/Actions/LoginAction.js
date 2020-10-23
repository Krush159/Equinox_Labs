import { LOGIN_REQUEST,LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT_USER} from '../ActionTypes'
import axios from 'axios'

export const loginRequest = (payload)=>({
    type: LOGIN_REQUEST,
    payload
})
export const loginSuccess = (payload)=>({
    type: LOGIN_SUCCESS,
    payload
})
export const loginFailure = (payload)=>({
    type: LOGIN_FAILURE,
    payload
})
export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const userSignInRequest = (userInfo) => dispatch => {
    dispatch(loginRequest())
    return axios
        .post(`http://localhost:5000/users/login`,userInfo)
    
    .then(res => {
        return res
    })
    
    .catch(err=> console.log(err))
}