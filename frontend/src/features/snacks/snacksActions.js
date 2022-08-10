import { createAsyncThunk } from '@reduxjs/toolkit';
import { fsnacks } from '../../api/snacks';
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
