import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { Permission } from '../permission/entities/permission.entity'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions', 'users'] })
  }

  findOne(options: FindOneOptions<Role>): Promise<Role | null> {
    return this.roleRepository.findOne(options)
  }

  async create(name: string, permissionIds: string[]): Promise<Role> {
    const permissions = await this.permissionRepository.findByIds(permissionIds)
    const role = this.roleRepository.create({ name, permissions })
    return this.roleRepository.save(role)
  }

  async update(
    id: string,
    name?: string,
    permissionIds?: string[]
  ): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions']
    })
    if (!role) {
      throw new Error('Role not found')
    }
    if (name) role.name = name
    if (permissionIds) {
      role.permissions =
        await this.permissionRepository.findByIds(permissionIds)
    }
    return this.roleRepository.save(role)
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id)
  }
}
