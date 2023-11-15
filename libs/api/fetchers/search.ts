import api from '@/libs/api';

export const textSearch = api.path('/search/text').method('post').create();

export const imageSearch = api.path('/search/image').method('post').create();

export const getTrademarkDetail = api.path('/search/logo_detail/{appl_no}').method('get').create();
