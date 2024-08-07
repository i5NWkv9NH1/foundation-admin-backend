import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

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
  parent: Organization
  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[]
  @ManyToMany(() => Account, (account) => account.organizations)
  accounts: Account[]
}
