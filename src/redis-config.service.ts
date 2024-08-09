import { RedisModuleOptions } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  createRedisOptions(): RedisModuleOptions {
    return {
      config: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
        db: 0,
        lazyConnect: true,
        connectTimeout: 5000,
        maxRetriesPerRequest: 3
      }
    }
  }
}
