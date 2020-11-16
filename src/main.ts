import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvSwaggerOptions } from '@/config/env/swagger.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { terminalHelpTextConsole } from '@/utils/terminal-help-text-console';
/**
 * 　启动函数
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
    logger: false,
  });

  const configService = app.get(ConfigService);
  const swaggerOptions = configService.get<EnvSwaggerOptions>(
    'EnvSwaggerOptions',
  );
  // 给请求添加prefix
  app.setGlobalPrefix(swaggerOptions.prefix);

  const options = new DocumentBuilder()
    .setTitle(swaggerOptions.title)
    .setDescription(swaggerOptions.desc)
    .setVersion(swaggerOptions.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(swaggerOptions.setupUrl, app, document, {
    customSiteTitle: swaggerOptions.title,
    swaggerOptions: {
      explorer: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        active: true,
        theme: 'tomorrow-night',
      },
    },
  });
  await app.listen(configService.get('SERVE_LISTENER_PORT'));
}
bootstrap().then(() => {
  terminalHelpTextConsole();
});
