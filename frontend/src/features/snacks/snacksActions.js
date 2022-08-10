import { createAsyncThunk } from '@reduxjs/toolkit';
import { fsnacks, fTags, freply, creply } from '../../api/snacks';

export const fetchSnacks = createAsyncThunk(
  'snacks/fetchSnacks',
  async (pageNum, { rejectWithValue }) => {
    try {
      const { data } = await fsnacks(pageNum);
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
  async ({ rejectWithValue }) => {
    console.log('asdasdas');
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
