import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { BaseEntity } from '../entities/base.entity'
import { PaginatedResult } from '../interfaces/paginated-result'
import { BaseService } from './base.service'

export abstract class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('itemPerPage') itemPerPage: number = 10
  ): Promise<PaginatedResult<T>> {
    return await this.service.findAll(page, itemPerPage)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    return await this.service.findOne(id)
  }

  @Post()
  async create(@Body() data: T): Promise<T> {
    return await this.service.create(data)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: QueryDeepPartialEntity<T>
  ): Promise<T> {
    return await this.service.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id)
  }
}
