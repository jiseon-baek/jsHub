const naverApiClient = require('../config/naverApi');

class NaverSearchService {
  static async searchBlog(query, options = {}) {
    try {
      const params = {
        query,
        display: options.display || 10,
        start: options.start || 1,
        sort: options.sort || 'sim',
      };

      const response = await naverApiClient.get(
        '/blog.json',
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(`블로그 검색 실패: ${error.message}`);
    }
  }

  static async searchNews(query, options = {}) {
    try {
      const params = {
        query,
        display: options.display || 10,
        start: options.start || 1,
        sort: options.sort || 'sim',
      };

      const response = await naverApiClient.get(
        '/news.json',
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(`뉴스 검색 실패: ${error.message}`);
    }
  }
}

module.exports = NaverSearchService;
