import { IsArray, IsOptional, IsString } from 'class-validator'
import { CreateAccountDto } from './create-account.dto'

export class UpdateAccountDto extends CreateAccountDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  organizationIds: string[]
}
