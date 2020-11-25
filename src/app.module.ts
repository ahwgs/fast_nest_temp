import { LoggingInterceptor } from '@/interceptor/logger.interceptor';
import { UserModule } from '@/modules/user.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { APP_INTERCEPTOR } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from './modules/config.module';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const dataBaseOptions = configService.get<EnvDataBaseOptions>(
    //       'EnvDataBaseOptions',
    //     );
    //     return {
    //       type: dataBaseOptions.type,
    //       host: dataBaseOptions.host,
    //       port: dataBaseOptions.port as number,
    //       username: dataBaseOptions.username,
    //       password: dataBaseOptions.password,
    //       database: dataBaseOptions.database,
    //       entities: dataBaseOptions.entities,
    //       synchronize: dataBaseOptions.synchronize === '1',
    //       logging: dataBaseOptions.logging === '1',
    //       entityPrefix: dataBaseOptions.entityPrefix,
    //     };
    //   },
    // }),
    CustomConfigModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // 定义日志拦截器
    },
  ],
})
export class AppModule {}
