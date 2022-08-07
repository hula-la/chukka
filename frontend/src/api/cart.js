import client from './client';


export const getCartList = async (userId) => {
  const res = await client.get(`cart/${userId}/`);
  console.log(res);
  return res.data;
};


export const deleteCartItem = async (CartItemId) => {
  const res = await client.delete(`cart/${CartItemId}/`);
  return res;
};

