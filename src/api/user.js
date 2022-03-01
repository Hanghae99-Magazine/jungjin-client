import client from './client';

export const login = async ({ user_id, user_pw }) => {
  try {
    const res = await client.post('/login', { user_id, user_pw });
    return res;
  } catch (err) {
    alert(err.response.msg);
    return err.response;
  }
};

export const register = async ({ user_id, user_pw, nickname, pw_check }) => {
  try {
    const res = await client.post('/register', {
      user_id,
      user_pw,
      nickname,
      pw_check,
    });
    return res;
  } catch (err) {
    alert(err.response.data.msg);
    return err.response;
  }
};
