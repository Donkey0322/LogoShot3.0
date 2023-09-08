import instance from "./instance";

const URL = {
  deleteFavoriteFile: "/favorite/file",
  deleteFavorite: "/favorite",
  deleteFirebaseAccount: "/account/firebase",
  deleteOuterAccount: "/account",
};

export default Object.keys(URL).reduce((acc, curr) => {
  acc[curr] = async (data) => {
    try {
      const { data: result } = await instance.delete(URL[curr], { data });
      return result;
    } catch (error) {
      throw error;
    }
  };
  return acc;
}, {});
