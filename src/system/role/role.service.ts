import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { ActionService } from '../action/action.service'
import { Action } from '../action/entities/action.entity'
import { Menu } from '../menu/entities/menu.entity'
import { Role, RoleRelations } from './entities/role.entity'

@Injectable()
export class RoleService extends BaseService<Role> {
  protected readonly logger = new Logger(RoleService.name)
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

  async findAll(
    page: number = 1,
    itemsPerPage: number = 10,
    filters: Record<string, any> = {}
  ) {
    const qb = this.createQueryBuilder()
    this.applyFilters(qb, filters)
    this.applyCustomizations(qb)

    const totalItems = await qb.getCount()
    const skip = itemsPerPage > 0 ? (page - 1) * itemsPerPage : 0
    const take = itemsPerPage > 0 ? itemsPerPage : totalItems
    const items = await qb.skip(skip).take(take).getMany()

    return {
      items,
      meta: {
        page,
        itemsPerPage,
        itemsCount: totalItems,
        pagesCount: Math.ceil(totalItems / itemsPerPage)
      }
    }
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

  async updateRoleActionsByRoleIdMenuId(
    roleId: string,
    menuId: string,
    actions: Action[]
  ) {
    // 获取当前角色
    const role = await this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['actions']
    })

    if (!role) {
      throw new BadRequestException('Role not found')
    }

    // 过滤掉与该菜单不相关的 action
    const actionsForMenu = actions.filter((action) => action.menuId === menuId)

    // 如果有需要新增的 actions
    if (actionsForMenu.length > 0) {
      // 先删除与该菜单相关的所有 actions 关联
      role.actions = role.actions.filter((action) => action.menuId !== menuId)

      // 然后添加新的 actions 关联
      role.actions.push(...actionsForMenu)
    } else {
      // 如果没有需要新增的 actions，移除与该菜单相关的所有关联
      role.actions = role.actions.filter((action) => action.menuId !== menuId)
    }

    // 保存更新
    return await this.roleRepo.save(role)
  }

  async findRoleActionsByMenuIdAndRoleId(
    roleId: string,
    menuId: string,
    page: number,
    itemsPerPage: number
  ) {
    const qb = this.roleRepo
      .createQueryBuilder('role')
      .innerJoinAndSelect('role.actions', 'action')
      .innerJoinAndSelect('action.menu', 'menu')
      .where('role.id = :roleId', { roleId })
      .andWhere('action.menuId = :menuId', { menuId })
      .select([
        'role.id',
        'action.id',
        'action.createdAt',
        'action.updatedAt',
        'action.name',
        'action.code',
        'action.icon',
        'action.menuId',
        //! return to frontend which can be check whether if selected item
        'menu',
        'action.sort'
      ])
      .orderBy('action.sort', 'ASC')

    const totalItems = await qb.getCount()
    const skip = itemsPerPage > 0 ? (page - 1) * itemsPerPage : 0
    const take = itemsPerPage > 0 ? itemsPerPage : totalItems
    const items = (await qb.skip(skip).take(take).getMany()).flatMap(
      (role) => role.actions
    )

    return {
      items,
      meta: {
        page,
        itemsPerPage,
        itemsCount: totalItems,
        pagesCount: Math.ceil(totalItems / itemsPerPage)
      }
    }
  }
}
