import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    console.log(
      `API 요청: ${config.method?.toUpperCase()} ${
        config.url
      }`
    );

    return config;
  },
  (error) => {
    console.error('요청 오류:', error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API 응답: ${response.status} - ${response.config.url}`
    );
    return response;
  },
  (error) => {
    console.error(
      '❌ 응답 오류:',
      error.response?.data || error.message
    );

    // 에러 상태별 처리
    if (error.response?.status === 401) {
      // 인증 오류 처리
      console.error('인증이 필요합니다.');
      // 로그인 페이지로 리다이렉트 등
    } else if (error.response?.status === 429) {
      // API 호출 한도 초과
      console.error('API 호출 한도를 초과했습니다.');
    } else if (error.response?.status >= 500) {
      // 서버 오류
      console.error('서버 오류가 발생했습니다.');
    }

    return Promise.reject(error);
  }
);

export default client;
