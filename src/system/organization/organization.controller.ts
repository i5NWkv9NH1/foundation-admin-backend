import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { Organization } from './entities/organization.entity'
import { OrganizationService } from './organization.service'

@SystemController('organizations')
export class OrganizationController extends BaseController<Organization> {
  constructor(private readonly organizationService: OrganizationService) {
    super(organizationService)
  }
}
