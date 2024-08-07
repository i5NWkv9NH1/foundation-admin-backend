import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginatedResult } from 'src/shared/interfaces/paginated-result'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountService extends BaseService<Account> {
  private readonly qb: SelectQueryBuilder<Account>

  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {
    super(accountsRepository)
    this.qb = this.accountsRepository.createQueryBuilder('account')
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Account>
  ): SelectQueryBuilder<Account> {
    return qb
      .leftJoinAndSelect('account.organizations', 'organization')
      .leftJoinAndSelect('account.roles', 'role')
  }

  async findOne(id: string): Promise<Account> {
    const qb = this.accountsRepository.createQueryBuilder('account')
    return await super.findOne(id, qb)
  }

  async findAll(
    page: number,
    itemPerPage: number
  ): Promise<PaginatedResult<Account>> {
    const qb = this.accountsRepository.createQueryBuilder('account')
    return await super.findAll(page, itemPerPage, qb)
  }
}
