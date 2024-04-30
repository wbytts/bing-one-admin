import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { readFile } from 'node:fs/promises';
import { ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

// 使用 @Controller() 装饰器定义一个基本的控制器
// 可选 路由路径前缀
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  @Get('/')
  async index() {
    return {};
  }

  @ApiOperation({ summary: '配置测试接口' })
  @Get('/test_config')
  test_config() {
    return this.configService.get('REDIS_HOST');
  }

  @ApiOperation({ summary: 'OpenAPI接口描述JSON' })
  @Get('/openapi.json')
  async docs() {
    const openapiStr = await readFile('./openapi.json', { encoding: 'utf8' });
    return JSON.parse(openapiStr);
  }
}
