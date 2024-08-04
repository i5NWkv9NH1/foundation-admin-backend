import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory
} from '@nestjs/elasticsearch'

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(private configService: ConfigService) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.configService.get<string>('ELASTICSEARCH_NODE')
    }
  }
}
