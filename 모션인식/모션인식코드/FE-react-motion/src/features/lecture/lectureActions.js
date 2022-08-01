import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLectures = createAsyncThunk(
  'lecture/fetchLectures',
  async ({ rejectWithValue }) => {
    try {
      const config = {
        headers: {},
      };
      await axios.get('lectures/', config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
