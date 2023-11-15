import useSWR from 'swr';

import { readHistoryDetail } from '@/libs/api/fetchers/history';
import { ImageDataType, TextDataType } from '@/modules/search/hooks/useData';
import { components } from '@/types/schema';
import { parseClassCode } from '@/utils/functions/classCode';

export function responseToForm<T extends components['schemas']['HistoryDetail']>(
  data?: T,
): TextDataType | ImageDataType | undefined {
  if (!data) return data;
  return data.is_image_search
    ? {
        image: data.image_path,
        classcodes: parseClassCode(data.target_class_codes),
        color: data.target_color,
        applicant: data.target_applicant,
        startTime: new Date(data.target_start_time),
        endTime: new Date(data.target_end_time),
        chinese: data.target_draft_c,
        english: data.target_draft_e,
        japan: data.target_draft_j,
      }
    : {
        keyword: data.search_key_words,
        isShape: data.is_sim_shape,
        isSound: data.is_sim_sound,
        classcodes: parseClassCode(data.target_class_codes),
        color: data.target_color,
        applicant: data.target_applicant,
        startTime: new Date(data.target_start_time),
        endTime: new Date(data.target_end_time),
        chinese: data.target_draft_c,
        english: data.target_draft_e,
        japan: data.target_draft_j,
      };
}

export default function useHistoryDetail(detail_id?: number) {
  const useHistoryDetailSWR = useSWR(
    detail_id ? `/search/history_detail` : null,
    detail_id ? () => readHistoryDetail({ detail_id }) : null,
  );

  return {
    historyDetail: responseToForm(useHistoryDetailSWR.data?.data),

    loading: {
      read: useHistoryDetailSWR.isLoading,
    },
    error: {
      read: useHistoryDetailSWR.error,
    },
  };
}
