import {combineReducers} from '@reduxjs/toolkit';
import SurveyReducer from './reducers/SurveyReducer';

//combine all reducers
export default combineReducers({
  SurveyReducer,
});
