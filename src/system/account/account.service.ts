import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Brackets, In, Repository, SelectQueryBuilder } from 'typeorm'
import { Action } from '../action/entities/action.entity'
import { Organization } from '../organization/entities/organization.entity'
import { Role } from '../role/entities/role.entity'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountService extends BaseService<Account> {
  protected logger: Logger = new Logger(AccountService.name)
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>
  ) {
    super(accountRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Account> {
    return this.accountRepository.createQueryBuilder('account')
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Account>
  ): SelectQueryBuilder<Account> {
    return qb
      .leftJoinAndSelect('account.organizations', 'organization')
      .leftJoinAndSelect('account.roles', 'role')
  }

  protected applyFilters(
    qb: SelectQueryBuilder<Account>,
    filters: Record<string, any>
  ): void {
    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      if (value) {
        if (key === 'organizationId') {
          qb.andWhere('organization.id = :organizationId', {
            organizationId: value
          })
        } else if (key === 'startDate' || key === 'endDate') {
          if (key === 'startDate') {
            qb.andWhere('account.createdAt >= :startDate', { startDate: value })
          } else if (key === 'endDate') {
            qb.andWhere('account.createdAt <= :endDate', { endDate: value })
          }
        } else if (key === 'status') {
          if (value !== 'ALL') {
            qb.andWhere('account.status = :status', { status: value })
          }
        } else if (key === 'roleId') {
          qb.andWhere('role.id = :roleId', {
            roleId: value
          })
        } else if (key === 'text') {
          qb.andWhere(
            new Brackets((qb) => {
              qb.orWhere('account.username LIKE :search', {
                search: `%${value}%`
              })
                .orWhere('account.address LIKE :search', {
                  search: `%${value}%`
                })
                .orWhere('account.name LIKE :search', { search: `%${value}%` })
            })
          )
        } else {
          qb.andWhere(`account.${key} LIKE :${key}`, { [key]: `%${value}%` })
        }
      }
    })
  }

  async findOne(id: string): Promise<Account> {
    try {
      const qb = this.createQueryBuilder()
      return qb
        .where('account.createdAt IS NOT NULL')
        .andWhere('account.id = :id', { id })
        .leftJoinAndSelect('account.organizations', 'organization')
        .leftJoinAndSelect('account.roles', 'role')
        .orderBy('account.createdAt', 'DESC')
        .getOne()
    } catch (error) {
      throw new BadRequestException('Account not found')
    }
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

  async createAccount(entity: CreateAccountDto) {
    return await this.accountRepository.save(entity)
  }

  async updateAccount(id: string, entity: UpdateAccountDto) {
    const account = await this.findOne(id)
    const organizations = await this.organizationRepo.findBy({
      id: In(entity.organizationIds)
    })
    if (organizations.length !== entity.organizationIds.length) {
      throw new BadRequestException('Some organizations not found')
    }
    account.organizations = organizations
    return await this.accountRepository.save(account)
  }
}
