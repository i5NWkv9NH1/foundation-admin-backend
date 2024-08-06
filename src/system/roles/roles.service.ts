import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository } from 'typeorm'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {
    super(roleRepository)
  }

  protected getQueryBuilderAlias(): string {
    return 'roles'
  }
}
