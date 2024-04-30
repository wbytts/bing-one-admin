import { join } from "path";

export function configMVC(app) {
  // 设置静态资源路径
  app.useStaticAssets(join(__dirname, "../../", "public"));
  // 设置基础视图目录
  app.setBaseViewsDir(join(__dirname, "../../", "views"));
  // 设置视图的模板引擎
  app.setViewEngine("hbs");

  // 较早版本支持下面的写法，新版本已弃用 app.useStaticAssets
  // app.useStaticAssets(join(__dirname, '..', 'public'))  // http://localhost:5000/xxx.txt
  // app.useStaticAssets('public')  跟上面一样
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/static/', // 设置虚拟路径
  // });
}
