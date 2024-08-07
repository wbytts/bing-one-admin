import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createClient } from 'redis';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CollectModule } from './modules/collect/collect.module';
import { serverStaticParams } from './core/static';
import { configParams } from './core/config';
import { typeOrmModuleOptions } from './core/orm';
import { AuthModule } from './modules/auth/auth.module';
import { SystemModule } from "./modules/system/system.module";
import { CaptchaModule } from "./modules/captcha/captcha.module";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(configParams), // 配置管理
    ServeStaticModule.forRoot(serverStaticParams), // 静态文件
    TypeOrmModule.forRoot(typeOrmModuleOptions), // 定义TypeORM模块
    TestModule,
    UserModule,
    CollectModule,
    AuthModule,
    SystemModule,
    CaptchaModule, // 验证码
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // D:\soft\redis\redis-windows-6.2.6.4
      // redis-server.exe redis.conf
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'wbytts.cn', // '127.0.0.1',
            port: 9902, // 6379
          },
          database: 0,
          // password: '123'
        });
        await client.connect();
        return client;
      }
    },
    Logger
  ],
  exports: ['REDIS_CLIENT', Logger]
})
export class AppModule {
}
