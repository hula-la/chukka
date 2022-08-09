import client from './client';

export const fsnacks = async (data) => {
  const res = await client.get(`snacks/`, {
    params: { pageNum: data, size: 3 },
  });
  return res;
};
