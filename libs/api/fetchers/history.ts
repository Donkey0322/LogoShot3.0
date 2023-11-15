import api from '@/libs/api';

export const readTextHistory = api.path('/search/text_history').method('get').create();

export const readImageHistory = api.path('/search/image_history').method('get').create();

export const readHistoryDetail = api
  .path('/search/history_detail/{detail_id}')
  .method('get')
  .create();
