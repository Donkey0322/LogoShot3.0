import type {
  AddFavoriteFileRequest,
  AddFavoriteRequest,
  ImageSearchRequest,
  LogInRequest,
  SignUpRequest,
  TextSearchRequest,
} from "./request";

import type {
  AddFavoriteFileResponse,
  AddFavoriteResponse,
  ImageSearchResponse,
  LoginResponse,
  SignUpReponse,
  TextSearchResponse,
} from "./response";

export type PostRequest =
  | AddFavoriteFileRequest
  | AddFavoriteRequest
  | ImageSearchRequest
  | LogInRequest
  | SignUpRequest
  | TextSearchRequest;

export interface URLTYPE {
  logIn: (data: LogInRequest) => Promise<LoginResponse>;
  signUp: (data: SignUpRequest) => Promise<SignUpReponse>;
  imageSearch: (data: ImageSearchRequest) => Promise<ImageSearchResponse>;
  textSearch: (data: TextSearchRequest) => Promise<TextSearchResponse>;
  addFavoriteFile: (
    data: AddFavoriteFileRequest
  ) => Promise<AddFavoriteFileResponse>;
  addFavorite: (data: AddFavoriteRequest) => Promise<AddFavoriteResponse>;
}
