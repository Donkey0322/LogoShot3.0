import useSWR from 'swr';

import { readImageHistory, readTextHistory } from '@/libs/api/fetchers/history';

export default function useHistory() {
  const useImageHistorySWR = useSWR(`/search/image_history`, () => readImageHistory({}));
  const useTextHistorySWR = useSWR(`/search/text_history`, () => readTextHistory({}));

  return {
    imageHistory: useImageHistorySWR.data?.data,
    textHistory: useTextHistorySWR.data?.data,

    loading: {
      read: useImageHistorySWR.isLoading,
    },
    error: {
      read: useImageHistorySWR.error,
    },
  };
}
