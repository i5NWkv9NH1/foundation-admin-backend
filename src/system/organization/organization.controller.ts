import { UseGuards } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Organization } from './entities/organization.entity'
import { OrganizationService } from './organization.service'

@SystemController('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationController extends BaseController<Organization> {
  constructor(private readonly organizationService: OrganizationService) {
    super(organizationService)
  }
}
