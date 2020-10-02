import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import configuration from '../../config/database.config';
import 'dotenv/config';
import { RedisUtilsService } from 'src/redis-utils/redis-utils.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redisSrv: RedisUtilsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().jwtSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    //payload为token解码后内容,能过来说明已验签成功，不管是不是多点登录
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const redisData = await this.redisSrv.get(payload.id);
    //确认token身份, 查redis即可，因为写入redis时查了库
    if (redisData.user.username !== payload.username) {
      throw new UnauthorizedException('invalid token');
    }
    //对比token，看是否一致，不一致说明多点登录了
    if (token !== redisData.token) {
      throw new UnauthorizedException('you have logged in another place');
    }
    return payload;
  }
}
