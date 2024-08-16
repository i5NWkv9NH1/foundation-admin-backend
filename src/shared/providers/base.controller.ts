import {
  Body,
  DefaultValuePipe,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { DeepPartial } from 'typeorm'
import { Actions } from '../decorators'
import { BaseEntity } from '../entities/base.entity'
import { BaseService } from './base.service'
import { JwtAuthGuard } from 'src/system/auth/jwt-auth.guard'
import { RolesGuard } from 'src/system/auth/roles.guard'

@UseGuards(JwtAuthGuard, RolesGuard)
export abstract class BaseController<T extends BaseEntity> {
  protected readonly logger = new Logger(BaseController.name)
  constructor(private readonly service: BaseService<T>) {}

  @Get()
  @Actions('VIEW')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('itemsPerPage', new DefaultValuePipe(-1), ParseIntPipe)
    itemsPerPage: number,
    @Query('filters', new DefaultValuePipe('{}')) filters: string
  ) {
    return await this.service.findAll(page, itemsPerPage, JSON.parse(filters))
  }

  @Get(':id')
  @Actions('VIEW')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id)
  }

  @Post()
  @Actions('CREATE')
  async create(@Body() entity: T) {
    return await this.service.create(entity)
  }

  @Put(':id')
  @Actions('UPDATE')
  async update(@Param('id') id: string, @Body() entity: DeepPartial<T>) {
    return await this.service.update(id, entity)
  }

  @Delete(':id')
  @Actions('DELETE')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id)
  }
}
