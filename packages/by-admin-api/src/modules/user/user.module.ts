import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoggerModule } from 'nestjs-pino';
import { RoleController } from './role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
    // Pino配置
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       // target: "pino-pretty",
    //       // options: {
    //       //   colorize: true,
    //       // },
    //       targets: [
    //         {
    //           level: "info",
    //           target: "pino-pretty",
    //           options: {
    //             colorize: true,
    //             customPrettifiers: {},
    //           },
    //         },
    //         {
    //           level: "info",
    //           target: "pino-roll",
    //           options: {
    //             file: path.join("logs", "log"),
    //             frequency: "hourly", // daily
    //             size: "10M",
    //             mkdir: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // }),
  ],
  controllers: [UserController, RoleController],
  providers: [UserService]
})
export class UserModule {}
