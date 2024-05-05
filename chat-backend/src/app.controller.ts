import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private redis: RedisService) {}


  /**
   * Tests to red
   */
  @Post()
  async create() {
    await this.redis.save('key1', 'value1');
    return { error: false };
  }

  @Get()
  async find() {
    return await this.redis.get('key1');
  }
}
