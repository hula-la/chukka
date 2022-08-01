import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from './userActions';

// initialize userToken from local storage
const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  accessToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken'); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    // 유저 로그인
    [userLogin.pending]: (state) => {
      console.log('pending!');
      // 액션 디스패치
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      // 요청 성공
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      console.log(payload);
    },
    [userLogin.rejected]: (state, { payload }) => {
      // 요청 실패
      console.log('login rejected');
      state.loading = false;
      state.error = payload;
    },

    // 유저 회원가입
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
