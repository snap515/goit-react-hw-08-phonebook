import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

// export const $authInstance = axios.create({
//   baseURL: 'https://connections-api.herokuapp.com',
// });
export const $authInstance = axios.create({
  baseURL: 'https://contacts-reader-backend-6a1v.onrender.com/api',
});

const setToken = token => {
  $authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
  $authInstance.defaults.headers.common.Authorization = '';
};

export const apiRegisterUser = createAsyncThunk(
  'auth/apiRegisterUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/auth/register', formData);
      // {user: {name: 'wasda', email: 'wasda@mail.com'}, token: 'asdasdasd'}
      // setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  'auth/apiLoginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/auth/login', formData);
      // {user: {name: 'wasda', email: 'wasda@mail.com'}, token: 'asdasdasd'}
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  'auth/apiRefreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    if (!token) return thunkApi.rejectWithValue('You dont have a token');
    try {
      setToken(token);
      const { data } = await $authInstance.get('/auth/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogoutUser = createAsyncThunk(
  'auth/apiLogoutUser',
  async (_, thunkApi) => {
    try {
      await $authInstance.post('/auth/logout');
      clearToken();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  userData: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  //имя слайса
  name: 'auth',
  //начальное состояние редьюсера слайса
  initialState,
  extraReducers: builder =>
    builder
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isLoggedIn = true;
        state.userData = action.payload.user;
        // state.token = action.payload.token;
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
        state.token = action.payload.token;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(apiLogoutUser.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          apiLoginUser.pending,
          apiRegisterUser.pending,
          apiRefreshUser.pending,
          apiLogoutUser.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiLoginUser.rejected,
          apiRegisterUser.rejected,
          apiRefreshUser.rejected,
          apiLogoutUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

// редьюсер слайса
export const authReducer = authSlice.reducer;
