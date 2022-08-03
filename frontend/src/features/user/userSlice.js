import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin, fetchAccessToken } from './userActions';

// initialize userToken from local storage
// const accessToken = localStorage.getItem('accessToken')
//   ? localStorage.getItem('accessToken')
//   : null;

const userInfo = localStorage.getItem('userInfo')
  ? localStorage.getItem('userInfo')
  : null;

const initialState = {
  loading: false,
  userInfo,
  accessToken: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('refreshToken'); // delete token from storage
      localStorage.removeItem('userInfo');
      state.loading = false;
      state.userInfo = null;
      state.accessToken = null;
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

    // AccessToken 가져오기
    [fetchAccessToken]: (state, { payload }) => {
      state.accessToken = payload.accessToken;
    },
  },
});

export const { logout, getAccessToken } = userSlice.actions;

export default userSlice.reducer;
