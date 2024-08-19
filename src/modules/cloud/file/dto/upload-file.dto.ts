import { IsNotEmpty, IsString } from 'class-validator'

export class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  folderId?: string

  @IsNotEmpty()
  @IsString()
  accountId?: string
}
