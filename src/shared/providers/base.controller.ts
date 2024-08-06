import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { BaseEntity } from '../entities/base.entity'
import { BaseService } from './base.service'

export abstract class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ): Promise<PaginatedResult<T>> {
    // if (pageSize === -1) {
    //   pageSize = 0
    //   return this.service.paginate(page, pageSize)
    // }
    return this.service.paginate(page, pageSize)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    return this.service.findOne(id)
  }

  @Post()
  async create(@Body() data: any): Promise<T> {
    return this.service.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<T>): Promise<T> {
    return this.service.update(id, data)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id)
  }
}

interface PaginatedResult<T> {
  items: T[]
  meta: {
    currentPage: number
    pageSize: number
    total: number
    totalPages: number
  }
}
