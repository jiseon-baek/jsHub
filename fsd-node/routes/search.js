const express = require('express');
const router = express.Router();
const NaverSearchService = require('../services/naverSearchService');

const validateSearchQuery = (req, res, next) => {
  const { query } = req.query;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: '검색어를 입력해주세요.',
    });
  }

  if (query.length > 100) {
    return res.status(400).json({
      success: false,
      message: '검색어는 100자 이하로 입력해주세요.',
    });
  }

  next();
};

router.get(
  '/blog',
  validateSearchQuery,
  async (req, res) => {
    try {
      const { query, display, start, sort } = req.query;

      const options = {
        display: parseInt(display) || 10,
        start: parseInt(start) || 1,
        sort: sort || 'sim',
      };

      const result = await NaverSearchService.searchBlog(
        query,
        options
      );

      res.json({
        success: true,
        data: result,
        query: {
          search: query,
          ...options,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
