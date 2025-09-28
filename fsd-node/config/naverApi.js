const axios = require('axios');
require('dotenv').config();

const naverApiClient = axios.create({
  baseURL: 'https://openapi.naver.com/v1/search',
  headers: {
    'Content-Type': 'application/json',
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret':
      process.env.NAVER_CLIENT_SECRET,
  },
  timeout: 10000,
});

naverApiClient.interceptors.request.use(
  (config) => {
    console.log(
      `네이버 API 요청: ${config.method?.toUpperCase()} ${
        config.url
      }`
    );
    return config;
  },
  (error) => {
    console.error('API 요청 오류:', error);
    return Promise.reject(error);
  }
);

naverApiClient.interceptors.response.use(
  (response) => {
    console.log(`네이버 API 응답 성공: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(
      '네이버 API 응답 오류:',
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

module.exports = naverApiClient;
