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
  urlCreate(@Body() params: CreateUrlDto) {

    return '';
  }

  @ApiOperation({ summary: '查询URL' })
  @Post('/url/retrieve')
  async urlRetrieve(@Body() params: { title: string }) {
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
  urlUpdate() {
    return '';
  }

  @ApiOperation({ summary: '删除URL' })
  @Post('/url/delete')
  urlDelete() {
    return '';
  }
}
