import instance from "./instance";
const URL = {
  getFavoriteFile: "/favorite/file",
  getFavorite: "/favorite",
  getHistory: "/history",
};

export default Object.keys(URL).reduce((acc, curr) => {
  acc[curr] = async (params = undefined, route = undefined) => {
    try {
      const { data: result } = await instance.get(
        `${URL[curr]}${route ? `/${route}` : ""}`,
        { params }
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
  return acc;
}, {});
