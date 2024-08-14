import { IsNotEmpty, IsString, Length } from 'class-validator'

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  uniqueId: string

  @IsString()
  @Length(4, 4)
  @IsNotEmpty()
  captcha: string
}
