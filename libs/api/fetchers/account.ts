import api from '..';

export const loginAsGeneralUser = api.path('/login').method('post').create();

export const signupAsGeneralUser = api.path('/signin').method('post').create();
