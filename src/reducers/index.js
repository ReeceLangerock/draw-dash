import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {imagePromptReducer, authReducer} from './../reducers/reducers'

export default combineReducers({
  router: routerReducer,
  imagePromptReducer,
  authReducer
})
