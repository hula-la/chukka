import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLatestLectures,
  fetchLectureDetail,
  fetchSections,
} from './lectureActions';
import thumbnail1 from '../../img/pop.jpeg';

const initialState = {
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
  sections: [],
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLatestLectures.fulfilled]: (state, { payload }) => {
      state.lectures = payload.content;
    },
    [fetchLectureDetail.fulfilled]: (state, { payload }) => {
      state.lecture = payload.data;
    },
    [fetchSections.fulfilled]: (state, { payload }) => {
      state.sections = payload.data;
    },
  },
});

export default lectureSlice.reducer;
