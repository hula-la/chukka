import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/user/userActions';

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

const LoginForm = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const [loginInputs, setLoginInputs] = useState({
    userId: '',
    userPw: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // 로그인 form Submit
    dispatch(userLogin(loginInputs));
  };

  return (
    <LoginFormBlock>
      <form onSubmit={onSubmit}>
        <div>
          <label>아이디</label>
          <input name="userId" onChange={onChange} />
        </div>
        <div>
          <label>비밀번호</label>
          <input name="userPw" type="password" onChange={onChange} />
        </div>
        <div>
          <p>Remember me?</p>
          <input type="checkbox" />
          <Link to="/accounts/password">비밀번호 까먹음?</Link>
        </div>
        <button>로그인</button>

        <div>
          <Link to="/accounts/signup">회원가입하기</Link>
        </div>
      </form>
    </LoginFormBlock>
  );
};

const LoginPage = () => {
  return (
    <LoginTemplate>
      <LoginForm />
    </LoginTemplate>
  );
};

export default LoginPage;
