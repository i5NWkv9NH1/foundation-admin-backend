import { Repository, SelectQueryBuilder } from 'typeorm'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { PaginatedResult } from '../interfaces/paginated-result'

export abstract class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  // 抽象方法，要求子类实现，用于获取查询构造器的别名
  protected abstract getQueryBuilderAlias(): string

  // 通用分页方法
  async paginate(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResult<T>> {
    const alias = this.getQueryBuilderAlias()
    const queryBuilder = this.repository.createQueryBuilder(alias)
    return await this.applyPagination(queryBuilder, page, pageSize)
  }

  // protected async applyPagination(
  //   queryBuilder: SelectQueryBuilder<T>,
  //   page: number = 1,
  //   pageSize: number = 10
  // ): Promise<PaginatedResult<T>> {
  //   const [items, total] = await queryBuilder
  //     .skip((page - 1) * pageSize)
  //     .take(pageSize)
  //     .getManyAndCount()

  //   return {
  //     items,
  //     meta: {
  //       currentPage: page,
  //       pageSize: pageSize,
  //       total: total,
  //       totalPages: Math.ceil(total / pageSize)
  //     }
  //   }
  // }
  protected async applyPagination(
    queryBuilder: SelectQueryBuilder<T>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResult<T>> {
    let items: T[]
    let total: number

    if (pageSize === -1) {
      // 当 pageSize 为 -1 时，获取所有数据
      // 在此情况下，不使用 skip 和 take，直接获取所有数据
      items = await queryBuilder.getMany()
      total = items.length
      // 设置 totalPages 为 1，因为所有数据都在一个页面中
      return {
        items,
        meta: {
          currentPage: 1,
          pageSize: total,
          total: total,
          totalPages: 1
        }
      }
    } else {
      // 当 pageSize 为正数时，执行分页逻辑
      ;[items, total] = await queryBuilder
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount()

      return {
        items,
        meta: {
          currentPage: page,
          pageSize: pageSize,
          total: total,
          totalPages: Math.ceil(total / pageSize)
        }
      }
    }
  }

  async findOne(id: string): Promise<T | null> {
    return this.repository.findOneBy({ id } as any)
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data)
    return this.repository.save(entity)
  }

  async update(id: string, data: any): Promise<T> {
    await this.repository.update(id, data)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
