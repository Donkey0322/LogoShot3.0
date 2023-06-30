import type {
  AddFavoriteFileRequest,
  AddFavoriteRequest,
  ImageSearchRequest,
  LogInRequest,
  SignUpRequest,
  TextSearchRequest,
} from "./request/post";

export type PostRequest =
  | AddFavoriteFileRequest
  | AddFavoriteRequest
  | ImageSearchRequest
  | LogInRequest
  | SignUpRequest
  | TextSearchRequest;
