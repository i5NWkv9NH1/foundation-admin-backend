import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository } from 'typeorm'
import { CDN } from './entities/cdn.entity'

@Injectable()
export class CDNService extends BaseService<CDN> {
  constructor(
    @InjectRepository(CDN)
    private readonly cdnRepo: Repository<CDN>
  ) {
    super(cdnRepo)
  }

  // 实现抽象方法，指定查询构造器的别名
  protected getQueryBuilderAlias(): string {
    return 'cdn'
  }
}
