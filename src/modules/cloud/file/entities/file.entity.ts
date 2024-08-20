import { BaseEntity } from 'src/common/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne
} from 'typeorm'
import { Folder } from '../../folder/entities/folder.entity'

@Entity('c_files')
export class File extends BaseEntity {
  @Column({ nullable: false })
  filename: string

  @Column({ nullable: false })
  path: string

  @Column({ nullable: false })
  mimetype: string

  @Column({ nullable: false })
  size: number

  @Column({ nullable: false })
  md5: string

  @Column({ default: false })
  isDeleted: boolean // 标记文件是否被删除

  @ManyToOne(() => Folder, (folder) => folder.files, { nullable: false })
  @JoinColumn({ name: 'folderId' })
  folder: Folder

  @ManyToOne(() => Account, (account) => account.files)
  @JoinColumn({ name: 'accountId' })
  account: Account

  @ManyToMany(() => Account, (_) => _.sharedFiles)
  @JoinTable({
    name: 'c_file_shared_accounts',
    joinColumn: { name: 'fileId' },
    inverseJoinColumn: { name: 'accountId' }
  })
  sharedAccounts: Account[]

  // TODO: 可以扩展为与其他实体的关联，比如产品(Product)
  // @ManyToOne(() => Product, (product) => product.files)
  // @JoinColumn({ name: 'productId' })
  // product: Product;
}
