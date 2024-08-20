import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Action } from 'rxjs/internal/scheduler/Action'
import { File } from 'src/modules/cloud/file/entities/file.entity'
import { FileModule } from 'src/modules/cloud/file/file.module'
import { Folder } from 'src/modules/cloud/folder/entities/folder.entity'
import { FolderModule } from 'src/modules/cloud/folder/folder.module'
import { Menu } from '../menu/entities/menu.entity'
import { Organization } from '../organization/entities/organization.entity'
import { Role } from '../role/entities/role.entity'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { AccountProfile } from './entities/account-profile.entity'
import { Account } from './entities/account.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      AccountProfile,
      File,
      Folder,
      Action,
      Role,
      Organization,
      Menu
    ]),
    forwardRef(() => FileModule),
    forwardRef(() => FolderModule)
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
