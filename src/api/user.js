import client from './client';

export const login = ({ userId, userPw }) => {
  client.get('/users', { userId, userPw });
};

export const register = ({ userId, userPw }) => {
  client.post('/regist', { userId, userPw });
};
