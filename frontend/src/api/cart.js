import client from './client';

export const getCartList = async (userId) => {
  const res = await client.get(`cart/${userId}/`);
  return res.data;
};

export const deleteCartItem = async (CartItemId) => {
  const res = await client.delete(`cart/${CartItemId}/`);
  return res;
};

export const user = async (userNickname) => {
  const res = await client.post('accounts/', { userNickname });
  return res;
};
