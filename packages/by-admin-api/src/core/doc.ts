// swagger.ts
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";
import { writeFileSync } from "node:fs";

// https://www.npmjs.com/package/nestjs-knife4j
import { knife4jSetup } from "nestjs-knife4j";

// 在 TS 开发的项目中是没办法导入 .json 后缀的模块，
// import * as packageConfig from '../package.json'，引入了json，
// 需要在tsconfig.json文件中加上"resolveJsonModule": true
// packageConfig.name、packageConfig.description、packageConfig.version
// import * as packageConfig from '../package.json';

export const generateDocument = app => {
  // 创建swagger接口文档
  const options = new DocumentBuilder()
    .setTitle("By Admin API Document") // 标题
    .setDescription("管理系统的API文档") // 描述
    .setVersion("0.0.1") // 版本
    .addBearerAuth() // 增加鉴权功能
    .build();

  // 创建文档数据
  const document = SwaggerModule.createDocument(app, options);

  // 第一个参数是接口文档地址
  SwaggerModule.setup("/doc", app, document, {
    customCssUrl: "/static/swagger-ui-themes/themes/3.x/theme-outline.css"
  });

  // Swagger 默认的 UI 不好看，下面是替换成 Knife4j 的界面
  // https://www.npmjs.com/package/nestjs-knife4j
  // knife4j访问地址 /doc.html
  knife4jSetup(app, {
    urls: [
      {
        name: "v0.1 版本",
        // 默认为 /api-json
        url: "/openapi.json",
        swaggerVersion: "3.0",
        location: "/openapi.json"
      }
    ]
  });

  writeFileSync("./openapi.json", JSON.stringify(document));
};
