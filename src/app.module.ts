import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { TypeOrmConfigService } from './typeorm-config.service' // 下面会创建
import { RedisConfigService } from './redis-config.service' // 下面会创建
import { ElasticsearchConfigService } from './elasticsearch-config.service' // 下面会创建
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // 使配置模块全局可用
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useClass: ElasticsearchConfigService
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
