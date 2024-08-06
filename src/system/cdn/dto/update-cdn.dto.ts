import { PartialType } from '@nestjs/mapped-types'
import { CreateCdnDto } from './create-cdn.dto'

export class UpdateCdnDto extends PartialType(CreateCdnDto) {}
