import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  changeUser,
  fetchUserList,
  fetchInstList,
  changeInsInfo,
  submitPicture,
  deleteIns,
  fetchLectures,
  createRecordLecture,
  deleteLecture,
  fetchSections,
  createSection,
  createLiveLecture,
  deleteSection,
} from './adminActions';

const initialState = {
  userList: [],
  instList: [],
  lectureList: [],
  sectionList: [],
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: {
    // 유저 목록 불러오기
    [fetchUserList.pending]: () => {
      console.log('pending!');
    },
    [fetchUserList.fulfilled]: (state, { payload }) => {
      // 요청 성공
      console.log(payload.data);
      state.userList = payload.data.userList;
    },
    [fetchUserList.rejected]: (state, { payload }) => {
      // 요청 실패
      console.log('rejected');
      state.error = payload;
    },

    // 유저 강제 탈퇴
    [deleteUser.pending]: () => {
      console.log('pending!');
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      console.log('delete!');
      state.userList = payload.data.userList;
    },
    [deleteUser.rejected]: () => {
      console.log('rejected!');
    },

    // 유저 권한 바꾸기
    [changeUser.pending]: () => {
      console.log('pending!');
    },
    [changeUser.fulfilled]: (state, { payload }) => {
      console.log('change!');
      state.userList = payload.data.userList;
    },
    [changeUser.rejected]: () => {
      console.log('rejected!');
    },

    // 강사 목록 불러오기
    [fetchInstList.pending]: () => {
      console.log('pending!');
    },
    [fetchInstList.fulfilled]: (state, { payload }) => {
      console.log('fetch!');
      state.instList = payload.data;
    },
    [fetchInstList.rejected]: () => {
      console.log('rejected!');
    },

    // 강사 정보 수정
    [changeInsInfo.pending]: () => {
      console.log('pending!');
    },
    [changeInsInfo.fulfilled]: (state, { payload }) => {
      console.log('change!');
      console.log(payload);
      state.instList = payload.data;
    },
    [changeInsInfo.rejected]: () => {
      console.log('rejected!');
    },

    // 강사 프로필 수정
    [submitPicture.pending]: () => {
      console.log('pending!');
    },
    [submitPicture.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
    [submitPicture.rejected]: (state, { payload }) => {
      console.log('rejected!');
      console.log(payload);
    },

    // 강사 정보 삭제
    [deleteIns.fulfilled]: (state, payload) => {
      state.instList = payload.data;
    },

    // 강의 목록 조회
    [fetchLectures.fulfilled]: (state, { payload }) => {
      state.lectureList = payload.data;
    },

    // 녹화 강의 추가
    [createRecordLecture.fulfilled]: (state, { payload }) => {
      state.lectureList = payload.data;
    },

    // 라이브 강의 추가
    [createLiveLecture.fulfilled]: (state, { payload }) => {
      state.lectureList = payload.data;
    },

    // 강의 삭제
    [deleteLecture.fulfilled]: (state, { payload }) => {
      state.lectureList = payload.data;
    },

    // 섹션 목록 조회
    [fetchSections.fulfilled]: (state, { payload }) => {
      state.sectionList = payload.data;
      console.log(payload.data);
    },

    // 섹션 추가
    [createSection.fulfilled]: (state, { payload }) => {
      state.sectionList = payload.data;
    },

    // 섹션 삭제
    [deleteSection.fulfilled]: (state, { payload }) => {
      state.sectionList = payload.data;
    },
  },
});

export default adminSlice.reducer;
