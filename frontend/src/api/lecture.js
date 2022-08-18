import client from './client';

export const latestLectures = async (data) => {
  const res = await client.get('lectures/latest', data);
  return res.data;
};

export const popularLectures = async (data) => {
  const res = await client.get('lectures/popular', data);
  return res;
};

export const recommendLectures = async (data) => {
  const res = await client.get('lectures/forUsers', data);
  return res;
};

export const lecture = async (lectureId) => {
  const res = await client.get(`lectures/${lectureId}/`);
  return res;
};

export const sections = async (lectureId) => {
  const res = await client.get(`sections/${lectureId}`);
  return res;
};

export const isEnroll = async (lectureId) => {
  const res = await client.get(`enroll/${lectureId}`);
  return res;
};

export const postReview = async (lecId, params) => {
  const res = await client.post(`reviews/${lecId}`, params);
  return res;
};

export const reviews = async (lectureId) => {
  const res = await client.get(`reviews/${lectureId}`);
  return res;
};

export const putNotice = async (lecId, params) => {
  const res = await client.put(`lectures/${lecId}`, params);
  return res;
};

// export const removeReview = async (lectureId, reviewId) => {
//   const res = await client.delete(`lectures/${lectureId}/reviews/${reviewId}`);
//   return res.data;
// };

// export const lectureLike = async (lectureId) => {
//   const res = await client.post(`lectures/${lectureId}/like`);
//   return res.data;
// };
