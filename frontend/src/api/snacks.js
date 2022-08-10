import client from './client';

export const fsnacks = async (data) => {
  const res = await client.get(`snacks/`, {
    params: { page: data, size: 3 },
  });
  // console.log(res);
  return res;
};

export const fTags = async () => {
  const res = await client.get('snacks/tag/popular');
  console.log(res);
  return res;
};

export const freply = async (data) => {
  const res = await client.get(`snacks/${data}/reply`);
  console.log(res);
  return res;
};

export const creply = async (data) => {
  console.log(data);
  const res = await client.post(`snacks/comments`, data);
  return res;
};

export const like = async (snacksId) => {
  await client.put(`snacks/${snacksId}/like`);
};

export const detail = async (snacksId) => {
  const res = await client.get(`snacks/detail/${snacksId}`);
  return res;
};
