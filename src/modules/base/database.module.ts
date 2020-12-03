import { EnvDataBaseOptions } from '@/config/env/databse.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
          entityPrefix: dataBaseOptions.entityPrefix,
        };
      },
    }),
  ],
})
export class DataBaseModule {}
