import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPopularLectures,
  fetchRecommendLectures,
  fetchLatestLectures,
  fetchLectureDetail,
  fetchSections,
  fetchIsEnroll,
  fetchReviews,
} from './lectureActions';
import thumbnail1 from '../../img/pop.jpeg';

const initialState = {
  popularLectures: [],
  recommendLectures: {
    lecList: [],
    ageGroup: 0,
    userGender: 0,
  },
  lectures: [],
  lecture: {
    lecId: '',
    lecThumb: '',
    lecTitle: '',
    lecLevel: '',
    lecGenre: '',
    lecCategory: '',
    lecPrice: '',
    lecContents: '',
    lecNotice: '',
    lecSchedule: '',
    dayAndTime: '',
    lecStartDate: '',
    lecEndDate: '',
    lecStudent: '',
    lecLimit: '',
    insInfo: {},
  },
  loading: false,
  isEnroll: false,
  sections: [],
  reviews: [],
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    clearLecture: (state) => {
      state.lecture = {
        lecId: '',
        lecThumb: '',
        lecTitle: '',
        lecLevel: '',
        lecGenre: '',
        lecCategory: '',
        lecPrice: '',
        lecContents: '',
        lecNotice: '',
        lecSchedule: '',
        dayAndTime: '',
        lecStartDate: '',
        lecEndDate: '',
        lecStudent: '',
        lecLimit: '',
        insInfo: {},
      };
    },
  },
  extraReducers: {
    [fetchPopularLectures.fulfilled]: (state, { payload }) => {
      state.popularLectures = payload.data;
    },
    [fetchRecommendLectures.fulfilled]: (state, { payload }) => {
      console.log('reco', payload.data);
      state.recommendLectures = payload.data;
    },
    [fetchLatestLectures.fulfilled]: (state, { payload }) => {
      state.lectures = payload.content;
    },
    [fetchLectureDetail.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [fetchLectureDetail.fulfilled]: (state, { payload }) => {
      state.lecture = payload.data;
      state.loading = false;
    },

    [fetchSections.fulfilled]: (state, { payload }) => {
      state.sections = payload.data.content;
    },
    [fetchIsEnroll.fulfilled]: (state, { payload }) => {
      state.isEnroll = payload.data;
    },
    [fetchReviews.fulfilled]: (state, { payload }) => {
      state.reviews = payload.data.content;
    },
  },
});

export const { clearLecture } = lectureSlice.actions;

export default lectureSlice.reducer;
