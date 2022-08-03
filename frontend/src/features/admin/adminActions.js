import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8080';

export const fetchUserList = createAsyncThunk('adimin/fetch', async () => {
  const { data } = await axios.get(`${BASE_URL}/admin/accounts/`);
  return data;
});

export const deleteUser = createAsyncThunk('admin/delete', async (data) => {
  await axios.delete(`${BASE_URL}/admin/accounts/${data}`);
  return await axios.get(`${BASE_URL}/admin/accounts/`);
});
