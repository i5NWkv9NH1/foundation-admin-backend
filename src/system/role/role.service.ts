import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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
  protected createQueryBuilder(): SelectQueryBuilder<Role> {
    return this.roleRepo.createQueryBuilder('role')
  }
  protected applyFilters(
    qb: SelectQueryBuilder<Role>,
    filters: Record<string, any>
  ): void {
    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      qb.andWhere(`organization.${key} LIKE :${key}`, { [key]: `%${value}%` })
    })
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Role>
  ): SelectQueryBuilder<Role> {
    return qb
      .leftJoinAndSelect('role.accounts', 'account')
      .leftJoinAndSelect('role.actions', 'action')
  }
}
