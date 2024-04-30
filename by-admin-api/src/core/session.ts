import * as expressSession from "express-session";

export const expressSessionMiddleware = expressSession({
  // 指定加密密钥
  secret: "cbh24kcs",
  // 指定cookie选项
  cookie: {
    maxAge: 1000 * 60 // cookie 在页面的存活时间
  }
});


