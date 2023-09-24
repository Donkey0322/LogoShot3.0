import api from '@/libs/api';

export const readFavoriteFolder = api.path('/favorite/folder').method('get').create();

export const addFavoriteFolder = api.path('/favorite/folder').method('post').create();

export const renameFavoriteFolder = api.path('/favorite/folder').method('put').create();

export const deleteFavoriteFolder = api.path('/favorite/folder').method('delete').create();

export const readFavoriteFolderFile = api
  .path('/favorite/folder/{folderId}/file')
  .method('get')
  .create();
