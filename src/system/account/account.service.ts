import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DEFAULT_ROLE_NAME } from 'src/constants'
import { BaseService } from 'src/shared/providers/base.service'
import {
  Brackets,
  DataSource,
  In,
  Repository,
  SelectQueryBuilder
} from 'typeorm'
import { Action } from '../action/entities/action.entity'
import {
  Organization,
  TypeEnum
} from '../organization/entities/organization.entity'
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
    private readonly organizationRepo: Repository<Organization>,
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {
    super(accountRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Account> {
    return this.accountRepository
      .createQueryBuilder('account')
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
        } else if (key === 'gender') {
          qb.andWhere('account.gender =:gender', { gender: value })
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

  protected applyCustomizations(qb: SelectQueryBuilder<Account>): void {
    qb
      //
      .andWhere(`role.name != :name`, { name: 'ROOT' })
      //
      .orderBy('account.createdAt', 'ASC')
  }

  async findOne(id: string): Promise<Account> {
    try {
      const qb = this.createQueryBuilder()
      return (
        qb
          .where('account.createdAt IS NOT NULL')
          .andWhere('account.id = :id', { id })
          // ? already join in first hooks
          // .leftJoinAndSelect('account.organizations', 'organization')
          // .leftJoinAndSelect('account.roles', 'role')
          .orderBy('account.createdAt', 'DESC')
          .getOne()
      )
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
    const testActions = []
    account.roles.forEach((role) => {
      role.actions.forEach((action) => {
        allowedActions.add(action.code)
        testActions.push(action.code)
      })
    })

    this.logger.debug('actions: ', testActions)

    return Array.from(allowedActions)
  }

  async findByUsername(username: string) {
    return await this.accountRepository.findOne({
      where: { username },
      relations: ['roles', 'organizations']
    })
  }

  async createAccount(entity: CreateAccountDto): Promise<Account> {
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const existingAccount = await transactionalEntityManager.findOne(
          Account,
          { where: { username: entity.username } }
        )
        if (existingAccount) {
          throw new BadRequestException('Account already exists')
        }

        const account = transactionalEntityManager.create(Account, entity)

        const [company, role] = await Promise.all([
          transactionalEntityManager.findOne(Organization, {
            where: { type: TypeEnum.COMPANY }
          }),
          transactionalEntityManager.findOne(Role, {
            where: { name: DEFAULT_ROLE_NAME }
          })
        ])

        if (!company) {
          throw new BadRequestException('Default organization not found')
        }
        if (!role) {
          throw new BadRequestException('Default role not found')
        }

        account.organizations = [company]
        account.roles = [role]

        return await transactionalEntityManager.save(Account, account)
      }
    )
  }

  // ? 更新账户组织
  async updateAccount(id: string, entity: UpdateAccountDto) {
    const account = await this.findOne(id)

    const { organizationIds, ...updateFields } = entity

    // ? 移除未勾选的组织
    // ? 保存好其他字段
    updateFields.organizations = []
    const newAccount = await this.accountRepository.save({
      ...account,
      ...updateFields
    })

    if (organizationIds) {
      const organizations = await this.organizationRepo.findBy({
        id: In(organizationIds)
      })

      if (organizations.length !== organizationIds.length) {
        throw new BadRequestException('Some organizations not found')
      }

      newAccount.organizations = organizations
    }
    // 保存插入组织的实体
    return await this.accountRepository.save({ ...newAccount })
  }
}
