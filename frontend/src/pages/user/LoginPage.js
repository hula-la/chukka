import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/user/userActions';
import { useCookies } from 'react-cookie';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const LoginTemplateBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 4rem;
`;

const LoginBox = styled.div`
  .greeting {
    font-size: 1.9rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .welcome {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.2rem;
    font-weight: bolder;
    /* letter-spacing: 2px; */
    /* text-align: center; */
  }
  .line {
    border: 0;
    height: 2px;
    background: #ff2c55;
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  width: 250px;
`;

const LoginFormBlock = styled.div`
  & input {
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
  }
  & input:hover {
    border-color: #ff2c55;
  }
  & input[type='checkbox'] {
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
    cursor: pointer;
  }
  & label {
    font-size: small;
    text-align: left;
  }
  & label > svg {
    height: 1.2rem;
    vertical-align: middle;
  }
  .rediv {
    height: 1rem;
    margin-bottom: 1rem;
    float: right;
  }
  & label.remember {
    font-size: 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  & button {
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    /* font-weight: bold; */
    padding: 0.5rem 1rem;
    margin: 1rem 0rem;
    background-color: #ff2c55;
    color: #ffffff;
    outline: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.5;
    transition: 500ms;
  }
  & button:hover {
    opacity: 1;
    font-weight: bold;
  }
  .linkdiv {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 2rem;
  }
  .link {
    font-size: 0.75rem;
    transition: 500ms;
    opacity: 0.7;
  }
  .link:hover {
    font-weight: bold;
    opacity: 1;
    font-size: 1rem;
    color: #ff2c55;
  }
`;

const LoginTemplate = ({ children }) => {
  return (
    <LoginTemplateBlock>
      <img src="/img/dance.png" alt="loginImg" width={600} />
      <LoginBox>
        <p className="greeting">WELCOME BACK!</p>
        <p className="welcome">Login to your account</p>
        <hr className="line" />
        {children}
      </LoginBox>
    </LoginTemplateBlock>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginInputs, setLoginInputs] = useState({
    userId: '',
    userPw: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies(['rememberUser']);
  const [isRember, setIsRemember] = useState(false);

  useEffect(() => {
    if (cookies.rememberUser !== undefined) {
      const { userId, userPw } = cookies.rememberUser;
      setLoginInputs({
        ...loginInputs,
        userID: userId,
        userPw: userPw,
      });
      setIsRemember(true);
    }
  }, []);

  const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      setCookie('rememberUser', loginInputs, { maxAge: 2000 });
    }
    if (!e.target.checked) {
      removeCookie('rememberUser');
    }
  };

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
    navigate('/lectures');
  };

  return (
    <LoginFormBlock>
      <form onSubmit={onSubmit}>
        <div>
          <label for="userId">
            아이디 <PersonIcon />
          </label>
          <input
            id="userId"
            name="userId"
            defaultValue={loginInputs.userID}
            onChange={onChange}
            placeholder="아이디를 입력하세요"
            autoComplete="off"
          />
        </div>
        <div>
          <label for="userPw">
            비밀번호 <LockIcon />
          </label>
          <input
            id="userPw"
            name="userPw"
            type="password"
            defaultValue={loginInputs.userPw}
            onChange={onChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="rediv">
          <label for="remember" className="remember">
            Remember me
          </label>
          <input
            id="remember"
            type="checkbox"
            checked={isRember}
            onChange={handleOnChange}
          />
        </div>
        <button>LOGIN</button>
        <div className="linkdiv">
          <Link to="/accounts/password" className="link">
            비밀번호 찾기
          </Link>
          <Link to="/accounts/signup" className="link">
            회원가입하기
          </Link>
        </div>
      </form>
    </LoginFormBlock>
  );
};

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (userInfo) {
      navigate(from, { replace: true });
    }
  }, userInfo);
  return (
    <LoginTemplate>
      <LoginForm />
    </LoginTemplate>
  );
};

export default LoginPage;
