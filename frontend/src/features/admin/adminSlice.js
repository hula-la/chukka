import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, changeUser, fetchUserList } from './adminActions';

const initialState = {
  userList: [],
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
  },
});

export default adminSlice.reducer;
