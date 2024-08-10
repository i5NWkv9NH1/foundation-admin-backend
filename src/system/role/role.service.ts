import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { ActionService } from '../action/action.service'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    private readonly actionService: ActionService
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
      qb.andWhere(`role.${key} LIKE :${key}`, { [key]: `%${value}%` })
    })
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Role>
  ): SelectQueryBuilder<Role> {
    return (
      qb
        //
        .leftJoinAndSelect('role.accounts', 'account')
        .leftJoinAndSelect('role.actions', 'action')
    )
  }

  async findRoles(): Promise<Role[]> {
    return this.roleRepo.find({ relations: ['actions'] })
  }
  async findRoleById(id: string): Promise<Role> {
    return this.roleRepo.findOne({ where: { id }, relations: ['actions'] })
  }

  async assignActions(roleId: string, actionIds: string[]): Promise<void> {
    const role = await this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['actions']
    })
    // Assuming ActionService is available to get actions by IDs
    const actions = await this.actionService.findActionsByIds(actionIds)
    role.actions = actions
    await this.roleRepo.save(role)
  }
}
