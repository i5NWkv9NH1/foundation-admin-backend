import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { PaginatedResult } from 'src/shared/interfaces/paginated-result'
import { BaseService } from 'src/shared/providers/base.service'
import { DataSource, Like, Repository, SelectQueryBuilder } from 'typeorm'
import { Action } from '../action/entities/action.entity'
import { Menu } from './entities/menu.entity'

@Injectable()
export class MenuService extends BaseService<Menu> {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {
    super(menuRepo)
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Menu>
  ): SelectQueryBuilder<Menu> {
    return qb
      .leftJoinAndSelect('menu.parent', 'parent')
      .leftJoinAndSelect('menu.children', 'children')
      .leftJoinAndSelect('menu.actions', 'actions')
  }

  async findAll(
    page: number,
    itemPerPage: number
  ): Promise<PaginatedResult<Menu>> {
    const qb = this.menuRepo.createQueryBuilder('menu')
    return await super.findAll(page, itemPerPage, qb)
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.menuRepo
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.children', 'children')
      .where('menu.id = :id', { id })
      .getOne()
    console.log(menu)
    const qb = this.menuRepo.createQueryBuilder('menu')
    return await super.findOne(id, qb)
  }
  async create(entity: Menu): Promise<Menu> {
    // 查找父级菜单
    //! 如果没有的话，那么作为一级菜单
    const parent = entity.parentId
      ? await this.menuRepo.findOne({ where: { id: entity.parentId } })
      : null

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        // 设置菜单路径
        entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`

        // 保存菜单实体
        const savedMenu = await transactionalEntityManager.save(Menu, entity)

        // 如果有父菜单，将新菜单添加到父菜单的子菜单列表中
        if (parent) {
          // 加载父菜单的子菜单
          parent.children = parent.children || []
          parent.children.push(savedMenu)

          // 更新父菜单
          await transactionalEntityManager.save(Menu, parent)
        }

        // 保存关联的动作实体
        await Promise.all(
          entity.actions.map((action) => {
            action.menu = savedMenu // 确保动作实体的菜单关系指向新保存的菜单
            return transactionalEntityManager.save(Action, action)
          })
        )

        return savedMenu
      }
    )
  }

  // async update(entity: Menu): Promise<Menu> {
  //   // 查找现有菜单及其动作
  //   const existingMenu = await this.menuRepo.findOne({
  //     where: { id: entity.id },
  //     relations: [MenuRelations.Actions]
  //   })

  //   if (existingMenu) {
  //     return await this.dataSource.transaction(
  //       async (transactionalEntityManager) => {
  //         // 找到需要删除、添加和更新的动作
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
  //   return null // 如果没有找到菜单，返回 null
  // }

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
}
