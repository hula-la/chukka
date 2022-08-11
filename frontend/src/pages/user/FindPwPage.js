import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { findPw } from '../../features/user/userActions';
import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 0.5rem;
  color: #ffffff;
  border-color: #ffffff;
  border-width: thin;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  outline-color: #ffffff;
  width: 98%;
  height: 2rem;
  background-color: #0b0b0b;
  transition: 300ms;
  :hover {
    border-color: #ff2c55;
  }

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
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin: 1rem 0rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.5;
  transition: 500ms;
  :hover {
    opacity: 1;
    font-weight: bold;
  }
`;
const FindPwTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FindPwBox = styled.div`
  .welcome {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 3rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  .line {
    border: 0;
    height: 2px;
    background: #ff2c55;
    width: 100%;
    margin: 2rem 0;
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
            <StyledLabel for="userId">아이디</StyledLabel>
            <StyledInput id="userId" name="userId" onChange={onChange} required placeholder='아이디를 입력하세요' autoComplete='off'/>
            <StyledLabel for="userEmail">이메일</StyledLabel>
            <StyledInput
              id="userEmail"
              name="userEmail"
              type="email"
              onChange={onChange}
              required
              placeholder='이메일을 입력하세요'
              autoComplete='off'
            />
            <StyledButton>비밀번호 찾기</StyledButton>
          </div>
        </form>
      </FindPwBox>
    </FindPwTemplateBlock>
  );
};

export default FindPw;
