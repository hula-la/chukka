import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8080';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
        },
      };

      await axios.post(`${BASE_URL}/accounts/signup/`, data, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
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
        `${BASE_URL}accounts/signup`,
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
