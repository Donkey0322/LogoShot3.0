import type { PutRequest } from "../base/types";
import type { RenameFavoriteRequest } from "../base/types/request";
import type { RenameFavoriteResponse } from "../base/types/response";
import instance from "./instance";

const URL = {
  renameFavorite: "/favorite",
};

interface URLTYPE {
  renameFavorite: (
    data: RenameFavoriteRequest
  ) => Promise<RenameFavoriteResponse>;
}

export default Object.keys(URL).reduce((acc, curr) => {
  acc[curr as keyof typeof URL] = async (data: PutRequest) => {
    try {
      const { data: result } = await instance.put(
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