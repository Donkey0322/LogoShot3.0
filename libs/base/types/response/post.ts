import type Response from "@/libs/base/types/response/response";

export interface LoginResponse
  extends Response<{ userId: string; email: string }> {}

export interface SignUpReponse extends Response<{ email: string }> {}

export interface ImageSearchResponse extends Response<undefined> {}

export interface TextSearchResponse extends Response<undefined> {}

export interface AddFavoriteFileResponse extends Response<undefined> {}

export interface AddFavoriteResponse extends Response<undefined> {}
