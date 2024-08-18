import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import {
  DataSource,
  FindOptionsWhere,
  Like,
  Repository,
  SelectQueryBuilder
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Action } from '../action/entities/action.entity'
import { Menu } from './entities/menu.entity'

@Injectable()
export class MenuService extends BaseService<Menu> {
  protected readonly logger = new Logger(MenuService.name)

  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {
    super(menuRepo)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Menu> {
    return this.menuRepo
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.parent', 'parent')
      .leftJoinAndSelect('menu.children', 'children')
      .leftJoinAndSelect('menu.actions', 'actions')
      .leftJoinAndSelect('actions.menu', 'actionMenu')
  }

  protected applyFilters(
    qb: SelectQueryBuilder<Menu>,
    filters: Record<string, any>
  ): void {
    Object.keys(filters).forEach((key) => {
      if (key) {
        const value = filters[key]
        if (value) {
          qb.andWhere(`menu.${key} LIKE :${key}`, { [key]: `%${value}%` })
        }
      }
    })
  }
  protected applyCustomizations(qb: SelectQueryBuilder<Menu>): void {
    qb.orderBy('menu.sort', 'ASC')
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

  async findOne(id: string): Promise<Menu> {
    // const menu = await this.menuRepo
    //   .createQueryBuilder('menu')
    //   .leftJoinAndSelect('menu.children', 'children')
    //   .leftJoinAndSelect('menu.actions', 'actions')
    //   .leftJoinAndSelect('menu.parent', 'parent')
    //   .where('menu.id = :id', { id })
    //   .getOne()
    return await this.createQueryBuilder()
      .where('menu.id = :id', { id })
      .getOne()
  }

  // async create(entity: Menu): Promise<Menu> {
  //   // 查找父级菜单
  //   //! 如果没有的话，那么作为一级菜单
  //   const parent = entity.parentId
  //     ? await this.menuRepo.findOne({ where: { id: entity.parentId } })
  //     : null

  //   return await this.dataSource.transaction(
  //     async (transactionalEntityManager) => {
  //       // 设置菜单路径
  //       entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`
  //       this.logger.debug('path', entity.path)

  //       // 保存菜单实体
  //       const savedMenu = await transactionalEntityManager.save(Menu, entity)

  //       // 如果有父菜单，将新菜单添加到父菜单的子菜单列表中
  //       if (parent) {
  //         // 加载父菜单的子菜单
  //         parent.children = parent.children || []
  //         parent.children.push(savedMenu)

  //         // 更新父菜单
  //         await transactionalEntityManager.save(Menu, parent)
  //       }

  //       // 保存关联的动作实体
  //       await Promise.all(
  //         entity.actions.map((action) => {
  //           action.menu = savedMenu // 确保动作实体的菜单关系指向新保存的菜单
  //           return transactionalEntityManager.save(Action, action)
  //         })
  //       )

  //       return savedMenu
  //     }
  //   )
  // }

  async create(entity: Menu): Promise<Menu> {
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        // 如果没有 ID，生成 UUID
        if (!entity.id) {
          entity.id = uuid()
        }

        // 查找父级菜单
        const parent = entity.parentId
          ? await transactionalEntityManager.findOne(Menu, {
              where: { id: entity.parentId }
            })
          : null

        // 设置菜单路径
        entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`
        this.logger.debug('path', entity.path)

        // 保存菜单实体
        const savedMenu = await transactionalEntityManager.save(Menu, entity)

        // 如果有父菜单，将新菜单添加到父菜单的子菜单列表中
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(savedMenu)

          // 更新父菜单
          await transactionalEntityManager.save(Menu, parent)
        }

        // 保存关联的动作实体
        // * 其他接口保存
        // await Promise.all(
        //   entity.actions.map(async (action) => {
        //     action.menu = savedMenu // 确保动作实体的菜单关系指向新保存的菜单
        //     await transactionalEntityManager.save(Action, action)
        //   })
        // )
        return savedMenu
      }
    )
  }

  // async update(id: string, entity: Menu): Promise<Menu> {
  //   const existingMenu = await this.menuRepo.findOne({
  //     where: { id },
  //     relations: [MenuRelations.Actions]
  //   })

  //   if (existingMenu) {
  //     return await this.dataSource.transaction(
  //       async (transactionalEntityManager) => {
  //         const removeActions = existingMenu.actions.filter(
  //           (action) =>
  //             !entity.actions.some((eAction) => eAction.id === action.id)
  //         )
  //         const addActions = entity.actions.filter(
  //           (action) =>
  //             !existingMenu.actions.some((eAction) => eAction.id === action.id)
  //         )
  //         const updateActions = existingMenu.actions.filter((action) =>
  //           entity.actions.some((eAction) => eAction.id === action.id)
  //         )
  //         // 删除多余的动作
  //         if (removeActions.length > 0) {
  //           await transactionalEntityManager.remove(Action, removeActions)
  //         }
  //         // 添加新的动作
  //         if (addActions.length > 0) {
  //           await Promise.all(
  //             addActions.map((action) =>
  //               transactionalEntityManager.save(Action, action)
  //             )
  //           )
  //         }
  //         // 更新现有的动作
  //         if (updateActions.length > 0) {
  //           await Promise.all(
  //             updateActions.map((action) => {
  //               const updatedAction = entity.actions.find(
  //                 (eAction) => eAction.id === action.id
  //               )
  //               return transactionalEntityManager.save(Action, {
  //                 ...action,
  //                 ...updatedAction
  //               })
  //             })
  //           )
  //         }
  //         // 更新菜单
  //         Object.assign(existingMenu, entity)
  //         const result = await transactionalEntityManager.save(
  //           Menu,
  //           existingMenu
  //         )
  //         return result
  //       }
  //     )
  //   }
  //   throw new BadRequestException('Menu not found')
  // }

  async update(id: string, entity: Menu): Promise<Menu> {
    const existingMenu = await this.menuRepo.findOne({
      where: { id },
      relations: ['parent', 'children'] // 处理父菜单和子菜单
    })

    if (existingMenu) {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          // 处理菜单的父菜单关系更新
          if (entity.parentId !== existingMenu.parentId) {
            // 如果菜单从一个父菜单中移动
            if (existingMenu.parentId) {
              const oldParent = await transactionalEntityManager.findOne(Menu, {
                where: { id: existingMenu.parentId }
              })
              if (oldParent) {
                oldParent.children = oldParent.children.filter(
                  (child) => child.id !== existingMenu.id
                )
                await transactionalEntityManager.save(Menu, oldParent)
              }
            }

            // 如果新的父菜单存在
            if (entity.parentId) {
              const newParent = await transactionalEntityManager.findOne(Menu, {
                where: { id: entity.parentId }
              })
              if (newParent) {
                newParent.children = newParent.children || []
                newParent.children.push(existingMenu)
                await transactionalEntityManager.save(Menu, newParent)
              }
            }
          }

          // 如果 parentId 为 null，确保菜单作为一级菜单
          if (entity.parentId === null) {
            existingMenu.parentId = null
          }

          // 更新菜单信息
          Object.assign(existingMenu, entity)

          // 保存更新后的菜单
          const updatedMenu = await transactionalEntityManager.save(
            Menu,
            existingMenu
          )
          return updatedMenu
        }
      )
    }

    throw new BadRequestException('Menu not found')
  }

  async remove(id: string): Promise<void> {
    // 查找要删除的菜单
    const menuToRemove = await this.menuRepo.findOne({ where: { id } })

    if (menuToRemove) {
      // 查找所有相关菜单（包括子菜单）
      const relatedMenus = await this.menuRepo.find({
        where: { path: Like(`${menuToRemove.path}%`) }
      })
      // 按路径长度降序排序
      relatedMenus.sort((a, b) => b.path.length - a.path.length)
      // 执行事务删除
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        await Promise.all(
          relatedMenus.map((menu) =>
            transactionalEntityManager.remove(Menu, menu)
          )
        )
      })
    }
  }

  async delete(id: string): Promise<void> {
    // 查找要删除的菜单
    const menuToRemove = await this.menuRepo.findOne({ where: { id } })

    if (menuToRemove) {
      // 查找所有相关菜单（包括子菜单）
      const relatedMenus = await this.menuRepo.find({
        where: { path: Like(`${menuToRemove.path}%`) }
      })

      // 按路径长度降序排序
      relatedMenus.sort((a, b) => b.path.length - a.path.length)

      // 执行事务删除
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        // 删除所有相关的 actions
        await Promise.all(
          relatedMenus.map(async (menu) => {
            // 查找相关的 actions
            const actions = await transactionalEntityManager.find(Action, {
              where: {
                menuId: id
              } as FindOptionsWhere<Action>
            })

            // 删除 actions
            await Promise.all(
              actions.map((action) =>
                transactionalEntityManager.remove(Action, action)
              )
            )

            // 删除 menu
            await transactionalEntityManager.remove(Menu, menu)
          })
        )
      })
    }
  }
}
