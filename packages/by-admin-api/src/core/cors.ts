// 跨域相关配置(Nest使用的是Express的CORS包)
//https://github.com/expressjs/cors#configuration-options
export function configCors(app) {
  app.enableCors({
    origin: "*",
    // origin: ['http://localhost:8080', 'http://localhost:8081'],
    credentials: true,
    allowedHeaders: ["Authorization", "content-type"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
}
