## Fast-nest-temp

### 介绍

基于`Nest.js@7.x`快速构建 Web 应用

### 依赖

- @nestjs/core 7.5.1 核心包
- @nestjs/config 环境变量治理
- @nestjs/swagger 生成接口文档
- swagger-ui-express 装@nestjs/swagger 必装的包 处理接口文档样式
- joi 校验参数
- log4js 日志处理
- helmet 处理基础 web 漏洞
- compression 服务端压缩中间件
- express-rate-limit 请求次数限制
- typeorm 数据库 orm 框架
- @nestjs/typeorm nest typeorm 集成
- ejs 模版引擎
- class-validator 校验参数
- ioredis redis 客户端
- nestjs-redis nest redis 配置模块
- uuid uuid 生成器

### 约束

- 接口返回值约束 `interface IHttpResponse`

```json
{
  "result": null,
  "message": "", // 消息提示，错误消息
  "code": 0, // 业务状态码
  "path": "/url", // 接口请求地址
  "method": "GET", // 接口方法
  "timestamp": 1 // 接口响应时间
}
```

- 接口 `HttpExceptionFilter` 过滤器
- 业务状态码与`Http StatusCode`约定

无论接口是否异常或错误，`Http StatusCode`都为`200`

### 管道

- 管道 `ParsePagePipe` 校验分页入参
- 管道 `ValidationPipe` 结合 `DTO` 校验入参

### 过滤器

- `HttpExceptionFilter` 异常过滤器

默认处理所有异常，返回`Http StatusCode`都为 200

### 拦截器

- `LoggingInterceptor` 日志拦截器

处理日志，结合`log4js`使用

- `TransformInterceptor` 数据转换拦截器

处理返回结果,返回结果如`THttpResponse`

### 日志处理

- 默认输出 `logs/access logs/app-out logs/errors`
- 可修改 `module/log4js` 下配置

### 常见问题

- 关于环境变量

  默认是根据`package.json`内脚本的`APP_ENV`判断环境，然后匹配根目录下`config/env/xx.local.env`文件

- 如何修改接口文档地址

  设置`config/env/xx.local.env`文件内相应环境变量

- 如何修改启动 banner

  目前启动`banner`读取的是`src/assets/banner.txt`,自行修改该文件即可

- 生产环境如何设置环境变量

  复制根目录下`default.local.env` 文件至`config/env/`目录下，修改相应配置为生产环境配置

- 使用 log4js 作为默认日志库

```typescript
const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  logger: new Logger(),
});
```

通过重写`LoggerService`上的相关方法，实现 `Nest` 日志自定义
