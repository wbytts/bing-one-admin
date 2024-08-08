import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';

@ApiTags('URL')
@Controller('/collect/url')
export class UrlController {
  @Inject()
  private readonly urlService: UrlService;

  @ApiOperation({ summary: '新增URL' })
  @Post('/create')
  async urlCreate(@Body() params: CreateUrlDto) {
    await this.urlService.addUrl(params);
    return '添加成功!';
  }

  @ApiOperation({ summary: '查询URL' })
  @Post('/retrieve')
  async urlRetrieve(@Body() params: { title?: string }) {
    const urls = await this.urlService.queryAll();
    return {
      code: 200,
      result: true,
      message: '查询成功',
      data: {
        list: urls
      }
    };
  }

  @ApiOperation({ summary: '修改URL' })
  @Post('/update')
  async urlUpdate(@Body() params: CreateUrlDto) {
    await this.urlService.updateUrl(params);
    return '修改成功';
  }

  @ApiOperation({ summary: '根据id删除URL' })
  @Post('/deleteById')
  async urlDeleteById(@Body()params: { id: string }) {
    await this.urlService.removeUrlById(params.id);
    return '删除成功';
  }
}
