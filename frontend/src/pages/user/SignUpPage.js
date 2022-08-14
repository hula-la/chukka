import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/user/userActions';
import { idCheck, nickCheck } from '../../api/user';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const StyledInput = styled.input`
  font-size: 0.75rem;
  color: #ffffff;
  border-color: #ffffff;
  border-width: thin;
  border-radius: 5px;
  padding: 0.3rem 0.8rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  outline-color: #ffffff;
  width: 98%;
  height: 2.5rem;
  background-color: #0b0b0b;
  transition: 300ms;
  &[type='radio'] {
    width: 1.5rem;
    vertical-align: middle;
    margin-left: 0.5rem;
  }
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
  /* font-size: small; */
  font-size: 0.75rem;
  text-align: left;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  width: 50%;
  margin-left: 10rem;
  opacity: 0.5;
  transition: 500ms;
  :hover {
    opacity: 1;
    font-weight: bold;
  }
`;
const SignupTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupBox = styled.div`
  .welcome {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 2rem;
    margin-bottom: 0;
    text-align: center;
  }
  #gender {
    display: block;
  }
  #male {
    margin-right: 2rem;
  }
  .line {
    border: 0;
    height: 2px;
    background: #ff2c55;
    width: 100%;
    margin-bottom: 2rem;
    margin-top: 1.5rem;
  }
  & form > div {
    margin: 0 10rem;
    width: 50%;
  }
  .icon {
    vertical-align: middle;
    width: 1rem;
  }
  .genderdiv {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  width: 40rem;
`;

const SignUpPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/lectures');
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
        <p className="welcome">WELCOME TO CHUKKA</p>
        <hr className="line" />
        <form onSubmit={onSubmit}>
          <div>
            <StyledLabel for="userId">
              아이디 <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userId"
              name="userId"
              onChange={onChange}
              required
              placeholder="아이디를 입력하세요"
              autoComplete="off"
            />
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
            <StyledLabel for="userNickname">
              닉네임 <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userNickname"
              name="userNickname"
              onChange={onChange}
              required
              placeholder="닉네임을 입력하세요"
              autoComplete="off"
            />
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
            <StyledLabel for="userPw">
              비밀번호 <LockIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPW"
              name="userPw"
              type="password"
              onChange={onChange}
              required
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div>
            <StyledLabel for="userPwConfirm">
              비밀번호 확인 <EnhancedEncryptionIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPwConfirm"
              name="userPwConfirm"
              type="password"
              onChange={onChange}
              required
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          <div>
            <StyledLabel for="userName">
              이름 <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userName"
              name="userName"
              onChange={onChange}
              required
              placeholder="이름을 입력하세요"
              autoComplete="off"
            />
          </div>
          <div>
            <StyledLabel for="userEmail">
              이메일 <AlternateEmailIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userEmail"
              name="userEmail"
              type="email"
              onChange={onChange}
              required
              placeholder="이메일을 입력하세요"
              autoComplete="off"
            />
          </div>
          <div>
            <StyledLabel for="userPhone">
              휴대폰 번호 <LocalPhoneIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPhone"
              name="userPhone"
              onChange={onChange}
              required
              placeholder="휴대폰 번호를 입력하세요"
              autoComplete="off"
            />
          </div>
          <div>
            <StyledLabel for="userBirth">
              생년월일 <CalendarTodayIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userBirth"
              name="userBirth"
              type="date"
              onChange={onChange}
              required
            />
          </div>
<<<<<<< HEAD
          <div className='genderdiv'>
            <div>
              <StyledLabel for="male">남성<MaleIcon className='icon'></MaleIcon></StyledLabel>
              <StyledInput id="male" type="radio" name="gender" value="1" checked/>
            </div>
            <div>
              <StyledLabel for="female">여성<FemaleIcon className='icon'></FemaleIcon></StyledLabel>
              <StyledInput id="female" type="radio" name="gender" value="0"/>
=======
          <div className="genderdiv">
            <div>
              <StyledLabel for="male">
                남성<MaleIcon className="icon"></MaleIcon>
              </StyledLabel>
              <StyledInput
                id="male"
                type="radio"
                name="gender"
                value="1"
                checked
              />
            </div>
            <div>
              <StyledLabel for="female">
                여성<FemaleIcon className="icon"></FemaleIcon>
              </StyledLabel>
              <StyledInput id="female" type="radio" name="gender" value="0" />
>>>>>>> develop/front
            </div>
          </div>
          <StyledButton disabled={!isIdChecked || !isNickChecked}>
            JOIN
          </StyledButton>
        </form>
      </SignupBox>
    </SignupTemplateBlock>
  );
};

export default SignUpPage;
