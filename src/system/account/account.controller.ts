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
import { Actions, SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { AccountService } from './account.service'
import { UpdateAccountDto } from './dto/update-account.dto'
import { Account } from './entities/account.entity'

@SystemController('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountController extends BaseController<Account> {
  protected logger = new Logger(AccountController.name)

  constructor(private readonly accountService: AccountService) {
    super(accountService)
  }

  @Get()
  @Actions('view:sys:accounts')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('itemsPerPage', new DefaultValuePipe(-1), ParseIntPipe)
    itemsPerPage: number,
    @Query('filters', new DefaultValuePipe('{}')) filters: string
  ) {
    return await this.accountService.findAll(
      page,
      itemsPerPage,
      JSON.parse(filters)
    )
  }

  @Get(':id')
  @Actions('view:sys:accounts')
  async findOne(id: string): Promise<Account> {
    return await super.findOne(id)
  }

  @Post()
  @Actions('create:sys:accounts')
  async create(entity: Account): Promise<Account> {
    return await super.create(entity)
  }

  @Put(':id')
  @Actions('update:sys:accounts')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    return await this.accountService.updateAccount(id, updateAccountDto)
  }

  @Delete(':id')
  @Actions('delete:sys:accounts')
  async delete(id: string): Promise<void> {
    return await super.delete(id)
  }
}
