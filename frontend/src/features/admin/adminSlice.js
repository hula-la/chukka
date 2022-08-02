import { createSlice } from '@reduxjs/toolkit';
import { fetchUserList } from './adminActions';

const initialState = {
  userList: [],
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
      console.log('rejected');
      state.error = payload;
    },
  },
});

export default adminSlice.reducer;
