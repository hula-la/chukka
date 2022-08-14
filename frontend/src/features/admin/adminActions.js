import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  change,
  cllecture,
  crlecture,
  csection,
  dlecture,
  drop,
  dropIns,
  dsection,
  fetchInst,
  fetchUser,
  flectures,
  fsections,
  insInfo,
  picture,
} from '../../api/admin';

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
  async ({ insId, insEmail, insIntroduce, insName }) => {
    console.log(insIntroduce);
    const { data } = await insInfo({
      insId,
      insEmail,
      insIntroduce,
      insName,
    });
    return data;
  },
);

export const submitPicture = createAsyncThunk(
  'admin/SubmitPicture',
  async ({ profileInsId, insProfile }, { rejectWithValue }) => {
    try {
      const { data } = await picture(profileInsId, insProfile);
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

export const deleteIns = createAsyncThunk(
  'admin/deleteIns',
  async (insId, { rejectWithValue }) => {
    try {
      const { data } = await dropIns(insId);
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

export const fetchLectures = createAsyncThunk(
  'admin/fetchLectures',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await flectures();
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

export const createRecordLecture = createAsyncThunk(
  'admin/createRecordLecture',
  async ({ lectureInfo, lecThumb }, { rejectWithValue }) => {
    try {
      const { data } = await crlecture(lectureInfo, lecThumb);
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

export const createLiveLecture = createAsyncThunk(
  'admin/createLiveLecture',
  async ({ liveInfo, lecThumb }, { rejectWithValue }) => {
    try {
      const { data } = await cllecture(liveInfo, lecThumb);
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

export const deleteLecture = createAsyncThunk(
  'admin/deleteLecture',
  async (lecId, { rejectWithValue }) => {
    try {
      const { data } = await dlecture(lecId);
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

export const fetchSections = createAsyncThunk(
  'admin/fetchSections',
  async (lecId, { rejectWithValue }) => {
    try {
      const { data } = await fsections(lecId);
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

export const createSection = createAsyncThunk(
  'admin/createSection',
  async ({ lecId, contents, sectionInfo }, { rejectWithValue }) => {
    try {
      const { data } = await csection(lecId, contents, sectionInfo);
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

export const deleteSection = createAsyncThunk(
  'admin/deleteSection',
  async ({ lecId, sectionId }, { rejectWithValue }) => {
    try {
      const { data } = await dsection(lecId, sectionId);
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
