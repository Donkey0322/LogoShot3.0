import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type { UserType } from "@/contexts/useUser";

import {
  addFavoriteFolder,
  deleteFavoriteFolder,
  readFavoriteFolder,
} from "@/libs/api/fetchers/favorite";
import { swrMutationFetcher } from "@/libs/api/functions";

export default function useFavoriteFolder(
  userId?: string | null,
  userType?: UserType["userType"] | null
) {
  const useFavoriteFolderSWR = useSWR(
    userId && userType ? `/favorite/folder` : null,
    () =>
      userId && userType
        ? readFavoriteFolder({ userId, userType: "firebase" })
        : null
  );
  const useAddFavoriteFolderSWR = useSWRMutation(
    userId && userType ? `/favorite/folder` : null,
    swrMutationFetcher(addFavoriteFolder)
  );
  const useDeleteFavoriteFolderSWR = useSWRMutation(
    userId && userType ? `/favorite/folder` : null,
    swrMutationFetcher(deleteFavoriteFolder)
  );

  return {
    favoriteFolder: useFavoriteFolderSWR.data?.data.data,
    addFavoriteFolder: useAddFavoriteFolderSWR?.trigger,
    deleteFavoriteFolder: useDeleteFavoriteFolderSWR.trigger,

    loading: {
      read: useFavoriteFolderSWR.isLoading,
      add: useAddFavoriteFolderSWR.isMutating,
      delete: useDeleteFavoriteFolderSWR.isMutating,
    },
    error: {
      read: useFavoriteFolderSWR.error,
      add: useAddFavoriteFolderSWR.error,
      delete: useDeleteFavoriteFolderSWR.error,
    },
  };
}
