import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOneOptions } from 'typeorm'
import { Permission } from './entities/permission.entity'
import { Role } from '../roles/entities/role.entity'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find({ relations: ['roles'] })
  }

  findOne(options: FindOneOptions<Permission>): Promise<Permission | null> {
    return this.permissionRepository.findOne(options)
  }

  async create(
    action: string,
    resource: string,
    roleIds: string[]
  ): Promise<Permission> {
    const roles = await this.roleRepository.findByIds(roleIds)
    const permission = this.permissionRepository.create({
      action,
      resource,
      roles
    })
    return this.permissionRepository.save(permission)
  }

  async update(
    id: string,
    action?: string,
    resource?: string,
    roleIds?: string[]
  ): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ['roles']
    })
    if (!permission) {
      throw new Error('Permission not found')
    }
    if (action) permission.action = action
    if (resource) permission.resource = resource
    if (roleIds) {
      permission.roles = await this.roleRepository.findByIds(roleIds)
    }
    return this.permissionRepository.save(permission)
  }

  async remove(id: string): Promise<void> {
    await this.permissionRepository.delete(id)
  }
}
