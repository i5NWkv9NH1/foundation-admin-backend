import { Controller } from '@nestjs/common'
import { BaseController } from 'src/shared/providers/base.controller'
import { Organization } from './entities/organization.entity'
import { OrganizationsService } from './organizations.service'
import { SystemController } from 'src/shared/decorators'

@SystemController('organizations')
export class OrganizationsController extends BaseController<Organization> {
  constructor(private readonly organizationsService: OrganizationsService) {
    super(organizationsService)
  }
}
