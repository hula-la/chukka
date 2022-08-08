import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { findPw } from '../../features/user/userActions';
import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 1rem;
  color: #ffffff;
  border-color: #ffffff;
  border-width: thin;
  border-radius: 5px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  outline-color: #ffffff;
  width: 98%;
  background-color: #0b0b0b;

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  &[type='date'] {
  }
`;

const StyledLabel = styled.label`
  font-size: small;
  text-align: left;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: small;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  width: 100%;
`;
const FindPwTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FindPwBox = styled.div`
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

const FindPw = () => {
  const dispatch = useDispatch();

  const [findPwInfo, setFindPwInfo] = useState({
    userId: '',
    userEmail: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...findPwInfo,
      [name]: value,
    };
    setFindPwInfo(nextInputs);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(findPw(findPwInfo));
  };

  return (
    <FindPwTemplateBlock>
      <FindPwBox>
        <p className="welcome">비밀번호 찾기</p>
        <hr className="line" />
        <form onSubmit={onSubmit}>
          <div>
            <StyledLabel>아이디</StyledLabel>
            <StyledInput name="userId" onChange={onChange} required />
            <StyledLabel>이메일</StyledLabel>
            <StyledInput
              name="userEmail"
              type="email"
              onChange={onChange}
              required
            />
            <StyledButton>비밀번호 찾기</StyledButton>
          </div>
        </form>
      </FindPwBox>
    </FindPwTemplateBlock>
  );
};

export default FindPw;
