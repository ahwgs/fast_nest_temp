/*
 * @Author: ahwgs
 * @Date: 2020-12-03 17:08:08
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 17:13:57
 */
import { registerAs } from '@nestjs/config';
export interface EnvRedisOptions {
  host: string;
  port: string | number;
  password: string;
}
export default registerAs(
  'EnvRedisOptions',
  (): EnvRedisOptions => ({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || '',
  }),
);
