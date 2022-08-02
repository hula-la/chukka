import React from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';

const ChangeProfileBlock = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`;

const PasswordPage = () => {
  return (
    <ChangeProfileBlock>
      <SideBar />
      <h3>프로필설정</h3>
    </ChangeProfileBlock>
  );
};

export default PasswordPage;
