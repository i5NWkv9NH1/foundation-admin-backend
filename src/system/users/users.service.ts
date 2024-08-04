import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] })
  }

  findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(options)
  }

  async create(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = this.userRepository.create({ username, email, password })
    return this.userRepository.save(user)
  }

  async update(id: string, username?: string, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles']
    })
    if (!user) {
      throw new Error('User not found')
    }
    if (username) user.username = username
    if (email) user.email = email
    return this.userRepository.save(user)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
