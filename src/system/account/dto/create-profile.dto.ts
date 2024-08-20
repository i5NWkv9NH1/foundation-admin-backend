import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Gender, Status } from 'src/common/enums'

export class CreateProfileDto {
  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: Gender

  @IsOptional()
  @IsEnum(Status)
  readonly state?: Status

  @IsOptional()
  @IsString()
  readonly phone?: string

  @IsOptional()
  @IsString()
  readonly address?: string

  @IsOptional()
  @IsString()
  readonly email?: string

  @IsOptional()
  @IsString()
  readonly avatarUrl?: string

  @IsOptional()
  @IsString()
  readonly bannerUrl?: string

  @IsOptional()
  @IsString()
  readonly bio?: string

  @IsOptional()
  @IsString()
  readonly website?: string

  @IsOptional()
  @IsString()
  readonly location?: string

  @IsOptional()
  @IsString({ each: true })
  readonly socialMediaLinks?: Record<string, string> // JSON 字段
}

export class UpdateProfileDto extends CreateProfileDto {}
