import client from './client';

export const getCartList = async () => {
  const res = await client.get(`cart/list/`);
  return res.data;
};

export const deleteCartItem = async (CartItemId) => {
  const res = await client.delete(`cart/${CartItemId}/`);
  return res;
};

export const insertCartItem = async (data) =>{
  const res = await client.post('cart/',data);
  return res;
}

export const user = async (userNickname) => {
  const res = await client.post('accounts/', { userNickname });
  return res;
};
