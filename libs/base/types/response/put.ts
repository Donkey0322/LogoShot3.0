import type Response from "@/libs/base/types/response/response";

export interface RenameFavoriteResponse
  extends Response<{
    fileId: string | number;
    fileName: string;
  }> {}
