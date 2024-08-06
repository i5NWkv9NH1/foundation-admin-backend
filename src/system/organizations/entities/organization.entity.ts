import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/accounts/entities/account.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity('system_organization')
export class Organization extends BaseEntity {
  @Column()
  label: string

  @Column()
  type: string

  @Column()
  icon: string

  @Column({ nullable: true })
  parentId?: string

  @Column({ nullable: true, type: 'text' })
  path?: string

  @ManyToOne(() => Organization, (organization) => organization.children)
  parent: Organization

  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[]

  @ManyToMany(() => Account, (account) => account.organizations)
  users: Account[]
}
