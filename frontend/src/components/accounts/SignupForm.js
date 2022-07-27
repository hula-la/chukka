import React from 'react';
import styled from 'styled-components';

const SignupFormBlock = styled.div``;

const StyledInput = styled.input`
  font-size: 1rem;
  color: #ffffff;
  border-color: #ffffff;
  border-width: thin;
  border-radius: 5px;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  outline-color: #ffffff;
  width: 98%;
  background-color: #0b0b0b;
`;

const StyledLabel = styled.label`
  font-size: small;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: small;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  width: 100%;
`;

const SignupForm = () => {
  return (
    <SignupFormBlock>
      <form>
        <StyledLabel>아이디</StyledLabel>
        <br />
        <StyledInput />
        <br />
        <StyledLabel>닉네임</StyledLabel>
        <br />
        <StyledInput />
        <br />
        <StyledLabel>비밀번호</StyledLabel>
        <br />
        <StyledInput type="password" />
        <br />
        <StyledLabel>비밀번호 확인</StyledLabel>
        <br />
        <StyledInput type="password" />
        <br />
        <StyledLabel>이메일</StyledLabel>
        <br />
        <StyledInput type="email" />
        <br />
        <StyledLabel>휴대폰 번호</StyledLabel>
        <br />
        <StyledInput />
        <br />
        <StyledButton>회원가입</StyledButton>
      </form>
    </SignupFormBlock>
  );
};

export default SignupForm;
