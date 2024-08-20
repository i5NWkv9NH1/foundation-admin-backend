import { BaseEntity } from 'src/common/entities'
import { File } from 'src/modules/cloud/file/entities/file.entity'
import { Folder } from 'src/modules/cloud/folder/entities/folder.entity'
import { Organization } from 'src/system/organization/entities/organization.entity'
import { Role } from 'src/system/role/entities/role.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne
} from 'typeorm'
import { AccountProfile } from './account-profile.entity'

@Entity('sys_account')
export class Account extends BaseEntity {
  @Column({ nullable: true, comment: 'The name of the account holder' })
  name: string

  @Index()
  @Column({
    nullable: false,
    unique: true,
    comment: 'The unique username for login'
  })
  username: string

  @Column({
    nullable: false,
    comment: 'The hashed password for authentication'
  })
  password: string

  @Column({
    select: false,
    nullable: true,
    comment: 'The original password before hashing (optional)'
  })
  originPassword: string | null

  //* The profile associated with the account
  @OneToOne(() => AccountProfile, (profile) => profile.account, {
    cascade: true,
    eager: true,
    nullable: true
  })
  @JoinColumn({ name: 'profileId' })
  profile: AccountProfile

  //* Roles associated with the account
  @ManyToMany(() => Role, (role) => role.accounts)
  roles: Role[]

  //* Organizations associated with the account
  @ManyToMany(() => Organization, (organization) => organization.accounts)
  @JoinTable({
    name: 'sys_account_organization',
    joinColumn: { name: 'accountId' },
    inverseJoinColumn: { name: 'organizationId' }
  })
  organizations: Organization[]

  //* Folders owned by the account
  @OneToMany(() => Folder, (folder) => folder.account)
  folders: Folder[]

  //* Files owned by the account
  @OneToMany(() => File, (file) => file.account)
  files: File[]

  //* Folders shared with the account
  @ManyToMany(() => Folder, (folder) => folder.sharedAccounts)
  sharedFolders: Folder[]

  //* Files shared with the account
  @ManyToMany(() => File, (file) => file.sharedAccounts)
  sharedFiles: File[]
}
