import { LoggingInterceptor } from '@/interceptor/logger.interceptor';
import { TransformInterceptor } from '@/interceptor/transform.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { renderFile } from 'ejs';
import { Logger } from '@/utils/log4js';
import { EnvSwaggerOptions } from '@/config/env/swagger.config';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { terminalHelpTextConsole } from '@/utils/terminal-help-text-console';

/**
 * 　启动函数
 */
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: new Logger(),
    });

    // app.use(logger);

    const configService = app.get(ConfigService);
    const swaggerOptions = configService.get<EnvSwaggerOptions>(
      'EnvSwaggerOptions',
    );

    /**
     * 设置CORS
     * https://github.com/expressjs/cors#configuration-options
     */
    app.enableCors({
      origin: true,
      credentials: true,
    });

    /**
     * web安全
     */
    app.use(helmet());

    /**
     * 压缩中间件
     */
    app.use(compression());

    // 给请求添加prefix
    app.setGlobalPrefix(swaggerOptions.prefix);

    /**
     * 限速
     */
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );

    app.useStaticAssets(path.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path.join(__dirname, '..', 'public/views'));
    app.engine('html', renderFile);
    app.setViewEngine('ejs');

    // 全局注册错误的过滤器(错误异常)
    app.useGlobalFilters(new HttpExceptionFilter());

    // 全局注册拦截器
    app.useGlobalInterceptors(
      new TransformInterceptor(),
      new LoggingInterceptor(),
    );

    // 全局注册管道
    app.useGlobalPipes(new ValidationPipe());

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
  } catch (err) {
    throw err;
  }
}
bootstrap()
  .then(() => {
    terminalHelpTextConsole();
  })
  .catch((e) => {
    console.log(e);
    Logger.error(e);
  });
