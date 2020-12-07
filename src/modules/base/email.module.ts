import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EnvEmailOptions } from '@/config/env/email.config';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const emailOptions = config.get<EnvEmailOptions>('EnvEmailOptions');
        return {
          transport: {
            host: emailOptions.host,
            port: emailOptions.port,
            auth: {
              user: emailOptions.user,
              pass: emailOptions.password,
            },
          },
          defaults: {
            from: emailOptions.from,
          },
          template: {
            dir: path.join(__dirname, '../../assets/email-template'),
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
})
export class EmailModule {}
