import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm'

@Entity('sys_organization')
export class Organization extends BaseEntity {
  @Column()
  label: string
  @Column()
  type: string
  @Column()
  icon: string
  @Column({ nullable: true, type: 'text' })
  path?: string
  @Column({ nullable: true, default: null, name: 'parent_id' })
  parentId?: string
  @ManyToOne(() => Organization, (organization) => organization.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Organization
  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[]
  @ManyToMany(() => Account, (account) => account.organizations)
  @JoinTable({
    name: 'sys_account_organization',
    joinColumn: { name: 'organization_id' },
    inverseJoinColumn: { name: 'account_id' }
  })
  accounts: Account[]
}
