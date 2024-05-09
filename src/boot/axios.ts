import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import * as Message from '../components/Message';
import * as Loading from '../components/Loading';
import '../components/extensions';
import * as util from '../utils/util';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
    $message: typeof Message;
    $loading: typeof Loading;
    $util: typeof util;
  }
}

declare global {
  interface Array<T> {
    first(func: any): T | null;
    remove(func: any): void;
    exists(func: any): boolean;
    sum(func: any): number;
    removearray(func: Array<any>): void;
    removefilter(func: any): void;
    indexOf(val: any): number;
  }
  interface String {
    subLastIndexOf(
      s: string,
      offset: number | 0,
      length: number | 0,
      isBegin: boolean
    ): string;
    subIndexOf(
      s: string,
      offset: number | 0,
      length: number | 0,
      isBegin: boolean
    ): string;
    trim(): string;
    trimBegin(): string;
    trimEnd(): string;
    replaceAllRegex(s1: string, s2: string): string;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  app.config.globalProperties.$message = Message;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  app.config.globalProperties.$loading = Loading;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  app.config.globalProperties.$util = util;
});

export { api };
