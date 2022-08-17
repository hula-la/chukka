import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { submitPicture } from '../../features/admin/adminActions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: 4rem auto;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  .line {
    border: 0;
    height: 1px;
    background: #ff2c55;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  input {
    /* width: 100%; */
  }
  .id-container {
    display: flex;
  }
  .profile-container {
    position: relative;
  }
  .profile-input {
    margin-top: 3rem;
  }
  .profile-icon {
    width: 6rem;
    height: 6rem;
    position: absolute;
    left: 7rem;
    cursor: pointer;
    transition: 300ms;
    :hover {
      opacity: 0.8;
    }
  }
  .profile-name {
    margin-top: 2rem;
  }
  & input[type='file'] {
    visibility: hidden;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  color: #ffffff;
  border: none;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem 1rem 1rem;
  outline-color: #ffffff;
  width: 70%;
  display: inline;
  background-color: #3b3b3b;
  border-radius: 0.5rem;
`;

const StyledLabel = styled.label`
  line-height: 2.7rem;
`;

const StyledButton = styled.button`
  border: none;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
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
const onClickUpload = () => {
  let fileInput = document.getElementById('profile');
  fileInput.click();
};

const AdminInsProfile = () => {
  const dispatch = useDispatch();
  // 프로필 사진 s3에 제출하기
  const [profileInsId, setProfileInsId] = useState('');

  const [insProfile, setProfile] = useState(null);
  const onChangeId = (e) => {
    console.log(e.target.value);
    setProfileInsId(e.target.value);
  };

  const onChangeProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const onSubmitPicture = (e) => {
    e.preventDefault();
    dispatch(submitPicture({ profileInsId, insProfile }));
  };
  return (
    <Wrapper>
      <ProfileForm onSubmit={onSubmitPicture}>
        <h1>강사 프로필 사진</h1>
        <hr className="line" />
        <div className='id-container'>
          <StyledLabel for="userId">아이디</StyledLabel>
          <StyledInput id="userId" onChange={onChangeId} required placeholder='강사 아이디를 입력하세요' autoComplete='off'/>
        </div>
        <div className='profile-container'>
          <AddPhotoAlternateIcon className='profile-icon' onClick={onClickUpload}></AddPhotoAlternateIcon>
          <input className='profile-input' onChange={onChangeProfile} type="file" id="profile" />
        </div>
        <div className='profile-name'>선택된 파일이 없습니다</div>
        <StyledButton>제출</StyledButton>
      </ProfileForm>
    </Wrapper>
  );
};

export default AdminInsProfile;
