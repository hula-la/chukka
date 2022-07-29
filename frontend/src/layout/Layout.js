import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  & .content {
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
