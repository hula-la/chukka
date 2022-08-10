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
  reducer: {},
  extraReducers: {
    [fetchSnacks.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSnacks.fulfilled]: (state, { payload }) => {
      state.hasMore = payload.data.last ? false : true;
      const newList = state.snacksList.concat(payload.data.content);
      state.snacksList = newList;
      state.isLoading = false;
    },
    [fetchReply.fulfilled]: (state, { payload }) => {
      state.snacksReply = payload.data;
    },
    [fetchTags.fulfilled]: (state, { payload }) => {
      state.snacksPopularTags = payload.data;
    },
    [createReply.fulfilled]: (state, { payload }) => {
      state.snacksReply = payload.data;
    },
    [fetchDetail.fulfilled]: (state, { payload }) => {
      state.snacksDetail = payload.data;
      console.log(state.snacksDetail);
    },
  },
});

export default snacksSlice.reducer;
