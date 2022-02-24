import client from './client';

export const getPosts = async () => {
  const res = await client.get('/post');
  return res;
};

export const addPost = async ({ img_position, post_img, post_content }) => {
  const res = await client.post('/post', {
    img_position,
    post_img,
    post_content,
  });
  return res;
};
