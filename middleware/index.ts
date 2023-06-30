import DELETE from "./simpleDelete";
import GET from "./simpleGet";
import POST from "./simplePost";
import PUT from "./simplePut";

export default {
  ...POST,
  ...DELETE,
  ...GET,
  ...PUT,
};
