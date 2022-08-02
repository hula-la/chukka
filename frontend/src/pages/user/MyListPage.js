import React from 'react';
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

const MyListPage = () => {
  return <MyListBlock></MyListBlock>;
};

export default MyListPage;
