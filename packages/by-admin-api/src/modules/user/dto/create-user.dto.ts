import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ name: '用户名' })
  name: string;

  @ApiProperty({ name: '年龄' })
  age: number;

  @ApiProperty({ name: '备注' })
  remark: string;
}
