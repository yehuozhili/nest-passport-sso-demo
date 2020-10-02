import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local.guard';
import { CreateUserDto } from './user.dto';
import { UserEntityDataType } from './user.entity';
import { UserService } from './user.service';

@ApiTags('用户登录')
@Controller('user')
export class UserController {
  constructor(private userSrv: UserService) {}

  @ApiOperation({
    summary: '用户登录',
    description: '用户名和密码登录',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    //local策略会返回user实例，这个返回是自己写的，
    ///验证通过后去拿user实例的id 去jwt加密
    return await this.userSrv.login(req.user);
  }
  @ApiOperation({
    summary: '用户注册',
    description: '用户名和密码注册',
  })
  @Post('/register')
  async register(@Body() req: CreateUserDto) {
    const data: UserEntityDataType = {
      username: req.username,
      password: req.password,
    };
    return await this.userSrv.createUser(data);
  }

  @ApiOperation({
    summary: '测试接口',
    description: '需求权限的测试接口',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
