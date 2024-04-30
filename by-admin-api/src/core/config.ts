import * as dotenv from "dotenv";
import * as fs from "fs";
import * as Joi from "joi";
import { ConfigEnum } from "./config.enum";

const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;

export function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  } else {
    return {};
  }
}

export const configParams = {
  // cache: false, // 是否缓存
  isGlobal: true, // 可以让 ConfigModule 在全局可以使用
  // ignoreEnvFile: false,
  ignoreEnvVars: false,
  envFilePath: `.env.${process.env.NODE_ENV || "development"}`, // 指定配置文件路径

  // 自定义校验函数（注：定义了之后 validationSchema 就不起作用了）
  // validate: config => config,

  // 使用 Joi 对配置进行验证
  validationSchema: Joi.object({
    // 环境
    [ConfigEnum.NODE_ENV]: Joi.string().valid("development", "production").default("development"),
    // Nest.js 服务端口
    [ConfigEnum.APP_PORT]: Joi.number().required(),
    // MySQL数据库相关
    [ConfigEnum.MYSQL_HOST]: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
    [ConfigEnum.MYSQL_PORT]: Joi.number().valid(3306, 10396).required(),
    [ConfigEnum.MYSQL_USERNAME]: Joi.string().required(),
    [ConfigEnum.MYSQL_PASSWORD]: Joi.string().required(),
    // ORM相关
    // Redis 相关
    [ConfigEnum.REDIS_HOST]: Joi.string().required(),
    [ConfigEnum.REDIS_PORT]: Joi.number().required(),
    [ConfigEnum.REDIS_DB]: Joi.number().required(),
    [ConfigEnum.REDIS_PASSWORD]: Joi.string().default(""),
    // 日志相关
    [ConfigEnum.LOG_ON]: Joi.boolean().default(false),
    [ConfigEnum.LOG_LEVEL]: Joi.string().default("info")
  }),
  // validationOptions
  // 加载默认的配置
  load: [() => dotenv.config({ path: ".env" })]
  // expandVariables
};
