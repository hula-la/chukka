import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import {
  fetchProfile,
  changeProfile,
  fetchSnacks,
<<<<<<< HEAD
  fetchLectures,
=======
  fetchMyLectures,
>>>>>>> develop/front
} from '../../features/user/userActions';
import MySnacksItem from '../../components/snacks/MySnacksItem';
import defaultImage from '../../img/default.jpeg';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
<<<<<<< HEAD
=======
import LectureSmall from '../../components/lectures/LectureSmall';
import CircleIcon from '@mui/icons-material/Circle';
>>>>>>> develop/front

// 페이지 블락
const ProfilePageBlock = styled.div`
  display: flex;
  flex-direction: row;
  height: inherit;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
  .item {
    width: 100%;
  }
  .nonelist {
    list-style: none;
  }
  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .listItem {
    border-top: 1px solid #ff2c55;
  }
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
  height: 12rem;
`;

const SideBarButton = styled.button`
  background-color: #0b0b0b;
  color: #ffffff;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 200ms;
  font-size: 1rem;
  opacity: 0.7;
  :hover {
    font-weight: bold;
    border-bottom: #ff2c55 0.05rem solid;
    opacity: 1;
<<<<<<< HEAD
  }
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
=======
>>>>>>> develop/front
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
  .addIcon {
    position: relative;
    top: -3rem;
    left: 3rem;
    cursor: pointer;
  }
`;

const ChangeProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & input[type='file'] {
    visibility: hidden;
  }
  & p.userId {
    position: relative;
    font-size: 3rem;
    font-weight: bold;
<<<<<<< HEAD
    top: -4rem;
=======
    top: -3.5rem;
>>>>>>> develop/front
    text-align: center;
  }
  & p.userNickname {
    position: relative;
    font-size: 1rem;
    font-weight: bold;
<<<<<<< HEAD
    top: -4rem;
=======
    top: -3rem;
>>>>>>> develop/front
    text-align: center;
    color: #ff2c55;
    opacity: 0.7;
  }
  .icon {
    vertical-align: middle;
  }
  .infoDiv {
    height: 3rem;
  }
  .flexDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .msg {
    font-size: 0.5rem;
    text-align: center;
    line-height: 2rem;
    opacity: 0.6;
  }
  .normal {
    border-bottom: #ffffff solid 1px;
    width: 50%;
    float: right;
  }
  & hr {
    margin: 1.5rem 0;
    border: none;
    height: 0.1rem;
    background: #ff2c55;
    opacity: 0.5;
  }
  & hr.top {
    margin-top: 4rem;
  }
  & hr.bottom {
    margin-bottom: 4rem;
  }
`;

// 스낵스 css
<<<<<<< HEAD
const Wrapper = styled.div`
  div::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 50%;
  }
  .nonelist {
    list-style: none;
  }
  .list {
    margin-bottom: 10px;
  }
`;
=======
// const Wrapper = styled.div`
//   div::-webkit-scrollbar {
//     display: none;
//   }
//   /* .item {
//     width: 50%;
//   } */
//   .nonelist {
//     list-style: none;
//   }
//   .list {
//     margin-bottom: 10px;
//   }
// `;
>>>>>>> develop/front

const StyledInput = styled.input`
  font-size: 1rem;
  color: #ffffff;
  border: none;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem 1rem 1rem;
  outline-color: #ffffff;
  width: 70%;
  display: inline;
<<<<<<< HEAD
  background-color: #0b0b0b;
=======
  background-color: #3b3b3b;
  border-radius: 0.5rem;
>>>>>>> develop/front

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  &[type='date'] {
  }

  &[type='radio'] {
    width: auto;
  }

  :hover {
    border-bottom: #ff2c55 0.08rem solid;
  }
`;

const StyledLabel = styled.label`
  font-size: small;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  /* font-weight: bold; */
  padding: 0.5rem 1rem;
  margin-top: 2.5rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  opacity: 0.5;
  transition: 500ms;
  :hover {
    opacity: 1;
    font-weight: bold;
  }
`;

