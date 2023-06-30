import type Response from "./response";
export interface LoginResponse
  extends Response<{ userId: string | number; email: string }> {}
export interface SignUpReponse extends Response<{ email: string }> {}

export interface ImageSearchResponse extends Response<> {}
export interface TextSearchResponse extends Response<> {}
export interface AddFavoriteFileResponse extends Response<> {}
export interface AddFavoriteResponse extends Response<> {}
