import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';

const MyListBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  .cardList {
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
  }
`;

const LectureBox = styled.div`
  & h3 {
    margin-bottom: 0.5rem;
  }
`;

const RecordLectureBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  & p {
    margin-left: 0.5rem;
    font-size: small;
    color: #ff2c55;
  }
  & img {
    height: 160px;
    width: 200px;
    margin-top: 10px;
  }
`;

const LiveLectureBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  & p {
    margin-left: 0.5rem;
    font-size: small;
    color: #ff2c55;
  }
  & img {
    height: 160px;
    width: 200px;
    margin-top: 10px;
  }
`;

const FinishLectureBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  & p {
    margin-left: 0.5rem;
    font-size: small;
    color: #ff2c55;
  }
  & img {
    height: 160px;
    width: 200px;
    margin-top: 10px;
  }
`;

const MyListPage = () => {
  return (
    <MyListBlock>
      <SideBar />
      <LectureBox>
        <h3>수강중인 강의</h3>
        <RecordLectureBox>
          <p>녹화 강의</p>
          <div className="cardList">
            <img src="/img/login.png" alt="loginImg" />
            <img src="/img/login.png" alt="loginImg" />
          </div>
        </RecordLectureBox>
        <LiveLectureBox>
          <p>실시간 강의</p>
          <img src="/img/login.png" alt="loginImg" />
        </LiveLectureBox>
        <FinishLectureBox>
          <h3>수강완료 강의</h3>
          <img src="/img/login.png" alt="loginImg" />
        </FinishLectureBox>
      </LectureBox>
    </MyListBlock>
  );
};

export default MyListPage;