// 나의 강의 목록
const LectureBox = ({ myLectures }) => {
  const Wrapper = styled.div`
    padding: 0 5rem;
    & h3 {
      margin-bottom: 0.5rem;
    }
    width: 100%;
    .on-air {
      background-color: #ff2c55;
      width: 10rem;
      height: 4rem;
      padding: 0.4rem 0.1rem 0.5rem 0.8rem;
      border-radius: 5rem;
      margin: 1rem 0 2rem;
    }
    .on-air-icon {
      width: 2.5rem;
      height: 2.5rem;
      vertical-align: middle;
    }
    .on-air-msg {
      margin-left: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 3rem;
    }
    & hr {
      margin: 1.5rem 0;
      border: none;
      height: 0.1rem;
      background: #ff2c55;
      opacity: 0.5;
    }
    .lecture-header {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }
  `;

  const LectureBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
    min-height: 200px;
    & p {
      margin-left: 0.5rem;
      font-size: small;
      color: #ff2c55;
    }
    /* & img {
      height: 160px;
      width: 200px;
      margin-top: 10px;
    } */
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

  return (
    <Wrapper>
      <div className="on-air">
        <CircleIcon className="on-air-icon" />
        <span className="on-air-msg">수강중</span>
      </div>
      <div className="lecture-header">녹화 강의</div>
      <LectureBox>
        {/* <LectureSmall /> */}
        {myLectures
          .filter((lecture) => lecture.lecCategory)
          .map((lecture, index) => (
            <LectureSmall key={index} props={lecture} noBadge classOpen />
          ))}
      </LectureBox>
      <hr />
      <div className="lecture-header">실시간 강의</div>
      <LectureBox>
        {/* <LectureSmall /> */}
        {myLectures
          .filter((lecture) => !lecture.lecCategory)
          .map((lecture, index) => (
            <LectureSmall key={index} props={lecture} noBadge classOpen />
          ))}
      </LectureBox>
      {/* <LiveLectureBox>
        <p>실시간 강의</p>
        <img src="/img/login.png" alt="loginImg" />
      </LiveLectureBox> */}
      {/* <FinishLectureBox>
        <h3>수강완료 강의</h3>
        <img src="/img/login.png" alt="loginImg" />
      </FinishLectureBox> */}
    </Wrapper>
  );
};

