import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { ElasticsearchConfigService } from './elasticsearch-config.service' // 下面会创建
import { RedisConfigService } from './redis-config.service' // 下面会创建
import { SystemModule } from './system/system.module'
import { TypeOrmConfigService } from './typeorm-config.service' // 下面会创建

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
    }),
    SystemModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver]
})
export class AppModule {}
