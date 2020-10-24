import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../ActionTypes'

export const registerRequest = (payload) => ({
    type: REGISTER_REQUEST,
    payload
})
export const registerSuccess = (payload) => ({
    type: REGISTER_SUCCESS,
    payload
})
export const registerFailure = (payload) => ({
    type: REGISTER_FAILURE,
    payload
})


export const userSignUpRequest = (userInfo) => dispatch => {
    dispatch(registerRequest())
    return fetch(`http://localhost:5000/users/register`, {
    
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => {
        dispatch(registerSuccess())
        return res
    })
    .catch(err => {
        console.log(err)
    })
}