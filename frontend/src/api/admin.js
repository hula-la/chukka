import client from './client';

export const fetchUser = async () => {
  const res = await client.get('admin/accounts/');
  return res;
};

export const drop = async (data) => {
  const res = await client.delete(`admin/accounts/${data}/`);
  return res;
};

export const change = async ({ userId, userType }) => {
  const res = await client.put(`admin/accounts/${userId}/${userType}/`);
  return res;
};

export const fetchInst = async () => {
  const res = await client.get('admin/instructors/');
  return res;
};

export const insInfo = async (data) => {
  const res = await client.put('admin/instrutors/', data);
  return res;
};
