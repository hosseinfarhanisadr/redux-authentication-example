import { createSlice } from '@reduxjs/toolkit';

type AuthState = { loading: boolean; isAuthenticated: boolean; user?: object };

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
