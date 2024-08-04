import { Injectable } from '@nestjs/common'
import { CreateResourceInput } from './dto/create-resource.input'
import { updateResourceInput } from './dto/update-resource.input'

@Injectable()
export class ResourceService {
  create(createResourceInput: CreateResourceInput) {
    return `This action adds a new resource ${createResourceInput}`
  }

  findAll() {
    return `This action returns all resource`
  }

  findOne(id: string) {
    return `This action returns a #${id} resource`
  }

  update(id: string, updateResourceInput: updateResourceInput) {
    return `This action updates a #${id} resource ${updateResourceInput}`
  }

  remove(id: string) {
    return `This action removes a #${id} resource`
  }
}
