import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  BeforeApplicationShutdown,
  Optional,
  applyDecorators,
  createParamDecorator,
  Body,
  Render,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  HttpException,
  UnauthorizedException
} from '@nestjs/common';
import { TestService } from './test.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RedisClientType } from 'redis';
import { CreatePersonDto } from './dto/test.dto';
import FormUrlEncodedParams from './params/form-urlencoded.param';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Test } from './entities/test.entity';

// applyDecorators：组合多个装饰器
function OptionalInject(name) {
  return applyDecorators(Optional(), Inject(name));
}

// createParamDecorator：定义参数装饰器
function CustomParamsD() {
  return createParamDecorator((data, ctx) => {
    return 'asd';
  });
}

@ApiTags('测试')
// Controller 只需要被注入，所以 nest 单独给它加了 @Controller 的装饰器。
@Controller('test')
export class TestController implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap, OnApplicationShutdown, BeforeApplicationShutdown {
  // 构造函数注入
  // constructor(private readonly testService: TestService) {}

  // 属性注入
  @Inject(TestService)
  private readonly testService: TestService;

  @Inject()
  private readonly TestService1: TestService;

  @Inject('person')
  private readonly person: { name: string; age: string };

  @Inject('person2')
  private readonly person2: { name: string; age: string };

  @Optional() // 如果没有 provider 注入会出错，但如果标注了 Optional 可选的，就可以不存在
  @Inject('person3')
  private readonly person3: { name: string; age: string };

  @OptionalInject('person4')
  private readonly person4: { name: string; age: string };

  @Inject('REDIS_CLIENT')
  private readonly redis: RedisClientType;

  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(Test)
  private testRepository: Repository<Test>;

  // 生命周期
  onModuleInit() {
    console.log('==>', '模块初始化');
  }

  onModuleDestroy() {
    console.log('==>', '模块销毁');
  }

  onApplicationBootstrap() {
    console.log('==>', '应用启动');
  }

  onApplicationShutdown(signal?: string) {
    console.log('==>', '应用停止');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('==>', '应用关闭之前');
  }

  @ApiOperation({ summary: '基本接口测试' })
  @Get('/test1')
  // 在处理函数的签名中使用 @Req() 装饰器，指示 Nest 将请求对象注入处理程序。
  // Request 对象：代表 HTTP 请求，并具有查询字符串，请求参数参数，HTTP 标头（HTTP header） 和 正文（HTTP body）的属性等等
  test(): string {
    return 'Hello1';
  }

  // 获取 URL param
  @ApiOperation({ summary: 'GET路径参数' })
  @Get('/test_get_url_param/:val')
  test_get_url_param(@Param('val') val) {
    return 'val = ' + val;
  }

  // 获取 form urlencoded 参数
  @ApiOperation({ summary: 'form urlencoded 参数' })
  @Get('/test_form_urlencoded')
  test_form_urlencoded(@Body() params: { name: string }) {
    return '';
  }

  // 获取 form data 参数
  @ApiOperation({ summary: 'form-data参数' })
  @Get('/test_form_data')
  test_form_data(@Body() params: { name: string }) {
    return '';
  }

  // 获取 application/json 参数
  @ApiOperation({ summary: 'application/json参数' })
  @Get('/test_application_json')
  test_application_json(@Body() params: { name: string }) {
    return '';
  }

  @ApiOperation({ summary: 'redis测试: 写' })
  @Post('/test_redis_01')
  async test_redis_01(@Body() params: { name: string; age: number }) {
    console.log(params);
    await this.redis.set('name', params.name);
    await this.redis.set('age', params.age);
    return 'success';
  }

  @ApiOperation({ summary: 'redis测试: 读' })
  @Get('/test_redis_02')
  async test_redis_02() {
    const name = await this.redis.get('name');
    const age = await this.redis.get('age');
    return { name, age };
  }

  @ApiOperation({ summary: '参数校验测试' })
  @Post('/test_class_validator_1')
  test_class_validator_1(@Body() createPersonDto: CreatePersonDto) {
    return '111';
  }

  @ApiOperation({ summary: '视图模板测试' })
  @Get('/hbs/001')
  @Render('hbs-001')
  test_hbs_001() {
    return {
      text: '你好啊',
      obj: {
        name: '张三',
        age: 18
      }
    };
  }

  @ApiOperation({ summary: 'GET查询参数' })
  @Get('/test_http_query_params')
  test_http_query_params(@Query('x') x: number, @Query('y') y: number) {
    return `x = ${x}, y = ${y}`;
  }

  @ApiOperation({ summary: 'POST表单参数' })
  @Post('/test_http_form_urlencoded')
  test_http_form_urlencoded(@Body() params: FormUrlEncodedParams) {
    return `【${JSON.stringify(params)}】`;
  }

  @ApiOperation({ summary: 'POST application/json 参数' })
  @Post('/test_http_json')
  test_http_json(@Body() params: FormUrlEncodedParams) {
    return `【test_http_json --- ${JSON.stringify(params)}】`;
  }

  @ApiOperation({ summary: '文件上传测试' })
  @Post('/test_http_form_data')
  // @UseInterceptors(AnyFilesInterceptor({ dest: "uploads/" }))
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  test_http_form_data(
    @Body() params: { x: number; y: number },
    // @UploadedFiles() files: Array<Express.Multer.File>
    @UploadedFile() file: Express.Multer.File
  ) {
    // 文件名乱码问题
    if (file.originalname) {
      file.originalname = decodeURIComponent(escape(file.originalname));
    }

    return { params, file, test: '你好啊' };
  }

  /*
    TypeORM 的 EntityManager 和 Repository 的常用方法
        save：新增或者修改 Entity，如果传入了 id 会先 select 再决定修改还新增
        update：直接修改 Entity，不会先 select
        insert：直接插入 Entity
        delete：删除 Entity，通过 id
        remove：删除 Entity，通过对象
        find：查找多条记录，可以指定 where、order by 等条件
        findBy：查找多条记录，第二个参数直接指定 where 条件，更简便一点
        findAndCount：查找多条记录，并返回总数量
        findByAndCount：根据条件查找多条记录，并返回总数量
        findOne：查找单条记录，可以指定 where、order by 等条件
        findOneBy：查找单条记录，第二个参数直接指定 where 条件，更简便一点
        findOneOrFail：查找失败会抛 EntityNotFoundError 的异常
        query：直接执行 sql 语句
        createQueryBuilder：创建复杂 sql 语句，比如 join 多个 Entity 的查询
        transaction：包裹一层事务的 sql
        getRepository：拿到对单个 Entity 操作的类，方法同 EntityManager
  */

  @ApiOperation({ summary: 'typeorm: 基本find' })
  @Get('/typeorm/test/list')
  async typeorm_test_list() {
    const result = await this.testRepository.find();

    return result;
  }

  @ApiOperation({ summary: 'typeorm: 添加' })
  @Get('/typeorm/add')
  async typeorm_test_add() {
    const t: Test = {
      name: '李四' + Date.now(),
      value: `${Date.now()}-${Math.random()}`
    };

    // 保存数据
    await this.testRepository.save(t);

    return '添加成功';
  }

  @ApiOperation({ summary: '全局异常测试' })
  @Get('/test_global_exception')
  test_global_exception() {
    throw new UnauthorizedException('用户没有权限');
  }
}
