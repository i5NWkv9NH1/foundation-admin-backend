import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import type { Redis } from 'ioredis'

@Injectable()
export class BlacklistedTokensService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addTokenToBlacklist(token: string, expiry: number): Promise<void> {
    await this.redis.set(token, 'blacklisted', 'EX', expiry)
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.redis.get(token)
    return result !== null
  }
}
