import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ example: '陈哥' })
  @IsNotEmpty({ message: '姓名不能为空' })
  @IsString({ message: '名称必须是字符串类型' })
  name: string;

  @ApiProperty({ example: 18 })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '年龄必须是数字类型, 并且大于0' })
  age: number;

  @Matches(/^1\d{10}$/g, { message: '请输入正确的手机号格式' })
  @ApiProperty({ example: '15052508051' })
  phone: string;
}
