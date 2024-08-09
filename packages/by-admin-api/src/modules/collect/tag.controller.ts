import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { R } from 'src/common/vo/response.vo';

@ApiTags('Tag')
@Controller('/collect/tag')
export class TagController {

  @Inject()
  private readonly tagService: TagService;

  @ApiOperation({ summary: '新增Tag' })
  @Post('/create')
  async urlCreate(@Body() params: CreateTagDto) {
    await this.tagService.addTag(params);
    return R.ok({ msg: '添加成功' });
  }

  @ApiOperation({ summary: '查询Tag' })
  @Post('/retrieve')
  async urlRetrieve(@Body() params: { name?: string }) {
    const urls = await this.tagService.queryAll();
    return R.ok({ list: urls })
  }

  @ApiOperation({ summary: '修改Tag' })
  @Post('/update')
  async urlUpdate(params: CreateTagDto) {
    await this.tagService.updateTag(params.id, params);
    return R.ok({ msg: '修改成功' });
  }

  @ApiOperation({ summary: '根据id删除URL' })
  @Post('/deleteById')
  async urlDeleteById(params: { id: string }) {
    await this.tagService.removeTagById(params.id);
    return R.ok({ msg: '删除成功' });
  }
}
