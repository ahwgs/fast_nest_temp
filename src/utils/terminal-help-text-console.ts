/*
 * @Author: ahwgs
 * @Date: 2020-11-16 15:17:26
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-16 15:49:49
 */
import * as chalk from 'chalk';

type paramType = {
  Port: string | number;
  DocUrl: string;
  ApiPrefix: string;
};
const defaultParam: paramType = {
  Port: process.env.SERVE_LISTENER_PORT,
  DocUrl: process.env.SWAGGER_SETUP_PATH,
  ApiPrefix: process.env.SWAGGER_ENDPOINT_PREFIX,
};

/**
 * 打印相关的帮助信息到终端
 * @param params
 */
export function terminalHelpTextConsole(params = defaultParam): void {
  const Host = `http://localhost`;
  console.log(
    chalk.red.bold('Swagger文档链接:'.padStart(5)),
    chalk.green.underline(`${Host}:${params.Port}/${params.DocUrl}`),
  );
  console.log(
    chalk.red.bold('Restful接口链接:'.padStart(5)),
    chalk.green.underline(`${Host}:${params.Port}/${params.ApiPrefix}`),
  );
}
