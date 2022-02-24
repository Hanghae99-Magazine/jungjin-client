import client from './client';

export const login = async ({ user_id, user_pw }) => {
  const res = await client.post('/login', { user_id, user_pw });
  return res;
};

export const register = async ({ user_id, user_pw, nickname, pw_check }) => {
  const res = await client.post('/register', {
    user_id,
    user_pw,
    nickname,
    pw_check,
  });
  return res;
};
