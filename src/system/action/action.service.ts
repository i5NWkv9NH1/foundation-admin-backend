import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { In, Repository, SelectQueryBuilder } from 'typeorm'
import { Action } from './entities/action.entity'

@Injectable()
export class ActionService extends BaseService<Action> {
  constructor(
    @InjectRepository(Action)
    private readonly repo: Repository<Action>
  ) {
    super(repo)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Action> {
    return this.repo
      .createQueryBuilder('action')
      .leftJoinAndSelect('action.menu', 'menu')
  }
  protected applyFilters(
    qb: SelectQueryBuilder<Action>,
    filters: Record<string, any>
  ): void {
    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      if (key === 'menuId') {
        qb.where('menu.id = :id', { id: value })
      } else {
        qb.andWhere(`action.${key} LIKE :${key}`, { [key]: `%${value}%` })
      }
    })
  }
  protected applyCustomizations(qb: SelectQueryBuilder<Action>): void {
    qb.orderBy('action.sort', 'ASC')
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

  async findActionsByIds(ids: string[]): Promise<Action[]> {
    return this.repo.findBy({
      id: In(ids)
    })
  }
}
