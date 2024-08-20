import { BaseEntity } from 'src/common/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { File } from '../../file/entities/file.entity'

@Entity('c_folders')
export class Folder extends BaseEntity {
  @Index()
  @Column({ nullable: false })
  name: string

  @Column({ nullable: true })
  relativePath: string

  @Column({ nullable: true })
  thumbnailUrl: string

  @Column({ type: 'text', nullable: true })
  description: string

  @ManyToOne(() => Account, (account) => account.folders)
  @JoinColumn({ name: 'accountId' })
  account: Account

  @OneToMany(() => File, (file) => file.folder)
  files: File[]

  @ManyToMany(() => Account, (_) => _.sharedFolders)
  @JoinTable({
    name: 'c_folder_shared_accounts',
    joinColumn: { name: 'folderId' },
    inverseJoinColumn: { name: 'accountId' }
  })
  sharedAccounts: Account[]
}
