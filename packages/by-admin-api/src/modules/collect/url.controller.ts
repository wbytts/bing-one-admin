import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from "./url.service";

@ApiTags('URL')
@Controller('/collect')
export class UrlController {

  @Inject()
  private readonly urlService: UrlService;

  @ApiOperation({ summary: '新增URL' })
  @Post('/url/create')
  async urlCreate(@Body() params: CreateUrlDto) {
    await this.urlService.addUrl(params);
    return '添加成功!';
  }

  @ApiOperation({ summary: '查询URL' })
  @Post('/url/retrieve')
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
  @Post('/url/update')
  async urlUpdate(params: CreateUrlDto) {
    await this.urlService.updateUrl(params)
    return '修改成功';
  }

  @ApiOperation({ summary: '删除URL' })
  @Post('/url/delete')
  async urlDelete(params: { id: string }) {
    await this.urlService.removeUrl(params.id)
    return '删除成功';
  }
}
