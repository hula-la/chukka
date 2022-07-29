import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post('https://localhost:8000/accounts/signup', data, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
