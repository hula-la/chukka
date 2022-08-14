import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, insertCartItem, userCartCount } from './cartActions';

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

    // 장바구니 갯수 불러오기
    [userCartCount.fulfilled]: (state, { payload }) => {
      state.cartCount = payload.data;
    },

    // 장바구니에 강의 담기
    [insertCartItem.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
    [insertCartItem.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export default cartSlice.reducer;
