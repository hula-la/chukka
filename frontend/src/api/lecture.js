import client from './client';

export const lectures = async (data) => {
  const res = await client.get('lectures/', data);
  return res;
};

export const lecture = async (lectureId) => {
  const res = await client.get(`lectures/${lectureId}/`);
  return res.data;
};

export const lectureCart = async () => {
  const res = await client.post(`lectures/cart/`);
  return res.data;
};

export const reviews = async (lectureId) => {
  const res = await client.get(`lectures/${lectureId}/reviews/`);
  return res.data;
};

export const makeReview = async (lectureId, data) => {
  const res = await client.post(`lectures/${lectureId}/reviews/`, data);
  return res.data;
};

export const removeReview = async (lectureId, reviewId) => {
  const res = await client.delete(`lectures/${lectureId}/reviews/${reviewId}`);
  return res.data;
};

export const lectureLike = async (lectureId) => {
  const res = await client.post(`lectures/${lectureId}/like`);
  return res.data;
};
