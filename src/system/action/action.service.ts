import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Action } from './entities/action.entity'
import { Repository } from 'typeorm'
import { PaginatedResult } from 'src/shared/interfaces/paginated-result'

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private readonly repo: Repository<Action>
  ) {}

  async findAll(
    page: number,
    itemPerPage: number,
    filters?: any
  ): Promise<PaginatedResult<Action>> {
    // 获取总记录数
    const queryBuilder = this.repo.createQueryBuilder('action')
    const totalItemsPromise = queryBuilder.getCount()
    // 应用分页
    queryBuilder.skip(itemPerPage * (page - 1)).take(itemPerPage)
    const [items, totalItems] = await Promise.all([
      queryBuilder.getMany(),
      totalItemsPromise
    ])
    const pagesCount = Math.ceil(totalItems / itemPerPage)

    return {
      items,
      meta: {
        page,
        itemPerPage,
        itemsCount: totalItems,
        pagesCount
      }
    }
  }
}
