import { createAsyncThunk } from '@reduxjs/toolkit';
import { change, drop, fetchInst, fetchUser, insInfo } from '../../api/admin';

export const fetchUserList = createAsyncThunk('admin/fetchuser', async () => {
  const { data } = await fetchUser();
  return data;
});

export const deleteUser = createAsyncThunk('admin/delete', async (userId) => {
  const { data } = await drop(userId);
  return data;
});

export const changeUser = createAsyncThunk(
  'admin/change',
  async ({ userId, userType }) => {
    const { data } = await change({ userId, userType });
    return data;
  },
);

export const fetchInstList = createAsyncThunk('admin/fetchinst', async () => {
  const { data } = await fetchInst();
  console.log(data);
  return data;
});

export const changeInsInfo = createAsyncThunk(
  'admin/InsInfo',
  async ({ insId, insEmail, insIntroduce, insName, insProfile }) => {
    const { data } = await insInfo({
      insId,
      insEmail,
      insIntroduce,
      insName,
      insProfile,
    });
    return data;
  },
);
