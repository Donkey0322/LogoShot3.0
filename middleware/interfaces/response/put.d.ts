import type Response from "./response";
export interface RenameFavoriteResponse
  extends Response<{
    fileId: string | number;
    fileName: string;
  }> {}
