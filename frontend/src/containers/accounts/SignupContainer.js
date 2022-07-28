import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup } from '../../modules/signup';
import SignupForm from '../../components/accounts/SignupForm';

const SignupContainer = () => {
  const dispatch = useDispatch();
  const { form, accounts, accountsError } = useSelector(({ signup }) => ({
    form: signup.signup,
    accounts: signup.accounts,
    accountsError: signup.accountsError,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'signup',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, password, passwordConfirm, email, phoneNumber, nickname } =
      form;
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(signup({ userId, password, email, phoneNumber, nickname }));
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (accountsError) {
      console.log('오류 발생');
      console.log(accountsError);
      return;
    }
    if (accounts) {
      console.log('회원가입 성공');
      console.log(accounts);
    }
  }, [accounts, accountsError]);

  return (
    <SignupForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default SignupContainer;
