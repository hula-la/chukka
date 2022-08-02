import React, { useState } from 'react';
import styled from 'styled-components';

// 페이지 블락
const ProfilePageBlock = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
`;

// 사이드바 css
const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
  margin-right: 3rem;
  .line {
    border: 0;
    height: 5px;
    background: #ff2c55;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  & p {
    margin-bottom: 2.5rem;
  }
`;
const Profile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
`;
const Menu = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 나의 강의 목록
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

// 프로필 변경 페이지
const ChangeProfileBox = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChangeProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const TextBox = styled.div`
  border: thin solid #ffffff;
  font-size: 1rem;
  border-radius: 5px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  color: #ffffff;
  border-color: #ffffff;
  border-width: thin;
  border-radius: 5px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  outline-color: #ffffff;
  width: 100%;
  background-color: #0b0b0b;
`;

const StyledLabel = styled.label`
  font-size: small;
  /* text-align: left; */
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: small;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  width: 98%;
`;

const ProfilePage = () => {
  const [pageNum, setpageNum] = useState('1');

  const onClickSnacks = () => setpageNum('1');
  const onClickMyList = () => setpageNum('2');
  const onClickChangeProfile = () => setpageNum('3');
  const onClickPassword = () => setpageNum('4');
  return (
    <ProfilePageBlock>
      <Side>
        <hr className="line" />
        <Profile src="/img/login.png"></Profile>
        <p>이름</p>
        <hr className="line" />
        <Menu>
          <button onClick={onClickSnacks}>스낵스</button>
          <button onClick={onClickMyList}>나의 강의 목록</button>
          <button onClick={onClickChangeProfile}>프로필 수정</button>
          <button onClick={onClickPassword}>비밀번호 변경</button>
        </Menu>
        <hr className="line" style={{ marginTop: '1rem' }} />
      </Side>
      {pageNum === '1' && <h1>MY Shorts</h1>}
      {pageNum === '2' && (
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
      )}
      {pageNum === '3' && (
        <ChangeProfileBox>
          <Profile src="/img/login.png"></Profile>
          <ChangeProfileForm>
            <input type="file" />
            <div>
              <StyledLabel>아이디</StyledLabel>
              <TextBox>id</TextBox>
            </div>
            <div>
              <StyledLabel>닉네임</StyledLabel>
              <StyledInput />
            </div>
            <div>
              <StyledLabel>이메일</StyledLabel>
              <StyledInput />
            </div>
            <div>
              <StyledLabel>휴대폰 번호</StyledLabel>
              <StyledInput />
            </div>
            <StyledButton>프로필 수정</StyledButton>
          </ChangeProfileForm>
        </ChangeProfileBox>
      )}
      {pageNum === '4' && (
        <ChangeProfileBox>
          <ChangeProfileForm>
            <div>
              <StyledLabel>현재 비밀번호</StyledLabel>
              <StyledInput type="password" />
            </div>
            <div>
              <StyledLabel>새 비밀번호</StyledLabel>
              <StyledInput type="password" />
            </div>
            <div>
              <StyledLabel>새 비밀번호 확인</StyledLabel>
              <StyledInput type="password" />
            </div>
            <StyledButton>비밀번호 변경</StyledButton>
          </ChangeProfileForm>
        </ChangeProfileBox>
      )}
    </ProfilePageBlock>
  );
};

export default ProfilePage;
