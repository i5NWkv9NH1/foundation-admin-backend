import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { BusinessModule } from './modules/business.module'
import { SystemModule } from './system/system.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [
    CoreModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'default',
            ttl: config.get('THROTTLE_TTL') || 60,
            limit: config.get('THROTTLE_LIMIT') || 5
          }
        ]
        // storage: new ThrottlerStorageRedisService(config.get('REDIS_URL'))
      })
    }),
    SystemModule,
    BusinessModule
  ]
})
export class AppModule {}
