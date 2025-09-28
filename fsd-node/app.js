// app.js - 메인 서버 파일
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(helmet()); // 보안 헤더
app.use(cors()); // CORS 허용
app.use(morgan('combined')); // 로깅
app.use(express.json({ limit: '10mb' })); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩 파싱
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공

// 라우터 설정
const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

// 기본 라우트

app.get('/', (req, res) => {
  res.json({
    message:
      'Node.js + Express 서버가 정상적으로 동작중입니다!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// 404 에러 처리
app.use('*', (req, res) => {
  res.status(404).json({
    error: '요청하신 경로를 찾을 수 없습니다.',
    path: req.originalUrl,
  });
});

// 전역 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error('서버 에러:', err.stack);

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === 'production'
        ? '서버 내부 오류가 발생했습니다.'
        : err.message,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
    }),
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(
    `🌍 환경: ${process.env.NODE_ENV || 'development'}`
  );
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 서버를 안전하게 종료합니다...');
  process.exit(0);
});

module.exports = app;
