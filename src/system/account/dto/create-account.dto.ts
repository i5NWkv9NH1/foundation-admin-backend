import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
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
}
