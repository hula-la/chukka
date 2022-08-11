import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './cartActions';

const initialState = {
  loading: false,
  error: null,
  userProfile: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    // 프로필 불러오기
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.userProfile = payload.data;
    },
  },
});

export default cartSlice.reducer;
