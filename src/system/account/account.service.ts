import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { Role } from '../role/entities/role.entity'
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
  // ? 不设置全局
  // ? 在单个业务逻辑中设置
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
        if (key === 'organizationId') {
          // qb.innerJoin(
          //   'account.organizations',
          //   'organization',
          //   'organization.id = :organizationId',
          //   { organizationId: value }
          // )
          qb
            //
            .leftJoin('account.organizations', 'organization')
            .where('organization.id = :id', {
              id: value
            })
        }
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

  // ? 单个查询时自定义业务逻辑
  async findOne(id: string): Promise<Account> {
    const qb = this.createQueryBuilder()
    return qb
      .where('account.createdAt IS NOT NULL')
      .andWhere('account.id = :id', { id })
      .leftJoinAndSelect('account.organizations', 'organization')
      .leftJoinAndSelect('account.roles', 'role')
      .orderBy('account.createdAt', 'DESC')
      .getOne()
  }

  async getUserRoles(id: string): Promise<Role[]> {
    const account = await this.accountsRepository.findOne({
      where: { id },
      relations: ['roles']
    })
    return account.roles
  }
}
