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
import { useCallback } from 'react';

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

const ErrorMessage = styled.div`
  font-size: smaller;
  margin-bottom: 2.5rem;
  .success {
    color: #696565;
  }
  .error {
    color: #ff000091;
  }
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

  // 아이디, 닉네임 중복검사
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNickChecked, setIsNickChecked] = useState(false);

  // 회원가입 인풋
  const [userId, setUserId] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userPwConfirm, setUserPwConfirm] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userGender, setUserGender] = useState('0');
  const [userProfile, setUserProfile] = useState('img/profile.png');

  // 오류메세지 상태저장
  const [userIdMessage, setUserIdMessage] = useState('');
  const [userNicknameMessage, setUserNicknameMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState('');
  const [userNameMessage, setUserNameMessage] = useState('');
  const [userEmailMessage, setUserEmailMessage] = useState('');
  const [userPhoneMessage, setUserPhoneMessage] = useState('');

  // 유효성 검사
  const [isuserId, setIsUserId] = useState(false);
  const [isuserNickname, setIsUserNickname] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isuserName, setIsUserName] = useState(false);
  const [isuserEmail, setIsUserEmail] = useState(false);
  const [isuserPhone, setIsUserPhone] = useState(false);

  // 아이디
  const onChangeId = useCallback(async (e) => {
    const idRegex = /\w{4,16}$/;
    const idCurrent = e.target.value;
    const { statusCode } = await idCheck(idCurrent);
    setUserId(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setUserIdMessage('숫자 + 영문자 조합으로 4자리에서 16자리');
      setIsUserId(false);
    } else if (statusCode === 401) {
      setUserIdMessage('중복된 아이디입니다!!');
      setIsIdChecked(false);
    } else if (statusCode === 200) {
      setUserIdMessage('올바른 아이디 형식입니다 :)');
      setIsIdChecked(true);
      setIsUserId(true);
    }
  }, []);

  // 닉네임
  const onChangeNickname = useCallback(async (e) => {
    const nicknameRegex = /\w{2,16}$/;
    const nicknameCurrent = e.target.value;
    const { statusCode } = await nickCheck(nicknameCurrent);
    setUserNickname(nicknameCurrent);
    if (!nicknameRegex.test(nicknameCurrent)) {
      setUserNicknameMessage('2글자 이상 16글자 이하로 입력해주세요!');
      setIsUserNickname(false);
    } else if (statusCode === 401) {
      setUserNicknameMessage('중복된 닉네임입니다!');
      setIsNickChecked(false);
    } else if (statusCode === 200) {
      setUserNicknameMessage('올바른 닉네임 형식입니다 :)');
      setIsNickChecked(true);
      setIsUserNickname(true);
    }
  }, []);

  // 비밀번호
  const onChangePw = useCallback((e) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const pwCurrent = e.target.value;
    setUserPw(pwCurrent);

    if (!pwRegex.test(pwCurrent)) {
      setPwMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPw(false);
    } else {
      setPwMessage('안전한 비밀번호에요 :)');
      setIsPw(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePwConfirm = useCallback(
    (e) => {
      const pwConfirmCurrent = e.target.value;
      setUserPwConfirm(pwConfirmCurrent);
      console.log(userPw);
      if (userPw === pwConfirmCurrent) {
        setPwConfirmMessage('비밀번호를 똑같이 입력했어요 :)');
        setIsPwConfirm(true);
      } else {
        setPwConfirmMessage('비밀번호가 다릅니다!');
        setIsPwConfirm(false);
      }
    },
    [userPw],
  );

  // 이름
  const onChangeName = useCallback((e) => {
    const nameCurrent = e.target.value;
    setUserName(nameCurrent);
    if (nameCurrent.length < 2) {
      setUserNameMessage('2글자 이상 입력해주세요!');
      setIsUserName(false);
    } else {
      setUserNameMessage('올바른 이름 형식이에요 :)');
      setIsUserName(true);
    }
  });

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setUserEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setUserEmailMessage('올바른 이메일 형식이 아닙니다!');
      setIsUserEmail(false);
    } else {
      setUserEmailMessage('올바른 이메일 형식이에요 :)');
      setIsUserEmail(true);
    }
  });

  // 휴대폰 번호
  const onChangePhone = useCallback((e) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const phoneCurrent = e.target.value;
    setUserPhone(phoneCurrent);
    if (!phoneRegex.test(phoneCurrent)) {
      setUserPhoneMessage('올바른 휴대폰 번호가 아닙니다!');
      setIsUserPhone(false);
    } else {
      setUserPhoneMessage('올바른 휴대폰 형식이에요 :)');
      setIsUserPhone(true);
    }
  });

  // 생년월일
  const onChangeBirth = useCallback((e) => {
    setUserBirth(e.target.value);
  });

  // 성별
  const onChangeGender = useCallback((e) => {
    setUserGender(e.target.value);
  });

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(
        registerUser({
          userId,
          userNickname,
          userPw,
          userName,
          userEmail,
          userPhone,
          userBirth,
          userGender,
          userProfile,
        }),
      );
    } catch (e) {
      console.log(e);
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
              onChange={onChangeId}
              required
              placeholder="아이디를 입력하세요"
              autoComplete="off"
            />
            {userId.length > 0 && (
              <ErrorMessage>
                <div className={isuserId && isIdChecked ? 'success' : 'error'}>
                  {userIdMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userNickname">
              닉네임 <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userNickname"
              name="userNickname"
              onChange={onChangeNickname}
              required
              placeholder="닉네임을 입력하세요"
              autoComplete="off"
            />
            {userNickname.length > 0 && (
              <ErrorMessage>
                <div
                  className={
                    isuserNickname && isNickChecked ? 'success' : 'error'
                  }
                >
                  {userNicknameMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userPw">
              비밀번호 <LockIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPW"
              name="userPw"
              type="password"
              onChange={onChangePw}
              required
              placeholder="비밀번호를 입력하세요"
            />
            {userPw.length > 0 && (
              <ErrorMessage>
                <div className={isPw ? 'success' : 'error'}>{pwMessage}</div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userPwConfirm">
              비밀번호 확인 <EnhancedEncryptionIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPwConfirm"
              name="userPwConfirm"
              type="password"
              onChange={onChangePwConfirm}
              required
              placeholder="비밀번호를 다시 입력하세요"
            />
            {userPwConfirm.length > 0 && (
              <ErrorMessage>
                <div className={isPwConfirm ? 'success' : 'error'}>
                  {pwConfirmMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userName">
              이름 <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userName"
              name="userName"
              onChange={onChangeName}
              required
              placeholder="이름을 입력하세요"
              autoComplete="off"
            />
            {userName.length > 0 && (
              <ErrorMessage>
                <div className={isuserName ? 'success' : 'error'}>
                  {userNameMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userEmail">
              이메일 <AlternateEmailIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userEmail"
              name="userEmail"
              type="email"
              onChange={onChangeEmail}
              required
              placeholder="이메일을 입력하세요"
              autoComplete="off"
            />
            {userEmail.length > 0 && (
              <ErrorMessage>
                <div className={isuserEmail ? 'success' : 'error'}>
                  {userEmailMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userPhone">
              휴대폰 번호 <LocalPhoneIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPhone"
              name="userPhone"
              onChange={onChangePhone}
              required
              placeholder="휴대폰 번호를 입력하세요"
              autoComplete="off"
            />
            {userPhone.length > 0 && (
              <ErrorMessage>
                <div className={isuserPhone ? 'success' : 'error'}>
                  {userPhoneMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userBirth">
              생년월일 <CalendarTodayIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userBirth"
              name="userBirth"
              type="date"
              onChange={onChangeBirth}
              required
            />
          </div>
          <div className="genderdiv">
            <div>
              <StyledLabel for="male">
                남성<MaleIcon className="icon"></MaleIcon>
              </StyledLabel>
              <StyledInput
                id="male"
                type="radio"
                name="userGender"
                value="0"
                checked={userGender === '0'}
                onChange={onChangeGender}
              />
            </div>
            <div>
              <StyledLabel for="female">
                여성<FemaleIcon className="icon"></FemaleIcon>
              </StyledLabel>
              <StyledInput
                id="female"
                type="radio"
                name="userGender"
                value="1"
                checked={userGender === '1'}
                onChange={onChangeGender}
              />
            </div>
          </div>
          <StyledButton
            disabled={
              !isIdChecked ||
              !isNickChecked ||
              !isuserId ||
              !isuserNickname ||
              !isPw ||
              !isPwConfirm ||
              !isuserName ||
              !isuserEmail ||
              !isuserPhone
            }
          >
            JOIN
          </StyledButton>
        </form>
      </SignupBox>
    </SignupTemplateBlock>
  );
};

export default SignUpPage;
