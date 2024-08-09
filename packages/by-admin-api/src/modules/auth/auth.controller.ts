import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RedisClientType } from 'redis';
import { R } from 'src/common/vo/response.vo';
import { ResponseCode } from 'src/common/enum/response-code.enum';

@ApiTags('登录鉴权')
@Controller('auth')
export default class AuthController {
  @Inject('REDIS_CLIENT')
  private readonly redis: RedisClientType;

  @ApiOperation({ summary: '用户登录' })
  @Post('/login')
  async login(@Body() params: LoginDto) {
    const captchaText: string = await this.redis.get(`captcha-${params.captchaId}`);
    if (captchaText && captchaText.toLowerCase() === params.captchaText.toLowerCase()) {
      return R.ok({ token: 'test-token' })
    } else {
      return R.error(null, ResponseCode.CAPTCHA_ERROR, "验证码错误")
    }
  }

  @ApiOperation({ summary: '用户注册' })
  @Post('/register')
  async register() {
    return { message: '接口开发中' };
  }
}
