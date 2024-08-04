import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateResourceInput } from './dto/create-resource.input'
import { UpdateResourceInput } from './dto/update-resource.input'
import { Resource } from './entities/resource.entity'
import { ResourceService } from './resource.service'

@Resolver(() => Resource)
export class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @Mutation(() => Resource)
  createResource(
    @Args('createResourceInput') createResourceInput: CreateResourceInput
  ) {
    return this.resourceService.create(createResourceInput)
  }

  @Query(() => [Resource], { name: 'resource' })
  findAll() {
    return this.resourceService.findAll()
  }

  @Query(() => Resource, { name: 'resource' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.resourceService.findOne(id)
  }

  @Mutation(() => Resource)
  updateResource(
    @Args('updateResourceInput') updateResourceInput: UpdateResourceInput
  ) {
    return this.resourceService.update(
      updateResourceInput.id,
      updateResourceInput
    )
  }

  @Mutation(() => Resource)
  removeResource(@Args('id', { type: () => String }) id: string) {
    return this.resourceService.remove(id)
  }
}
