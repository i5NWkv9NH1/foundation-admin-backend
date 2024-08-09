import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'
import { ElasticsearchConfigService } from './elasticsearch-config.service' // 下面会创建
import { BusinessModule } from './modules/business.module'
import { RedisConfigService } from './redis-config.service'
import { SystemHttpExceptionFilter } from './shared/filters/system-http-exception.filter'
import { TypeOrmExceptionFilter } from './shared/filters/typeorm-exception.filter'
import { SystemModule } from './system/system.module'
import { TypeOrmConfigService } from './typeorm-config.service' // 下面会创建
@Module({
  imports: [
    LoggerModule.forRoot(),
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
  ],
  providers: [SystemHttpExceptionFilter, TypeOrmExceptionFilter]
})
export class AppModule {}
