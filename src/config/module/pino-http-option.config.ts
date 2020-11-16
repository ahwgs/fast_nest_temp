/*
 * pino-http 配置
 * @Author: ahwgs
 * @Date: 2020-11-16 16:27:57
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-16 17:29:37
 */
import PinoHttp from 'pino-http';
export function pinoHttpOption(envDevMode = 'development'): PinoHttp.Options {
  return {
    customAttributeKeys: {
      req: '请求信息',
      res: '响应信息',
      err: '错误信息',
      responseTime: '响应时间(ms)',
    },
    level: envDevMode !== 'production' ? 'debug' : 'info',
    customLogLevel(res: { statusCode: number }, err: any) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      }
      return 'info';
    },
    serializers: {
      req(req: {
        httpVersion: any;
        raw: { httpVersion: any; params: any; query: any; body: any };
        params: any;
        query: any;
        body: any;
      }) {
        req.httpVersion = req.raw.httpVersion;
        req.params = req.raw.params;
        req.query = req.raw.query;
        req.body = req.raw.body;
        return req;
      },
      err(err: {
        params: any;
        raw: { params: any; query: any; body: any };
        query: any;
        body: any;
      }) {
        err.params = err.raw.params;
        err.query = err.raw.query;
        err.body = err.raw.body;
        return err;
      },
    },
    prettyPrint:
      envDevMode === 'development'
        ? {
            colorize: true,
            levelFirst: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
          }
        : false,
  };
}
