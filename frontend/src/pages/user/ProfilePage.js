import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchProfile, changeProfile } from '../../features/user/userActions';

// 페이지 블락
const ProfilePageBlock = styled.div`
  display: flex;
  flex-direction: row;
  height: inherit;
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

const SideBarButton = styled.button`
  background-color: #0b0b0b;
  color: #ffffff;
  margin-bottom: 1rem;
  cursor: pointer;
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
  width: 100%;
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

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  &[type='date'] {
  }
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
  // URL 뒤 파라미터 불러오기
  const params = useParams();

  const dispatch = useDispatch();

  // 내 페이지인지 남의 페이지인지 구분
  // 1이면 나의 프로필페이지, 2이면 남의 프로필
  const [isProfile, setIsProfile] = useState('1');
  const [profileInputs, setProfileInputs] = useState({
    userBirth: '',
    userEmail: '',
    userGender: '',
    userName: '',
    userNickname: '',
    userPhone: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const currentUser = useSelector((state) => {
    const userNickname = state.user.userInfo
      ? state.user.userInfo.userNickname
      : '';
    return userNickname;
  });

  useEffect(() => {
    if (currentUser === params.nickName) {
      setIsProfile('1');
    } else {
      setIsProfile('2');
    }
  }, [currentUser, params]);

  const paramsNickname = params.nickName;
  useEffect(() => {
    dispatch(fetchProfile({ paramsNickname }));
  }, [dispatch, paramsNickname]);

  const userProInfo = useSelector((state) => {
    return state.user.userProInfo;
  });

  useEffect(() => {
    if (!userProInfo) {
      return;
    }
    const {
      userBirth,
      userEmail,
      userGender,
      userName,
      userNickname,
      userPhone,
    } = userProInfo;
    const temp = {
      userBirth: userBirth,
      userEmail: userEmail,
      userGender: userGender,
      userName: userName,
      userNickname: userNickname,
      userPhone: userPhone,
    };
    setProfileInputs({ ...temp });
  }, [userProInfo]);

  // 컴포넌트 바꾸기 용
  const [pageNum, setpageNum] = useState('1');

  const onClickSnacks = () => setpageNum('1');
  const onClickMyList = () => setpageNum('2');
  const onClickChangeProfile = () => setpageNum('3');
  const onClickPassword = () => setpageNum('4');

  const onChangeProfile = (e) => {
    const { name, value } = e.target;
    const nextProfileInputs = {
      ...profileInputs,
      [name]: value,
    };
    setProfileInputs(nextProfileInputs);
  };

  const onChangePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const onSubmitProfile = (e) => {
    e.preventDefault();
    dispatch(changeProfile({ profileInputs, profilePicture }));
  };

  return (
    <ProfilePageBlock>
      <Side>
        <hr className="line" />
        <Profile src="/img/login.png"></Profile>
        <p>이름</p>
        <hr className="line" />
        <Menu>
          <SideBarButton onClick={onClickSnacks}>스낵스</SideBarButton>
          {isProfile === '1' && (
            <SideBarButton onClick={onClickMyList}>
              나의 강의 목록
            </SideBarButton>
          )}
          {isProfile === '1' && (
            <SideBarButton onClick={onClickChangeProfile}>
              프로필 수정
            </SideBarButton>
          )}
          {isProfile === '1' && (
            <SideBarButton onClick={onClickPassword}>
              비밀번호 변경
            </SideBarButton>
          )}
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
          <Profile src={userProInfo.userProfile}></Profile>
          <ChangeProfileForm onSubmit={onSubmitProfile}>
            <input type="file" onChange={onChangePicture} />
            <div>
              <StyledLabel>아이디</StyledLabel>
              <TextBox>{userProInfo.userId}</TextBox>
            </div>
            <div>
              <StyledLabel>닉네임</StyledLabel>
              <StyledInput
                value={profileInputs.userNickname}
                onChange={onChangeProfile}
                name="userNickname"
              />
            </div>
            <div>
              <StyledLabel>이메일</StyledLabel>
              <StyledInput
                name="userEmail"
                value={profileInputs.userEmail}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div>
              <StyledLabel>휴대폰 번호</StyledLabel>
              <StyledInput
                name="userPhone"
                value={profileInputs.userPhone}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div>
              <StyledLabel>이름</StyledLabel>
              <StyledInput
                name="userName"
                value={profileInputs.userName}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div>
              <StyledLabel>생년 월일</StyledLabel>
              <StyledInput
                name="userBirth"
                type="date"
                value={profileInputs.userBirth}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div>
              <StyledLabel>성별</StyledLabel>
              <select name="gender">
                <option value="1">남성</option>
                <option value="0">여성</option>
              </select>
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
