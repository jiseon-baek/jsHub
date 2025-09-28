import client from '../app/client';

export interface SearchOptions {
  display?: number; // 검색 결과 출력 건수 (1~100)
  start?: number; // 검색 시작 위치 (1~1000)
  sort?: 'sim' | 'date'; // 정렬 옵션 (sim: 유사도순, date: 날짜순)
}

export interface SearchResponse<T> {
  success: boolean;
  data: {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: T[];
  };
  meta: {
    query: string;
    options: SearchOptions;
    timestamp: string;
  };
}

export interface BlogItem {
  title: string;
  link: string;
  description: string;
  bloggername: string;
  bloggerlink: string;
  postdate: string;
}

export const searchBlog = async (
  query: string,
  options: SearchOptions = {}
): Promise<SearchResponse<BlogItem>> => {
  try {
    const response = await client.get('/search/blog', {
      params: {
        query,
        display: options.display || 10,
        start: options.start || 1,
        sort: options.sort || 'sim',
      },
    });
    return response.data;
  } catch (error) {
    console.error('블로그 검색 오류:', error);
    throw error;
  }
};
