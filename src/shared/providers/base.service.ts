import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { BaseEntity } from '../entities/base.entity'
import { PaginatedResult } from '../interfaces/paginated-result' // Assume this interface is defined

export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  // Apply customizations to the query builder for specific needs
  protected abstract applyCustomizations(
    qb: SelectQueryBuilder<T>
  ): SelectQueryBuilder<T>

  async findAll(
    page: number,
    itemPerPage: number,
    qb?: SelectQueryBuilder<T> // Optional parameter to allow custom qb
  ): Promise<PaginatedResult<T>> {
    qb = qb || this.repository.createQueryBuilder()
    qb = this.applyCustomizations(qb)
    const totalItemsPromise = qb.getCount()
    qb.skip(itemPerPage * (page - 1)).take(itemPerPage)
    const [items, totalItems] = await Promise.all([
      qb.getMany(),
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

  async findOne(id: string, qb?: SelectQueryBuilder<T>): Promise<T> {
    qb = qb || this.repository.createQueryBuilder()
    qb = this.applyCustomizations(qb)
    return qb.where({ id } as FindOptionsWhere<T>).getOne()
  }

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data)
    return this.repository.save(entity)
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data)
    return this.findOne(id)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
