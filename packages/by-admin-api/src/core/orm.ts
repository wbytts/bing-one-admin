import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigEnum } from "./config.enum";
import { getEnv } from "./config";

export function getEnvConfig() {
  const defaultEnvConfig = getEnv(".env");
  const envConfig = getEnv(`.env.${process.env.NODE_ENV}`);
  const config = { ...defaultEnvConfig, ...envConfig };
  return config
}

function buildConnectionOptions(): TypeOrmModuleOptions {
  const config = getEnvConfig();

  return {
    type: "mysql",
    host: config[ConfigEnum.MYSQL_HOST] as string,
    port: config[ConfigEnum.MYSQL_PORT] as number,
    username: config[ConfigEnum.MYSQL_USERNAME] as string,
    password: config[ConfigEnum.MYSQL_PASSWORD] as string,
    database: config[ConfigEnum.MYSQL_DATABASE] as string,
    synchronize: true, // 是否同步创建表
    logging: true, // 是否打印日志
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    poolSize: 10, // 指定数据库连接池中连接的最大数量
    connectorPackage: "mysql2" // 指定用什么驱动包
  };
}

export const typeOrmConnectionOptions: TypeOrmModuleOptions = buildConnectionOptions();

export const typeOrmModuleOptions = {
  ...typeOrmConnectionOptions,
  extra: {
    authPlugin: "sha256_password",
    idleTimeoutMillis: 30 * 1000 // 设置连接池的空闲超时时间为 30 秒
  }
};

export default new DataSource({
  ...typeOrmConnectionOptions,
  migrations: ["src/migrations/**"],
  subscribers: []
} as DataSourceOptions);
