import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RedisUtilsService } from 'src/redis-utils/redis-utils.service';
import { Repository } from 'typeorm';
import { UserEntity, UserEntityDataType } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private redisSrv: RedisUtilsService,
  ) {}

  async createUser(data: UserEntityDataType): Promise<UserEntity> {
    const user = await this.userRepository.save(data); //这里密码以后需要加密
    const res = plainToClass(UserEntity, user); //只有变为实例才可以生效class-transformer的装饰器效果
    return res;
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  //这个验证会交给passport-local
  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserEntity | null> {
    const user = await this.findOne(username);
    if (user && user.password === pass) {
      //这里密码以后需要加密，user.password是加密后的密码，pass也进行加密，看是否相等
      const result = user;
      return result;
    }
    return null;
  }

  //通过守卫后进入login 到时候交给jwt服务返回token
  async login(user: UserEntity) {
    const payload = { username: user.username, id: user.id };
    const token = await this.jwtService.sign(payload);
    //存入redis
    const redisData = {
      token,
      user,
    };
    this.redisSrv.set(String(user.id), redisData);
    return {
      access_token: token,
    };
  }
}
