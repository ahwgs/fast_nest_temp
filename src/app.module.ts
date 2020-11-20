import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { initAppEnvFile } from '@/utils/get-dir-all-file-name-arr';
import envSwaggerConfig from '@/config/env/swagger.config';
import envDataBaseConfig, {
  EnvDataBaseOptions,
} from '@/config/env/databse.config';

import { pinoHttpOption } from '@/config/module/pino-http-option.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dataBaseOptions = configService.get<EnvDataBaseOptions>(
          'EnvDataBaseOptions',
        );
        return {
          type: dataBaseOptions.type,
          host: dataBaseOptions.host,
          port: dataBaseOptions.port as number,
          username: dataBaseOptions.username,
          password: dataBaseOptions.password,
          database: dataBaseOptions.database,
          entities: dataBaseOptions.entities,
          synchronize: dataBaseOptions.synchronize === '1',
          logging: dataBaseOptions.logging === '1',
        };
      },
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { pinoHttp: pinoHttpOption(configService.get('NODE_ENV')) };
      },
    }),
    ConfigModule.forRoot({
      encoding: 'utf-8',
      envFilePath: initAppEnvFile(),
      load: [envSwaggerConfig, envDataBaseConfig],
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
        validationOptions: {
          allowUnknown: false, // 控制是否允许环境变量中未知的键。默认为true。
          abortEarly: true, // 如果为true，在遇到第一个错误时就停止验证；如果为false，返回所有错误。默认为false。
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
