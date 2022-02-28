import client from './client';

export const fetchLike = async (post_id) => {
  try {
    const res = await client.put(`/post/${post_id}/like`);
    return res;
  } catch (err) {
    alert(err.response.data.msg);
  }
};
