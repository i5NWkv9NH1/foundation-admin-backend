import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { Department } from './entities/department.entity'

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {}

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find()
  }

  findOne(options: FindOneOptions<Department>): Promise<Department | null> {
    return this.departmentRepository.findOne(options)
  }

  create(name: string): Promise<Department> {
    const department = this.departmentRepository.create({ name })
    return this.departmentRepository.save(department)
  }

  async update(id: string, name?: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id }
    })
    if (!department) {
      throw new Error('Department not found')
    }
    if (name) department.name = name
    return this.departmentRepository.save(department)
  }

  async remove(id: string): Promise<void> {
    await this.departmentRepository.delete(id)
  }
}
