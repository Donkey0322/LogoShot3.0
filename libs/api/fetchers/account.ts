import api from '..';

export const loginAsGeneralUser = api.path('/login').method('post').create();

export const signupAsGeneralUser = api.path('/signin').method('post').create();

export const getUserInfo = api.path('/account').method('get').create();

export const editAvatar = api.path('/account/edit-info').method('patch').create();

export const appleLogin = api.path('/apple_login').method('post').create();

export const appleSignup = api.path('/apple_signin').method('post').create();
