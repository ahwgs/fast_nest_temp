/*
 * @Author: ahwgs
 * @Date: 2020-11-16 15:17:26
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 13:47:26
 */
import { BannerLog } from '@/config/module/get-banner';
import { Logger } from './log4js';

type paramType = {
  Port: string | number;
  DocUrl: string;
  ApiPrefix: string;
};
/**
 * 打印相关的帮助信息到终端
 * @param params
 */
export function terminalHelpTextConsole(): void {
  const params = {
    Port: process.env.SERVE_LISTENER_PORT,
    DocUrl: process.env.SWAGGER_SETUP_PATH,
    ApiPrefix: process.env.SWAGGER_ENDPOINT_PREFIX,
  } as paramType;

  const Host = `http://localhost`;
  Logger.log(BannerLog);
  Logger.log('Swagger文档链接:', `${Host}:${params.Port}/${params.DocUrl}`);
  Logger.log('Restful接口链接:', `${Host}:${params.Port}/${params.ApiPrefix}`);
}
