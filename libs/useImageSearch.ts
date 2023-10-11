import useSWRMutation from 'swr/mutation';

import { imageSearch } from '@/libs/api/fetchers/search';
import { swrMutationFetcher } from '@/libs/api/functions';

export default function useImageSearch() {
  const useImageSearchSWR = useSWRMutation(`/Image_Search/image`, swrMutationFetcher(imageSearch));

  return {
    imageSearch: useImageSearchSWR.trigger,

    loading: {
      imageSearch: useImageSearchSWR.isMutating,
    },
    error: {
      imageSearch: useImageSearchSWR.error,
    },
  };
}
