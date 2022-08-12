import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  userLogin,
  fetchAccessToken,
  fetchProfile,
  changeProfile,
  fetchSnacks,
  fetchMyLectures,
} from './userActions';

// initialize userToken from local storage
// const accessToken = localStorage.getItem('accessToken')
//   ? localStorage.getItem('accessToken')
//   : null;

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  loading: false,
  userInfo,
  error: null,
  success: false,
  userProInfo: null,
  snacksList: [],
  hasmore: false,
  lecture: null,
  myLectures: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('refreshToken'); // delete token from storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: {
    // 유저 로그인
    [userLogin.pending]: (state) => {
      // 액션 디스패치
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      // 요청 성공
      state.loading = false;
      state.userInfo = payload.userInfo;
    },
    [userLogin.rejected]: (state, { payload }) => {
      // 요청 실패
      alert('로그인 실패!');
      console.log('login rejected');
      state.loading = false;
      state.error = payload;
    },

    // 유저 회원가입
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      console.log('register done');
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      console.log('register fulfill');
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log('register rejected');
    },

    // AccessToken 가져오기
    [fetchAccessToken.fulfilled]: (state, { payload }) => {
      state.accessToken = payload.accessToken;
    },

    // 프로필 정보 가져오기
    [fetchProfile.fulfilled]: (state, { payload }) => {
      state.userProInfo = payload.data;
    },
    [fetchProfile.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // 프로필 변경
    [changeProfile.fulfilled]: (state, { payload }) => {
      state.userProInfo = payload.data;
      console.log(payload);
    },
    [changeProfile.rejected]: (state, { payload }) => {
      state.error = payload;
      console.log(state.error);
    },

    // 스낵스 받아오기
    [fetchSnacks.pending]: (state) => {
      state.Loading = true;
    },
    [fetchSnacks.fulfilled]: (state, { payload }) => {
      state.hasMore = payload.data.last ? false : true;
      const newList = state.snacksList.concat(payload.data.content);
      state.snacksList = newList;
      state.Loading = false;
    },
    [fetchMyLectures.fulfilled]: (state, { payload }) => {
      console.log(payload.data);
      const { lectureInfo } = payload.data;
      console.log(lectureInfo);
      state.myLectures = lectureInfo;
    },
    [fetchMyLectures.rejected]: (state, { payload }) => {
      state.error = payload;
      console.log('fetchMyLectures rejected', state.error);
    },
  },
});

export const { logout, getAccessToken } = userSlice.actions;

export default userSlice.reducer;
