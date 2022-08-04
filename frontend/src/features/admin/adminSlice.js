import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  changeUser,
  fetchUserList,
  fetchInstList,
  changeInsInfo,
} from './adminActions';

const initialState = {
  userList: [],
  instList: [],
  lectureList: [],
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: {
    // 유저 목록 불러오기
    [fetchUserList.pending]: () => {
      console.log('pending!');
    },
    [fetchUserList.fulfilled]: (state, { payload }) => {
      // 요청 성공
      console.log(payload.data);
      state.userList = payload.data.userList;
    },
    [fetchUserList.rejected]: (state, { payload }) => {
      // 요청 실패
      console.log('rejected');
      state.error = payload;
    },

    // 유저 강제 탈퇴
    [deleteUser.pending]: () => {
      console.log('pending!');
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      console.log('delete!');
      state.userList = payload.data.userList;
    },
    [deleteUser.rejected]: () => {
      console.log('rejected!');
    },

    // 유저 권한 바꾸기
    [changeUser.pending]: () => {
      console.log('pending!');
    },
    [changeUser.fulfilled]: (state, { payload }) => {
      console.log('change!');
      state.userList = payload.data.userList;
    },
    [changeUser.rejected]: () => {
      console.log('rejected!');
    },

    // 강사 목록 불러오기
    [fetchInstList.pending]: () => {
      console.log('pending!');
    },
    [fetchInstList.fulfilled]: (state, { payload }) => {
      console.log('fetch!');
      state.instList = payload.data;
    },
    [fetchInstList.rejected]: () => {
      console.log('rejected!');
    },

    // 강사 정보 수정
    [changeInsInfo.pending]: () => {
      console.log('pending!');
    },
    [changeInsInfo.fulfilled]: (state, { payload }) => {
      console.log('change!');
      state.instList = payload.data;
    },
    [changeInsInfo.rejected]: () => {
      console.log('rejected!');
    },
  },
});

export default adminSlice.reducer;
