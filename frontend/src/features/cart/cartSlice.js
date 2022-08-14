import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, userCartCount } from './cartActions';

const initialState = {
  loading: false,
  error: null,
  userProfile: null,
  cartCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    // 프로필 불러오기
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.userProfile = payload.data;
      console.log(state.userProfile);
    },
    [userCartCount.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export default cartSlice.reducer;
