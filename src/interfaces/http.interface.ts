/**
 * 带分页带返回类型定义
 */
export interface IHttpResultPagination<T> {
  list: T;
  totalCount: number;
}

/**
 * 接口响应返回基础
 */
export interface IHttpResponseBase {
  message: string;
  code: number;
  path: string;
  method: string;
  timestamp: number;
}

export type THttpResponse<T> = IHttpResponseBase & {
  result: T;
};

export interface IHttpResponse extends IHttpResponseBase {
  result: any;
}
