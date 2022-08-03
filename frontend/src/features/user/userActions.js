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
  async ({ userId, userPw }, { rejectWithValue }) => {
    try {
      const config = {};

      const { data } = await axios.post(
        `${BASE_URL}/accounts/login/`,
        { userId, userPw },
        config,
      );

      // 로컬스토리지에 Token 저장
      // localStorage.setItem('accessToken', data.data.accessToken);
      const { userNickname, userProfile } = data.data;
      localStorage.setItem('userInfo', {
        userNickname,
        userProfile,
        userId,
      });
      localStorage.setItem('refreshToken', data.data.refreshToken);

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

export const changeProfile = createAsyncThunk(
  'user/changeProfile',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {},
      };

      await axios.put(`${BASE_URL}/accounts/`, data, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchAccessToken = createAsyncThunk(
  'user/getAccessToken',
  async ({ refreshToken, userInfo }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/accounts/refresh/`,
        userInfo,
        config,
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
