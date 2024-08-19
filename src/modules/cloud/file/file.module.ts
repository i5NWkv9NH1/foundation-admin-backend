import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountModule } from 'src/system/account/account.module'
import { FolderModule } from '../folder/folder.module'
import { File } from './entities/file.entity'
import { FileStorageService } from './file-storage.service'
import { FileUploadService } from './file-upload.service'
import { FileController } from './file.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    AccountModule,
    forwardRef(() => FolderModule)
  ],
  controllers: [FileController],
  providers: [FileStorageService, FileUploadService],
  exports: [FileStorageService, FileUploadService]
})
export class FileModule {}
