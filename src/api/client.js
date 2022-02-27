import axios from 'axios';
import { getCookie } from '../shared/cookie';

const client = axios.create();

// API 주소를 다른 곳으로 사용
// client.defaults.baseURL = 'http://localhost:4000';
client.defaults.baseURL = process.env.REACT_APP_API_URL_WONJIN;
// client.defaults.baseURL = process.env.REACT_APP_APU_URL_GANGHYO;
// client.defaults.baseURL = process.env.REACT_APP_API_URL_SOOHYUN;

// 헤더 설정
// header token 담아두기

const mytoken = getCookie('mytoken');
if (mytoken) {
  client.defaults.headers.common['Authorization'] = `Bearer ${mytoken}`;
}

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
