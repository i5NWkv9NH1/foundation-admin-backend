import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { DepartmentService } from './department.service'
import { Department } from './entities/department.entity'
import { CreateDepartmentInput } from './dto/create-department.input'
import { UpdateDepartmentInput } from './dto/update-department.input'

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => [Department])
  async departments() {
    return this.departmentService.findAll()
  }

  @Query(() => Department)
  async department(@Args('id') id: string) {
    return this.departmentService.findOne({ where: { id } })
  }

  @Mutation(() => Department)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput
  ) {
    return this.departmentService.create(createDepartmentInput.name)
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput
  ) {
    return this.departmentService.update(
      updateDepartmentInput.id,
      updateDepartmentInput.name
    )
  }

  @Mutation(() => Boolean)
  async removeDepartment(@Args('id') id: string): Promise<boolean> {
    await this.departmentService.remove(id)
    return true
  }
}
