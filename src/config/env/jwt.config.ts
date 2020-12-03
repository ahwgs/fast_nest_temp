/*
 * @Author: ahwgs
 * @Date: 2020-12-03 17:08:08
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-04 00:22:02
 */
import { registerAs } from '@nestjs/config';
export interface EnvJwtOptions {
  secret: string;
  expiresIn: string;
}
export default registerAs(
  'EnvJwtOptions',
  (): EnvJwtOptions => ({
    secret: process.env.TOKEN_SECRET,
    expiresIn: process.env.TOKEN_EXPIRES,
  }),
);
