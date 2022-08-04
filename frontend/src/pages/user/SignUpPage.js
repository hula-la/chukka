import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/user/userActions';
import { idCheck, nickCheck } from '../../api/user';

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

const SignUpPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const [signUpInputs, setSignUpInputs] = useState({
    userId: '',
    userName: '',
    userNickname: '',
    userPw: '',
    userPwConfirm: '',
    userEmail: '',
    userPhone: '',
    userBirth: '',
    userGender: 0,
    userProfile: 'img/profile.png',
  });
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNickChecked, setIsNickChecked] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...signUpInputs,
      [name]: value,
    };
    if (name === 'userNickname') {
      setIsNickChecked(false);
    } else if (name === 'userId') {
      setIsIdChecked(false);
    }
    setSignUpInputs(nextInputs);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // 회원가입 form Submit -> 유효성 검사 하고 dispatch
    if (signUpInputs.userPw === signUpInputs.userPwConfirm) {
      try {
        dispatch(registerUser(signUpInputs));
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('패스워드가 다릅니다!');
    }
  };
  return (
    <SignupTemplateBlock>
      <SignupBox>
        <p className="welcome">Welcome to Chukka!</p>
        <hr className="line" />
        <form onSubmit={onSubmit}>
          <div>
            <StyledLabel>아이디</StyledLabel>
            <StyledInput name="userId" onChange={onChange} required />
            <button
              onClick={async (e) => {
                e.preventDefault();
                const { statusCode } = await idCheck(signUpInputs.userId);
                if (statusCode === 200) {
                  alert('굿!');
                  setIsIdChecked(true);
                } else if (statusCode === 401) {
                  alert('아이디 중복!');
                  setIsIdChecked(false);
                }
              }}
            >
              중복검사
            </button>
          </div>
          <div>
            <StyledLabel>닉네임</StyledLabel>
            <StyledInput name="userNickname" onChange={onChange} required />
            <button
              onClick={async (e) => {
                e.preventDefault();
                const { statusCode } = await nickCheck(
                  signUpInputs.userNickname,
                );
                console.log(statusCode);
                if (statusCode === 200) {
                  alert('굿!');
                  setIsNickChecked(true);
                } else if (statusCode === 401) {
                  alert('닉네임 중복!');
                  setIsNickChecked(false);
                }
              }}
            >
              중복검사
            </button>
          </div>
          <div>
            <StyledLabel>비밀번호</StyledLabel>
            <StyledInput
              name="userPw"
              type="password"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <StyledLabel>비밀번호 확인</StyledLabel>
            <StyledInput
              name="userPwConfirm"
              type="password"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <StyledLabel>이름</StyledLabel>
            <StyledInput name="userName" onChange={onChange} required />
          </div>
          <div>
            <StyledLabel>이메일</StyledLabel>
            <StyledInput
              name="userEmail"
              type="email"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <StyledLabel>휴대폰 번호</StyledLabel>
            <StyledInput name="userPhone" onChange={onChange} required />
          </div>
          <div>
            <StyledLabel>생년 월일</StyledLabel>
            <StyledInput
              name="userBirth"
              type="date"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <StyledLabel>성별</StyledLabel>
            <select name="gender">
              <option value="1">남성</option>
              <option value="0">여성</option>
            </select>
          </div>
          <StyledButton disabled={!isIdChecked || !isNickChecked}>
            회원가입
          </StyledButton>
        </form>
      </SignupBox>
    </SignupTemplateBlock>
  );
};

export default SignUpPage;
