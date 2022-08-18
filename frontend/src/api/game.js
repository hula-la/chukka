import client from './client';

export const music = async () => {
  const res = await client.post('game/game');
  console.log(res);
  return res;
};

export const detail = async (songID) => {
  const res = await client.get(`game/game/${songID}`);
  return res;
};

export const maxScore = async (data) => {
  console.log(data);
  const res = await client.post('game/game/score', data);
  return res;
};

export const exp = async () => {
  const res = await client.post('game/game/exp');
  return res;
};
