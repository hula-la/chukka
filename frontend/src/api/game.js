import client from './client';

export const music = async () => {
  const res = await client.get('game/game');
  return res;
};

export const detail = async (songID) => {
  const res = await client.get(`game/game/${songID}`);
  return res;
};
