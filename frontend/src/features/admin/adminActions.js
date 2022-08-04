import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8080';

export const fetchUserList = createAsyncThunk('adimin/fetch', async () => {
  const { data } = await axios.get(`${BASE_URL}/admin/accounts/`);
  return data;
});

export const deleteUser = createAsyncThunk('admin/delete', async (userId) => {
  const { data } = await axios.delete(`${BASE_URL}/admin/accounts/${userId}`);
  return data;
});

export const changeUser = createAsyncThunk(
  'admin/change',
  async ({ userId, userType }) => {
    const { data } = await axios.put(
      `${BASE_URL}/admin/accounts/${userId}/${userType}`,
    );
    return data;
  },
);
