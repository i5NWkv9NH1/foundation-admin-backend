import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {
    super(accountsRepository)
  }

  // 创建查询构建器，定义表的别名
  protected createQueryBuilder(): SelectQueryBuilder<Account> {
    return this.accountsRepository.createQueryBuilder('account')
  }
  // 应用自定义的查询逻辑
  protected applyCustomizations(
    qb: SelectQueryBuilder<Account>
  ): SelectQueryBuilder<Account> {
    return qb
    // .leftJoinAndSelect('account.organizations', 'organization')
    // .leftJoinAndSelect('account.roles', 'role')
    // .orderBy('account.createdAt', 'DESC')
  }

  // 自定义过滤逻辑
  protected applyFilters(
    qb: SelectQueryBuilder<Account>,
    filters: Record<string, any>
  ): void {
    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      if (value) {
        if (key === 'startDate' || key === 'endDate') {
          if (key === 'startDate') {
            qb.andWhere('account.createdAt >= :startDate', { startDate: value })
          }
          if (key === 'endDate') {
            qb.andWhere('account.createdAt <= :endDate', { endDate: value })
          }
        } else {
          qb.andWhere(`account.${key} LIKE :${key}`, { [key]: `%${value}%` })
        }
      }
    })
  }
}
