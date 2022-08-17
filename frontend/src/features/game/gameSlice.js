import { createSlice } from '@reduxjs/toolkit';
import { fetchDetail, fetchMusic, giveExp, songScore } from './gameActions';

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

    [songScore.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
    [songScore.rejected]: (state, { payload }) => {
      console.log(payload);
    },

    [giveExp.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
    [giveExp.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export default gameSlice.reducer;
