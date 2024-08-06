import { BaseController } from 'src/shared/providers/base.controller'
import { SystemController } from 'src/shared/decorators'
import { CDNService } from './cdn.service'
import { CDN } from './entities/cdn.entity'

@SystemController('cdn')
export class CDNController extends BaseController<CDN> {
  constructor(private readonly cdnService: CDNService) {
    super(cdnService)
  }
}
