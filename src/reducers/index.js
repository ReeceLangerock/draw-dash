import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {imageReducer, authReducer,roomReducer,leaderboardReducer, galleryReducer} from './../reducers/reducers'

export default combineReducers({
  router: routerReducer,
  imageReducer,
  authReducer,roomReducer, galleryReducer, leaderboardReducer
})
