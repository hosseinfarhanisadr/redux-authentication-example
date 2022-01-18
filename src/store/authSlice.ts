import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../lib/axios';
import { addTokenToStorage, removeTokenFromStorage } from '../utils/auth';

type ResponseError = { message: string };

export const login = createAsyncThunk(
  'auth/login',
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', body);

      const { accessToken, user } = response.data;
      addTokenToStorage(accessToken);
      return user;
    } catch (err) {
      let error: AxiosError<ResponseError> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk('auth/user', async () => {
  const response = await axios.get('/api/user');
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  removeTokenFromStorage();
  return Promise.resolve();
});

type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  user: object | null;
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.error(action.error.message);
      state.loading = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
