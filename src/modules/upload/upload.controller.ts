import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post(':type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('type') type: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.uploadService.uploadFile(file, type)
  }
}
