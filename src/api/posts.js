import client from './client';

export const getPosts = () => {
  client.get('/posts');
};
