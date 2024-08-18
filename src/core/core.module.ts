import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MeiliSearchModule } from 'nestjs-meilisearch'
import { MeiliSearchConfigService } from './services/meilisearch-config.service'
import { RedisConfigService } from './services/redis-config.service'
import { TypeOrmConfigService } from './services/typeorm-config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService
    }),
    MeiliSearchModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MeiliSearchConfigService
    })
  ]
})
export class CoreModule {}
