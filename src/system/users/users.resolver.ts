import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users() {
    return this.usersService.findAll()
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.usersService.findOne({ where: { id } })
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { username, email, password } = createUserInput
    return this.usersService.create(username, email, password)
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const { id, username, email } = updateUserInput
    return this.usersService.update(id, username, email)
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    await this.usersService.remove(id)
    return true
  }
}
