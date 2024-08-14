import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { Organization } from 'src/system/organization/entities/organization.entity'
import { Role } from 'src/system/role/entities/role.entity'
import { Gender, StatusEnum } from '../entities/account.entity'

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsString()
  avatarUrl?: string

  @IsEnum(Gender)
  gender: Gender

  @IsEnum(StatusEnum)
  state: StatusEnum

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsArray()
  roles?: Role[]

  @IsOptional()
  @IsArray()
  organizations?: Organization[]
}
