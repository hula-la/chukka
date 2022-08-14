import client from './client';

export const fsnacks = async (pageNum, sort, tags) => {
  const res = await client.post(`snacks/`, tags, {
    params: { page: pageNum, size: 3, sort: sort },
  });
  return res;
};

export const fTags = async () => {
  const res = await client.get('snacks/tag/popular');
  console.log('인기 태그');
  console.log(res);
  return res;
};

export const freply = async (data) => {
  const res = await client.get(`snacks/${data}/reply`);
  return res;
};

export const creply = async (data) => {
  console.log(data);
  const res = await client.post(`snacks/comments`, data);
  console.log(res);
  return res;
};

export const like = async (snacksId) => {
  await client.put(`snacks/${snacksId}/like`);
};

export const detail = async (snacksId) => {
  const res = await client.get(`snacks/detail/${snacksId}`);
  return res;
};

export const upload = async (snacksInfo, file) => {
  const formData = new FormData();
  console.log(snacksInfo);
  formData.append('file', file);
  formData.append(
    'snacksInfo',
    new Blob([JSON.stringify(snacksInfo)], { type: 'application/json' }),
  );
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.post(`snacks/upload`, formData, config);
  return res;
};
