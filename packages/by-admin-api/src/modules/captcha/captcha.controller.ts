import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import * as svgCaptcha from 'svg-captcha';
import { RedisClientType } from "redis";
import { v4 as uuidv4 } from 'uuid';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("验证码")
@Controller("captcha")
export class CaptchaController {

  @Inject("REDIS_CLIENT")
  private readonly redis: RedisClientType;

  @ApiOperation({ summary: "生成验证码" })
  @Post("/common")
  // @Res() res, @Req() req
  async generateCaptcha() {
    const captcha = svgCaptcha.create();
    // 将验证码文本存储在会话或数据库中，以便后续验证
    //req.session.captcha = captcha.text;
    //res.set('Content-Type', 'image/svg+xml');
    //res.send(captcha.data);
    const captchaId = uuidv4()

    // 将验证码缓存进 Redis, 60秒有效期
    await this.redis.setEx(`captcha-${captchaId}`, 60, captcha.text);

    return {
      code: 200,
      data: {
        captcha: captcha.data,
        captchaId: captchaId,
      },
      message: "操作成功"
    }
  }

  @ApiOperation({ summary: "校验 - 验证码" })
  @Post('verify')
  verifyCaptcha(@Body() body, @Req() req) {
    const { captchaText } = body;
    const storedCaptcha = req.session.captcha;

    if (captchaText && storedCaptcha && captchaText.toLowerCase() === storedCaptcha.toLowerCase()) {
      // 验证码校验成功
      return { success: true };
    } else {
      // 验证码校验失败
      return { success: false };
    }
  }


}
