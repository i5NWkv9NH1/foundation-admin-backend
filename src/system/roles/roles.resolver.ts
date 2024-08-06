import { Resolver } from '@nestjs/graphql'
import { Role } from './entities/role.entity'
import { RolesService } from './roles.service'

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly roleService: RolesService) {}

  // @Query(() => [Role])
  // async roles() {
  //   return this.roleService.findAll()
  // }

  // @Query(() => Role)
  // async role(@Args('id') id: string) {
  //   return this.roleService.findOne({ where: { id } })
  // }

  // @Mutation(() => Role)
  // async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
  //   return this.roleService.create(
  //     createRoleInput.name,
  //     createRoleInput.permissionIds
  //   )
  // }

  // @Mutation(() => Role)
  // async updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
  //   return this.roleService.update(
  //     updateRoleInput.id,
  //     updateRoleInput.name,
  //     updateRoleInput.permissionIds
  //   )
  // }

  // @Mutation(() => Boolean)
  // async removeRole(@Args('id') id: string): Promise<boolean> {
  //   await this.roleService.remove(id)
  //   return true
  // }
}
