import client from './client';


export const getPayId = async () => {
  const res = await client.get(`pay/merchant`);
  return res.data;
};


export const completePay = async (data) => {
  const res = await client.post(`pay/`,data);
  return res.data;
};

export const enrollLecture = async (data) =>{
  const res = await client.post('enroll/',data);
  return res.data;
}