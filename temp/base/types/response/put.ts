import type Response from "@/temp/base/types/response/response";

export interface RenameFavoriteResponse
  extends Response<{
    fileId: string | number;
    fileName: string;
  }> {}
