import { createSlice } from '@reduxjs/toolkit';
import { fetchSnacks } from './snacksActions';

const initialState = {
  isLoading: false,
  hasMore: false,
  snacksList: [],
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
      console.log(state.hasMore);
      const newList = state.snacksList.concat(payload.data.content);
      state.snacksList = { ...newList };
      state.isLoading = false;
    },
  },
});

export default snacksSlice.reducer;
