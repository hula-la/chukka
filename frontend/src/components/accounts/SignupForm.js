import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/users/userActions';

const SignupFormBlock = styled.div``;

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

const SignupForm = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    userId: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phoneNumber: '',
    birthDay: '',
  });
  // const {
  //   userId,
  //   nickName,
  //   password,
  //   passwordConfirm,
  //   email,
  //   phoneNumber,
  //   birthDay,
  // } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };
    setInputs(nextInputs);
    console.log(inputs);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(registerUser(inputs));
    // dispatch('');
    // console.log(inputs);
    dispatch(registerUser(inputs));
  };
  return (
    <SignupFormBlock>
      <form onSubmit={onSubmit}>
        <div>
          <StyledLabel>아이디</StyledLabel>
          <StyledInput name="userId" onChange={onChange} />
        </div>
        <div>
          <StyledLabel>닉네임</StyledLabel>
          <StyledInput name="nickName" onChange={onChange} />
        </div>
        <div>
          <StyledLabel>비밀번호</StyledLabel>
          <StyledInput name="password" type="password" onChange={onChange} />
        </div>

        <div>
          <StyledLabel>비밀번호 확인</StyledLabel>
          <StyledInput
            name="passwordConfirm"
            type="password"
            onChange={onChange}
          />
        </div>

        <div>
          <StyledLabel>이메일</StyledLabel>
          <StyledInput name="email" type="email" onChange={onChange} />
        </div>

        <div>
          <StyledLabel>휴대폰 번호</StyledLabel>
          <StyledInput name="phoneNumber" onChange={onChange} />
        </div>

        <div>
          <StyledLabel>생년 월일</StyledLabel>
          <StyledInput name="birthDay" type="date" onChange={onChange} />
        </div>

        <StyledButton>회원가입</StyledButton>
      </form>
    </SignupFormBlock>
  );
};

export default SignupForm;
