import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { PaginatedResult } from 'src/shared/interfaces/paginated-result'
import { BaseService } from 'src/shared/providers/base.service'
import { DataSource, Like, Repository, SelectQueryBuilder } from 'typeorm'
import { Organization } from './entities/organization.entity'

@Injectable()
export class OrganizationService extends BaseService<Organization> {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectDataSource()
    private readonly dataSource: DataSource // 注入 DataSource
  ) {
    super(organizationRepository)
  }

  protected applyCustomizations(
    qb: SelectQueryBuilder<Organization>
  ): SelectQueryBuilder<Organization> {
    return qb
      .leftJoinAndSelect('organization.parent', 'parent')
      .leftJoinAndSelect('organization.children', 'children')
      .leftJoinAndSelect('organization.accounts', 'accounts')
  }

  async findAll(
    page: number,
    itemPerPage: number
  ): Promise<PaginatedResult<Organization>> {
    const qb = this.organizationRepository.createQueryBuilder('organization')
    return await super.findAll(page, itemPerPage, qb)
  }

  async findOne(id: string): Promise<Organization> {
    // const qb = this.organizationRepository.createQueryBuilder('organization')
    // return await super.findOne(id, qb)
    return await this.organizationRepository.findOne({
      where: { id },
      relations: ['accounts']
    })
  }

  async create(entity: Organization): Promise<Organization> {
    // 查找父级组织
    const parent = await this.organizationRepository.findOne({
      where: { id: entity.parentId }
    })

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        // 设置组织路径
        entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`
        // 保存组织实体
        const result = await transactionalEntityManager.save(
          Organization,
          entity
        )
        return result
      }
    )
  }

  // async update(entity: Organization): Promise<Organization> {
  //   // 查找现有组织
  //   const existingOrganization = await this.organizationRepository.findOne({
  //     where: { id: entity.id }
  //   })

  //   if (existingOrganization) {
  //     return await this.dataSource.transaction(
  //       async (transactionalEntityManager) => {
  //         // 更新组织实体
  //         Object.assign(existingOrganization, entity)
  //         // 保存更新后的组织实体
  //         const result = await transactionalEntityManager.save(
  //           Organization,
  //           existingOrganization
  //         )
  //         return result
  //       }
  //     )
  //   }
  //   return null // 如果没有找到组织，返回 null
  // }

  async remove(id: string): Promise<void> {
    // 查找要删除的组织
    const organizationToRemove = await this.organizationRepository.findOne({
      where: { id }
    })

    if (organizationToRemove) {
      // 查找所有相关组织（包括子组织）
      const relatedOrganizations = await this.organizationRepository.find({
        where: { path: Like(`${organizationToRemove.path}%`) }
      })

      // 按路径长度降序排序
      relatedOrganizations.sort((a, b) => b.path.length - a.path.length)

      // 执行事务删除
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        await Promise.all(
          relatedOrganizations.map((org) =>
            transactionalEntityManager.remove(Organization, org)
          )
        )
      })
    }
  }
}
