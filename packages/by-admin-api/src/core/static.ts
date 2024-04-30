import { join } from "path";

export const serverStaticParams = {
  rootPath: join(__dirname, "../../", "static"), // 静态资源的根路径
  serveRoot: "/static/" // 设置虚拟路径
};
