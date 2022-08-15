import {
  latestLectures,
  popularLectures,
  lecture,
  sections,
  isEnroll,
  recommendLectures,
  reviews,
  postReview,
} from '../../api/lecture';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularLectures = createAsyncThunk(
  'lecture/fetchPopularLectures',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await popularLectures();
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

export const fetchRecommendLectures = createAsyncThunk(
  'lecture/fetchRecommendLectures',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await recommendLectures();
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

export const fetchIsEnroll = createAsyncThunk(
  'lecture/fetchIsEnroll',
  async (lectureId, { rejectWithValue }) => {
    try {
      const { data } = await isEnroll(lectureId);
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

export const fetchReviews = createAsyncThunk(
  'lecture/fetchReviews',
  async (lectureId, { rejectWithValue }) => {
    console.log('fetchReviews');
    try {
      const { data } = await reviews(lectureId);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const createReview = createAsyncThunk(
  'lecture/createReview',
  async (params, { rejectWithValue }) => {
    const { lecId } = params;
    try {
      const { data } = await postReview(lecId, params);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

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
