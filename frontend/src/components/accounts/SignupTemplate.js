import React from 'react';
import styled from 'styled-components';

const SignupTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupBox = styled.div`
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

const SignupTemplate = ({ children }) => {
  return (
    <SignupTemplateBlock>
      <SignupBox>
        <p className="welcome">Welcome to Chukka!</p>
        <hr className="line" />
        {children}
      </SignupBox>
    </SignupTemplateBlock>
  );
};

export default SignupTemplate;
