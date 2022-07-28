import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginFormBlock = styled.div`
  & input {
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
  }
  & label {
    font-size: small;
    text-align: left;
  }

  & button {
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
  }
`;

const LoginForm = () => {
  return (
    <LoginFormBlock>
      <form>
        <div>
          <label>아이디</label>
          <input />
        </div>
        <div>
          <label>비밀번호</label>
          <input />
        </div>
        <div>
          <p>Remember me?</p>
          <input type="checkbox" />
          <Link to="/">비밀번호 까먹음?</Link>
        </div>
        <button>로그인</button>

        <div>
          <Link to="/accounts/signup">회원가입하기</Link>
        </div>
      </form>
    </LoginFormBlock>
  );
};

export default LoginForm;
