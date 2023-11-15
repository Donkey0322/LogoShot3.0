import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { editAvatar, getUserInfo } from '@/libs/api/fetchers/account';
import { swrMutationFetcher } from '@/libs/api/functions';

export default function useAccount() {
  const useUserInfoSWR = useSWR(`/account`, () => getUserInfo({}));
  const useEditAvatarSWR = useSWRMutation(`/account/edit-photo`, swrMutationFetcher(editAvatar));

  return {
    userInfo: useUserInfoSWR.data?.data,
    editAvatar: useEditAvatarSWR?.trigger,

    loading: {
      read: useUserInfoSWR.isLoading,
      update: useEditAvatarSWR.isMutating,
    },
    error: {
      read: useUserInfoSWR.error,
      update: useEditAvatarSWR.error,
    },
  };
}
