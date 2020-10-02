import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: '用户名必须为字符串类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @ApiProperty()
  @IsString({ message: '密码必须为字符串类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
