import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { In, Repository, SelectQueryBuilder } from 'typeorm'
import { ActionService } from '../action/action.service'
import { Action } from '../action/entities/action.entity'
import { Menu } from '../menu/entities/menu.entity'
import { Role, RoleRelations } from './entities/role.entity'

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Action)
    private readonly actionRepo: Repository<Action>,
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
    private readonly actionService: ActionService
  ) {
    super(roleRepo)
  }
  protected createQueryBuilder(): SelectQueryBuilder<Role> {
    const qb = this.roleRepo.createQueryBuilder('role')
    this.logger.debug(this.createQueryBuilder.name)
    return qb
    //! filter ROOT role
    // .andWhere('role.name != :name', { name: 'ROOT' })
    // .orderBy('role.sort', 'ASC')
  }
  // protected applyFilters(
  //   qb: SelectQueryBuilder<Role>,
  //   filters: Record<string, any>
  // ): void {
  //   Object.keys(filters).forEach((key) => {
  //     const value = filters[key]
  //     if (value) {
  //       if (key === 'text') {
  //         qb.andWhere('role.label LIKE :search', {
  //           search: `%${value}%`
  //         })
  //       } else if (key === 'name') {
  //         // qb.andWhere('CAST(role.name AS TEXT)  LIKE :search', {
  //         //   search: `%${value}%`
  //         // })
  //         qb.andWhere('role.name = :name', { name: value })
  //       } else if (key === 'status') {
  //         if (value !== 'ALL') {
  //           qb.andWhere('role.status = :status', { status: value })
  //         }
  //       } else {
  //       }
  //     }
  //   })
  // }
  protected applyFilters(
    qb: SelectQueryBuilder<Role>,
    filters: Record<string, any>
  ): void {
    this.logger.debug(this.applyFilters.name, filters)
    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      // 仅当 value 不为空或未定义时才进行过滤
      if (value !== undefined && value !== null) {
        switch (key) {
          case 'text':
            qb.andWhere('role.label LIKE :search', { search: `%${value}%` })
            break
          case 'name':
            if (value !== 'ROOT') {
              // 仅当 `name` 不为 `ROOT` 时才应用过滤条件
              qb.andWhere('role.name = :name', { name: value })
            }
            break
          case 'status':
            if (value !== 'ALL') {
              qb.andWhere('role.status = :status', { status: value })
            }
            break
          default:
            break
        }
      }
    })
  }

  protected applyCustomizations(qb: SelectQueryBuilder<Role>): void {
    this.logger.debug(this.applyCustomizations.name)
    /**
     * ! WHERE 子句的逻辑是累加的，
     */
    qb
      // .andWhere('role.name != :name', { name: 'ROOT' })
      //
      .andWhere(`role.name != :excludedName`, { excludedName: 'ROOT' })
      .orderBy('role.sort', 'ASC')
    // .leftJoinAndSelect('role.accounts', 'account')
    // .leftJoinAndSelect('role.actions', 'action')
  }

  async findOne(id: string): Promise<Role> {
    const qb = this.roleRepo.createQueryBuilder('role')
    return qb
      .leftJoinAndSelect('role.accounts', 'account')
      .leftJoinAndSelect('role.actions', 'action')
      .where('role.id =:id', { id })
      .getOne()
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

  async findActionsByRoleId(roleId: string): Promise<Action[]> {
    const role = await this.roleRepo.findOne({
      where: {
        id: roleId
      },
      relations: [RoleRelations.Actions]
    })

    return role ? role.actions : []
  }

  async findActionsByRoleIdAndMenuId(
    roleId: string,
    menuId: string
  ): Promise<Action[]> {
    const actions = await this.actionRepo
      .createQueryBuilder('action')
      .innerJoin('action.roles', 'role')
      .where('role.id = :roleId', { roleId })
      .andWhere('action.menuId = :menuId', { menuId })
      .getMany()

    return actions
  }

  async updateRolePermissions(
    roleId: string,
    menuId: string,
    actionIds: string[]
  ): Promise<Role> {
    // 1. 查找角色和菜单
    const role = await this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['actions']
    })
    const menu = await this.menuRepo.findOne({ where: { id: menuId } })

    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`)
    }

    if (!menu) {
      throw new Error(`Menu with ID ${menuId} not found`)
    }

    // 2. 查找现有的权限
    const existingActions = role.actions.filter(
      (action) => action.menu.id === menu.id
    )

    // 3. 查找要添加的新权限
    const newActions = await this.actionRepo.findBy({
      id: In(actionIds)
    })

    // 4. 计算要删除的权限
    const actionsToRemove = existingActions.filter(
      (action) => !actionIds.includes(action.id.toString())
    )

    // 5. 计算要添加的权限
    const actionsToAdd = newActions.filter(
      (action) =>
        !existingActions.some(
          (existingAction) => existingAction.id === action.id
        )
    )

    // 6. 更新权限
    role.actions = role.actions
      .filter((action) => !actionsToRemove.includes(action)) // 移除不需要的权限
      .concat(actionsToAdd) // 添加新的权限

    // 保存更新后的角色
    return await this.roleRepo.save(role)
  }
}
