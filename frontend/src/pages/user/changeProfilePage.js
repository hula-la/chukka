import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';

const ChangeProfileBlock = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChangeProfilePage = () => {
  return (
    <ChangeProfileBlock>
      <SideBar />
    </ChangeProfileBlock>
  );
};

export default ChangeProfilePage;
