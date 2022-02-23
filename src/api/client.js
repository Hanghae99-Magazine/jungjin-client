import axios from 'axios';

const client = axios.create();

// API 주소를 다른 곳으로 사용
client.defaults.baseURL = 'http://localhost:4000';

// 헤더 설정

client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3';

// 인터셉터 설정
axios.interceptors.response.use(
  (response) => {
    // 요청 성공시 특정 작업 수행
    return response;
  },
  (error) => {
    // 요청 실패시 특정 작업 수행
    return Promise.reject(error);
  },
);

export default client;
