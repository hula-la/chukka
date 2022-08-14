import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPopularLectures,
  fetchRecommendLectures,
  fetchLatestLectures,
} from '../../features/lecture/lectureActions';
import Lecture from '../../components/lectures/Lecture';
import LectureSmall from '../../components/lectures/LectureSmall';
import styled from 'styled-components';
import thumbnail1 from '../../img/pop.jpeg';
import thumbnail2 from '../../img/images.jpeg';

const Wrapper = styled.div`
  & h1 {
    margin-bottom: 24px;
  }
  & > div {
    margin-top: 40px;
  }
  & .popular-lectures-div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
    /* flex-wrap: wrap; */
  }
  & .lectures-div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
    /* flex-wrap: wrap; */
  }
  & .lectures-div > div {
    margin-right: 15px;
  }
`;

const Lectures2 = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-wrap: nowrap;
  flex: 0 0 90%;
  overflow-x: scroll; */
`;

const LecturesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularLectures());
    dispatch(fetchRecommendLectures());
    dispatch(fetchLatestLectures());
  }, [dispatch]);
  const lectures = useSelector((state) => state.lecture.lectures);
  const popularLectures = useSelector((state) => state.lecture.popularLectures);
  // Dummy Data
  const dummy = [
    {
      title: '강의 제목1',
      content: '강의 컨텐츠1',
      thumbnail: thumbnail1,
      level: 2,
      genre: '아이돌',
      category: '실시간',
    },
    {
      title: '강의 제목2',
      content: '강의 컨텐츠2',
      thumbnail: thumbnail2,
      level: 3,
      genre: '힙합',
      category: '녹화',
    },
  ];

  return (
    <Wrapper>
      <div>
        <h1>인기 강의</h1>
        <div className="popular-lectures-div">
          {popularLectures.map((lecture, index) => (
            <LectureSmall props={lecture} key={index} />
          ))}
        </div>
      </div>
      <div>
        <h1>20대 여성 인기</h1>
        <Lectures2>
          {dummy.map((lecture, index) => (
            <Lecture props={lecture} key={index} />
          ))}
          {/* <Lecture props={dummy[0]} />
        <Lecture props={dummy[1]} /> */}
        </Lectures2>
      </div>
      <div>
        <h1>강의 목록</h1>
        <div className="lectures-div">
          {lectures.map((lecture, index) => (
            <LectureSmall props={lecture} key={lecture.lecId} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default LecturesPage;
