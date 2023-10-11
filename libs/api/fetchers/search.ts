import api from '@/libs/api';

export const textSearch = api.path('/search/text').method('post').create();

export const imageSearch = api.path('/Image_Search/image').method('post').create();
