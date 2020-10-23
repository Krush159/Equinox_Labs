import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../ActionTypes'


const initState = {
    registering: false,
    signedUp: false
}
const registerReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, registering: true }
        case REGISTER_SUCCESS:
            alert("Registeration Successfull")
            return { ...state, registering: false, signedUp: true }
        case REGISTER_FAILURE:
            alert(action.payload)
            return { ...state, registering: false }
        default:
            return state
    }
}



export default registerReducer