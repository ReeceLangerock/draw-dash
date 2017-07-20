import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {imageReducer, authReducer,roomReducer} from './../reducers/reducers'

export default combineReducers({
  router: routerReducer,
  imageReducer,
  authReducer,roomReducer
})
