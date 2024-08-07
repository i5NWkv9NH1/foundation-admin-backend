import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, Repository } from 'typeorm'
import { Action } from '../action/entities/action.entity'
import { Menu, MenuRelations } from './entities/menu.entity'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepo: Repository<Action>,
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}

  async findOne(id: string): Promise<Menu> {
    return await this.menuRepo.findOne({
      where: { id },
      relations: [MenuRelations.Actions]
    })
  }

  async create(entity: Menu): Promise<Menu> {
    // 查找父级菜单
    const parent = await this.menuRepo.findOne({
      where: { id: entity.parentId }
    })
    // 开启事务
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        // 设置菜单路径
        entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`
        // 保存菜单实体
        const result = await transactionalEntityManager.save(Menu, entity)
        // 保存关联的动作实体
        await Promise.all(
          entity.actions.map((action) =>
            transactionalEntityManager.save(Action, action)
          )
        )
        return result
      }
    )
  }

  async update(entity: Menu): Promise<Menu> {
    // 查找现有菜单及其动作
    const existingMenu = await this.menuRepo.findOne({
      where: { id: entity.id },
      relations: [MenuRelations.Actions]
    })

    if (existingMenu) {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          // 找到需要删除、添加和更新的动作
          const removeActions = existingMenu.actions.filter(
            (action) =>
              !entity.actions.some((eAction) => eAction.id === action.id)
          )
          const addActions = entity.actions.filter(
            (action) =>
              !existingMenu.actions.some((eAction) => eAction.id === action.id)
          )
          const updateActions = existingMenu.actions.filter((action) =>
            entity.actions.some((eAction) => eAction.id === action.id)
          )
          // 删除多余的动作
          if (removeActions.length > 0) {
            await transactionalEntityManager.remove(Action, removeActions)
          }
          // 添加新的动作
          if (addActions.length > 0) {
            await Promise.all(
              addActions.map((action) =>
                transactionalEntityManager.save(Action, action)
              )
            )
          }
          // 更新现有的动作
          if (updateActions.length > 0) {
            await Promise.all(
              updateActions.map((action) => {
                const updatedAction = entity.actions.find(
                  (eAction) => eAction.id === action.id
                )
                return transactionalEntityManager.save(Action, {
                  ...action,
                  ...updatedAction
                })
              })
            )
          }
          // 更新菜单
          Object.assign(existingMenu, entity)
          const result = await transactionalEntityManager.save(
            Menu,
            existingMenu
          )
          return result
        }
      )
    }
    return null // 如果没有找到菜单，返回 null
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
}
