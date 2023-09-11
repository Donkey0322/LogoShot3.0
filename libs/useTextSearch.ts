import useSWRMutation from "swr/mutation";

import { textSearch } from "@/libs/api/fetchers/search";
import { swrMutationFetcher } from "@/libs/api/functions";

export default function useTextSearch() {
  const useTextSearchSWR = useSWRMutation(
    `/search/text`,
    swrMutationFetcher(textSearch)
  );

  return {
    textSearch: useTextSearchSWR.trigger,

    loading: {
      textSearch: useTextSearchSWR.isMutating,
    },
    error: {
      textSearch: useTextSearchSWR.error,
    },
  };
}
