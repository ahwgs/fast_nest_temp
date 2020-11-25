/*
 * 数据库配置
 * @Author: ahwgs
 * @Date: 2020-11-20 20:07:54
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-26 00:48:11
 */

import { registerAs } from '@nestjs/config';
import * as path from 'path';
export type DataBaseType = 'mysql' | 'mariadb';

export interface EnvDataBaseOptions {
  /**
   * 数据库类型
   */
  type: DataBaseType;
  /**
   * 数据库主机地址
   */
  host: string;
  /**
   * 数据库端口
   */
  port: number | string;

  /**
   * 数据库用户名
   */
  username: string;

  /**
   * 数据库密码
   */
  password: string;
  /**
   * 数据库名
   */
  database: string;
  /**
   * 实体路径
   */
  entities: any[];

  /**
   * 日志是否开启 执行sql语句时候输出原生sql
   */
  logging: string;

  /**
   * 是否同步true表示会自动将src/entity里面定义的数据模块同步到数据库生成数据表(已经存在的表的时候再运行会报错)
   */
  synchronize: string;
  /**
   * 实体表 公共前缀
   */
  entityPrefix: string;
}

// 实体文件应该使用js
const entitiesPath = path.resolve('./**/*.entity.js');

export default registerAs(
  'EnvDataBaseOptions',
  (): EnvDataBaseOptions => ({
    type: process.env.DB_TYPE as DataBaseType,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [entitiesPath],
    logging: process.env.DB_LOGGING,
    synchronize: process.env.DB_SYNCHRONIZE,
    entityPrefix: process.env.DB_TABLE_PREFIX,
  }),
);
