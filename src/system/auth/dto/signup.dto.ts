import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { Gender, StatusEnum } from 'src/system/account/entities/account.entity'
import { Organization } from 'src/system/organization/entities/organization.entity'
import { Role } from 'src/system/role/entities/role.entity'

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  uniqueId: string
  @IsString()
  captcha: string

  @IsString()
  @IsOptional()
  email?: string

  @IsOptional()
  @IsString()
  avatarUrl?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender

  @IsEnum(StatusEnum)
  @IsOptional()
  state?: StatusEnum

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsArray()
  roles?: Role[]

  @IsOptional()
  @IsArray()
  organizations?: Organization[]
}
