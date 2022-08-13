import {
  latestLectures,
  popularLectures,
  lecture,
  sections,
} from '../../api/lecture';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLatestLectures = createAsyncThunk(
  'lecture/fetchLatestLectures',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await latestLectures(params);
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

export const fetchLectureDetail = createAsyncThunk(
  'lecture/fetchLectureDetail',
  async (lectureId, { rejectWithValue }) => {
    try {
      const { data } = await lecture(lectureId);
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
  'lecture/fetchSections',
  async (lectureId, { rejectWithValue }) => {
    try {
      const { data } = await sections(lectureId);
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

// export const postCart = createAsyncThunk(
//   'lecture/postCart',
//   async ({ rejectWithValue }) => {
//     try {
//       await lectureCart();
//     } catch (e) {}
//   },
// );

// export const fetchReviews = createAsyncThunk(
//   'lecture/fetchReviews',
//   async (lectureId, { rejectWithValue }) => {
//     try {
//       const { data } = await reviews(lectureId);
//     } catch (e) {}
//   },
// );

// export const createReview = createAsyncThunk(
//   'lecture/createReview',
//   async (lectureId, { rejectWithValue }) => {
//     try {
//       const { data } = await makeReview(lectureId);
//     } catch (e) {}
//   },
// );

// export const deleteReview = createAsyncThunk(
//   'lecture/deleteReview',
//   async ({ lectureId, reviewId }, { rejectWithValue }) => {
//     try {
//       const { data } = await removeReview(lectureId, reviewId);
//     } catch (e) {}
//   },
// );

// export const likeLecture = createAsyncThunk(
//   'lecture/likeLecture',
//   async (lectureId, { rejectWithValue }) => {
//     try {
//       const { data } = await lectureLike(lectureId);
//     } catch (e) {}
//   },
// );
