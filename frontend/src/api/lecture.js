import client from './client';

export const lectures = async (data) => {
  const res = await client.get('lectures/', data);
  return res;
};

export const lectureDetail = async (lectureId) => {
  const res = await client.get(`lectures/${lectureId}/`);
  return res;
};
