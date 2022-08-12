import { createSlice } from '@reduxjs/toolkit';
import { fetchMusic } from './gameActions';

const initialState = {
  musicList: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMusic.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export default gameSlice.reducer;
