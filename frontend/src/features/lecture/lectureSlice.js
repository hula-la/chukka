import { createSlice } from '@reduxjs/toolkit';
import { fetchLectures } from './lectureActions';
import thumbnail1 from '../../img/pop.jpeg';

const initialState = {
  title: '나연 - POP',
  content: '',
  thumbnail: thumbnail1,
  level: 1,
  genre: '아이돌',
  category: '실시간',
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default lectureSlice.reducer;
