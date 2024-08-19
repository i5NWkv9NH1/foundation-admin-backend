import {
  Logger,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CloudController } from 'src/common/decorators'
import { AccountService } from 'src/system/account/account.service'
import { FolderService } from '../folder/folder.service'
import { FileStorageService } from './file-storage.service'
import { FileUploadService } from './file-upload.service'

@CloudController('files')
export class FileController {
  private readonly logger = new Logger(FileController.name)

  constructor(
    private readonly accountService: AccountService,
    private readonly folderService: FolderService,
    private readonly fileUploadService: FileUploadService,
    private readonly fileStorageService: FileStorageService
  ) {}

  @Post('upload/:accountId/:folderId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('accountId') accountId: string,
    @Param('folderId') folderId: string
  ) {
    return await this.fileUploadService.uploadFile(file, {
      accountId,
      folderId
    })
  }
}
