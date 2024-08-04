import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PermissionService } from './permission.service'
import { Permission } from './entities/permission.entity'
import { CreatePermissionInput } from './dto/create-permission.input'
import { UpdatePermissionInput } from './dto/update-permission.input'

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => [Permission])
  async permissions() {
    return this.permissionService.findAll()
  }

  @Query(() => Permission)
  async permission(@Args('id') id: string) {
    return this.permissionService.findOne({ where: { id } })
  }

  @Mutation(() => Permission)
  async createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput
  ) {
    return this.permissionService.create(
      createPermissionInput.action,
      createPermissionInput.resource,
      createPermissionInput.roleIds
    )
  }

  @Mutation(() => Permission)
  async updatePermission(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput
  ) {
    return this.permissionService.update(
      updatePermissionInput.id,
      updatePermissionInput.action,
      updatePermissionInput.resource,
      updatePermissionInput.roleIds
    )
  }

  @Mutation(() => Boolean)
  async removePermission(@Args('id') id: string): Promise<boolean> {
    await this.permissionService.remove(id)
    return true
  }
}
