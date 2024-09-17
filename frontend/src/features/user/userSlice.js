import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const USER_URL = 'http://localhost:8000/api/auth';
if (localStorage.getItem('userInfo') === 'undefined') {
  localStorage.setItem('userInfo', '');
}
// setting initial state of the user Slice
const initialState = {
  message: '',
  statusCode: '',
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

// Creating login to the user
export const signup = createAsyncThunk('user/signup', async (newUser) => {
  try {
    const response = await axios.post(`${USER_URL}/signup`, newUser);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// Authendicate login
export const login = createAsyncThunk('user/login', async (newUser) => {
  try {
    const response = await axios.post(`${USER_URL}/login`, newUser);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// action creators for reducer function
const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state) => {
      state.token = '';
    },
    signout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    setStatus: (state) => {
      state.statusCode = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.message = 'Verifying';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        localStorage.removeItem('userInfo');
      })
      .addCase(signup.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = action.error.statusCode;
        console.log('code', state.statusCode);
      })
      .addCase(login.pending, (state) => {
        state.message = 'Verifying';
        state.statusCode = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload?.authInfo;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        localStorage.setItem(
          'userInfo',
          JSON.stringify(action.payload?.authInfo)
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = action.error.statusCode;
      });
  },
});

export const selectUserMessage = (state) => state.user.message;
export const selectUserStatusCode = (state) => state.user.statusCode;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectEmail = (state) => state.user.email;
export const selectPassword = (state) => state.user.password;
export const { setToken, signout,setStatus } = usersSlice.actions;
export default usersSlice.reducer;
