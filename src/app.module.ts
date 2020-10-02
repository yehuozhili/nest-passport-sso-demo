import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import configuration from '../config/database.config';
import { RedisUtilsModule } from './redis-utils/redis-utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    RedisUtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
