import { lectures, lectureDetail } from '../../api/lecture';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLectures = createAsyncThunk(
  'lecture/fetchLectures',
  async ({ rejectWithValue }) => {
    try {
      await lectures();
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchLectureDetail = createAsyncThunk(
  'lecture/fetchLectureDetail',
  async (lectureId, { rejectWithValue }) => {
    try {
      await lectureDetail(lectureId);
    } catch (e) {}
  },
);
