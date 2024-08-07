import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginatedResult } from 'src/shared/interfaces/paginated-result'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>
  ) {
    super(roleRepo)
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Role>
  ): SelectQueryBuilder<Role> {
    return qb
      .leftJoinAndSelect('role.accounts', 'account')
      .leftJoinAndSelect('role.actions', 'action')
  }

  async findAll(
    page: number,
    itemPerPage: number
  ): Promise<PaginatedResult<Role>> {
    const qb = this.roleRepo.createQueryBuilder('role')
    return await super.findAll(page, itemPerPage, qb)
  }

  async findOne(id: string): Promise<Role> {
    const qb = this.roleRepo.createQueryBuilder('role')
    return await super.findOne(id, qb)
  }
}
