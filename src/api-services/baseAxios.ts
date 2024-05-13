import { debug } from 'console';
import { Api } from './baseApi';
import * as Message from 'src/components/Message';

const storeaccessTokenKey = 'game-access-token';
const storerefreshAccessTokenKey = 'game-x-access-token';

// token 键定义
const accessTokenKey = 'access-token';
const refreshAccessTokenKey = `x-${accessTokenKey}`;

// 清除 token
const clearAccessTokens = () => {
  window.sessionStorage.removeItem(storeaccessTokenKey);
  window.sessionStorage.removeItem(storerefreshAccessTokenKey);

  // 这里可以添加清除更多 Key =========================================
};
export class BaseAxios {
  api: Api<unknown>;
  constructor(baseURL: string) {
    this.api = new Api({ timeout: 60000, baseURL: baseURL });
    // axios 请求拦截
    this.api.instance.interceptors.request.use(
      (conf) => {
        // 获取本地的 token
        const accessToken = window.sessionStorage.getItem(storeaccessTokenKey);
        if (accessToken && conf) {
          // 将 token 添加到请求报文头中
          conf.headers!['Authorization'] = `Bearer ${accessToken}`;

          // 判断 accessToken 是否过期
          const jwt: any = decryptJWT(accessToken);
          const exp = getJWTDate(jwt.exp as number);

          // token 已经过期
          if (new Date() >= exp) {
            // 获取刷新 token
            const refreshAccessToken = window.sessionStorage.getItem(
              storerefreshAccessTokenKey
            );

            // 携带刷新 token
            if (refreshAccessToken) {
              conf.headers!['X-Authorization'] = `Bearer ${refreshAccessToken}`;
            }
          }
        }

        // 这里编写请求拦截代码 =========================================

        return conf;
      },
      (error) => {
        // 处理请求错误
        if (error.request) {
        }

        // 这里编写请求错误代码

        return Promise.reject(error);
      }
    );

    // axios 响应拦截
    this.api.instance.interceptors.response.use(
      (response) => {
        // 检查并存储授权信息
        checkAndStoreAuthentication(response);

        if (
          !response.status.toString().startsWith('2') ||
          response.data.status === -1
        ) {
          // 如果状态码不是2开头或者接口code返回-1 则是返回错误信息
          response.data = {
            status: -1,
            message: '服务异常',
          };
          return Promise.resolve(response);
        }
        if (response.data.message == '用户未登录') {
          //未登录处理
        }
        if (!response.data.status) {
          response.data = {
            data: response.data,
            status: 1,
            message: 'success',
          };
        }
        return Promise.resolve(response.data);
      },
      (error) => {
        const resError = error;
        // 处理响应错误
        if (error.response) {
          // 获取响应对象并解析状态码
          const response = error.response;
          const status: number = response.status;

          // 检查并存储授权信息
          checkAndStoreAuthentication(response);
          // 检查 401 权限
          if (status === 401) {
            clearAccessTokens();
            response.data = {
              status: -1,
              message: '未登录',
            };
          } else if (status === 403) {
            response.data = {
              status: -1,
              message: '暂无权限',
            };
          } else if (!response.status.toString().startsWith('2')) {
            // 如果状态码不是2开头或者接口code返回-1 则是返回错误信息
            return Promise.resolve({
              status: -1,
              message: resError.message || '服务异常',
            });
          }

          return Promise.resolve(response.data);
        } else if (error.message && error.message.indexOf('timeout of') > -1) {
          return Promise.resolve({
            status: -1,
            message: '请求超时',
          });
        }
        return Promise.resolve({
          status: -1,
          message: '系统异常',
        });
      }
    );
  }
}

/**
 * 解密 JWT token 的信息
 * @param token jwt token 字符串
 * @returns <any>object
 */
function decryptJWT(token: string): any {
  token = token.replace(/_/g, '/').replace(/-/g, '+');
  const json = decodeURIComponent(escape(window.atob(token.split('.')[1])));
  return JSON.parse(json);
}

/**
 * 将 JWT 时间戳转换成 Date
 * @description 主要针对 `exp`，`iat`，`nbf`
 * @param timestamp 时间戳
 * @returns Date 对象
 */
function getJWTDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

/**
 * 检查并存储授权信息
 * @param res 响应对象
 */
function checkAndStoreAuthentication(res: any): void {
  // 读取响应报文头 token 信息
  const accessToken = res.headers[accessTokenKey];
  const refreshAccessToken = res.headers[refreshAccessTokenKey];

  // 判断是否是无效 token
  if (accessToken === 'invalid_token') {
    clearAccessTokens();
  }
  // 判断是否存在刷新 token，如果存在则存储在本地
  else if (
    refreshAccessToken &&
    accessToken &&
    accessToken !== 'invalid_token'
  ) {
    window.sessionStorage.setItem(storeaccessTokenKey, accessToken);
    window.sessionStorage.setItem(
      storerefreshAccessTokenKey,
      refreshAccessToken
    );
  }
}
