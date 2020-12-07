import { Module } from '@nestjs/common';
import { initAppEnvFile } from '@/utils/get-dir-all-file-name-arr';
import envSwaggerConfig from '@/config/env/swagger.config';
import envDataBaseConfig from '@/config/env/databse.config';
import envRedisConfig from '@/config/env/redis.config';
import envEmailConfig from '@/config/env/email.config';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import envJwtConfig from '@/config/env/jwt.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      encoding: 'utf-8',
      envFilePath: initAppEnvFile(),
      load: [
        envSwaggerConfig,
        envDataBaseConfig,
        envRedisConfig,
        envJwtConfig,
        envEmailConfig,
      ],
      expandVariables: true, // 开启嵌套变量
      ignoreEnvVars: true,
      validationSchema: Joi.object({
        SERVE_LINTENER_PORT: Joi.number().default(3000),
        SWAGGER_SETUP_PATH: Joi.string().default(''),
        SWAGGER_ENDPOINT_PREFIX: Joi.string().default(''),
        SWAGGER_UI_TITLE: Joi.string().default(''),
        SWAGGER_UI_TITLE_DESC: Joi.string().default(''),
        SWAGGER_API_VERSION: Joi.string().default(''),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        DB_TYPE: Joi.string().default('mysql'),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(3306),
        DB_DATABASE: Joi.string().default(''),
        DB_USERNAME: Joi.string().default('root'),
        DB_PASSWORD: Joi.string().default(''),
        DB_SYNCHRONIZE: Joi.string().default('1'), // 1 true 0 false
        DB_LOGGING: Joi.string().default('1'), // 1 true 0 false
        DB_TABLE_PREFIX: Joi.string().default('t_'), // 1 true 0 false
        REDIS_HOST: Joi.string().default('localhost'), // 1 true 0 false
        REDIS_PORT: Joi.number().default(6379),
        REDIS_PASSWORD: Joi.string().default('').allow(''),
        TOKEN_SECRET: Joi.string().default('').allow(''),
        TOKEN_EXPIRES: Joi.string().default('').allow(''),
        EMAIL_HOST: Joi.string().default(''),
        EMAIL_PORT: Joi.string().default(''),
        EAMIL_AUTH_USER: Joi.string().default(''),
        EMAIL_AUTH_PASSWORD: Joi.string().default(''),
        EMAIL_FROM: Joi.string().default(''),
        validationOptions: {
          allowUnknown: false, // 控制是否允许环境变量中未知的键。默认为true。
          abortEarly: true, // 如果为true，在遇到第一个错误时就停止验证；如果为false，返回所有错误。默认为false。
        },
      }),
    }),
  ],
})
export class CustomConfigModule {}
