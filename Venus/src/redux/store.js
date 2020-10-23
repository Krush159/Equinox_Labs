import {createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import registerReducer from 'redux/Authentication/Reducer/RegisterReducer'
import loginReducer from 'redux/Authentication/Reducer/LoginReducer'


const reducer = combineReducers({registerReducer, loginReducer})
let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  }

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer)
export default store