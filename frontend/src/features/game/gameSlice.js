import { createSlice } from '@reduxjs/toolkit';
import { fetchDetail, fetchMusic } from './gameActions';

const initialState = {
  musicList: [],
  musicDetail: null,
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMusic.fulfilled]: (state, { payload }) => {
      state.musicList = payload.data;
    },

    [fetchDetail.fulfilled]: (state, { payload }) => {
      state.musicDetail = payload.data;
    },
    [fetchDetail.rejected]: (state, payload) => {
      state.error = payload;
    },
  },
});

export default gameSlice.reducer;
