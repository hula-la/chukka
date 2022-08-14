import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { submitPicture } from '../../features/admin/adminActions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
  margin: auto;
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
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  border: none;
  width: 100%;
  border-radius: 4px;
  font-size: small;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
`;

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
        <p>프로필 사진</p>
        <hr className="line" />
        <div>
          <label>아이디</label>
          <input onChange={onChangeId} required />
        </div>
        <input onChange={onChangeProfile} type="file" />
        <StyledButton>제출</StyledButton>
      </ProfileForm>
    </Wrapper>
  );
};

export default AdminInsProfile;
