import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSnacks,
  fetchTags,
  fetchReply,
  createReply,
  fetchDetail,
} from './snacksActions';

const initialState = {
  isLoading: false,
  hasMore: false,
  snacksList: [],
  snacksReply: [],
  snacksPopularTags: [],
  snacksDetail: null,
  error: null,
};

const snacksSlice = createSlice({
  name: 'snacks',
  initialState,
  reducers: {
    changeSort: (state) => {
      state.hasMore = false;
      state.snacksList = [];
    },
  },
  extraReducers: {
    // 스낵스 목록 조회
    [fetchSnacks.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSnacks.fulfilled]: (state, { payload }) => {
      state.hasMore = payload.data.last ? false : true;
      const newList = state.snacksList.concat(payload.data.content);
      state.snacksList = newList;
      console.log(state.snacksList);
      state.isLoading = false;
    },
    // 스낵스 댓글 조회
    [fetchReply.fulfilled]: (state, { payload }) => {
      state.snacksReply = payload.data;
    },
    // 인기태그 조회
    [fetchTags.fulfilled]: (state, { payload }) => {
      state.snacksPopularTags = payload.data;
    },
    // 댓글 생성
    [createReply.fulfilled]: (state, { payload }) => {
      state.snacksReply = payload.data;
    },
    // 특정 스낵스 조회
    [fetchDetail.fulfilled]: (state, { payload }) => {
      state.snacksDetail = payload.data;
      console.log(state.snacksDetail);
    },
  },
});

export const { changeSort } = snacksSlice.actions;

export default snacksSlice.reducer;
