import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { swrMutationFetcher } from './api/functions';

import { deleteFavoriteFolderFile, readFavoriteFolderFile } from '@/libs/api/fetchers/favorite';

export default function useFavoriteItem(folder_id: number) {
  const useFavoriteItemSWR = useSWR(`/favorite/${folder_id}`, () =>
    readFavoriteFolderFile({ folder_id }),
  );
  const useDeleteFavoriteItemSWR = useSWRMutation(
    `/favorite/${folder_id}`,
    swrMutationFetcher(deleteFavoriteFolderFile),
  );

  return {
    favoriteItems: useFavoriteItemSWR.data?.data,
    deleteItem: useDeleteFavoriteItemSWR.trigger,
    loading: {
      read: useFavoriteItemSWR.isLoading,
    },
    error: {
      read: useFavoriteItemSWR.error,
    },
  };
}
