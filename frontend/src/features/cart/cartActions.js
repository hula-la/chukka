import { createAsyncThunk } from '@reduxjs/toolkit';
import { count, user } from '../../api/cart';

// 장바구니 나의 정보
export const fetchUser = createAsyncThunk(
  'cart/fetchUser',
  async (userNickname, { rejectWithValue }) => {
    try {
      console.log(userNickname);
      const { data } = await user(userNickname);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userCartCount = createAsyncThunk(
  'cart/cartCount',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await count();
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
