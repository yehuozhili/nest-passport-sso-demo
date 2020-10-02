import { Test, TestingModule } from '@nestjs/testing';
import { RedisUtilsService } from './redis-utils.service';

describe('RedisUtilsService', () => {
  let service: RedisUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisUtilsService],
    }).compile();

    service = module.get<RedisUtilsService>(RedisUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
