## Fast-nest-temp

### 介绍

基于`Nest.js@7.x`快速构建 Web 应用

### 依赖

- @nestjs/core 7.5.1 核心包
- @nestjs/config 环境变量治理
- @nestjs/swagger 生成接口文档
- swagger-ui-express 装@nestjs/swagger 必装的包 处理接口文档样式
- joi 校验参数
- nestjs-pino 日志处理
- helmet 处理基础 web 漏洞
- compression 服务端压缩中间件
- express-rate-limit 请求次数限制

### 常见问题

- 关于环境变量

  默认是根据`package.json`内脚本的`APP_ENV`判断环境，然后匹配根目录下`config/env/xx.local.env`文件

- 如何修改接口文档地址

  设置`config/env/xx.local.env`文件内相应环境变量

- 如何修改启动 banner

  目前启动`banner`读取的是`src/assets/banner.txt`,自行修改该文件即可

- 生产环境如何设置环境变量

  复制根目录下`default.local.env` 文件至`config/env/`目录下，修改相应配置为生产环境配置
