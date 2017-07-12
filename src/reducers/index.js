import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {imagePromptReducer, authReducer,roomReducer} from './../reducers/reducers'

export default combineReducers({
  router: routerReducer,
  imagePromptReducer,
  authReducer,roomReducer
})
