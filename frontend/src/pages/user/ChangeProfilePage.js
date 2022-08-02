import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';

const ChangeProfileBlock = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`;

const ChangeProfilePage = () => {
  return (
    <ChangeProfileBlock>
      <SideBar />
      <h3>프로필설정</h3>
    </ChangeProfileBlock>
  );
};

export default ChangeProfilePage;
