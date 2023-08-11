import POST from "../libs/base/post";
import DELETE from "./simpleDelete";
import GET from "./simpleGet";
import PUT from "./simplePut";

export default {
  ...POST,
  ...DELETE,
  ...GET,
  ...PUT,
};
