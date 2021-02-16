import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } from '../ActionTypes'

const initState = {
    isAuth: localStorage.getItem('token')?true:false,
    currentUser:{}
}
const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            console.log(action.payload)
            return { ...state, isAuth: false }
        case LOGIN_SUCCESS:
            alert("Login Successful")
            console.log(action.payload)
            return { 
                ...state,
                isAuth:true, currentUser: {...action.payload}
            }
        case LOGIN_FAILURE:
            alert(action.payload)
            return { ...state, isAuth: false }
        case LOGOUT_USER:
            localStorage.removeItem('token')
            return { ...state, isAuth: false }
        default:
            return state;
    }
}
export default loginReducer