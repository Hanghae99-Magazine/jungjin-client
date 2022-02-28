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

export const deletePost = async (post_id) => {
  try {
    const res = await client.delete(`/post/${post_id}`, { post_id });
    alert('삭제완료!');
    return res;
  } catch (err) {
    alert(err.response.data.msg);
  }
};

export const getPostById = async (post_id) => {
  try {
    const res = await client.get(`/post/${post_id}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    alert(err.response.data.msg);
  }
};
