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
    return this.repo.createQueryBuilder('action')
  }
  protected applyCustomizations(
    qb: SelectQueryBuilder<Action>
  ): SelectQueryBuilder<Action> {
    return qb.orderBy('action.menuId', 'DESC')
  }
  protected applyFilters(
    qb: SelectQueryBuilder<Action>,
    filters: Record<string, any>
  ): void {
    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      qb.andWhere(`action.${key} LIKE :${key}`, { [key]: `%${value}%` })
    })
  }

  async findActionsByIds(ids: string[]): Promise<Action[]> {
    return this.repo.findBy({
      id: In(ids)
    })
  }
}
