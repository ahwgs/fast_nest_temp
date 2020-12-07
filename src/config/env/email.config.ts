/*
 * @Author: ahwgs
 * @Date: 2020-12-03 17:08:08
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-04 00:22:02
 */
import { registerAs } from '@nestjs/config';
export interface EnvEmailOptions {
  host: string;
  port: string;
  user: string;
  password: string;
  from: string;
}
export default registerAs(
  'EnvEmailOptions',
  (): EnvEmailOptions => ({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EAMIL_AUTH_USER,
    password: process.env.EMAIL_AUTH_PASSWORD,
    from: process.env.EMAIL_FROM,
  }),
);
