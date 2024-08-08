/*
nest-cli的属性：https://json.schemastore.org/nest-cli
*/

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { WinstonModule } from "nest-winston";

import { configCors } from "./core/cors";
import { configMVC } from "./core/mvc";
import { winstonLogger } from "./core/logger";
import { generateDocument } from "./core/doc";
import { expressSessionMiddleware } from "./core/session";

import { HttpExceptionFilter } from "./common/filter/http-exception.filter";
import { CustomValidationExceptionFilter } from "./common/filter/custom-validation-exception.filter";
import { CustomValidationException } from "./common/exception/custom-validation.exception";

// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from "@nestjs/platform-fastify";

const logger = WinstonModule.createLogger(winstonLogger);

async function bootstrap() {
  // const logger = new Logger();

  // main.ts -> Factory -> AppModule -> 其他

  // Nest 本身只依赖 HttpServer 接口，并不和具体的库耦合
  // 将类型传递给 NestFactory.create() 函数时，如下例所示，app 对象将具有专用于该特定平台的函数
  // 底层平台默认采用了 Express 
  // Nest -> HttpServer -> AbstractHttpAdapter -> ExpressHttpAdapter/FastifyHttpAdapter -> Express/Fastify
  // 注意，除非您确实要访问底层平台 API，否则无需指定类型
  // 如果要换其他底层库, 可以自己继承 AbstractHttpAdapter 去编写一个适配器
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // 'log', 'error', 'warn', 'debug', 'verbose'
    // logger: false, // 不使用日志
    // logger: console, // 使用JS的console对象
    // logger: new MyLogger(), // 也可以实现 LoggerService (@nestjs/common)，编写自己的日志方法
    // logger: ["log", "error", "warn", "debug", "verbose"],
    // winston配置
    logger,
    bufferLogs: true,
    snapshot: false
  });


  // 切换 Fastify 底层
  // const fastifyAdapter = new FastifyAdapter();
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  // MVC 相关配置
  configMVC(app);

  // 设置全局接口前缀
  //  app.setGlobalPrefix("api")

  // 生成swagger文档
  generateDocument(app);

  // 跨域相关配置
  configCors(app);

  // session 中间件
  app.use(expressSessionMiddleware);

  // 全局HTTP异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // CustomValidationException 过滤器
  app.useGlobalFilters(new CustomValidationExceptionFilter(logger));

  // 数据校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new CustomValidationException(
          validationErrors.map(item => {
            const name = item.property;
            const value = item.value;
            const constraintsStr = Object.values(item.constraints).join(",");
            return { name, value, msg: constraintsStr };
          })
        );
      }
    })
  );

  // 启动服务
  await app.listen(3000, () => {
    logger.debug(`项目运行在 http:localhost:3000/`);
  });
}

bootstrap().then(() => {
  logger.debug("项目启动完成");
});
