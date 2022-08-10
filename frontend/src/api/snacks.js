import client from './client';

export const fsnacks = async (data) => {
  console.log(data);
  const res = await client.get(`snacks/`, {
    params: { number: 2, size: 3 },
  });
  console.log(res);
  return res;
};
