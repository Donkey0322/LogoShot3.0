import api from "..";

export const loginAsGeneralUser = api
  .path("/account/login")
  .method("post")
  .create();

export const signupAsGeneralUser = api
  .path("/account/signup")
  .method("post")
  .create();
