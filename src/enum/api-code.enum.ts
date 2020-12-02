/**
 * 请求状态码
 * @export ApiCodeEnum
 * @enum {number}
 */
export enum ApiCodeEnum {
  /**
   * 请求成功状态码
   */
  SUCCESS = 0,
  /**
   * 请求失败状态码
   */
  ERROR = 2000,
  /**
   * 请求警告状态码
   */
  WARN = 3000,
  /**
   * 需要登录
   */
  SHOULD_LOGIN = 4001,
}
