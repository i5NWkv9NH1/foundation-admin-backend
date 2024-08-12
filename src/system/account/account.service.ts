import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { Action } from '../action/entities/action.entity'
import { Role } from '../role/entities/role.entity'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Action)
    private actionRepository: Repository<Action>
  ) {
    super(accountRepository)
  }

  // 创建查询构建器，定义表的别名
  protected createQueryBuilder(): SelectQueryBuilder<Account> {
    return this.accountRepository.createQueryBuilder('account')
  }
  // 应用自定义的查询逻辑
  // ? 不设置全局
  // ? 在单个业务逻辑中设置
  protected applyCustomizations(
    qb: SelectQueryBuilder<Account>
  ): SelectQueryBuilder<Account> {
    return (
      qb
        //
        .leftJoinAndSelect('account.organizations', 'organization')
        .leftJoinAndSelect('account.roles', 'role')
    )
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
          // 确保在 `JOIN` 语句中加入组织表，并在 `WHERE` 条件中过滤
          qb
            // .leftJoin('account.organizations', 'organization')
            .andWhere('organization.id = :organizationId', {
              organizationId: value
            })
        } else if (key === 'startDate' || key === 'endDate') {
          if (key === 'startDate') {
            qb.andWhere('account.createdAt >= :startDate', { startDate: value })
          } else if (key === 'endDate') {
            qb.andWhere('account.createdAt <= :endDate', { endDate: value })
          }
        } else if (key === 'status') {
          // -1 all
          if (value !== 'ALL') {
            qb.where('account.status = :status', { status: value })
          }
        } else {
          // TODO: update text search LIKE in varchar columns
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
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['roles']
    })
    return account.roles
  }

  async getAllowActions(accountId: string): Promise<string[]> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
      relations: ['roles', 'roles.actions']
    })

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    const allowedActions = new Set<string>()
    account.roles.forEach((role) => {
      role.actions.forEach((action) => {
        allowedActions.add(action.code)
      })
    })

    return Array.from(allowedActions)
  }

  async findByUsername(username: string) {
    return await this.accountRepository.findOne({
      where: { username },
      relations: ['roles', 'organizations']
    })
  }
}
