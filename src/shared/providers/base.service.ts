import { Logger } from '@nestjs/common'
import { Account } from 'src/system/account/entities/account.entity'
import {
  DeepPartial,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder
} from 'typeorm'
import { BaseEntity } from '../entities/base.entity'

export abstract class BaseService<T extends BaseEntity> {
  protected readonly logger = new Logger(BaseService.name)
  constructor(private readonly repository: Repository<T>) {}

  // 抽象方法：子类实现自定义的查询构建器
  protected abstract createQueryBuilder(): SelectQueryBuilder<T>
  // 抽象方法：子类实现自定义的查询逻辑
  protected abstract applyCustomizations(
    qb: SelectQueryBuilder<T>
  ): SelectQueryBuilder<T>
  // 抽象方法：子类实现自定义的过滤逻辑
  protected abstract applyFilters(
    qb: SelectQueryBuilder<T>,
    filters: Record<string, any>
  ): void

  async findAll(
    page: number = 1,
    itemsPerPage: number = 10,
    filters: Record<string, any> = {}
  ) {
    const qb = this.createQueryBuilder()
    this.applyCustomizations(qb)
    this.applyFilters(qb, filters)

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

  async findOne(id: string): Promise<T> {
    return await this.repository.findOne({
      where: {
        id
      } as FindOptionsWhere<T>
    })
    // const qb = this.createQueryBuilder()
    // this.applyCustomizations(qb)
    // return qb.getOne()
  }

  async create(entity: T): Promise<T> {
    const item = this.repository.create(entity)
    return await this.repository.save(item)
  }

  async update(
    id: string,
    updateData: DeepPartial<Account>
  ): Promise<T | null> {
    try {
      // Fetch the existing entity
      const item = await this.repository.findOne({
        where: { id } as FindOptionsWhere<T>
      })

      if (!item) {
        console.warn(`Entity with ID ${id} not found`)
        return null
      }

      // Apply the updates to the fetched entity
      for (const [key, value] of Object.entries(updateData)) {
        ;(item as any)[key] = value // Explicitly set each field
      }

      // Save the updated entity
      const result = await this.repository.save(item)

      return result
    } catch (error) {
      console.error('Error saving entity:', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
