import { createSlice } from '@reduxjs/toolkit';
import { fetchLectures } from './lectureActions';

const initialState = {};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default lectureSlice.reducer;
