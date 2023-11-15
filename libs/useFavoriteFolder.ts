import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
  addFavoriteFolder,
  addFavoriteFolderFile,
  deleteFavoriteFolder,
  readFavoriteFolder,
  renameFavoriteFolder,
} from '@/libs/api/fetchers/favorite';
import { swrMutationFetcher } from '@/libs/api/functions';

export default function useFavoriteFolder() {
  const useFavoriteFolderSWR = useSWR(`/favorite`, () => readFavoriteFolder({}));
  const useAddFavoriteFolderSWR = useSWRMutation(
    `/favorite`,
    swrMutationFetcher(addFavoriteFolder),
  );
  const useRenameFavoriteFolderSWR = useSWRMutation(
    `/favorite`,
    swrMutationFetcher(renameFavoriteFolder),
  );
  const useDeleteFavoriteFolderSWR = useSWRMutation(
    `/favorite`,
    swrMutationFetcher(deleteFavoriteFolder),
  );
  const useAddFavoriteItemSWR = useSWRMutation(
    `/favorite/folder_id`,
    swrMutationFetcher(addFavoriteFolderFile),
  );

  return {
    favoriteFolder: useFavoriteFolderSWR.data?.data,
    addFavoriteFolder: useAddFavoriteFolderSWR?.trigger,
    deleteFavoriteFolder: useDeleteFavoriteFolderSWR.trigger,
    renameFavoriteFolder: useRenameFavoriteFolderSWR.trigger,
    addItem: useAddFavoriteItemSWR.trigger,

    loading: {
      read: useFavoriteFolderSWR.isLoading,
      add: useAddFavoriteFolderSWR.isMutating,
      delete: useDeleteFavoriteFolderSWR.isMutating,
      rename: useRenameFavoriteFolderSWR.isMutating,
    },
    error: {
      read: useFavoriteFolderSWR.error,
      add: useAddFavoriteFolderSWR.error,
      delete: useDeleteFavoriteFolderSWR.error,
      rename: useRenameFavoriteFolderSWR.error,
    },
  };
}
