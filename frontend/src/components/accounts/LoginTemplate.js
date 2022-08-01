import React from 'react';
import styled from 'styled-components';

const LoginTemplateBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  .welcome {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.3rem;
    font-weight: bolder;
    letter-spacing: 2px;
    text-align: center;
  }
  .line {
    border: 0;
    height: 2px;
    background: #ff2c55;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  width: 250px;
`;

const LoginTemplate = ({ children }) => {
  return (
    <LoginTemplateBlock>
      <img src="/img/login.png" alt="loginImg" />
      <LoginBox>
        <p>welcome back!</p>
        <p className="welcome">Login to your account</p>
        <hr className="line" />
        {children}
      </LoginBox>
    </LoginTemplateBlock>
  );
};

export default LoginTemplate;
