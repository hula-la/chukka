import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getToken, fetchPro } from '../../api/user';
import client from '../../api/client';

const BASE_URL = 'http://127.0.0.1:8080';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      await register(data);
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
      const { data } = await login({ userId, userPw });

      const { accessToken, refreshToken, userNickname, userProfile, userType } =
        data.data;
      const userInfo = {
        userId,
        userNickname,
        userProfile,
        userType,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);

      return { userInfo, accessToken };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userNickname, { rejectWithValue }) => {
    try {
      const { data } = await fetchPro(userNickname);
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
      await axios.put(`${BASE_URL}/accounts/`, data);
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
      const { userId } = userInfo;

      const { data } = await getToken(userId, refreshToken);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
