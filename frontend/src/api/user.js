import client from './client';

export const login = async (data) => {
  const res = await client.post('accounts/login/', data);
  return res;
};

export const register = async (data) => {
  const res = await client.post('accounts/signup/', data);
  return res;
};

export const getToken = async (userId, refreshToken) => {
  const config = {
    headers: {
      'refresh-token': `${refreshToken}`,
    },
  };
  const res = await client.post('accounts/refresh/', userId, config);
  return res.data;
};

export const idCheck = async (userId) => {
  const res = await client.get(`accounts/checkid/${userId}/`);
  return res.data;
};
export const nickCheck = async (userNickname) => {
  const res = await client.get(`accounts/checkid/${userNickname}/`);
  return res.data;
};

export const fetchPro = async (data) => {
  const userNickname = data.paramsNickname;
  const res = await client.post(`accounts/`, { userNickname });
  return res;
};

export const find = async (data) => {
  const res = await client.post('accounts/password', data);
  return res;
};

export const change = async (profileInputs, profilePicture) => {
  const formData = new FormData();
  formData.append('file', profilePicture);
  formData.append(
    'modifyInfo',
    new Blob([JSON.stringify(profileInputs)], { type: 'application/json' }),
  );
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.put(`accounts/`, formData, config);
  return res;
};

export const changePw = async (pwInfo) => {
  const res = await client.put('accounts/password', pwInfo);
  return res;
};

export const snacks = async (paramsNickname, snacksPage) => {
  const res = await client.get(`snacks/${paramsNickname}`, {
    params: { page: snacksPage, size: 8 },
  });

  return res;
};

export const myLectures = async () => {
  const res = await client.get(`accounts/mylectures/`);
  return res;
};

export const insLectures = async () => {
  const res = await client.get('accounts/myteach/');
  return res;
};
