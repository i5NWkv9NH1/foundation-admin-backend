import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { CreateAccountDto } from 'src/system/account/dto/create-account.dto'
import { Gender, StatusEnum } from 'src/system/account/entities/account.entity'
import { Organization } from 'src/system/organization/entities/organization.entity'
import { Role } from 'src/system/role/entities/role.entity'

export class SignupDto extends CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  uniqueId: string

  @IsString()
  @IsNotEmpty()
  captcha: string
}