const ProfilePage = () => {
  // URL 뒤 파라미터 불러오기
  const params = useParams();

  const dispatch = useDispatch();
  const { myLectures } = useSelector((state) => state.user);

  // 내 페이지인지 남의 페이지인지 구분
  // 1이면 나의 프로필페이지, 2이면 남의 프로필
  const [myProfile, setMyProfile] = useState('1');

  // 현재 유저의 닉네임
  const currentUser = useSelector((state) => {
    const userNickname = state.user.userInfo
      ? state.user.userInfo.userNickname
      : '';
    return userNickname;
  });

  useEffect(() => {
    if (currentUser === params.nickName) {
      setMyProfile('1');
    } else {
      setMyProfile('2');
    }
  }, [currentUser, params]);

  const paramsNickname = params.nickName;
  useEffect(() => {
    dispatch(fetchProfile({ paramsNickname }));
  }, [dispatch, paramsNickname]);

  // 컴포넌트 바꾸기 용
  const [pageNum, setpageNum] = useState('1');

  const onClickSnacks = () => setpageNum('1');
  const onClickMyList = () => setpageNum('2');
  const onClickChangeProfile = () => setpageNum('3');
  const onClickPassword = () => setpageNum('4');

  const onClickUpload = () => {
    let fileInput = document.getElementById('profile');
    fileInput.click();
  };

  // 프로필 변경용 인풋
  const [profileInputs, setProfileInputs] = useState({
    userBirth: '',
    userEmail: '',
    userGender: '',
    userName: '',
    userNickname: '',
    userPhone: '',
    isProfile: 'true',
  });

  // 프로필 사진은 파일로 보내야해서 따로
  const [profilePicture, setProfilePicture] = useState(null);

  // 회원 정보의 프로필 사진
  const [userProfile, setUserProfile] = useState(null);

  const userProInfo = useSelector((state) => {
    return state.user.userProInfo;
  });

  // 유저프로필의 정보가 바뀔 때 인풋에 기본값을 넣어줌
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
      userProfile,
    } = userProInfo;
    const temp = {
      userBirth: userBirth,
      userEmail: userEmail,
      userGender: userGender,
      userName: userName,
      userNickname: userNickname,
      userPhone: userPhone,
      isProfile: 'true',
    };
    setProfileInputs({ ...temp });
    setUserProfile(userProfile);
    if (!userProfile) {
      setUserProfile(defaultImage);
      setProfileInputs((prevState) => ({
        ...prevState,
        isProfile: 'false',
      }));
    } else {
    }
  }, [userProInfo]);

  const [force, setForce] = useState('1');

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
    setForce(...force);
  };

  // 스낵스 목록 받아오기
  const [snacksPage, setSnacksPage] = useState(1);
  const [ref, inView] = useInView();

  const { snacksList } = useSelector((state) => state.user);
  const { hasMore } = useSelector((state) => state.user);

  useEffect(() => {
    if (snacksList.length === 0) {
      dispatch(fetchSnacks({ paramsNickname, snacksPage }));
    }
  }, [dispatch, paramsNickname]);

  useEffect(() => {
    if (snacksList.length !== 0 && inView && hasMore) {
      setSnacksPage((page) => {
        const newPage = page + 1;
        dispatch(fetchSnacks({ paramsNickname, newPage }));
        return page + 1;
      });
    }
  }, [inView]);

  // 나의 강의 목록 불러오기
  useEffect(() => {
<<<<<<< HEAD
    dispatch(fetchLectures());
=======
    dispatch(fetchMyLectures());
>>>>>>> develop/front
  }, [dispatch]);

  return (
    <ProfilePageBlock>
      <Side>
        <hr className="line" />
        <Profile src={userProfile}></Profile>
        <p>{paramsNickname}</p>
        <hr className="line" />
        <Menu>
          <SideBarButton onClick={onClickSnacks}>스낵스</SideBarButton>
          {myProfile === '1' && (
            <SideBarButton onClick={onClickMyList}>
              나의 강의 목록
            </SideBarButton>
          )}
          {myProfile === '1' && (
            <SideBarButton onClick={onClickChangeProfile}>
              프로필 수정
            </SideBarButton>
          )}
          {myProfile === '1' && (
            <SideBarButton onClick={onClickPassword}>
              비밀번호 변경
            </SideBarButton>
          )}
        </Menu>
        <hr className="line" style={{ marginTop: '1rem' }} />
      </Side>
      {pageNum === '1' && (
        <div className="item">
          <ul className="nonelist list">
<<<<<<< HEAD
            {snacksList.map((snacks) => (
              <li>
                <MySnacksItem key={snacks.snacksId} snacks={snacks} />
=======
            {snacksList.map((snacks, index) => (
              <li className="listItem">
                <MySnacksItem key={index} snacks={snacks} />
>>>>>>> develop/front
              </li>
            ))}
          </ul>
          <div ref={ref}>1</div>
        </div>
<<<<<<< HEAD
      )}
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
=======
>>>>>>> develop/front
      )}
      {pageNum === '2' && <LectureBox myLectures={myLectures} />}
      {pageNum === '3' && (
        <ChangeProfileBox>
          <Profile src={userProfile}></Profile>
          <AddCircleIcon className="addIcon" onClick={onClickUpload} />
          <ChangeProfileForm onSubmit={onSubmitProfile}>
            <input
              id="profile"
              type="file"
              onChange={onChangePicture}
              accept="image/*"
            />
            <p className="userId">{userProInfo.userId}</p>
            <p className="userNickname">{userProInfo.userNickname}</p>
            <div className="infoDiv">
              <EmailIcon className="icon" />
              <StyledInput
                name="userEmail"
                value={profileInputs.userEmail}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div className="infoDiv">
              <LocalPhoneIcon className="icon" />
              <StyledInput
                name="userPhone"
                value={profileInputs.userPhone}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div className="infoDiv">
              <PersonIcon className="icon" />
              <StyledInput
                name="userName"
                value={profileInputs.userName}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div className="infoDiv">
              <CalendarTodayIcon className="icon" />
              <StyledInput
                name="userBirth"
                type="date"
                value={profileInputs.userBirth}
                onChange={onChangeProfile}
                required
              />
            </div>
            <div className="infoDiv flexDiv">
              <div>
                <StyledLabel for="male">
                  남성<MaleIcon className="icon"></MaleIcon>
                </StyledLabel>
                <StyledInput id="male" type="radio" name="gender" value="1" />
              </div>
              <div>
                <StyledLabel for="female">
                  여성<FemaleIcon className="icon"></FemaleIcon>
                </StyledLabel>
                <StyledInput id="female" type="radio" name="gender" value="0" />
              </div>
            </div>
            <StyledButton>프로필 수정</StyledButton>
          </ChangeProfileForm>
        </ChangeProfileBox>
      )}
      {pageNum === '4' && (
        <ChangeProfileBox>
          <ChangeProfileForm>
            <hr className="top" />
            <div className="msg">
              안전한 비밀번호로 내정보를 보호하세요
              <br />
              다른 아이디/사이트에서 사용한 적 없는 비밀번호
              <br />
              이전에 사용한 적 없는 비밀번호가 안전합니다.
            </div>
            <hr className="bottom" />
            <div>
              <StyledLabel>현재 비밀번호</StyledLabel>
              <StyledInput className="normal" type="password" />
            </div>
            <div>
              <StyledLabel>새 비밀번호</StyledLabel>
              <StyledInput className="normal" type="password" />
            </div>
            <div>
              <StyledLabel>새 비밀번호 확인</StyledLabel>
              <StyledInput className="normal" type="password" />
            </div>
            <StyledButton>비밀번호 변경</StyledButton>
          </ChangeProfileForm>
        </ChangeProfileBox>
      )}
    </ProfilePageBlock>
  );
};

export default ProfilePage;
