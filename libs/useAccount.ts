import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { useUser } from '@/contexts/useUser';
import { editAvatar, getUserInfo } from '@/libs/api/fetchers/account';
import { swrMutationFetcher } from '@/libs/api/functions';

export default function useAccount() {
  const { user } = useUser();
  const useUserInfoSWR = useSWR(`/account`, user?.username ? () => getUserInfo({}) : null);
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
