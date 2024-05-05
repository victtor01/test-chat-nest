import { Injectable } from '@nestjs/common';
import Redis, { Redis as Client } from 'ioredis';

@Injectable()
export class RedisService {
  private client: Client;

  constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
      password: 'admin',
    });
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
}
