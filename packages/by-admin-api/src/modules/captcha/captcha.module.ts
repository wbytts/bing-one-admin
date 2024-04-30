import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CaptchaController } from "./captcha.controller";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

@Module({
  imports: [],
  providers: [],
  controllers: [CaptchaController]
})
export class CaptchaModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(cookieParser(), session({ secret: "123qwe" })).forRoutes(CaptchaController)
  }
}
