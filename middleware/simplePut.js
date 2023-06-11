import print from "./test";

const URL = {
  renameFavoriteFile: "/favorite/file",
};

export default (instance) =>
  Object.keys(URL).reduce((acc, curr) => {
    acc[curr] = async (data) => {
      try {
        if (print) console.log("PUT", URL[curr], "req:", data);
        const { data: result } = await instance.put(URL[curr], data);
        if (print) console.log("PUT", URL[curr], "res", result);
        return result;
      } catch (error) {
        throw error;
      }
    };
    return acc;
  }, {});
