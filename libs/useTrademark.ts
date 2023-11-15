import useSWR from 'swr';

import { getTrademarkDetail } from '@/libs/api/fetchers/search';

export default function useTrademarkDetail(appl_no: string) {
  const useTrademarkDetailSWR = useSWR(`/search/logo_detail/${appl_no}`, () =>
    getTrademarkDetail({ appl_no }),
  );

  return {
    trademarkDetail: useTrademarkDetailSWR.data?.data,

    loading: {
      read: useTrademarkDetailSWR.isLoading,
    },
    error: {
      read: useTrademarkDetailSWR.error,
    },
  };
}
