import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcrypt'
import { chain, uniq } from 'lodash'
import { DEFAULT_ROLE_NAME } from 'src/constants'
import {
  Brackets,
  DataSource,
  In,
  Repository,
  SelectQueryBuilder
} from 'typeorm'
import { Action } from '../action/entities/action.entity'
import { Menu } from '../menu/entities/menu.entity'
import {
  Organization,
  TypeEnum
} from '../organization/entities/organization.entity'
import { Role } from '../role/entities/role.entity'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { AccountProfile } from './entities/account-profile.entity'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountService {
  protected logger: Logger = new Logger(AccountService.name)

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}

  //#region Hooks
  // * QueryBuilder
  protected createQueryBuilder(): SelectQueryBuilder<Account> {
    return this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.organizations', 'organization')
      .leftJoinAndSelect('account.roles', 'role')
      .leftJoinAndSelect('account.profile', 'profile') // 确保联接到 profile
  }

  // * Filters
  protected applyFilters(
    qb: SelectQueryBuilder<Account>,
    filters: Record<string, any>
  ): void {
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return

      switch (key) {
        case 'organizationId':
          qb.andWhere('organization.id = :organizationId', {
            organizationId: value
          })
          break

        case 'startDate':
          qb.andWhere('account.createdAt >= :startDate', { startDate: value })
          break

        case 'endDate':
          qb.andWhere('account.createdAt <= :endDate', { endDate: value })
          break

        case 'status':
          if (value !== 'ALL') {
            qb.andWhere('profile.status = :status', { status: value })
          }
          break

        case 'gender':
          qb.andWhere('profile.gender = :gender', { gender: value })
          break

        case 'roleId':
          qb.andWhere('role.id = :roleId', { roleId: value })
          break

        case 'text':
          qb.andWhere(
            new Brackets((qb) => {
              qb.orWhere('account.username LIKE :search', {
                search: `%${value}%`
              })
                .orWhere('profile.address LIKE :search', {
                  search: `%${value}%`
                })
                .orWhere('account.name LIKE :search', { search: `%${value}%` })
            })
          )
          break

        default:
          qb.andWhere(`account.${key} LIKE :${key}`, { [key]: `%${value}%` })
          break
      }
    })
  }

  // * Hooks after filters
  protected applyCustomizations(qb: SelectQueryBuilder<Account>): void {
    qb.orderBy('account.createdAt', 'ASC')
  }

  //#endregion

  async findAll(
    page: number = 1,
    itemsPerPage: number = 10,
    filters: Record<string, any> = {}
  ) {
    const qb = this.createQueryBuilder()
    this.applyFilters(qb, filters)
    this.applyCustomizations(qb)

    const totalItems = await qb.getCount()
    const skip = itemsPerPage > 0 ? (page - 1) * itemsPerPage : 0
    const take = itemsPerPage > 0 ? itemsPerPage : totalItems
    const items = await qb.skip(skip).take(take).getMany()

    return {
      items,
      meta: {
        page,
        itemsPerPage,
        itemsCount: totalItems,
        pagesCount: Math.ceil(totalItems / itemsPerPage)
      }
    }
  }

  async findOne(id: string): Promise<Account> {
    const qb = this.createQueryBuilder()
    const account = await qb.where('account.id = :id', { id }).getOne()
    if (!account) {
      throw new NotFoundException('Account not found')
    }
    return account
  }

  async create(entity: CreateAccountDto): Promise<Account> {
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const existingAccount = await transactionalEntityManager.findOne(
            Account,
            { where: { username: entity.username } }
          )
          if (existingAccount) {
            throw new BadRequestException('Account already exists')
          }

          const account = transactionalEntityManager.create(Account, {
            ...entity,
            profile: transactionalEntityManager.create(
              AccountProfile,
              entity.profile
            )
          })
          account.password = await hash(entity.password, 10)
          account.originPassword = entity.password

          const [organization, role] = await Promise.all([
            transactionalEntityManager.findOne(Organization, {
              where: { type: TypeEnum.COMPANY }
            }),
            transactionalEntityManager.findOne(Role, {
              where: { name: DEFAULT_ROLE_NAME }
            })
          ])

          if (!organization || !role) {
            throw new BadRequestException(
              'Default organization or role not found'
            )
          }

          account.organizations = [organization]
          account.roles = [role]

          return await transactionalEntityManager.save(Account, account)
        }
      )
    } catch (error) {
      this.logger.error('Error creating account', error.stack)
      throw error
    }
  }

  async update(id: string, entity: UpdateAccountDto) {
    const account = await this.findOne(id)
    const { organizationIds, profile, ...updateFields } = entity
    updateFields.organizations = []

    if (organizationIds) {
      const organizations = await this.organizationRepo.findBy({
        id: In(organizationIds)
      })
      if (organizations.length !== organizationIds.length) {
        throw new BadRequestException('Some organizations not found')
      }
      updateFields.organizations = organizations
    }

    if (profile) {
      // @ts-ignore
      account.profile = { ...account.profile, ...profile }
    }

    Object.assign(account, updateFields)

    return await this.accountRepository.save(account)
  }

  async getAllowActions({ username }: { username: string }): Promise<string[]> {
    const account = await this.accountRepository.findOne({
      where: { username },
      relations: {
        roles: {
          actions: true
        }
      }
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

    this.logger.debug('Account actions')
    this.logger.debug(Array.from(allowedActions))

    return Array.from(allowedActions)
  }

  // typeorm
  async findPermissions(account: Account) {
    const roleIds = account.roles.map((role) => role.id)

    const actions = await this.actionRepository.find({
      where: {
        roles: { id: In(roleIds) }
      }
    })
    const menuIds = uniq(actions.map((action) => action.menuId))
    const paths = await this.menuRepository.find({
      where: {
        id: In(menuIds)
      },
      select: ['path']
    })

    const allMenuIds = chain(paths)
      .flatMap((path) => path.path.split('.'))
      .uniq()
      .value()
    const menus = await this.menuRepository.find({
      where: {
        id: In(allMenuIds)
      },
      relations: ['parent', 'children']
    })
    return { actions, menus }
  }

  async findByUsername(username: string) {
    const account = await this.accountRepository.findOne({
      where: { username },
      relations: ['roles', 'organizations', 'profile'] // 确保加载 profile
    })
    if (!account) throw new BadRequestException('Account not found')
    return account
  }

  async delete(id: string) {
    const result = await this.accountRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException('Account not found')
    }
    return result
  }
}
