import { createSlice } from '@reduxjs/toolkit';
import { fetchMusic } from './gameActions';

const initialState = {
  musicList: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMusic.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.musicList = payload.data;
    },
  },
});

export default gameSlice.reducer;
