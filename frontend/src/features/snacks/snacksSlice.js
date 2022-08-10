import { createSlice } from '@reduxjs/toolkit';
import { fetchSnacks, fetchReply, createReply } from './snacksActions';

const initialState = {
  isLoading: false,
  hasMore: false,
  snacksList: [],
  snacksReply: [],
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
    [createReply.fulfilled]: (state, { payload }) => {
      state.snacksReply = payload.data;
    },
  },
});

export default snacksSlice.reducer;
