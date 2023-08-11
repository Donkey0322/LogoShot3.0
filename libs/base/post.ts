import instance from "./instance";
import type { PostRequest, URLTYPE } from "./types/post";

const URL: Record<keyof URLTYPE, string> = {
  logIn: "/login",
  signUp: "/registerVerify",
  imageSearch: "/search/image",
  textSearch: "/search/text",
  addFavoriteFile: "/favorite/file",
  addFavorite: "/favorite",
};

const POST = (Object.keys(URL) as (keyof typeof URL)[]).reduce((acc, curr) => {
  acc[curr] = async (data: PostRequest) => {
    try {
      const { data: result } = await instance.post(URL[curr], data);
      return result;
    } catch (error) {
      throw error;
    }
  };
  return acc;
}, {} as URLTYPE);

export default POST;

export const {
  logIn,
  signUp,
  textSearch,
  imageSearch,
  addFavorite,
  addFavoriteFile,
} = POST;
