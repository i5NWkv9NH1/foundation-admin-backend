import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role, RoleRelations } from './entities/role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>
  ) {}
  async findOne(id: string): Promise<Role> {
    return await this.roleRepo.findOne({
      where: { id },
      relations: [RoleRelations.Actions]
    })
  }
}
