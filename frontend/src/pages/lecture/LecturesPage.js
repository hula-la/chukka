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

const LecturesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularLectures());
    dispatch(fetchLatestLectures());
  }, [dispatch]);
  // const lectures = useSelector((state) => state.lecture.lectures);
  // const popularLectures = useSelector((state) => state.lecture.popularLectures);
  const { lectures, popularLectures, recommendLectures } = useSelector(
    (state) => state.lecture,
  );
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo) dispatch(fetchRecommendLectures());
  }, [dispatch, userInfo]);
  // Dummy Data
  const dummy = [
    {
      lecTitle: '강의 제목1',
      lecContent: '강의 컨텐츠1',
      lecThumb: thumbnail1,
      lecLevel: 2,
      lecGenre: '아이돌',
      lecCategory: '실시간',
    },
    {
      lecTitle: '강의 제목2',
      lecContent: '강의 컨텐츠2',
      lecThumb: thumbnail2,
      lecLevel: 3,
      lecGenre: '힙합',
      lecCategory: '녹화',
    },
  ];

  return (
    <Wrapper>
      {popularLectures ? (
        <div>
          <h1>인기 강의</h1>
          <div className="popular-lectures-div">
            {popularLectures.map((lecture, index) => (
              <Lecture props={lecture} key={index} />
            ))}
          </div>
        </div>
      ) : null}
      <div>
        {recommendLectures.lecList.length ? (
          <>
            <h1>{`${recommendLectures.ageGroup}대 ${
              recommendLectures.userGender ? '여성' : '남성'
            } 인기`}</h1>
            <div className="popular-lectures-div">
              {recommendLectures.lecList.map((lecture, index) => (
                <Lecture props={lecture} key={index} />
              ))}
              {/* {dummy.map((lecture, index) => (
            <Lecture props={lecture} key={index} />
          ))} */}
              {/* <Lecture props={dummy[0]} />
          <Lecture props={dummy[1]} /> */}
            </div>
          </>
        ) : null}
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
