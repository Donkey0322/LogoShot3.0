import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Fetcher, Middleware } from 'openapi-typescript-fetch';

import { paths } from '@/types/schema';

const baseURL = `${
  Constants.expoConfig?.extra?.REACT_APP_SERVER_USE_HTTPS === 'true' ? 'https' : 'http'
}://${Constants.expoConfig?.extra?.REACT_APP_SERVER_DOMAIN}:${Constants.expoConfig?.extra
  ?.REACT_APP_SERVER_PORT}`;

const logger: Middleware = async (url, init, next) => {
  // eslint-disable-next-line no-console
  console.log(`fetching ${url}`);
  const res = await next(url, init);
  // eslint-disable-next-line no-console
  console.log(`fetched ${url}`);
  return res;
};

const authTokenInjector: Middleware = async (url, init, next) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    init.headers.set('auth-token', token);
  }
  const res = await next(url, init);
  return res;
};

const interceptUndefinedParams: Middleware = async (url, init, next) => {
  if (url.includes('undefined')) {
    // eslint-disable-next-line no-console
    console.log('Requesting url contains "undefined".', url);
    throw new Error('Requesting url contains "undefined".');
  }
  const res = await next(url, init);
  return res;
};

// const fetchError: Middleware = async (url, init, next) => {
//   const res = await next(url, init);
//   if (!res.data.success) throw new Error(res.data.error);
//   return res;
// };

const api = Fetcher.for<paths>();

api.configure({
  baseUrl: baseURL,
  use: [interceptUndefinedParams, logger, authTokenInjector],
});

export default api;
