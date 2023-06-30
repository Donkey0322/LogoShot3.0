import instance from "./instance";
import type { PostRequest } from "./interfaces";
import type {
  AddFavoriteFileRequest,
  AddFavoriteRequest,
  ImageSearchRequest,
  LogInRequest,
  SignUpRequest,
  TextSearchRequest,
} from "./interfaces/request";
import type {
  AddFavoriteFileResponse,
  AddFavoriteResponse,
  ImageSearchResponse,
  LoginResponse,
  SignUpReponse,
  TextSearchResponse,
} from "./interfaces/response";

const URL = {
  logIn: "/login",
  signUp: "/registerVerify",
  imageSearch: "/search/image",
  textSearch: "/search/text",
  addFavoriteFile: "/favorite/file",
  addFavorite: "/favorite",
};

interface URLTYPE {
  logIn: (data: LogInRequest) => Promise<LoginResponse>;
  signUp: (data: SignUpRequest) => Promise<SignUpReponse>;
  imageSearch: (data: ImageSearchRequest) => Promise<ImageSearchResponse>;
  textSearch: (data: TextSearchRequest) => Promise<TextSearchResponse>;
  addFavoriteFile: (
    data: AddFavoriteFileRequest
  ) => Promise<AddFavoriteFileResponse>;
  addFavorite: (data: AddFavoriteRequest) => Promise<AddFavoriteResponse>;
}

export default Object.keys(URL).reduce((acc, curr) => {
  acc[curr as keyof typeof URL] = async (data: PostRequest) => {
    try {
      const { data: result } = await instance.post(
        URL[curr as keyof typeof URL],
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
  return acc;
}, {} as URLTYPE);
