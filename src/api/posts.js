import client from './client';

export const getPosts = async () => {
  const res = await client.get('/posts');
  return res;
};
