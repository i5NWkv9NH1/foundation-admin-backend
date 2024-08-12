import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Gender, StatusEnum } from 'src/system/account/entities/account.entity'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  email: string

  @IsOptional()
  @IsString()
  avatarUrl?: string

  @IsOptional()
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender

  @IsEnum(StatusEnum)
  @IsOptional()
  state: StatusEnum

  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  address: string
  @IsString()
  uniqueId: string
  @IsString()
  captcha: string
}
