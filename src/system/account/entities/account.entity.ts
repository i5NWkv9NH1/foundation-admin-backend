import { BaseEntity } from 'src/common/entities'
import { Organization } from 'src/system/organization/entities/organization.entity'
import { Role } from 'src/system/role/entities/role.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne
} from 'typeorm'
import { AccountProfile } from './account-profile.entity'

@Entity('sys_account')
export class Account extends BaseEntity {
  @Column({ nullable: true })
  name: string

  @Index()
  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({ select: false, nullable: true })
  originPassword: string | null

  @OneToOne(() => AccountProfile, (profile) => profile.account, {
    cascade: true,
    eager: true,
    nullable: true
  })
  @JoinColumn({ name: 'profileId' })
  profile: AccountProfile

  @ManyToMany(() => Role, (role) => role.accounts)
  roles: Role[]

  @ManyToMany(() => Organization, (organization) => organization.accounts)
  @JoinTable({
    name: 'sys_account_organization',
    joinColumn: { name: 'accountId' },
    inverseJoinColumn: { name: 'organizationId' }
  })
  organizations: Organization[]
}
