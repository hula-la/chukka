import { createAsyncThunk } from '@reduxjs/toolkit';
import { fsnacks, fTags, freply, creply, like, detail } from '../../api/snacks';

export const fetchSnacks = createAsyncThunk(
  'snacks/fetchSnacks',
  async ({ newPage, sortSnacks }, { rejectWithValue }) => {
    try {
      const { data } = await fsnacks(newPage, sortSnacks);
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

export const fetchTags = createAsyncThunk(
  'snacks/fetchTags',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await fTags();
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

export const fetchReply = createAsyncThunk(
  'snacks/fetchReply',
  async (snacksId, { rejectWithValue }) => {
    try {
      const { data } = await freply(snacksId);
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

export const createReply = createAsyncThunk(
  'snacks/createReply',
  async ({ snacksId, contents }, { rejectWithValue }) => {
    try {
      const { data } = await creply({ snacksId, contents });
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

export const likeSnacks = createAsyncThunk(
  'snacks/likeSnacks',
  async (snacksId, { rejectWithValue }) => {
    try {
      console.log(snacksId);
      const { data } = await like(snacksId);
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

export const fetchDetail = createAsyncThunk(
  'snacks/detail',
  async (snacksId, { rejectWithValue }) => {
    try {
      const { data } = await detail(snacksId);
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
