import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export default combineReducers({
  auth: authReducer,
});
