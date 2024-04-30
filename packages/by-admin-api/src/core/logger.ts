// 创建 winston 日志实例
import * as winston from "winston";
// 给 winston.transports 加载了 DailyRotateFile
import "winston-daily-rotate-file";
import { utilities } from "nest-winston";

// 存储日志处理的配置
const transports = [];

// 控制台日志
transports.push(
  new winston.transports.Console({
    level: "verbose", // info、verbose
    format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike())
  })
);

// 警告与错误日志
transports.push(
  new winston.transports.DailyRotateFile({
    level: "warn",
    dirname: "logs",
    filename: "warn-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "10m",
    maxFiles: "1d",
    format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint())
  })
);

// 详细日志（生产环境才开启）
if (process.env.NODE_ENV === "production") {
  transports.push(
    new winston.transports.DailyRotateFile({
      level: "info",
      dirname: "logs",
      filename: "info-%DATE%.log",
      datePattern: "YYYY-MM-DD HH:mm:ss",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "1d",
      format: winston.format.combine(
        winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        winston.format.align(),
        winston.format.printf(info => `level#[${info.level}]: time#${[info.timestamp]}: msg# ${info.message}`)
      )
    })
  );
}

export const winstonLogger = winston.createLogger({
  transports
});
