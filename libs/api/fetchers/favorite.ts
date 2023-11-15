import api from '@/libs/api';

export const readFavoriteFolder = api.path('/favorite/all').method('get').create();

export const addFavoriteFolder = api.path('/favorite').method('post').create({ folder_name: true });

export const renameFavoriteFolder = api.path('/favorite/{folder_id}').method('put').create();

export const deleteFavoriteFolder = api.path('/favorite/{folder_id}').method('delete').create();

export const readFavoriteFolderFile = api
  .path('/favorite/folder/{folder_id}')
  .method('get')
  .create();

export const addFavoriteFolderFile = api
  .path('/favorite/{folder_id}')
  .method('post')
  .create({ appl_no: true });

export const deleteFavoriteFolderFile = api
  .path('/favorite/folder/{folder_id}')
  .method('delete')
  .create({ appl_no: true });
