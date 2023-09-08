import useSWR from "swr";

import type { UserType } from "@/contexts/useUser";

import { readFavoriteFolder } from "@/libs/api/fetchers/favorite";

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

  return {
    favoriteFolder: useFavoriteFolderSWR.data?.data.data,

    loading: {
      read: useFavoriteFolderSWR.isLoading,
    },
    error: {
      read: useFavoriteFolderSWR.error,
    },
  };
}
