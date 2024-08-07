import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginatedResult } from 'src/shared/interfaces/paginated-result'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { Action } from './entities/action.entity'

@Injectable()
export class ActionService extends BaseService<Action> {
  constructor(
    @InjectRepository(Action)
    private readonly repo: Repository<Action>
  ) {
    super(repo)
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Action>
  ): SelectQueryBuilder<Action> {
    return qb.orderBy('action.menuId', 'DESC')
  }

  async findAll(
    page: number,
    itemPerPage: number
  ): Promise<PaginatedResult<Action>> {
    const qb = this.repo.createQueryBuilder('action')
    return await super.findAll(page, itemPerPage, qb)
  }
}
