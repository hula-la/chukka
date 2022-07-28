import client from './client';

// 회원 가입
export const signup = ({ userid, password, email, phoneNumber, nickname }) =>
  client.post('/accounts/signup', {
    userid,
    password,
    email,
    phoneNumber,
    nickname,
  });

// 로그인
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });
