/*
 * @Author: ahwgs
 * @Date: 2020-11-16 14:50:29
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-30 14:01:38
 */
import { registerAs } from '@nestjs/config';
const VERSION = process.env.npm_package_version;
export interface EnvSwaggerOptions {
  title: string;
  setupUrl: string;
  desc?: string;
  prefix: string;
  version: string;
}
export default registerAs(
  'EnvSwaggerOptions',
  (): EnvSwaggerOptions => ({
    title: process.env.SWAGGER_UI_TITLE,
    desc: process.env.SWAGGER_UI_TITLE_DESC,
    version: VERSION || process.env.SWAGGER_API_VERSION,
    setupUrl: process.env.SWAGGER_SETUP_PATH,
    prefix: process.env.SWAGGER_ENDPOINT_PREFIX,
  }),
);
