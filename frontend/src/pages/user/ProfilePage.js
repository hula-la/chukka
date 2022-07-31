import React from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';

const ProfilePageBlock = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfilePage = () => {
  return (
    <ProfilePageBlock>
      <SideBar />
      <h1>MY Shorts</h1>
    </ProfilePageBlock>
  );
};

export default ProfilePage;
