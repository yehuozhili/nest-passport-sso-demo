import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../config/database.config';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
