import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ElasticsearchConfigService } from './elasticsearch-config.service' // 下面会创建
import { RedisConfigService } from './redis-config.service' // 下面会创建
import { SystemModule } from './system/system.module'
import { TypeOrmConfigService } from './typeorm-config.service' // 下面会创建
import { UploadModule } from './modules/upload/upload.module'
import { BusinessModule } from './modules/business.module'

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
    SystemModule,
    BusinessModule
  ]
})
export class AppModule {}
