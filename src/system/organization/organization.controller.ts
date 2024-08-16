import {
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { Actions, SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { DeepPartial } from 'typeorm'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Organization } from './entities/organization.entity'
import { OrganizationService } from './organization.service'

@SystemController('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationController extends BaseController<Organization> {
  constructor(private readonly organizationService: OrganizationService) {
    super(organizationService)
  }
  @Get()
  @Actions('view:sys:organizations')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('itemsPerPage', new DefaultValuePipe(-1), ParseIntPipe)
    itemsPerPage: number,
    @Query('filters', new DefaultValuePipe('{}')) filters: string
  ) {
    return await this.organizationService.findAll(
      page,
      itemsPerPage,
      JSON.parse(filters)
    )
  }

  @Get(':id')
  @Actions('view:sys:organizations')
  async findOne(id: string): Promise<Organization> {
    return await super.findOne(id)
  }

  @Post()
  @Actions('create:sys:organizations')
  async create(entity: Organization): Promise<Organization> {
    return await super.create(entity)
  }

  @Put(':id')
  @Actions('update:sys:organizations')
  async update(
    id: string,
    entity: DeepPartial<Organization>
  ): Promise<Organization> {
    return await super.update(id, entity)
  }

  @Delete(':id')
  @Actions('delete:sys:organizations')
  async delete(id: string): Promise<void> {
    return await super.delete(id)
  }
}
