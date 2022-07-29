import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      console.log('disPatch registerUser!');
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
        },
      };

      await axios.post('accounts/signup', data, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        console.log('test');
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ userId, userPassword }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {},
      };

      const { data } = await axios.post(
        'accounts/signup',
        { userId, userPassword },
        config,
      );

      // 로컬스토리지에 Token 저장
      localStorage.setItem('userToken', data.userToken);

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
