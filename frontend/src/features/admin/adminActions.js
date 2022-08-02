import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8080';

export const fetchUserList = createAsyncThunk('adimin/fetch', async () => {
  console.log('hi');
  const { data } = await axios.get(`${BASE_URL}/admin/accounts/`);
  console.log(data);
  return data;
});
