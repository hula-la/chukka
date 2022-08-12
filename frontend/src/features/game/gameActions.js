import { createAsyncThunk } from '@reduxjs/toolkit';
import { music } from '../../api/game';

export const fetchMusic = createAsyncThunk(
  'game/fetchMusic',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await music();
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
