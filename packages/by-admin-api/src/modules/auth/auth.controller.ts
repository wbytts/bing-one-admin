import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RedisClientType } from 'redis';

@ApiTags('登录鉴权')
@Controller('auth')
export default class AuthController {
  @Inject('REDIS_CLIENT')
  private readonly redis: RedisClientType;

  @ApiOperation({ summary: '用户登录' })
  @Post('/login')
  async login(@Body() params: LoginDto) {
    // 如果用户名是 by666 可跳过验证码
    if (params.username !== 'by666') {
      const captchaText: string = await this.redis.get(`captcha-${params.captchaId}`);
      if (captchaText !== params.captchaText) {
        return {
          code: 200,
          message: '验证码错误'
        };
      }
    }

    return {
      code: 200,
      data: {
        token: 'test-token'
      },
      message: '登陆成功'
    };
  }

  @ApiOperation({ summary: '用户注册' })
  @Post('/register')
  async register() {
    return { message: '接口开发中' };
  }
}
