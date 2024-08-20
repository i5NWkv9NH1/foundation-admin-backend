import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountModule } from 'src/system/account/account.module'
import { Account } from 'src/system/account/entities/account.entity'
import { File } from '../file/entities/file.entity'
import { FileModule } from '../file/file.module'
import { Folder } from './entities/folder.entity'
import { FolderController } from './folder.controller'
import { FolderService } from './folder.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([File, Folder, Account]),
    forwardRef(() => FileModule),
    forwardRef(() => AccountModule)
  ],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService]
})
export class FolderModule {}
