import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository } from 'typeorm'
import { Organization } from './entities/organization.entity'

@Injectable()
export class OrganizationsService extends BaseService<Organization> {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {
    super(organizationRepository)
  }
  protected getQueryBuilderAlias(): string {
    return 'organization'
  }
}
